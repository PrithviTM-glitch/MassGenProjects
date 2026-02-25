---
name: quantum-maze-pptx
description: Create a 10-slide educational PPTX about quantum computing using maze metaphor with PptxGenJS
---
# Quantum Maze PPTX Creation

## Overview
Generate a visually rich 10-slide presentation explaining quantum computing to high school students using a maze as a continuous metaphor, with dynamic layouts and no bullet points.

## Workflow
1. Install dependencies: pptxgenjs, react-icons, react, react-dom, sharp
2. Write Node.js script using PptxGenJS to create all 10 slides
3. Execute script to generate .pptx file
4. Convert to PDF then images for visual QA
5. Inspect each slide with read_media for issues
6. Fix any visual problems and re-verify
7. Copy final file to deliverable/

## Tools to Create

### scripts/create_presentation.js
- **Purpose**: Generate the complete 10-slide quantum computing PPTX
- **Inputs**: None (self-contained)
- **Outputs**: deliverable/Quantum_Computing_Maze.pptx
- **Dependencies**: pptxgenjs, react-icons, react, react-dom, sharp

## Tools to Use
- soffice (LibreOffice) for PDF conversion
- pdftoppm for image extraction
- read_media for visual inspection
- markitdown for text content verification

## Packages
- pptxgenjs (npm install pptxgenjs)
- react-icons, react, react-dom, sharp (for icons)

## Expected Outputs
- deliverable/Quantum_Computing_Maze.pptx

## Verification & Improvement
- Convert to images and inspect each slide
- Check for text overflow, overlapping elements, proper contrast
- Verify quiz buttons are visible and hyperlinked
- Verify no bullet points exist
- Verify maze metaphor is consistent across all slides

## Learnings
(To be filled after execution)
