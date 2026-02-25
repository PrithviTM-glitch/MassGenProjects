---
name: pptx-quarterly-earnings-deck-generator
description: Workflow for generating a quarterly earnings PowerPoint deck with python-pptx including native charts, takeaways, and CFO notes.
---
# PPTX Quarterly Earnings Deck Generator

## Overview
Create an 8-slide quarterly earnings deck for a SaaS company using **python-pptx**, including:
- Native PowerPoint charts (bar + pie)
- A "Key Takeaway" textbox on every slide
- Consistent CFO speaker notes addressing the Q4 revenue dip
- Robust error handling and basic automated verification

## Workflow
1. Create internal docs (`tasks/changedoc.md`, this SKILL.md) and a task plan.
2. Implement the deck generator script using python-pptx:
   - Build 8 slides using safe layout fallbacks
   - Add bar chart on Slide 3 (quarterly revenue)
   - Add pie chart on Slide 5 (churn breakdown)
   - Add a "Key Takeaway" textbox on every slide
   - Add CFO speaker notes to every slide
   - Save as `Q4_Earnings.pptx`
3. Run the script to generate the PPTX.
4. Programmatically verify output:
   - Slide count == 8
   - Slide 3 contains a BAR chart
   - Slide 5 contains a PIE chart
   - Each slide has a Key Takeaway textbox
   - Speaker notes contain the required Q4 dip narrative
5. Package deliverables (README + requirements).

## Tools to Create
### deliverable/generate_q4_earnings_deck.py
- **Purpose**: Generate the quarterly earnings deck and save `Q4_Earnings.pptx`.
- **Inputs**: optional `--output` path.
- **Outputs**: `Q4_Earnings.pptx` file.
- **Dependencies**: python-pptx

## Tools to Use
- `mcp__filesystem__write_file`, `mcp__filesystem__edit_file`
- `mcp__command_line__execute_command`

## Packages
- `python-pptx`

## Expected Outputs
- `deliverable/generate_q4_earnings_deck.py`
- `deliverable/Q4_Earnings.pptx`
- `deliverable/README.md`
- `deliverable/requirements.txt`

## Verification & Improvement
- Run generator script; fix any runtime errors.
- Run a verification snippet; ensure charts and notes meet requirements.

## Learnings

### What Worked Well
- Using explicit textboxes for titles and key takeaways avoided placeholder/layout inconsistencies.
- Representing churn as a 96/4 pie cleanly matched the only churn datum provided (+4% in Q4).
- A small Python verification snippet with python-pptx reliably confirmed slide count, chart types, takeaways, and speaker notes.

### What Didn't Work
- `mcp__filesystem__write_file` cannot overwrite existing files; delete first or use `edit_file`.

### Tips for Future Use
- Keep the CFO notes as a single constant and re-use it on every slide to guarantee "exact" note consistency.
- Always reserve bottom slide space for the Key Takeaway textbox so charts do not overlap.
