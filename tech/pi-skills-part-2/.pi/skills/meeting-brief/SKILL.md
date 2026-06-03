---
name: meeting-brief
description: >
  Takes a meeting transcript and produces a structured action-item brief.
  Use when you have a raw transcript and need an organised summary with
  owners and deadlines.
---

# Meeting Brief Pipeline

This skill orchestrates a three-step pipeline. Follow the steps **in order**.

## Step 1 — Extract Action Items

Use the `/skill:extract-action-items` command with the transcript as input.
This skill parses the transcript line-by-line and identifies every task,
owner mention, and deadline reference.

## Step 2 — Categorise by Owner

Take the output from Step 1 and feed it to the `/skill:categorise-by-owner`
command. This groups action items under each person's name.

## Step 3 — Format as Brief

Take the categorised list and use `/skill:format-brief` to produce a
Markdown document suitable for sharing in email or Slack. The output
includes a "Next steps" section listing unassigned items.

## Verification

After Step 3, review the brief for:
- Are all action items from the original transcript captured?
- Are any owners clearly wrong?
- Are deadlines that were soft ("next week", "soon") marked as such?

If any are missing or wrong, re-run Step 1 with the full transcript.
