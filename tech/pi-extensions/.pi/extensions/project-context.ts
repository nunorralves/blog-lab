import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import * as fs from "node:fs";
import * as path from "node:path";

export default function (pi: ExtensionAPI) {
  // Load a project context file — if it exists at the project root,
  // inject its contents before every agent turn.
  // If it doesn't exist, the extension is a no-op.

  let contextBlock: string | null = null;

  pi.on("session_start", async (_event, ctx) => {
    const contextPath = path.join(ctx.cwd, ".pi", "project-context.md");

    try {
      if (fs.existsSync(contextPath)) {
        contextBlock = fs.readFileSync(contextPath, "utf-8").trim();
      }
    } catch {
      // File missing or unreadable — extension stays silent
      contextBlock = null;
    }
  });

  pi.on("before_agent_start", async (event, ctx) => {
    if (!contextBlock) return; // No context file, nothing to inject

    const injected = `\n\n## Project Context (injected by project-context extension)\n\n${contextBlock}`;

    return {
      systemPrompt: event.systemPrompt + injected,
    };
  });
}
