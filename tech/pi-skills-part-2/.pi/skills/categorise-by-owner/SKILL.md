---
name: categorise-by-owner
description: >
  Groups a list of action items by assigned owner. Use after extracting
  action items from a transcript to organise tasks per person.
---

# Categorise by Owner

Take a list of action items (one per line) and group them by the person they're assigned to.

## Output Format

```
## <Owner Name>
- [ ] <task description> (deadline: <date>)

## Unassigned
- [ ] <task description> (deadline: <date>)
```

## Rules

- Group items under each owner's name
- Sort owners alphabetically
- Put "Unassigned" at the bottom
- Preserve all task descriptions and deadlines from the input
- If the same owner appears under slightly different names ("Ana" vs "Ana S."), consolidate under the most common form

## Example

**Input:**

```
- [ ] Update onboarding docs — assigned to: Ana, deadline: Friday
- [ ] Fix payment timeout bug — assigned to: Marco, deadline: next week
- [ ] Review Marco's PR — assigned to: Lena, deadline: Wednesday
- [ ] Update API docs — assigned to: unassigned, deadline: none
```

**Output:**

```
## Ana
- [ ] Update onboarding docs (deadline: Friday)

## Lena
- [ ] Review Marco's PR (deadline: Wednesday)

## Marco
- [ ] Fix payment timeout bug (deadline: next week)

## Unassigned
- [ ] Update API docs (deadline: none)
```
