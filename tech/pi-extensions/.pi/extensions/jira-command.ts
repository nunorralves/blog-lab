import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

export default function (pi: ExtensionAPI) {
  // Pull from env vars — never hardcode tokens
  const JIRA_BASE_URL = process.env.JIRA_BASE_URL;
  const JIRA_EMAIL = process.env.JIRA_EMAIL;
  const JIRA_API_TOKEN = process.env.JIRA_API_TOKEN;

  pi.registerCommand("jira", {
    description: "Fetch Jira issue details — usage: /jira ISSUE-123",
    handler: async (args, ctx) => {
      // Validate args
      if (!args || !args.trim()) {
        ctx.ui.notify("Usage: /jira ISSUE-123", "warning");
        return;
      }

      const issueKey = args.trim().toUpperCase();

      // Validate config
      if (!JIRA_BASE_URL || !JIRA_EMAIL || !JIRA_API_TOKEN) {
        ctx.ui.notify(
          "Missing Jira config. Set JIRA_BASE_URL, JIRA_EMAIL, and JIRA_API_TOKEN env vars.",
          "error"
        );
        return;
      }

      try {
        const url = `${JIRA_BASE_URL}/rest/api/3/issue/${issueKey}`;
        const auth = Buffer.from(`${JIRA_EMAIL}:${JIRA_API_TOKEN}`).toString("base64");

        const response = await fetch(url, {
          headers: {
            Authorization: `Basic ${auth}`,
            Accept: "application/json",
          },
          signal: ctx.signal, // Respect Pi's abort signal
        });

        if (!response.ok) {
          if (response.status === 404) {
            ctx.ui.notify(`Issue ${issueKey} not found`, "warning");
          } else {
            ctx.ui.notify(
              `Jira API returned ${response.status}: ${response.statusText}`,
              "error"
            );
          }
          return;
        }

        const issue = await response.json() as {
          key: string;
          fields: {
            summary: string;
            status: { name: string };
            assignee?: { displayName: string };
            priority?: { name: string };
          };
        };

        // Format and inject a custom message into the session
        const summary = issue.fields.summary;
        const status = issue.fields.status.name;
        const assignee = issue.fields.assignee?.displayName ?? "Unassigned";
        const priority = issue.fields.priority?.name ?? "None";

        const message = [
          `**${issue.key}** — ${summary}`,
          `Status: ${status} | Assignee: ${assignee} | Priority: ${priority}`,
          `🔗 ${JIRA_BASE_URL}/browse/${issue.key}`,
        ].join("\n");

        // Inject into conversation so the model sees it
        pi.sendMessage(
          {
            customType: "jira-command",
            content: message,
            display: true,
          },
          { triggerTurn: false }
        );

        // Show a notification (always visible, doesn't consume context)
        ctx.ui.notify(`${issueKey}: ${summary}`, "info");
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        ctx.ui.notify(`Jira fetch failed: ${msg}`, "error");
      }
    },
  });
}
