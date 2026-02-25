---
name: pptx-earnings-deck
description: Generate professional PowerPoint earnings decks with native charts using python-pptx
---
# PPTX Earnings Deck Generator

## Overview
Create a complete Python script that generates a polished quarterly earnings PowerPoint deck
with native charts, consistent styling, speaker notes, and Key Takeaway boxes.

## Workflow
1. Install python-pptx
2. Write the generation script with all 8 slides
3. Run the script to produce the .pptx file
4. Validate the output programmatically (slide count, chart presence, notes, text boxes)
5. Iterate on any issues found

## Tools to Create
### scripts/validate_deck.py
- **Purpose**: Inspect a generated .pptx and verify all requirements
- **Inputs**: Path to .pptx file
- **Outputs**: Pass/fail report for each requirement

## Expected Outputs
- deliverable/generate_deck.py — the main script
- deliverable/Q4_Earnings.pptx — the generated deck

## Verification & Improvement
- Run script, check exit code
- Run validation script to check all 8 slides, charts, notes, takeaway boxes
- Visual spot-check if possible

## Learnings
(To be filled after execution)
