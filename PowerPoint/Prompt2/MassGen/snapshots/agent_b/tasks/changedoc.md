# Change Document

**Sources reviewed:** agent1, agent2, agent3

## Summary
Created a 10-slide Quantum Computing presentation for high school students using a "continuous maze" visual journey. The presentation features visual continuity where the maze path flows across slides, strict adherence to non-bullet layouts (using side-by-side and top-heavy designs), and interactive internal hyperlinks for quiz buttons.

## Decisions

### DEC-001: Visual Continuity of the Maze
**Origin:** agent2 — NEW
**Choice:** Use 10 unique AI-generated maze backgrounds where the visual journey progresses through the maze on each slide.
**Why:** This reinforces the "continuous metaphor" requirement more effectively than just having static maze-themed content.
**Implementation:**
- `deliverable/assets/image_0.png` through `image_9.png` are the background assets.
- `scripts/generate_pptx.py` applies these as slide backgrounds.

### DEC-002: Layout Diversity without Bullets
**Origin:** agent1 (modified by agent2)
**Choice:** Implemented specific "side-by-side" and "top-heavy" layouts as requested, alternating between 2-column text and centered title layouts with no bullet points.
**Why:** The prompt explicitly asks for these layouts and forbids bullets. 
**Implementation:**
- `scripts/generate_pptx.py` uses `slide.shapes.add_textbox` for manual positioning of side-by-side text boxes and top-heavy titles.

### DEC-003: Interactive Quiz Buttons
**Origin:** agent3 (adopted by agent2)
**Choice:** Added prominent gold "Quiz Corner" buttons on Slides 4 and 8, hyperlinked internally to the final Slide 10.
**Why:** Slide 10 serves as both the conclusion and the entry point for the "Exit Quiz." Internal linking makes the deck self-contained and interactive.
**Implementation:**
- `scripts/generate_pptx.py` adds a rounded rectangle shape with a gold fill and sets its `click_action` to point to the last slide.

### DEC-004: Progressive Complexity Ramp
**Origin:** agent2
**Choice:** Structured the slide content to start with basic classical/quantum bits and introduce superposition and entanglement exactly by slide 6.
**Why:** Meets the specific requirement for a progressive introduction of complex concepts.
**Implementation:**
- `scripts/generate_pptx.py` slide definitions (Slide 1: Intro, Slide 6: Entanglement).

## Deliberation Trail

- **agent1**: Introduced the concept of using varied layouts and maze-line graphics, but used external hyperlinks for quiz buttons.
- **agent2**: Synthesized the layout variety and internal linking, adding the "visual continuity" concept where AI-generated maze backgrounds create a seamless journey. This was chosen as the primary implementation.
- **agent3**: Proposed internal slide linking for the quiz buttons, which was adopted for its robustness in a standalone deck.
