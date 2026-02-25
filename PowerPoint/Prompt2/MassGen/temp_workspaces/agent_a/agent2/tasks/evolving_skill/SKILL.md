---
name: quantum-pptx-maze
description: Create a 10-slide PPTX about Quantum Computing using a maze metaphor for high schoolers.
---
# Quantum PPTX Maze

## Overview
Generate a 10-slide presentation that explains Quantum Computing to high school students using a continuous maze metaphor.

## Workflow
1. Define the narrative arc:
   - Slide 1: Title & Introduction (The Maze Entry)
   - Slide 2: Classical Bits (The Single-Path Runner)
   - Slide 3: The Problem (The Impossible Maze)
   - Slide 4: Qubits Intro (The Ghostly Runner) + Quiz Button
   - Slide 5: Superposition (Exploring All Paths)
   - Slide 6: Entanglement (Connected Runners)
   - Slide 7: Quantum Gates (Maze Directions)
   - Slide 8: The Quantum Speedup (Finding the Exit) + Quiz Button
   - Slide 9: Real World Apps (Beyond the Maze)
   - Slide 10: Conclusion (The Future of the Maze)
2. Create a Python script using `python-pptx` to generate the file.
3. Ensure no bullet points are used; use text boxes and layout positioning.
4. Implement visually distinct quiz buttons with hyperlinks.
5. Add visual elements (shapes) to reinforce the maze metaphor.
6. Verify the PPTX file structure and content.

## Tools to Create
### scripts/generate_quantum_pptx.py
- **Purpose**: Programmatically create the PPTX file.
- **Inputs**: None.
- **Outputs**: `quantum_computing_maze_v2.pptx`.
- **Dependencies**: `python-pptx`.

## Verification & Improvement
- Open the PPTX (via conversion to PNG) to confirm slide count and layouts.
- Check that no bullet points exist.
- Verify quiz buttons on slides 4 and 8.
- Ensure the metaphor is consistent.

## Learnings

### What Worked Well
- Using `python-pptx` allowed for precise control over layouts and avoiding bullet points.
- The "maze" metaphor was consistently applied through slide titles, text content, and visual "wall" decorations.
- Adding "qubit nodes" using shapes helped bridge the quantum and maze themes visually.
- Using `soffice` to convert slides to PNGs allowed for visual verification using `read_media`.

### What Didn't Work
- Initial layout had some overlap between title and subtitle; this was fixed by adjusting vertical positioning.
- Minimal corner decorations were initially interpreted as generic frames; making them more varied and adding middle-top walls helped the "maze" metaphor.

### Tips for Future Use
- Always verify PPTX layouts visually as text-box positioning can be tricky.
- Consistent color palettes (e.g., Neon Cyan on Dark Blue) work well for tech-themed high school presentations.
