# Change Document

**Based on:** (original — no prior answers)

## Summary
Building a single self-contained Python script that uses python-pptx to generate a professional
8-slide Q4 Earnings deck with native charts, Key Takeaway boxes on every slide, and CFO speaker
notes throughout. Emphasis on error handling and correctness.

## Decisions

### DEC-001: Single self-contained script
**Origin:** [SELF] — NEW
**Choice:** One Python file that generates the entire deck, no external dependencies beyond python-pptx
**Why:** The user asked for "a complete, error-free Python script" — singular. A single file is easiest to run, review, and share.
**Alternatives considered:**
- Multiple modules (generator, data, styles): Over-engineered for an 8-slide deck
**Implementation:** `deliverable/generate_deck.py` — entire script

### DEC-002: Use python-pptx CategoryChartData for native charts
**Origin:** [SELF] — NEW
**Choice:** Use `CategoryChartData` for the bar chart and `ChartData` for the pie chart, both native PowerPoint chart objects
**Why:** User explicitly requested "native PowerPoint bar chart" and "pie chart". python-pptx's chart API creates real editable PowerPoint charts, not images.
**Alternatives considered:**
- matplotlib image insertion: Not a native chart, can't be edited in PowerPoint
- Using ChartData for both: CategoryChartData is more appropriate for bar charts with categories

### DEC-003: Churn pie chart breakdown design
**Origin:** [SELF] — NEW  
**Choice:** Show pie chart with segments: Voluntary Churn (45%), Involuntary Churn (25%), Downgrade (20%), Other (10%) — these are illustrative breakdowns of the 4% total churn increase
**Why:** User said "pie chart showing a breakdown of churn" but only gave one data point (4% increase). A pie needs multiple categories. Reasonable SaaS churn breakdown categories make the chart meaningful.
**Alternatives considered:**
- Retained vs Churned pie: Too simplistic (96% vs 4% is visually uninformative)
- Ask user for breakdown data: Instructions say don't ask, make reasonable assumptions

### DEC-004: Robust error handling via try/except with logging
**Origin:** [SELF] — NEW
**Choice:** Wrap major operations in try/except blocks with descriptive error messages. Use logging module. Validate inputs.
**Why:** User explicitly requested "robust error handling"
**Alternatives considered:**
- Simple print statements: Less professional, harder to debug

### DEC-005: Slide structure
**Origin:** [SELF] — NEW
**Choice:** 8 slides: (1) Title, (2) Executive Summary, (3) Revenue Bar Chart, (4) Q4 Deep Dive, (5) Churn Pie Chart, (6) Key Metrics, (7) Outlook & Guidance, (8) Q&A / Thank You
**Why:** Mirrors a standard earnings call deck structure for a SaaS company
**Alternatives considered:**
- Fewer content slides with more charts: Only 2 charts were requested

## Deliberation Trail
(First answer — no prior deliberation)
