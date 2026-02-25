---
name: saas-earnings-deck-generator
description: Workflow for generating professional SaaS quarterly earnings presentations with native charts and speaker notes.
---
# SaaS Earnings Deck Generator

## Overview
This workflow automates the creation of high-quality, professional PowerPoint presentations for SaaS company earnings calls. It focuses on visual consistency, data accuracy in charts, and professional CFO-style speaker notes.

## Workflow
1. **Define Data**: Consolidate quarterly revenue, churn, and other KPIs.
2. **Template Selection**: Use or simulate a professional slide layout (aspect ratio 16:9).
3. **Slide Generation**:
    - Title slide with branding.
    - Executive Summary with key bullet points.
    - Revenue Performance with native Column/Bar charts.
    - Growth metrics (ARR, New Logos).
    - Churn Analysis with native Pie charts.
    - Operational efficiency slides.
    - Future outlook and Q&A.
4. **Consistency Checks**: Ensure "Key Takeaway" boxes on every slide.
5. **Notes Addition**: Populate speaker notes with analytical commentary.
6. **Verification**: Programmatically check slide count, chart types, and note content.

## Tools to Create

### scripts/generate_professional_deck.py
- **Purpose**: Generates the 8-slide PPTX with advanced styling.
- **Inputs**: Hardcoded or CLI-passed quarterly data.
- **Outputs**: `Q4_Earnings.pptx`
- **Dependencies**: python-pptx

### scripts/verify_pptx_quality.py
- **Purpose**: Detailed inspection of the generated file.
- **Inputs**: PPTX filename.
- **Outputs**: Analysis report.
- **Dependencies**: python-pptx

## Expected Outputs
- `Q4_Earnings.pptx`: The main deliverable.
- `generation_report.txt`: Summary of the deck structure.

## Verification & Improvement
- Run verification script to confirm all 8 slides and charts are present.
- Inspect the visual layout (simulated or via media tools).
- Refine font sizes and colors for better readability.

## Learnings
(To be updated after execution)
