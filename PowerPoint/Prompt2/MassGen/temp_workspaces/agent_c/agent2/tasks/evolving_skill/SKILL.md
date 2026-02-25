---
name: quantum-maze-pptx
description: Creating a themed PPTX with dynamic layouts and no bullet points
---
# Quantum Maze PPTX Generation

## Overview
Generate a 10-slide presentation using a continuous maze metaphor to explain quantum computing.

## Workflow
1.  **Define Narrative**: Map quantum concepts to maze metaphors (Entrance, Corridor, Fork, Misty Path, Mirror Rooms, etc.).
2.  **Generate Assets**: Use `generate_media` to create 10 distinct but stylistically consistent maze background images that show a progression through the maze.
3.  **Implement Layouts**: Write a Python script using `python-pptx` to create slides with side-by-side text boxes and top-heavy layouts.
4.  **Add Interactivity**: Insert standing-out gold buttons on slides 4 and 8 with hyperlinks to slide 10.
5.  **Verify**: Render slides to images, check with `read_media` for layout quality and constraint compliance (no bullets).

## Tools to Create

### scripts/generate_pptx.py
- **Purpose**: Programmatically build the PPTX.
- **Inputs**: Text content, image paths.
- **Outputs**: `Quantum_Maze_Final.pptx`.
- **Dependencies**: `python-pptx`.

## Verification & Improvement
- Run script -> Render slides -> Analyze with `read_media`.
- Check for text readability over background.
- Check that Quiz buttons are prominent.
- Ensure zero bullet points.
