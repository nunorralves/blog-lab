---
name: extract-action-items
description: >
  Extracts action items, owners, and deadlines from meeting transcripts.
  Use when you have raw text from a meeting and need a structured list
  of who needs to do what.
---

# Extract Action Items

Given a meeting transcript or notes, extract every action item.

## Output Format

For each action item, output one line:

```
- [ ] <task description> — assigned to: <name>, deadline: <date or "none">
```

## Rules

- Include every task mentioned, even tentatively
- If no owner is stated, write "unassigned"
- If no deadline is stated, write "none"
- Ignore general discussion — only action items
- If someone says "I'll", "let me", "I'm going to", that counts as an action item
- If the same task is mentioned by multiple people, list the last person who claimed it

## Example

**Input:**

```
Ana: I'll update the onboarding docs by Friday. Also we should revisit the
login flow, the error messages are confusing.

Marco: I'm going to fix the payment timeout bug. Probably next week.
```

**Output:**

```
- [ ] Update onboarding docs — assigned to: Ana, deadline: Friday
- [ ] Revisit login flow error messages — assigned to: unassigned, deadline: none
- [ ] Fix payment timeout bug — assigned to: Marco, deadline: next week
```
