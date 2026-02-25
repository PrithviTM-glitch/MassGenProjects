# Change Document

**Based on:** original — no prior answers

## Summary
Built a 10-slide .pptx explaining quantum computing to high school students using a continuous maze metaphor. Dark navy/teal theme, dynamic layouts (two-column, three-card, 2x2 grid, stacked horizontal bars), no bullet points, hyperlinked quiz buttons on slides 4 and 8. Generated with PptxGenJS, verified through 3 QA cycles.

## Decisions

### DEC-001: PptxGenJS over python-pptx
**Origin:** [SELF] — NEW
**Choice:** Used PptxGenJS (Node.js) for PPTX generation
**Why:** PPTX skill recommends PptxGenJS for creating from scratch — better shape/shadow support
**Implementation:** `scripts/generate_quantum_maze_v2.js`

### DEC-002: Dark navy/teal color palette
**Origin:** [SELF] — NEW
**Choice:** Deep navy (#0D1B2A) primary with teal, mint, electric blue, and gold accents
**Why:** Dark theme evokes maze mystery. Gold stands out for quiz buttons.
**Implementation:** `scripts/generate_quantum_maze_v2.js:L17-33` color object

### DEC-003: Maze as visual + structural metaphor
**Origin:** [SELF] — NEW
**Choice:** Every slide uses maze language AND decorative maze-line graphics
**Why:** Continuous metaphor requirement fulfilled both textually and visually

### DEC-004: Centered quiz button on slide 8
**Origin:** [SELF] — NEW
**Choice:** Moved slide 8 quiz button center-bottom to avoid overlapping STARTUPS card
**Why:** QA revealed overlap. Centering below 2x2 grid gives clear separation.

### DEC-005: No bullet points — varied layouts per slide
**Origin:** [SELF] — NEW  
**Choice:** 8 different layout patterns across 10 slides
**Why:** Task explicitly requires no bullet points with dynamic layout variety
