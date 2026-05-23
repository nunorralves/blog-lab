---
name: code-review
description: >
  Review code for correctness, clarity, performance, and maintainability with categorised feedback.
---

## Procedure

1. **Understand the change:**
   - Read the PR description and linked ticket first
   - What problem does this solve? What's the expected behaviour?
   - Is the approach appropriate for the problem scope?

2. **Correctness:**
   - Does it do what it claims? Trace the logic for happy path and edge cases
   - Are error cases handled? What happens with nil/null/empty/boundary inputs?
   - Are there race conditions? (Shared state, concurrent access, async operations)
   - Are transactions/atomicity correct? (Partial failures, rollback scenarios)

3. **Clarity:**
   - Can you understand the code without the author explaining it?
   - Are names (functions, variables, types) descriptive and consistent?
   - Is complex logic commented with WHY (not what)?
   - Are there unnecessary abstractions or premature generalisations?

4. **Performance:**
   - N+1 queries? Unbounded loops? Missing pagination?
   - Appropriate data structures for the access patterns?
   - Are expensive operations cached, batched, or deferred where appropriate?
   - Only flag performance issues on hot paths — don't micro-optimise cold code

5. **Maintainability:**
   - If requirements change slightly, how much of this breaks?
   - Is test coverage adequate for the risk level?
   - Are dependencies appropriate (not pulling a library for one function)?
   - Does this introduce tech debt? If so, is it documented?

6. **Categorise each comment:**
   - **Blocking:** must fix before merge (bug, security issue, data corruption risk)
   - **Recommendation:** strongly suggest but won't block (better approach, clarity improvement)
   - **Nit:** optional improvement (style, naming preference, minor cleanup)
   - **Question:** need to understand intent before judging
   - **Praise:** something done well (reinforce good patterns)

## Output

Review comments on the PR/MR, each categorised. Summary comment with: overall assessment (approve / request changes / needs discussion) and key points.

## Pitfalls

- Reviewing style instead of substance — auto-format handles style; focus on logic and design
- No positive feedback — reviews that only criticise train authors to dread them
- Blocking on nitpicks — if it works, is clear, and is tested, don't block for naming preferences
- Reviewing without running/understanding — don't comment on code you haven't mentally executed
- Rubber-stamping — "LGTM" without actually reading is not a review; it's a liability