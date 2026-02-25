---
name: saas-earnings-presentation-gen
description: Workflow for generating SaaS quarterly earnings presentations with charts and speaker notes using python-pptx.
---
# SaaS Earnings Presentation Generation

## Overview
This skill automates the creation of professional quarterly earnings decks for SaaS companies. It handles data visualization (bar/pie charts), consistent slide formatting, and automated speaker notes.

## Workflow
1. Define the data structure for revenue, churn, and slide content.
2. Setup the PowerPoint presentation object and layout constants.
3. Iterate through slide definitions to create slides.
4. Implement specific chart creation logic for Slides 3 (Bar) and 5 (Pie).
5. Add 'Key Takeaway' text boxes to all slides using a consistent helper function.
6. Inject CFO speaker notes with specific logic for revenue dips.
7. Save the presentation and verify the file structure.

## Tools to Create

### scripts/generate_earnings_deck.py
- **Purpose**: Main script to generate 'Q4_Earnings.pptx' based on provided data.
- **Inputs**: Hardcoded data (per prompt) or JSON config.
- **Outputs**: Q4_Earnings.pptx
- **Dependencies**: python-pptx

## Tools to Use
- python-pptx: For slide and chart generation.

## Expected Outputs
- Q4_Earnings.pptx

## Verification & Improvement
- Run the script and check for errors.
- Use `pptx` skill helpers to inspect the generated slides.
- Verify chart data matches the prompt exactly ($2.4M, $2.8M, $3.1M, $2.9M).
- Confirm 'Key Takeaway' exists on all 8 slides.
- Check speaker notes on Slide 3 for the Q4 dip explanation.

## Learnings

### What Worked Well
- Using `XL_CHART_TYPE.COLUMN_CLUSTERED` and `XL_CHART_TYPE.PIE` provided clean, native visualizations.
- Modularizing the `add_key_takeaway` function ensured consistency across all 8 slides.
- A separate verification script allowed for automated checking of internal slide structures without manual inspection.

### What Didn't Work
- Initial assumption about slide layouts: it's better to stick to standard layouts (0 for title, 1 for bullet points, 5 for title-only) for predictable results.

### Tips for Future Use
- Always verify slide layout indices when switching themes or templates.
- Ensure `python-pptx` is installed in the target environment as it is a third-party dependency.
