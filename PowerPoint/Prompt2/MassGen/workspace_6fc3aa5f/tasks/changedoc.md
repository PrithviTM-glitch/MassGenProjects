# Change Document

**Sources reviewed:** agent1.1, agent2.2, agent3.1

## Summary
Building an improved 10-slide quantum computing pptx that combines agent1's rich layout variety (many shapes, diverse arrangements), agent2's engaging "ghost runner" metaphor language, and agent3's proper internal slide-jump hyperlinks and dedicated quiz slide. Fixing agent1's broken hyperlinks, enriching agent2's simpler layouts, and making agent3's quiz buttons more visually prominent.

## Decisions

### DEC-001: Hyperlink Implementation
**Origin:** agent3.1 (modified) → [SELF] (enhanced)
**Choice:** Use python-pptx's `ppaction://hlinksldjump` for internal slide navigation to a dedicated Quiz slide (slide 10), AND include external URL hyperlinks as fallback
**Why:** Internal slide-jump links work reliably in PowerPoint without external dependencies. Agent1's PptxGenJS generated `rIdundefined` broken relationships. Agent2's external-only links require internet. Combining both gives maximum utility.
**Synthesis Note:** Agent3 had the right approach (internal links) but positioned buttons in upper corner. Agent2 had working external links. Combining both approaches.
**Alternatives considered:**
- agent1.1's PptxGenJS approach: Generated broken rId references
- agent2.2's external-only links: Requires internet access during presentation
**Implementation:** `scripts/build_presentation.py` — quiz button shapes with dual hyperlinks

### DEC-002: Layout Variety and Dynamic Structure
**Origin:** agent1.1 → [SELF] (modified)
**Choice:** Use 6+ distinct layout patterns across slides: centered title, two-column cards, three-column cards, panel+sidebar, 2×2 grid, stacked horizontal bars, centered callout
**Why:** The requirement explicitly asks for dynamic layouts (side-by-side, top-heavy title). Agent1 had 22-32 shapes per slide with rich variety. Agent2 only had 2-3 text shapes per slide which feels repetitive.
**Synthesis Note:** Taking agent1's ambition for variety but implementing in python-pptx for reliable hyperlinks
**Alternatives considered:**
- agent2.2's simpler layouts: Only 2-3 text shapes, repetitive feel
- agent3.1's layouts: Moderate variety but mostly side-by-side or stacked
**Implementation:** `scripts/build_presentation.py` — multiple layout functions

### DEC-003: Maze Metaphor Depth
**Origin:** agent2.2 → [SELF] (modified)
**Choice:** Use "ghost runner" / "quantum explorer" as a character through the maze, combined with agent1's structural maze vocabulary (corridors, forks, walls, dead ends)
**Why:** Agent2's "ghost runner" concept is memorable and relatable for high school students. Agent1's maze vocabulary creates a structural metaphor. Combining both gives character + environment.
**Synthesis Note:** Agent2's narrative approach was most engaging for the target audience
**Implementation:** All slide content uses both character and structural maze language

### DEC-004: Quiz Slide & Button Design
**Origin:** [SELF] — NEW
**Choice:** Large centered gold quiz buttons with rounded rectangle shape, white border, bold text "🧩 TAKE THE QUIZ", positioned prominently in lower-center of slides 4 and 8. Dedicated quiz slide 10 with actual questions.
**Why:** Buttons must "visually stand out" per requirements. Center-bottom positioning ensures visibility without overlapping content. Dedicated quiz slide gives internal link target.
**Implementation:** `scripts/build_presentation.py` — `add_quiz_button()` function

### DEC-005: Visual Decorations (Maze Walls)
**Origin:** agent1.1 → agent3.1 → [SELF] (modified)
**Choice:** Decorative maze-line shapes on slide borders using colored rectangles to create maze wall patterns, plus embedded maze images where possible
**Why:** Visual reinforcement of the maze metaphor beyond just text. Agent1 had maze wall decorations, agent3 had embedded maze images. Using both approaches.
**Implementation:** `scripts/build_presentation.py` — maze wall decoration functions

## Deliberation Trail

### [SELF] (synthesized from agent1.1, agent2.2, agent3.1):
- DEC-001: Fixed critical hyperlink bug from agent1, combined agent3's internal links with agent2's external
- DEC-002: Adopted agent1's layout ambition, reimplemented in python-pptx
- DEC-003: Combined agent2's narrative approach with agent1's structural vocabulary
- DEC-004: NEW — Improved button design and positioning for visibility
- DEC-005: Combined visual decoration approaches from agent1 and agent3

## Key Output Changes from Prior
- Working hyperlinks (agent1's were broken)
- Richer layouts than agent2 (more shapes, more variety)
- Better quiz button positioning than agent3 (centered, more prominent)
- Combined narrative + structural maze metaphor
- Dedicated quiz slide with actual questions

## Open Gaps
- Generated maze images would be ideal but adds complexity and generation time
- Speaker notes could enhance usability for presenters
