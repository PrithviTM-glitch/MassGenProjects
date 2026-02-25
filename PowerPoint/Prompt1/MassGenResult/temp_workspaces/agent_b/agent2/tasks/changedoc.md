# Change Document

**Based on:** (original — no prior answers)

## Summary
Created a robust Python script using `python-pptx` to generate an 8-slide Q4 Earnings deck for a SaaS company. The script includes automated chart generation (Bar and Pie), consistent formatting for takeaways, and context-aware speaker notes.

## Decisions

### DEC-001: Script Structure and Error Handling
**Origin:** [SELF] — NEW
**Choice:** Wrapped all presentation logic in a `try-except` block and included modular functions for repetitive tasks like adding takeaways.
**Why:** Requirement for "robust error handling" and "error-free script".
**Implementation:**
- `scripts/generate_earnings_deck.py:L26-150` → `create_deck()` — Main generation loop with exception handling.

### DEC-002: Native Chart Data Implementation
**Origin:** [SELF] — NEW
**Choice:** Used `CategoryChartData` and `XL_CHART_TYPE` to generate native PowerPoint charts instead of inserting images.
**Why:** Requirement for "programmatically generate a native PowerPoint bar chart".
**Implementation:**
- `scripts/generate_earnings_deck.py:L70-80` → Bar Chart on Slide 3.
- `scripts/generate_earnings_deck.py:L106-116` → Pie Chart on Slide 5.

### DEC-003: Churn Breakdown Logic
**Origin:** [SELF] — NEW
**Choice:** Fabricated 4 logical SaaS churn categories (Price Sensitivity, Competitor Switch, Product Gap, Company Dissolution) to populate the Pie Chart.
**Why:** The prompt asked for a "breakdown of churn" but only provided the 4% increase metric.
**Implementation:**
- `scripts/generate_earnings_deck.py:L110` → Categorical data for churn pie chart.

### DEC-004: Speaker Notes and Takeaways
**Origin:** [SELF] — NEW
**Choice:** Added speaker notes via `slide.notes_slide.notes_text_frame.text` and a consistent text box via `add_key_takeaway`.
**Why:** Specific requirements for CFO notes addressing the revenue dip and "Key Takeaway" on every slide.
**Implementation:**
- `scripts/generate_earnings_deck.py:L13-24` → `add_key_takeaway()` helper.
- `scripts/generate_earnings_deck.py:L82-87` → CFO notes for Slide 3.

## Deliberation Trail
(None - first answer)
