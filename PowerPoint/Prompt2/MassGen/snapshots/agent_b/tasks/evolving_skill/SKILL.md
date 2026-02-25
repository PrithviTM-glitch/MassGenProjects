# Quantum Maze PPTX Generation

## Overview
This workflow generates a themed 10-slide educational PowerPoint presentation using a continuous visual metaphor (a maze), dynamic layouts (no bullets), and interactive navigation elements. It is designed to be visually engaging for high school students.

## Workflow
1. **Define Narrative Structure**: Outline 10 slides that progressively increase in complexity (e.g., Classical Bits -> Qubits -> Superposition -> Entanglement).
2. **Develop Visual Metaphor**: Create or generate a set of consistent background assets that depict a journey through a maze.
3. **Programmatic Generation**:
   - Use `python-pptx` to define a 16:9 canvas.
   - Apply unique background images to each slide.
   - Implement dynamic text layouts: use side-by-side text boxes and top-heavy title layouts to avoid bullet points.
   - Add standout "Quiz" buttons on specific slides (4 and 8) with internal hyperlinks to a target slide (e.g., Slide 10).
4. **Validation**: Verify slide count, layout compliance (no bullets), and hyperlink functionality.

## Tools to Create
### scripts/generate_pptx.py
- **Purpose**: Main generation script that builds the 10-slide deck with all requirements.
- **Inputs**: Assets in `deliverable/assets/`.
- **Outputs**: `deliverable/Quantum_Maze_Final.pptx`.
- **Dependencies**: `python-pptx`.

### scripts/verify_pptx.py
- **Purpose**: Automated verification of slide count and presence of hyperlinks.
- **Inputs**: Path to the .pptx file.
- **Outputs**: Success/failure report.

## Tools to Use
- `python-pptx`: For programmatic PPTX creation.
- `PIL (Pillow)`: For asset generation/manipulation if needed.

## Packages
- `python-pptx`

## Expected Outputs
- `deliverable/Quantum_Maze_Final.pptx`: A 10-slide, bullet-free, interactive presentation.
- `deliverable/assets/`: 10 unique maze background images.

## Learnings
- **Visual Continuity**: Using AI-generated backgrounds with a consistent style significantly improves the "continuous metaphor" feel.
- **Bullet-Free Layouts**: Side-by-side text boxes are an effective alternative to bullets for presenting comparative or related points.
- **Interactive Elements**: Internal hyperlinks in `python-pptx` require setting the `click_action` on a shape's `action` attribute.
