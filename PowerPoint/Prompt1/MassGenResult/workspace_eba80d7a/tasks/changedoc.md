# Change Document

**Based on:** original request — no prior answers

## Summary
Generate an 8-slide SaaS quarterly earnings deck using python-pptx, including a native bar chart (Slide 3), a native pie chart (Slide 5), a "Key Takeaway" textbox on every slide, and consistent CFO speaker notes addressing the Q4 revenue dip.

## Decisions

### DEC-001: Use explicit textboxes + safe layout fallbacks
**Origin:** SELF — NEW
**Choice:** Add required content via explicit textboxes so the script works reliably across PowerPoint templates.
**Why:** Placeholder indices vary; explicit shapes are more robust.
**Alternatives considered:**
- Placeholder-only approach: rejected due to layout differences.
**Implementation:**
- `deliverable/generate_q4_earnings_deck.py` → `safe_layout()`, `add_title()`, `add_key_takeaway()`

### DEC-002: Churn pie chart grounded strictly in given "+4%" data
**Origin:** SELF — NEW
**Choice:** Pie slices: "Baseline churn (96%)" vs "Incremental Q4 churn increase (4%)".
**Why:** Prompt provides only the 4% increase; this avoids inventing unsupported churn reasons.
**Alternatives considered:**
- Reason-code categories: rejected due to missing data.
**Implementation:**
- `deliverable/generate_q4_earnings_deck.py` → `add_churn_pie_chart_slide()`

### DEC-003: Exact CFO notes applied consistently to every slide
**Origin:** SELF — NEW
**Choice:** Apply the same CFO notes text to each slide.
**Why:** Guarantees every slide has the required Q4 dip narrative.
**Alternatives considered:**
- Notes on a single slide: rejected as potentially non-compliant.
**Implementation:**
- `deliverable/generate_q4_earnings_deck.py` → `set_cfo_notes()`

## Deliberation Trail

