---
name: pptx-saas-earnings-deck-generator
description: Generate professional PowerPoint quarterly earnings decks with native charts, speaker notes, and branded styling using python-pptx. Reusable for any SaaS company earnings call presentation.
---
# PPTX SaaS Earnings Deck Generator

## Overview
Create a complete, self-contained Python script that generates a polished quarterly earnings
PowerPoint deck with native editable charts, consistent corporate styling, CFO speaker notes,
and "Key Takeaway" boxes on every slide. Designed for SaaS companies but adaptable to any
quarterly reporting context.

## Workflow
1. **Install dependency**: `pip install python-pptx`
2. **Define data constants**: Revenue by quarter, churn breakdown categories, brand colors
3. **Build helper functions**: Reusable functions for titles, body text, takeaway boxes, charts, notes
4. **Generate slides programmatically**: Use blank layouts with custom positioning for full control
5. **Add native charts**: Use `CategoryChartData` + `add_chart()` for editable PowerPoint charts
6. **Style charts**: Color individual bars/slices, add data labels, format axes
7. **Add speaker notes**: Populate `notes_slide.notes_text_frame.text` on every slide
8. **Validate before save**: Assert slide count matches expected, handle file I/O errors
9. **Run verification**: Programmatic checks for all requirements (charts, notes, takeaways)
10. **Visual spot-check**: Render slides to images if LibreOffice is available

## Tools to Create

### deliverable/generate_deck.py
- **Purpose**: Main script generating the 8-slide PPTX
- **Inputs**: Hardcoded constants (easily parameterizable)
- **Outputs**: `Q4_Earnings.pptx`
- **Key patterns**:
  - `CategoryChartData` for both bar and pie charts
  - `XL_CHART_TYPE.COLUMN_CLUSTERED` for bar chart
  - `XL_CHART_TYPE.PIE` for pie chart
  - Individual point coloring via `series.points[idx].format.fill`
  - Takeaway boxes with border via `txBox.line.color.rgb`

### scripts/verify_deck.py (optional)
- **Purpose**: Programmatic validation of generated PPTX
- **Inputs**: Path to .pptx file
- **Outputs**: Pass/fail for each requirement

## Tools to Use
- `python-pptx` library — the only external dependency
- LibreOffice + pdftoppm for optional visual rendering verification

## Skills
- PowerPoint chart API knowledge (CategoryChartData, chart styling)
- SaaS financial metrics terminology for realistic content

## Packages
- `python-pptx>=0.6.21`

## Expected Outputs
- `deliverable/generate_deck.py` — complete generation script (~500 lines)
- `deliverable/Q4_Earnings.pptx` — generated 8-slide deck (~66KB)

## Learnings
- **Use blank layouts**: `slide_layouts[6]` (blank) gives full control over positioning. Using content layouts can cause placeholder issues with charts.
- **16:9 dimensions**: Set `prs.slide_width = Inches(13.333)` and `prs.slide_height = Inches(7.5)` for proper widescreen — this is the modern standard.
- **Churn data design**: When the user provides only "churn increased 4%", create realistic SaaS churn categories (price sensitivity, competitor switch, feature gaps, payment failure) for the pie chart.
- **Chart data labels**: Use `data_labels.number_format = '$#,##0.0"M"'` for currency formatting on bar charts.
- **Point-level coloring**: Color individual chart points (e.g., Q4 in red) using `series.points[idx].format.fill.solid()` — this is the key to visual highlighting.
- **Speaker notes depth**: For investor decks, provide 450–730 chars per slide with specific dollar figures — generic one-liners are insufficient for CFO use.
- **Error handling layers**: Per-function try/except + import guard + slide count validation + PermissionError catch provides robust coverage.
- **Validate before saving**: Always `assert len(prs.slides) == expected` before `prs.save()` to catch silent generation failures.
