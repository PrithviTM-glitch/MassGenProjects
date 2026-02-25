---
name: pptx-quantum-maze-deck
description: Create a themed 10-slide PPTX lesson using a continuous visual metaphor (maze) with dynamic layouts and internal hyperlink navigation.
---
# PPTX Quantum Maze Deck

## Overview
Build a downloadable PowerPoint deck that teaches a technical topic to students using a continuous metaphor, with strong visual consistency, non-bulleted text, and interactive navigation elements.

## Workflow
1. Define slide-by-slide narrative constraints (what must appear by which slide).
2. Choose a persistent visual metaphor and render a reusable background asset set.
3. Programmatically generate PPTX:
   - 16:9 canvas
   - background images
   - dynamic per-slide text box layouts (no bullets)
   - standout CTA buttons with hyperlinks
4. Validate:
   - slide count
   - no bullet formatting
   - hyperlinks exist and target correct slide
5. Package output under `deliverable/`.

## Tools to Create

### utils/build_quantum_maze_pptx.py
- **Purpose**: Generate `Quantum_Computing_Maze_Metaphor.pptx` with maze metaphor visuals, dynamic layouts, and internal hyperlinks.
- **Inputs**: (optional) output path, random seed.
- **Outputs**:
  - `deliverable/Quantum_Computing_Maze_Metaphor.pptx`
  - `deliverable/assets/maze_slide_01.png` ... `maze_slide_10.png`
- **Dependencies**: python-pptx, pillow

## Tools to Use
- MCP filesystem write/edit tools (to persist scripts and artifacts)
- MCP command_line execute_command (to install deps, run generator, run verification script)

## Packages
- python-pptx
- pillow

## Expected Outputs
- A 10-slide .pptx in `deliverable/` that is directly downloadable.

## Verification & Improvement
- Programmatically open the generated PPTX with python-pptx and assert:
  - exactly 10 slides
  - quiz buttons exist on slides 4 and 8
  - quiz buttons link to slide 10
  - no paragraph has bullet enabled

## Learnings
(To be filled after execution)
