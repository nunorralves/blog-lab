import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { DynamicBorder } from "@earendil-works/pi-coding-agent";
import {
  Container,
  SelectList,
  Text,
  Spacer,
  Key,
  matchesKey,
  type SelectItem,
} from "@earendil-works/pi-tui";

interface PromptEntry {
  id: string;
  label: string;
  description: string;
  content: string; // The actual prompt text to send
}

export default function (pi: ExtensionAPI) {
  // Register a keyboard shortcut to open the picker
  pi.registerShortcut(Key.alt("p"), {
    description: "Open prompt picker",
    handler: async (ctx) => {
      if (!ctx.hasUI) return;

      const prompts: PromptEntry[] = [
        // Development prompts
        {
          id: "review",
          label: "Code Review",
          description: "Review staged changes for correctness and clarity",
          content:
            "Review the staged changes for correctness, clarity, performance, and maintainability. Categorise feedback as blocking, recommendation, or nit.",
        },
        {
          id: "explain",
          label: "Explain Code",
          description: "Explain what the selected code does",
          content:
            "Explain what this code does, its design decisions, and any potential issues.",
        },

        // Knowledge-work prompts (non-coding use case)
        {
          id: "summarise-notes",
          label: "Summarise Notes",
          description: "Extract key points from meeting notes",
          content:
            "Summarise these meeting notes: decisions made, action items with owners, and open questions. Keep it to one paragraph per topic.",
        },
        {
          id: "status-update",
          label: "Draft Status Update",
          description: "Write a status update from the current context",
          content:
            "Using the project context and any recent changes, draft a concise status update: what was accomplished, what's in progress, what's blocked, and what's next.",
        },
        {
          id: "extract-actions",
          label: "Extract Action Items",
          description: "Pull action items with owners from a thread",
          content:
            "Extract all action items from this discussion. For each: what needs to be done, who owns it (if mentioned), and any deadline. Format as a checklist.",
        },
        {
          id: "decision-log",
          label: "Log Decision",
          description: "Record a decision with context and alternatives",
          content:
            "Record this as an architecture decision: context, decision, alternatives considered, and consequences. Follow the ADR format.",
        },
      ];

      const items: SelectItem[] = prompts.map((p) => ({
        value: p.id,
        label: p.label,
        description: p.description,
      }));

      const result = await ctx.ui.custom<string | null>(
        (tui, theme, _kb, done) => {
          const container = new Container();

          // Header
          container.addChild(
            new DynamicBorder((s: string) => theme.fg("accent", s)),
          );
          container.addChild(
            new Text(theme.fg("accent", theme.bold(" Prompt Picker")), 1, 0),
          );
          container.addChild(
            new Text(
              theme.fg(
                "muted",
                " Type to filter · Enter to select · Esc to cancel",
              ),
              1,
              0,
            ),
          );
          container.addChild(new Spacer(1));

          const list = new SelectList(items, 8, {
            selectedText: (t: string) => theme.fg("accent", t),
            description: (t: string) => theme.fg("muted", t),
          });

          list.onSelect = (item) => done(item.value);
          list.onCancel = () => done(null);

          container.addChild(list);

          return {
            render: (w: number) => container.render(w),
            invalidate: () => container.invalidate(),
            handleInput: (data: string) => {
              if (matchesKey(data, Key.escape)) {
                done(null);
                return;
              }
              list.handleInput(data);
              tui.requestRender();
            },
          };
        },
        {
          overlay: true,
          overlayOptions: {
            anchor: "center",
            width: "60%",
            maxHeight: 14,
          },
        },
      );

      // If the user selected a prompt, send it
      if (result) {
        const prompt = prompts.find((p) => p.id === result);
        if (prompt) {
          await pi.sendUserMessage(prompt.content);
        }
      }
    },
  });
}
