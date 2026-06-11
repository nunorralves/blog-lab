import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import * as fs from "node:fs";
import * as path from "node:path";

export default function (pi: ExtensionAPI) {
  let contextLoaded = false;
  let currentModel = "—";
  let thinkingLevel = "off";

  pi.on("session_start", async (_event, ctx) => {
    // Check if project-context.md exists (non-coding use case)
    contextLoaded = fs.existsSync(path.join(ctx.cwd, ".pi", "project-context.md"));

    // Set up the custom footer
    ctx.ui.setFooter((tui, theme, footerData) => {
      const disposeBranch = footerData.onBranchChange(() => tui.requestRender());

      return {
        render(width: number) {
          const branch = footerData.getGitBranch() ?? "no repo";
          const contextIcon = contextLoaded
            ? theme.fg("success", "● ctx")
            : theme.fg("dim", "○ ctx");

          const left = [
            theme.fg("accent", theme.bold(` ${currentModel} `)),
            theme.fg("muted", `think:${thinkingLevel}`),
          ].join(" ");

          const right = [
            contextIcon,
            theme.fg("dim", branch.slice(0, 20)),
          ].filter(Boolean).join(" ");

          const filler = " ".repeat(
            Math.max(1, width - visibleLength(left) - visibleLength(right))
          );
          return [left + theme.fg("dim", filler) + right];
        },

        invalidate() {},

        dispose() {
          disposeBranch();
        },
      };
    });
  });

  // Keep model info current via events
  pi.on("model_select", (event) => {
    currentModel =
      typeof event.model === "string" ? event.model : event.model?.id ?? "—";
  });

  pi.on("agent_start", (_event, ctx) => {
    currentModel =
      typeof ctx.model === "string" ? ctx.model : ctx.model?.id ?? "—";
    // To add token usage: log JSON.stringify(ctx.getContextUsage()) to find
    // the correct field names for your Pi version.
  });

  pi.on("thinking_level_select", (event) => {
    thinkingLevel = event.level;
  });
}

function visibleLength(s: string): number {
  return s.replace(/\x1b\[[0-9;]*m/g, "").length;
}
