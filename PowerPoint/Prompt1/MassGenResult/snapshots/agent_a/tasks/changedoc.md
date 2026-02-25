# Change Document — Q4 Earnings Deck Generator

## Summary
A single self-contained Python script using python-pptx generates a professional 8-slide Q4 Quarterly Earnings PowerPoint deck for a SaaS company. The deck includes native editable bar and pie charts, styled "Key Takeaway" boxes on every slide, and detailed CFO speaker notes (450–730 chars each) that address the Q4 revenue dip across 6 of 8 slides with specific dollar figures. Uses standard 16:9 widescreen format.

## Decisions

### DEC-001: Single self-contained script
**Origin:** agent1 — NEW
**Choice:** One Python file (`deliverable/generate_deck.py`) generates the entire deck with no external dependencies beyond python-pptx.
**Why:** The user asked for "a complete, error-free Python script" — singular. A single file is easiest to run, review, and share.
**Alternatives considered:**
- Multiple modules (generator, data, styles): Over-engineered for an 8-slide deck.
**Implementation:** `deliverable/generate_deck.py` — all ~500 lines in one file.

### DEC-002: Native PowerPoint charts via CategoryChartData
**Origin:** agent1 — NEW
**Choice:** Use `CategoryChartData` with `add_chart(XL_CHART_TYPE.COLUMN_CLUSTERED)` for the bar chart and `add_chart(XL_CHART_TYPE.PIE)` for the pie chart — both create native editable PowerPoint chart objects.
**Why:** User explicitly requested "native PowerPoint bar chart" and "pie chart." python-pptx's chart API creates real charts that can be edited inside PowerPoint, unlike matplotlib image insertions.
**Alternatives considered:**
- matplotlib image insertion: Not native, can't be edited in PowerPoint.
**Implementation:** `deliverable/generate_deck.py` — `_add_bar_chart()` (line ~397) and `_add_pie_chart()` (line ~453).

### DEC-003: 5-category churn pie chart breakdown
**Origin:** agent1 — NEW
**Choice:** Pie chart with 5 categories: Voluntary – Price Sensitivity (35%), Voluntary – Competitor Switch (25%), Voluntary – Feature Gaps (20%), Involuntary – Payment Failure (12%), Involuntary – Other (8%).
**Why:** User said "pie chart showing a breakdown of churn" but only gave one data point (4% increase). A pie chart needs multiple categories. These represent realistic SaaS churn drivers and make the chart meaningful.
**Alternatives considered:**
- Retained vs Churned (96% vs 4%): Visually uninformative with one tiny slice.
- Agent 2's 4-category breakdown (Competitive 35%, Budget 30%, Product Fit 20%, M&A 15%): Simpler but less nuanced.
**Implementation:** `deliverable/generate_deck.py` — `CHURN_BREAKDOWN` dict (line ~57) and `_add_pie_chart()`.

### DEC-004: Per-function error handling with import guard and save validation
**Origin:** agent1 — NEW
**Choice:** Each helper function wrapped in try/except with descriptive RuntimeError. Import guard with sys.exit(1) for missing python-pptx. Slide count assertion before save. Specific PermissionError/OSError catches on file write.
**Why:** User explicitly requested "robust error handling." Multiple layers catch errors at different points rather than one broad catch.
**Alternatives considered:**
- Single top-level try/except (agent2's approach): Catches everything but loses specificity and makes debugging harder.
**Implementation:** `deliverable/generate_deck.py` — import block (line ~16), every `_add_*()` function, slide count check (line ~628), save block (line ~633).

### DEC-005: 16:9 widescreen dimensions (13.333" × 7.5")
**Origin:** agent2 — NEW, adopted in final
**Choice:** Set `prs.slide_width = Inches(13.333)` and `prs.slide_height = Inches(7.5)` for standard 16:9 widescreen.
**Why:** Modern business presentations use 16:9 widescreen format. Agent 1 used 10" × 7.5" (4:3-ish); agent 2 correctly identified 13.333" × 7.5" as the PowerPoint 16:9 standard.
**Implementation:** `deliverable/generate_deck.py` — `generate_deck()` function, Presentation initialization. All element widths adjusted to 12.0" for text boxes and 10.3" for charts.

### DEC-006: Q4 bar highlighted in red
**Origin:** agent1 — NEW
**Choice:** Color Q4 bar in red (`#E84D3D`) while other bars use teal (`#2E86AB`) via per-point fill formatting.
**Why:** Draws immediate visual attention to the revenue dip, matching investor deck conventions for calling out underperformance.
**Implementation:** `deliverable/generate_deck.py` — `_add_bar_chart()`, loop over `series.points[idx]` with conditional red fill for Q4.

### DEC-007: Detailed CFO speaker notes addressing Q4 dip throughout
**Origin:** agent1 — NEW
**Choice:** Every slide has 450–730 character speaker notes prefixed with "CFO Notes." 6 of 8 slides directly address the Q4 revenue dip with specific dollar figures ($180K deferred enterprise contracts, $50K product sunset, $90K SMB churn).
**Why:** User requested "exact CFO speaker notes addressing the Q4 revenue dip." A professional earnings call script requires a continuous narrative, not isolated mentions.
**Alternatives considered:**
- Agent 2's approach: Shorter notes (83–419 chars), Q4 dip addressed in only 1 slide's notes.
**Implementation:** `deliverable/generate_deck.py` — `SLIDES` list, `"notes"` key for each slide definition.

### DEC-008: Dedicated Root Cause Analysis slide (Slide 6)
**Origin:** agent1 — NEW
**Choice:** Include "Q4 Revenue Dip — Root Cause Analysis" as Slide 6 with specific financial breakdown: –$180K enterprise contract transition, –$50K product sunset, –$90K SMB churn impact.
**Why:** Directly addresses the Q4 dip with investor-grade specificity. Earns credibility by breaking down the exact composition of the shortfall.
**Implementation:** `deliverable/generate_deck.py` — `SLIDES[5]` definition.

### DEC-009: Styled Key Takeaway boxes with border and prefix formatting
**Origin:** agent1 — NEW
**Choice:** Takeaway boxes have light grey-blue background, teal border, "Key Takeaway:" prefix in bold teal with remaining text in dark grey.
**Why:** Makes the takeaway visually distinct from other content, easy to scan, and consistently branded across all 8 slides.
**Implementation:** `deliverable/generate_deck.py` — `_add_takeaway_box()` function with `fill.solid()`, `txBox.line.color.rgb`, and split run formatting.

## Deliberation Trail

### agent1 (initial):
- Designed comprehensive 8-slide structure with Root Cause Analysis slide
- Per-function error handling, 500+ char speaker notes on all slides
- Q4 bar highlighted in red, custom pie chart colors
- Used 10" × 7.5" slide dimensions

### agent2 (iteration):
- Correct 16:9 dimensions (13.333" × 7.5")
- Used slide layouts with placeholders instead of blank layouts
- Shorter speaker notes, single broad try/except

### Final consolidation:
- **Base:** agent1's comprehensive implementation (structure, content, styling, error handling, notes)
- **Adopted from agent2:** 16:9 widescreen dimensions (DEC-005)
- **Adjusted:** All element widths updated for the wider slide format
- **Verification:** 41/41 programmatic checks passed
