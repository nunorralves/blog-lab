---
name: format-brief
description: >
  Formats a categorised list of action items into a clean Markdown brief
  suitable for email or Slack sharing. Use after categorising action items
  by owner.
---

# Format Brief

Take a categorised list of action items and produce a clean, shareable brief.

## Output Format

```markdown
# Action Items — <derive a title from context>

*Brief generated from meeting transcript. <N> items across <N> owners.*

---

<per-owner sections with checkboxes>

---

## ⚠️ Unassigned

<unassigned items list>

---

## Summary

- Total action items: <N>
- Assigned: <N>
- Unassigned: <N>
- Earliest deadline: <date>
- Items with no deadline: <N>
```

## Rules

- Derive a meaningful title from the action items (e.g., "Action Items — Q2 Planning Sync")
- Use checkboxes: `- [ ]` for each item
- Count and report total, assigned, and unassigned items
- Identify the earliest specific deadline
- Flag items with no deadline
- Keep the output clean and scannable — this is going to email or Slack

## Example

See the `meeting-brief` orchestrator skill for the full pipeline that feeds into this step.
