import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { isToolCallEventType } from "@earendil-works/pi-coding-agent";

export default function (pi: ExtensionAPI) {
  const DANGEROUS_PATTERNS = [
    "rm -rf",
    "sudo rm",
    "DROP TABLE",
    "DROP DATABASE",
    "format C:",
    "> /dev/sda",
    "mkfs.",
    "dd if=",
    ":(){ :|:& };:",  // fork bomb
    "chmod 777",
  ];

  pi.on("tool_call", async (event, ctx) => {
    // Only intercept bash tool calls
    if (!isToolCallEventType("bash", event)) return;

    const cmd = event.input.command;
    const matched = DANGEROUS_PATTERNS.find((p) => cmd.includes(p));

    if (!matched) return; // Nothing dangerous, let it run

    // In non-interactive mode (print, JSON), block without asking
    if (!ctx.hasUI) {
      return { block: true, reason: `Blocked dangerous pattern: "${matched}"` };
    }

    // Interactive mode: ask the user
    const ok = await ctx.ui.confirm(
      "Dangerous Command Detected",
      `Pi wants to run:\n\n  ${cmd.slice(0, 120)}${cmd.length > 120 ? "..." : ""}\n\nMatched pattern: "${matched}"\n\nAllow this command?`
    );

    if (!ok) {
      return { block: true, reason: `User blocked command matching "${matched}"` };
    }
    // User confirmed — let it run (return nothing = pass through)
  });
}
