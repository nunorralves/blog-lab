## Current Workstreams

- **Q3 Platform Migration:** Moving reporting pipeline from legacy ETL to new stack.
  Target: end of July. Ana owns the data layer, Marco owns API compatibility.
- **Hiring:** Two open roles (Senior Platform, Staff SRE). Interviews ongoing.
  Lena is the hiring manager. Referrals welcome.

## Recent Decisions

- 2026-06-01: Postponed Redis Cluster upgrade to Q4 — vendor stability concerns.
  Decision owner: Marco. See Confluence: /wiki/ARCH-2026-06-01.
- 2026-05-28: Adopted TypeScript strict mode across all new services.
  Decision owner: Lena. RFC approved.

## Active Risks

- Payment timeout bug in production — intermittent, affecting ~2% of transactions.
  Marco investigating. No RCA yet.
- Search endpoint returning 500s under load — Ana taking this after onboarding docs.

## Open Questions

- Should we standardise on Bun or stay on Node 22 for the migration?
  Decision needed by June 15.
- Do we extend the contractor for another quarter? Budget review next week.
