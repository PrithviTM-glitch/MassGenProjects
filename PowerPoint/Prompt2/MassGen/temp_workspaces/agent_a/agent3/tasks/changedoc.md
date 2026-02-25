# Change Document

**Based on:** original user request (no prior answers)

## Summary
Create a 10-slide PowerPoint (.pptx) that teaches quantum computing to high school students using a continuous “maze” metaphor, with non-bulleted dynamic layouts and standout hyperlinked Quiz buttons on slides 4 and 8.

## Decisions

### DEC-001: Generate the deck programmatically with python-pptx
**Origin:** SELF — NEW
**Choice:** Use a Python generator script to build the .pptx (layouts, shapes, hyperlinks).
**Why:** Ensures a real downloadable .pptx artifact and precise control over slide structure without manual editing.
**Alternatives considered:**
- Manual authoring: rejected (not tool-driven, not reproducible).
- Google Slides export: rejected (not available in this environment).
**Implementation:**
- `utils/build_quantum_maze_pptx.py` — creates slides, layouts, and hyperlinks; writes final PPTX to `deliverable/Quantum_Computing_Maze_Metaphor.pptx`.

### DEC-002: Use a custom-generated maze image as a consistent background motif
**Origin:** SELF — NEW
**Choice:** Generate maze PNG backgrounds with PIL and place them as slide backgrounds.
**Why:** Reinforces the continuous metaphor visually on every slide, not just in text.
**Alternatives considered:**
- Drawing maze lines as PPT shapes: rejected (too verbose/slow and less organic).
**Implementation:**
- `utils/build_quantum_maze_pptx.py` — PIL maze generation + per-slide “progress marker” rendering.

### DEC-003: Implement “Quiz” as an internal hyperlink to a quiz slide
**Origin:** SELF — NEW
**Choice:** Add a standout rounded-rectangle “Quiz” button on slides 4 and 8 linking to slide 10.
**Why:** Creates an interactive navigation element inside the deck without external dependencies.
**Alternatives considered:**
- External URL link: rejected (offline viewing may break; less “interactive deck” feel).
**Implementation:**
- `utils/build_quantum_maze_pptx.py` — adds Quiz button shapes with click_action targeting slide 10.
