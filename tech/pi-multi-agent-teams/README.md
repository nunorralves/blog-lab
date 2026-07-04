# Pi Multi-Agent Teams — Blog Lab Artifacts

Companion files for the blog post "Pi Multi-Agent Teams — Beyond the YAML Basics" (post 7 of the Pi series). These are **illustrative examples** — simplified, educational team configs and agent personas that demonstrate the concepts from the post.

## What's here

### Agent personas (`.pi/agents/`)

Each agent follows the pattern from the post: a short role definition that names the output it produces and the output it does NOT produce.

| Agent | Role | Used in |
|-------|------|---------|
| `lead` | Frames the problem, orchestrates review, owns the decision | design-review |
| `reviewer` | Correctness, security, and completeness review | design-review, spec-check (lead) |
| `tester` | Failure modes, testability, edge cases | design-review, spec-check |
| `writer` | Clarity, completeness, and audience fit of the spec itself | design-review, spec-check |
| `product` | User value, market fit, stakeholder impact | design-review |
| `_base/team-lead` | Orchestration base composed under every lead | (composed, not standalone) |

### Team configs (`.pi/teams/`)

| Team | Lead | Members | Pattern | Purpose |
|------|------|---------|---------|---------|
| `basic` | lead | reviewer, tester | Star | Minimal starting point — the Post 01 intro |
| `design-review` | lead | reviewer, tester, writer, product | Sequential | Full multi-perspective design validation |
| `spec-check` | reviewer | tester, writer | Parallel | Lightweight quality gate, fast turnaround |

## How to use

Drop the `.pi/` folder into your Pi project directory:

```bash
pi --team list           # verify the teams are discovered
pi --team design-review   # full design review session
pi --team spec-check      # quick spec quality gate
```

## Requirements

- Pi version: `>=0.75.4`
- At least two providers configured (teams dispatch separate model calls per delegate)

## Related posts

- [Post 01: Pi — The Terminal Agent That Adapts to You](/posts/2026-05-18-pi-coding-agent)
- [Blog post series index](/posts/tag/pi)
