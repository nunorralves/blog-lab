import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

export default function (pi: ExtensionAPI) {
  pi.on("session_start", async (_event, ctx) => {
    // Show a status entry in the default footer
    ctx.ui.setStatus("alerts", ctx.ui.theme.fg("warning", "⚠ 3 alerts"));

    // Clear it later — e.g., after a command
    // ctx.ui.setStatus("alerts", undefined);
  });
}