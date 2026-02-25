const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.author = "Quantum Computing Education";
pres.title = "Navigating the Quantum Maze";

// ========== COLOR PALETTE ==========
const C = {
  darkBg: "0D1B2A",
  medBg: "1B2838",
  teal: "0D9488",
  mint: "2DD4BF",
  electric: "38BDF8",
  gold: "FBBF24",
  white: "FFFFFF",
  offWhite: "E2E8F0",
  lightGray: "94A3B8",
  brighterGray: "CBD5E1",  // brighter for subtitles
  dimGray: "475569",
  mazeWall: "1E3A5F",
  mazePath: "0F766E",
  quizRed: "EF4444",
  quizOrange: "F97316",
};

// ========== HELPERS ==========
const makeShadow = () => ({
  type: "outer", color: "000000", blur: 8, offset: 3, angle: 135, opacity: 0.25,
});

function addMazeDecor(slide, variant) {
  const wallColor = C.mazeWall;
  const pathColor = C.mazePath;
  
  if (variant === "corners") {
    slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.6, h: 0.08, fill: { color: wallColor } });
    slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.08, h: 0.6, fill: { color: wallColor } });
    slide.addShape(pres.shapes.RECTANGLE, { x: 0.25, y: 0.25, w: 0.35, h: 0.06, fill: { color: pathColor } });
    slide.addShape(pres.shapes.RECTANGLE, { x: 0.25, y: 0.25, w: 0.06, h: 0.35, fill: { color: pathColor } });
    slide.addShape(pres.shapes.RECTANGLE, { x: 9.4, y: 5.545, w: 0.6, h: 0.08, fill: { color: wallColor } });
    slide.addShape(pres.shapes.RECTANGLE, { x: 9.92, y: 5.025, w: 0.08, h: 0.6, fill: { color: wallColor } });
    slide.addShape(pres.shapes.RECTANGLE, { x: 9.4, y: 5.32, w: 0.35, h: 0.06, fill: { color: pathColor } });
    slide.addShape(pres.shapes.RECTANGLE, { x: 9.69, y: 5.025, w: 0.06, h: 0.35, fill: { color: pathColor } });
  } else if (variant === "left") {
    for (let i = 0; i < 6; i++) {
      const y = 0.3 + i * 0.9;
      const w = 0.04 + (i % 3) * 0.02;
      slide.addShape(pres.shapes.RECTANGLE, { x: 0, y, w: 0.12, h: w, fill: { color: wallColor } });
      slide.addShape(pres.shapes.RECTANGLE, { x: 0.12, y: y + 0.04, w: 0.15, h: 0.03, fill: { color: pathColor } });
    }
  } else if (variant === "right") {
    for (let i = 0; i < 6; i++) {
      const y = 0.2 + i * 0.85;
      slide.addShape(pres.shapes.RECTANGLE, { x: 9.88, y, w: 0.12, h: 0.06, fill: { color: wallColor } });
      slide.addShape(pres.shapes.RECTANGLE, { x: 9.73, y: y + 0.02, w: 0.15, h: 0.03, fill: { color: pathColor } });
    }
  } else if (variant === "bottom") {
    for (let i = 0; i < 8; i++) {
      const x = 0.5 + i * 1.15;
      slide.addShape(pres.shapes.RECTANGLE, { x, y: 5.45, w: 0.06, h: 0.18, fill: { color: wallColor } });
      slide.addShape(pres.shapes.RECTANGLE, { x: x + 0.02, y: 5.35, w: 0.03, h: 0.12, fill: { color: pathColor } });
    }
  } else if (variant === "border") {
    // Subtle border decor — NO elements crossing the center
    // Top bar
    slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: wallColor } });
    // Bottom bar
    slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.565, w: 10, h: 0.06, fill: { color: wallColor } });
    // Left column dots
    slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.06, h: 0.4, fill: { color: wallColor } });
    slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0.8, w: 0.06, h: 0.3, fill: { color: pathColor } });
    slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.0, w: 0.06, h: 0.6, fill: { color: wallColor } });
    // Right column dots
    slide.addShape(pres.shapes.RECTANGLE, { x: 9.94, y: 0, w: 0.06, h: 0.4, fill: { color: wallColor } });
    slide.addShape(pres.shapes.RECTANGLE, { x: 9.94, y: 0.8, w: 0.06, h: 0.3, fill: { color: pathColor } });
    slide.addShape(pres.shapes.RECTANGLE, { x: 9.94, y: 5.0, w: 0.06, h: 0.6, fill: { color: wallColor } });
  }
}

function addSlideNumber(slide, num) {
  slide.addText(`${num} / 10`, {
    x: 8.8, y: 5.2, w: 1, h: 0.35,
    fontSize: 9, color: C.dimGray, fontFace: "Consolas",
    align: "right", valign: "bottom",
  });
}

function addQuizButton(slide, linkUrl) {
  // Outer glow
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 7.25, y: 4.1, w: 2.55, h: 0.85,
    fill: { color: C.gold, transparency: 40 },
    rectRadius: 0.15,
  });
  // Main button
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 7.35, y: 4.18, w: 2.35, h: 0.7,
    fill: { color: C.gold },
    rectRadius: 0.12,
    shadow: makeShadow(),
  });
  // Button text with hyperlink — wider to avoid cut-off
  slide.addText([
    { text: "\uD83E\uDDE9 TAKE THE QUIZ", options: { bold: true, fontSize: 13, color: C.darkBg, fontFace: "Arial Black" } }
  ], {
    x: 7.35, y: 4.18, w: 2.35, h: 0.7,
    align: "center", valign: "middle", margin: 0,
    hyperlink: { url: linkUrl, tooltip: "Test your quantum knowledge!" },
  });
}

// ========== SLIDE 1: TITLE — Welcome to the Quantum Maze ==========
// FIX: Moved maze visuals to edges only, improved subtitle contrast
{
  const slide = pres.addSlide();
  slide.background = { color: C.darkBg };

  // Central box — clean area for text
  slide.addShape(pres.shapes.RECTANGLE, { x: 1.5, y: 0.5, w: 7, h: 4.2, fill: { color: C.medBg }, shadow: makeShadow() });
  
  // Maze walls ONLY on the box border (not overlapping center text)
  // Top wall
  slide.addShape(pres.shapes.RECTANGLE, { x: 1.5, y: 0.5, w: 7, h: 0.06, fill: { color: C.mazeWall } });
  // Bottom wall with gap (exit)
  slide.addShape(pres.shapes.RECTANGLE, { x: 1.5, y: 4.64, w: 2.8, h: 0.06, fill: { color: C.mazeWall } });
  slide.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 4.64, w: 3.3, h: 0.06, fill: { color: C.mazeWall } });
  // Left wall
  slide.addShape(pres.shapes.RECTANGLE, { x: 1.5, y: 0.5, w: 0.06, h: 4.2, fill: { color: C.mazeWall } });
  // Right wall with gap (entrance)
  slide.addShape(pres.shapes.RECTANGLE, { x: 8.44, y: 0.5, w: 0.06, h: 1.5, fill: { color: C.mazeWall } });
  slide.addShape(pres.shapes.RECTANGLE, { x: 8.44, y: 2.8, w: 0.06, h: 1.9, fill: { color: C.mazeWall } });
  
  // Internal maze walls — carefully positioned NOT to overlap text area
  // Left side internal
  slide.addShape(pres.shapes.RECTANGLE, { x: 1.8, y: 0.9, w: 0.06, h: 1.0, fill: { color: C.teal, transparency: 50 } });
  slide.addShape(pres.shapes.RECTANGLE, { x: 1.8, y: 0.9, w: 0.6, h: 0.06, fill: { color: C.teal, transparency: 50 } });
  // Right side internal
  slide.addShape(pres.shapes.RECTANGLE, { x: 8.0, y: 3.2, w: 0.06, h: 1.0, fill: { color: C.teal, transparency: 50 } });
  slide.addShape(pres.shapes.RECTANGLE, { x: 7.5, y: 3.2, w: 0.56, h: 0.06, fill: { color: C.teal, transparency: 50 } });
  // Bottom left
  slide.addShape(pres.shapes.RECTANGLE, { x: 2.0, y: 3.8, w: 1.0, h: 0.06, fill: { color: C.teal, transparency: 50 } });
  slide.addShape(pres.shapes.RECTANGLE, { x: 2.0, y: 3.8, w: 0.06, h: 0.5, fill: { color: C.teal, transparency: 50 } });
  // Top right
  slide.addShape(pres.shapes.RECTANGLE, { x: 7.2, y: 0.8, w: 0.06, h: 0.8, fill: { color: C.teal, transparency: 50 } });
  slide.addShape(pres.shapes.RECTANGLE, { x: 7.2, y: 0.8, w: 0.8, h: 0.06, fill: { color: C.teal, transparency: 50 } });

  // Glowing entrance dot
  slide.addShape(pres.shapes.OVAL, { x: 8.3, y: 1.95, w: 0.3, h: 0.3, fill: { color: C.mint, transparency: 30 } });
  slide.addShape(pres.shapes.OVAL, { x: 8.37, y: 2.02, w: 0.16, h: 0.16, fill: { color: C.mint } });

  // Title text — centered in the box, well clear of maze lines
  slide.addText("Navigating the", {
    x: 2.5, y: 1.1, w: 5, h: 0.6,
    fontSize: 20, color: C.brighterGray, fontFace: "Trebuchet MS",
    align: "center", valign: "middle", margin: 0,
  });
  slide.addText("QUANTUM MAZE", {
    x: 2.5, y: 1.65, w: 5, h: 1.2,
    fontSize: 44, color: C.mint, fontFace: "Arial Black",
    align: "center", valign: "middle", bold: true, margin: 0,
  });
  slide.addText("A High School Guide to the\nStrangest Computer Science", {
    x: 2.5, y: 2.9, w: 5, h: 0.8,
    fontSize: 15, color: C.offWhite, fontFace: "Calibri",
    align: "center", valign: "middle", italic: true, margin: 0,
  });

  // Bottom CTA
  slide.addText("Every slide is a new corridor. Let's explore →", {
    x: 1, y: 4.85, w: 8, h: 0.5,
    fontSize: 12, color: C.dimGray, fontFace: "Consolas",
    align: "center", valign: "middle",
  });
  addSlideNumber(slide, 1);
}

// ========== SLIDE 2: What is a Computer? (Classical) ==========
{
  const slide = pres.addSlide();
  slide.background = { color: C.darkBg };
  addMazeDecor(slide, "corners");

  // Top-heavy title
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 1.6, fill: { color: C.medBg } });
  slide.addText("THE FIRST CORRIDOR: CLASSICAL COMPUTERS", {
    x: 0.5, y: 0.15, w: 9, h: 0.7,
    fontSize: 26, color: C.mint, fontFace: "Arial Black", bold: true, margin: 0,
  });
  slide.addText("Before entering the quantum maze, we need to understand the straight hallways we already know.", {
    x: 0.5, y: 0.85, w: 9, h: 0.55,
    fontSize: 13, color: C.offWhite, fontFace: "Calibri", italic: true, margin: 0,
  });

  // Two-column layout
  // LEFT card
  slide.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.9, w: 4.2, h: 3.1, fill: { color: C.medBg }, shadow: makeShadow() });
  slide.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.9, w: 4.2, h: 0.06, fill: { color: C.teal } });
  slide.addText("THE CLASSICAL BIT", {
    x: 0.7, y: 2.05, w: 3.8, h: 0.5,
    fontSize: 16, color: C.electric, fontFace: "Trebuchet MS", bold: true, margin: 0,
  });
  slide.addText("A classical computer thinks in bits — tiny switches that are either ON (1) or OFF (0). Every app, game, and website you use runs on billions of these simple yes-or-no decisions happening incredibly fast.", {
    x: 0.7, y: 2.55, w: 3.8, h: 2.2,
    fontSize: 13, color: C.offWhite, fontFace: "Calibri", align: "left", valign: "top", margin: 0,
  });

  // RIGHT card
  slide.addShape(pres.shapes.RECTANGLE, { x: 5.3, y: 1.9, w: 4.2, h: 3.1, fill: { color: C.medBg }, shadow: makeShadow() });
  slide.addShape(pres.shapes.RECTANGLE, { x: 5.3, y: 1.9, w: 4.2, h: 0.06, fill: { color: C.gold } });
  slide.addText("THE MAZE ANALOGY", {
    x: 5.5, y: 2.05, w: 3.8, h: 0.5,
    fontSize: 16, color: C.gold, fontFace: "Trebuchet MS", bold: true, margin: 0,
  });
  slide.addText("Imagine a maze where you can only walk one path at a time. You reach a fork: go left or right — pick one. A classical computer solves mazes this way, trying each route one by one until it finds the exit.", {
    x: 5.5, y: 2.55, w: 3.8, h: 2.2,
    fontSize: 13, color: C.offWhite, fontFace: "Calibri", align: "left", valign: "top", margin: 0,
  });

  addSlideNumber(slide, 2);
}

// ========== SLIDE 3: What Makes Quantum Different? ==========
{
  const slide = pres.addSlide();
  slide.background = { color: C.darkBg };
  addMazeDecor(slide, "left");

  slide.addText("WHAT MAKES QUANTUM DIFFERENT?", {
    x: 0.5, y: 0.3, w: 9, h: 0.7,
    fontSize: 30, color: C.mint, fontFace: "Arial Black", bold: true, margin: 0,
  });
  slide.addText("The maze just got a whole lot stranger.", {
    x: 0.5, y: 1.0, w: 9, h: 0.4,
    fontSize: 14, color: C.brighterGray, fontFace: "Calibri", italic: true, margin: 0,
  });

  const cards = [
    { title: "QUBITS", subtitle: "The Quantum Walker", desc: "Unlike a classical bit (0 or 1), a qubit can exist in a blend of both states simultaneously — like a maze-walker who hasn't decided which fork to take yet.", color: C.teal },
    { title: "QUANTUM GATES", subtitle: "The Maze Architect", desc: "Quantum gates are operations that reshape the maze itself — rotating, flipping, and combining paths in ways that classical logic gates cannot. They redesign reality.", color: C.electric },
    { title: "MEASUREMENT", subtitle: "The Collapse", desc: "When you observe a qubit, it 'chooses' a path. Like shining a flashlight in the maze — the walker is found in one corridor, and all other ghostly paths vanish instantly.", color: C.gold },
  ];

  cards.forEach((card, i) => {
    const x = 0.5 + i * 3.15;
    slide.addShape(pres.shapes.RECTANGLE, { x, y: 1.65, w: 2.85, h: 3.5, fill: { color: C.medBg }, shadow: makeShadow() });
    slide.addShape(pres.shapes.RECTANGLE, { x, y: 1.65, w: 2.85, h: 0.06, fill: { color: card.color } });
    slide.addText(card.title, {
      x: x + 0.15, y: 1.8, w: 2.55, h: 0.45,
      fontSize: 18, color: card.color, fontFace: "Arial Black", bold: true, margin: 0,
    });
    slide.addText(card.subtitle, {
      x: x + 0.15, y: 2.25, w: 2.55, h: 0.35,
      fontSize: 11, color: C.brighterGray, fontFace: "Calibri", italic: true, margin: 0,
    });
    slide.addText(card.desc, {
      x: x + 0.15, y: 2.7, w: 2.55, h: 2.3,
      fontSize: 12, color: C.offWhite, fontFace: "Calibri", align: "left", valign: "top", margin: 0,
    });
  });

  addSlideNumber(slide, 3);
}

// ========== SLIDE 4: Superposition + QUIZ ==========
{
  const slide = pres.addSlide();
  slide.background = { color: C.darkBg };
  addMazeDecor(slide, "right");

  // Large left panel
  slide.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 0.3, w: 6.5, h: 4.5, fill: { color: C.medBg }, shadow: makeShadow() });
  slide.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 0.3, w: 0.08, h: 4.5, fill: { color: C.mint } });

  slide.addText("SUPERPOSITION", {
    x: 0.7, y: 0.45, w: 6, h: 0.7,
    fontSize: 32, color: C.mint, fontFace: "Arial Black", bold: true, margin: 0,
  });
  slide.addText("The Walker Who Takes Every Path at Once", {
    x: 0.7, y: 1.1, w: 6, h: 0.4,
    fontSize: 14, color: C.brighterGray, fontFace: "Calibri", italic: true, margin: 0,
  });

  slide.addText("In a classical maze, you pick one corridor and hope for the best. But a quantum walker in superposition doesn't choose — it explores EVERY possible path simultaneously.\n\nPicture yourself as a ghost who splits into copies at every fork, flowing through the entire maze at once. Each copy carries a probability of being the 'real' you.\n\nWhen someone finally looks (measures), all copies collapse into a single location. This is the secret power of quantum computing: instead of checking one answer at a time, a quantum computer checks many in parallel.", {
    x: 0.7, y: 1.6, w: 5.9, h: 3.0,
    fontSize: 12.5, color: C.offWhite, fontFace: "Calibri", align: "left", valign: "top", margin: 0,
    lineSpacingMultiple: 1.15,
  });

  // Right column — maze fork visual
  slide.addShape(pres.shapes.RECTANGLE, { x: 7.3, y: 0.3, w: 2.3, h: 3.5, fill: { color: C.medBg }, shadow: makeShadow() });
  slide.addText("MAZE FORK", {
    x: 7.4, y: 0.4, w: 2.1, h: 0.4,
    fontSize: 11, color: C.teal, fontFace: "Consolas", bold: true, align: "center", margin: 0,
  });
  // Fork diagram
  slide.addShape(pres.shapes.RECTANGLE, { x: 8.35, y: 0.9, w: 0.06, h: 0.7, fill: { color: C.mint } });
  slide.addShape(pres.shapes.RECTANGLE, { x: 7.7, y: 1.55, w: 1.36, h: 0.06, fill: { color: C.mint } });
  slide.addShape(pres.shapes.RECTANGLE, { x: 7.7, y: 1.55, w: 0.06, h: 0.8, fill: { color: C.electric } });
  slide.addShape(pres.shapes.RECTANGLE, { x: 9.0, y: 1.55, w: 0.06, h: 0.8, fill: { color: C.electric } });
  // Labels with better contrast
  slide.addText("Classical:\nPick ONE", {
    x: 7.35, y: 2.45, w: 1.05, h: 0.6,
    fontSize: 10, color: C.offWhite, fontFace: "Consolas", align: "center", margin: 0,
  });
  slide.addText("Quantum:\nTake BOTH", {
    x: 8.6, y: 2.45, w: 1.05, h: 0.6,
    fontSize: 10, color: C.mint, fontFace: "Consolas", align: "center", bold: true, margin: 0,
  });
  // Small visual: ghost copies
  slide.addShape(pres.shapes.OVAL, { x: 7.82, y: 3.15, w: 0.18, h: 0.18, fill: { color: C.electric, transparency: 50 } });
  slide.addShape(pres.shapes.OVAL, { x: 9.06, y: 3.15, w: 0.18, h: 0.18, fill: { color: C.mint, transparency: 30 } });
  slide.addShape(pres.shapes.OVAL, { x: 9.12, y: 3.15, w: 0.18, h: 0.18, fill: { color: C.mint, transparency: 60 } });

  // QUIZ button
  addQuizButton(slide, "https://docs.google.com/forms/d/e/quantum-maze-quiz-1/viewform");

  addSlideNumber(slide, 4);
}

// ========== SLIDE 5: Interference ==========
{
  const slide = pres.addSlide();
  slide.background = { color: C.darkBg };
  addMazeDecor(slide, "corners");

  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 1.3, fill: { color: C.medBg } });
  slide.addText("INTERFERENCE: WHERE PATHS COLLIDE", {
    x: 0.5, y: 0.15, w: 9, h: 0.65,
    fontSize: 28, color: C.electric, fontFace: "Arial Black", bold: true, margin: 0,
  });
  slide.addText("The maze helps you by erasing wrong answers", {
    x: 0.5, y: 0.8, w: 9, h: 0.35,
    fontSize: 13, color: C.brighterGray, fontFace: "Calibri", italic: true, margin: 0,
  });

  // LEFT text
  slide.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.6, w: 4.5, h: 3.5, fill: { color: C.medBg }, shadow: makeShadow() });
  slide.addText("Think of ripples in water. When two waves meet, they can amplify each other (constructive interference) or cancel each other out (destructive interference).\n\nIn the quantum maze, your ghost-copies carry wave-like amplitudes. Correct paths reinforce each other, growing stronger. Wrong paths interfere destructively, fading to nothing.\n\nQuantum algorithms are carefully designed so the right answer's paths add up while wrong answers cancel themselves out — like a maze that actively erases its own dead ends.", {
    x: 0.7, y: 1.75, w: 4.1, h: 3.2,
    fontSize: 12, color: C.offWhite, fontFace: "Calibri", align: "left", valign: "top", margin: 0,
    lineSpacingMultiple: 1.15,
  });

  // RIGHT visual
  slide.addShape(pres.shapes.RECTANGLE, { x: 5.3, y: 1.6, w: 4.2, h: 3.5, fill: { color: C.medBg }, shadow: makeShadow() });
  slide.addText("CONSTRUCTIVE", {
    x: 5.5, y: 1.75, w: 3.8, h: 0.35,
    fontSize: 13, color: C.mint, fontFace: "Consolas", bold: true, align: "center", margin: 0,
  });
  slide.addShape(pres.shapes.RECTANGLE, { x: 5.8, y: 2.2, w: 1.5, h: 0.08, fill: { color: C.mint } });
  slide.addShape(pres.shapes.RECTANGLE, { x: 5.8, y: 2.5, w: 1.5, h: 0.08, fill: { color: C.mint } });
  slide.addShape(pres.shapes.RECTANGLE, { x: 7.3, y: 2.15, w: 1.5, h: 0.2, fill: { color: C.mint } });
  slide.addText("→  STRONGER PATH", {
    x: 7.3, y: 2.4, w: 2, h: 0.3,
    fontSize: 10, color: C.mint, fontFace: "Consolas", margin: 0,
  });

  slide.addText("DESTRUCTIVE", {
    x: 5.5, y: 3.0, w: 3.8, h: 0.35,
    fontSize: 13, color: C.quizRed, fontFace: "Consolas", bold: true, align: "center", margin: 0,
  });
  slide.addShape(pres.shapes.RECTANGLE, { x: 5.8, y: 3.5, w: 1.5, h: 0.08, fill: { color: C.quizRed } });
  slide.addShape(pres.shapes.RECTANGLE, { x: 5.8, y: 3.8, w: 1.5, h: 0.08, fill: { color: C.quizRed } });
  slide.addText("→  PATH VANISHES ✗", {
    x: 7.3, y: 3.55, w: 2, h: 0.3,
    fontSize: 10, color: C.quizRed, fontFace: "Consolas", margin: 0,
  });

  slide.addText("The quantum maze deletes its own dead ends.", {
    x: 5.5, y: 4.4, w: 3.8, h: 0.5,
    fontSize: 11, color: C.gold, fontFace: "Calibri", italic: true, align: "center", margin: 0,
  });

  addSlideNumber(slide, 5);
}

// ========== SLIDE 6: Entanglement — IMPROVED ==========
// FIX: Shortened body text, brighter subtitle, clearer link section
{
  const slide = pres.addSlide();
  slide.background = { color: C.darkBg };
  addMazeDecor(slide, "border");

  slide.addText("ENTANGLEMENT", {
    x: 0.5, y: 0.25, w: 9, h: 0.9,
    fontSize: 40, color: C.gold, fontFace: "Arial Black", bold: true, margin: 0,
  });
  slide.addText("Two corridors, one destiny", {
    x: 0.5, y: 1.1, w: 9, h: 0.35,
    fontSize: 15, color: C.offWhite, fontFace: "Calibri", italic: true, margin: 0,
  });

  // Concept row — shorter, punchier text
  slide.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.65, w: 9, h: 1.35, fill: { color: C.medBg }, shadow: makeShadow() });
  slide.addText("Two qubits become entangled when their fates are linked — measuring one INSTANTLY reveals the state of the other, no matter how far apart they are. Einstein called it \"spooky action at a distance.\" In maze terms: two walkers in separate corridors are mysteriously synchronized.", {
    x: 0.7, y: 1.75, w: 8.6, h: 1.15,
    fontSize: 13.5, color: C.offWhite, fontFace: "Calibri", align: "left", valign: "middle", margin: 0,
    lineSpacingMultiple: 1.2,
  });

  // Two qubit cards with CLEAR link
  // Left - Qubit A
  slide.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 3.3, w: 3.8, h: 1.9, fill: { color: C.medBg }, shadow: makeShadow() });
  slide.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 3.3, w: 3.8, h: 0.06, fill: { color: C.electric } });
  slide.addText("QUBIT A", {
    x: 0.7, y: 3.42, w: 3.4, h: 0.4,
    fontSize: 16, color: C.electric, fontFace: "Arial Black", bold: true, align: "center", margin: 0,
  });
  slide.addText("The walker enters the LEFT corridor.\nBefore measurement: could be at any junction.\nState is uncertain — 0, 1, or both at once.", {
    x: 0.7, y: 3.85, w: 3.4, h: 1.2,
    fontSize: 12, color: C.offWhite, fontFace: "Calibri", margin: 0,
    lineSpacingMultiple: 1.15,
  });

  // Center link — more prominent
  slide.addShape(pres.shapes.RECTANGLE, { x: 4.5, y: 4.05, w: 1, h: 0.1, fill: { color: C.gold } });
  slide.addShape(pres.shapes.OVAL, { x: 4.8, y: 3.85, w: 0.4, h: 0.4, fill: { color: C.gold } });
  slide.addText("⚡", {
    x: 4.8, y: 3.85, w: 0.4, h: 0.4,
    fontSize: 14, align: "center", valign: "middle", margin: 0,
  });
  slide.addText("LINKED", {
    x: 4.45, y: 4.25, w: 1.1, h: 0.3,
    fontSize: 11, color: C.gold, fontFace: "Consolas", bold: true, align: "center", margin: 0,
  });

  // Right - Qubit B
  slide.addShape(pres.shapes.RECTANGLE, { x: 5.7, y: 3.3, w: 3.8, h: 1.9, fill: { color: C.medBg }, shadow: makeShadow() });
  slide.addShape(pres.shapes.RECTANGLE, { x: 5.7, y: 3.3, w: 3.8, h: 0.06, fill: { color: C.electric } });
  slide.addText("QUBIT B", {
    x: 5.9, y: 3.42, w: 3.4, h: 0.4,
    fontSize: 16, color: C.electric, fontFace: "Arial Black", bold: true, align: "center", margin: 0,
  });
  slide.addText("The walker enters the RIGHT corridor.\nThe moment Qubit A is found, Qubit B is\nINSTANTLY found at its linked position.", {
    x: 5.9, y: 3.85, w: 3.4, h: 1.2,
    fontSize: 12, color: C.offWhite, fontFace: "Calibri", margin: 0,
    lineSpacingMultiple: 1.15,
  });

  addSlideNumber(slide, 6);
}

// ========== SLIDE 7: Quantum Algorithms ==========
{
  const slide = pres.addSlide();
  slide.background = { color: C.darkBg };
  addMazeDecor(slide, "bottom");

  slide.addText("QUANTUM ALGORITHMS", {
    x: 0.5, y: 0.3, w: 9, h: 0.7,
    fontSize: 30, color: C.mint, fontFace: "Arial Black", bold: true, margin: 0,
  });
  slide.addText("Smart strategies for navigating the maze at quantum speed", {
    x: 0.5, y: 0.95, w: 9, h: 0.35,
    fontSize: 13, color: C.brighterGray, fontFace: "Calibri", italic: true, margin: 0,
  });

  // Grover's
  slide.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.55, w: 4.3, h: 3.5, fill: { color: C.medBg }, shadow: makeShadow() });
  slide.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.55, w: 4.3, h: 0.06, fill: { color: C.mint } });
  slide.addText("GROVER'S ALGORITHM", {
    x: 0.7, y: 1.7, w: 3.9, h: 0.45,
    fontSize: 16, color: C.mint, fontFace: "Trebuchet MS", bold: true, margin: 0,
  });
  slide.addText("Finding a needle in a haystack", {
    x: 0.7, y: 2.1, w: 3.9, h: 0.3,
    fontSize: 11, color: C.brighterGray, fontFace: "Calibri", italic: true, margin: 0,
  });
  slide.addText("Imagine the maze has one million rooms and the exit is hidden in just one. A classical computer checks rooms one by one — up to a million tries.\n\nGrover's algorithm sends quantum walkers through ALL rooms at once, using interference to amplify the correct room's signal. It finds the exit in roughly 1,000 steps instead of 1,000,000.", {
    x: 0.7, y: 2.5, w: 3.9, h: 2.3,
    fontSize: 12, color: C.offWhite, fontFace: "Calibri", align: "left", valign: "top", margin: 0,
    lineSpacingMultiple: 1.15,
  });

  // Shor's
  slide.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 1.55, w: 4.3, h: 3.5, fill: { color: C.medBg }, shadow: makeShadow() });
  slide.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 1.55, w: 4.3, h: 0.06, fill: { color: C.electric } });
  slide.addText("SHOR'S ALGORITHM", {
    x: 5.4, y: 1.7, w: 3.9, h: 0.45,
    fontSize: 16, color: C.electric, fontFace: "Trebuchet MS", bold: true, margin: 0,
  });
  slide.addText("Cracking codes by reshaping the maze", {
    x: 5.4, y: 2.1, w: 3.9, h: 0.3,
    fontSize: 11, color: C.brighterGray, fontFace: "Calibri", italic: true, margin: 0,
  });
  slide.addText("Modern encryption relies on the fact that factoring huge numbers is astronomically slow for classical computers.\n\nShor's algorithm transforms this problem into a maze with hidden periodic patterns, then uses quantum interference to reveal those patterns exponentially faster. This could one day break most internet encryption.", {
    x: 5.4, y: 2.5, w: 3.9, h: 2.3,
    fontSize: 12, color: C.offWhite, fontFace: "Calibri", align: "left", valign: "top", margin: 0,
    lineSpacingMultiple: 1.15,
  });

  addSlideNumber(slide, 7);
}

// ========== SLIDE 8: Real-World Quantum Computers + QUIZ ==========
{
  const slide = pres.addSlide();
  slide.background = { color: C.darkBg };
  addMazeDecor(slide, "corners");

  slide.addText("REAL-WORLD QUANTUM COMPUTERS", {
    x: 0.5, y: 0.3, w: 9, h: 0.65,
    fontSize: 28, color: C.gold, fontFace: "Arial Black", bold: true, margin: 0,
  });
  slide.addText("The maze is being built right now — here's who's constructing it", {
    x: 0.5, y: 0.9, w: 9, h: 0.35,
    fontSize: 13, color: C.brighterGray, fontFace: "Calibri", italic: true, margin: 0,
  });

  const companies = [
    { name: "IBM", detail: "Eagle processor with 127+ qubits. Uses superconducting circuits cooled near absolute zero — like building a maze inside a freezer colder than outer space.", color: C.electric, x: 0.5, y: 1.5 },
    { name: "GOOGLE", detail: "Achieved 'quantum supremacy' in 2019 — Sycamore solved a problem in 200 seconds that would take a supercomputer 10,000 years. The maze, outrunning all classical explorers.", color: C.mint, x: 5.05, y: 1.5 },
    { name: "MICROSOFT", detail: "Betting on topological qubits — a radically different maze architecture inherently resistant to errors, like building walls that repair themselves.", color: C.teal, x: 0.5, y: 3.15 },
    { name: "STARTUPS", detail: "IonQ uses trapped ions, Rigetti builds cloud chips, PsiQuantum pursues photonic qubits — each designing their own unique style of quantum maze.", color: C.quizOrange, x: 5.05, y: 3.15 },
  ];

  companies.forEach((c) => {
    slide.addShape(pres.shapes.RECTANGLE, { x: c.x, y: c.y, w: 4.45, h: 1.4, fill: { color: C.medBg }, shadow: makeShadow() });
    slide.addText(c.name, {
      x: c.x + 0.15, y: c.y + 0.08, w: 1.5, h: 0.35,
      fontSize: 14, color: c.color, fontFace: "Arial Black", bold: true, margin: 0,
    });
    slide.addText(c.detail, {
      x: c.x + 0.15, y: c.y + 0.42, w: 4.15, h: 0.9,
      fontSize: 11, color: C.offWhite, fontFace: "Calibri", margin: 0,
      lineSpacingMultiple: 1.1,
    });
  });

  // QUIZ button — positioned below the cards, not overlapping
  // Custom inline quiz button for slide 8 (below cards)
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 3.5, y: 4.75, w: 3, h: 0.7,
    fill: { color: C.gold, transparency: 40 },
    rectRadius: 0.12,
  });
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 3.6, y: 4.82, w: 2.8, h: 0.55,
    fill: { color: C.gold },
    rectRadius: 0.1,
    shadow: makeShadow(),
  });
  slide.addText([
    { text: "\uD83E\uDDE9 TAKE THE QUIZ", options: { bold: true, fontSize: 13, color: C.darkBg, fontFace: "Arial Black" } }
  ], {
    x: 3.6, y: 4.82, w: 2.8, h: 0.55,
    align: "center", valign: "middle", margin: 0,
    hyperlink: { url: "https://docs.google.com/forms/d/e/quantum-maze-quiz-2/viewform", tooltip: "Test your quantum knowledge!" },
  });

  addSlideNumber(slide, 8);
}

// ========== SLIDE 9: Challenges — IMPROVED ==========
// FIX: Better contrast on subtitles, slightly more breathing room
{
  const slide = pres.addSlide();
  slide.background = { color: C.darkBg };
  addMazeDecor(slide, "left");

  slide.addText("CHALLENGES: THE MAZE FIGHTS BACK", {
    x: 0.5, y: 0.3, w: 9, h: 0.7,
    fontSize: 28, color: C.quizRed, fontFace: "Arial Black", bold: true, margin: 0,
  });
  slide.addText("Building a quantum computer is like constructing a maze out of fog", {
    x: 0.5, y: 0.95, w: 9, h: 0.35,
    fontSize: 13, color: C.brighterGray, fontFace: "Calibri", italic: true, margin: 0,
  });

  const challenges = [
    { title: "DECOHERENCE", sub: "The walls dissolve", desc: "Qubits are incredibly fragile. Heat, vibration, or a stray photon causes the quantum maze to collapse. That's why quantum chips operate at -459°F — colder than outer space.", color: C.quizRed, y: 1.55 },
    { title: "ERROR CORRECTION", sub: "Rebuilding walls as they crumble", desc: "Thousands of physical qubits create one reliable 'logical qubit.' Imagine needing 1,000 workers to maintain a single maze wall. This is the biggest engineering challenge.", color: C.quizOrange, y: 2.95 },
    { title: "SCALABILITY", sub: "Making the maze bigger", desc: "Today: hundreds of qubits. Useful applications need millions. Each new corridor makes every existing one harder to maintain — like extending a maze on a vibrating table.", color: C.gold, y: 4.35 },
  ];

  challenges.forEach((ch) => {
    slide.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: ch.y, w: 9, h: 1.15, fill: { color: C.medBg }, shadow: makeShadow() });
    slide.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: ch.y, w: 0.08, h: 1.15, fill: { color: ch.color } });
    slide.addText(ch.title, {
      x: 0.8, y: ch.y + 0.08, w: 2.2, h: 0.35,
      fontSize: 14, color: ch.color, fontFace: "Arial Black", bold: true, margin: 0,
    });
    slide.addText(ch.sub, {
      x: 3.0, y: ch.y + 0.08, w: 3.5, h: 0.35,
      fontSize: 12, color: C.offWhite, fontFace: "Calibri", italic: true, margin: 0,
    });
    slide.addText(ch.desc, {
      x: 0.8, y: ch.y + 0.42, w: 8.5, h: 0.65,
      fontSize: 12, color: C.offWhite, fontFace: "Calibri", margin: 0,
      lineSpacingMultiple: 1.12,
    });
  });

  addSlideNumber(slide, 9);
}

// ========== SLIDE 10: Conclusion ==========
{
  const slide = pres.addSlide();
  slide.background = { color: C.darkBg };
  addMazeDecor(slide, "border");

  // Central box
  slide.addShape(pres.shapes.RECTANGLE, { x: 1.5, y: 0.4, w: 7, h: 4.5, fill: { color: C.medBg }, shadow: makeShadow() });

  // Maze walls with exit gap on right
  slide.addShape(pres.shapes.RECTANGLE, { x: 1.5, y: 0.4, w: 7, h: 0.06, fill: { color: C.mazeWall } });
  slide.addShape(pres.shapes.RECTANGLE, { x: 1.5, y: 0.4, w: 0.06, h: 4.5, fill: { color: C.mazeWall } });
  slide.addShape(pres.shapes.RECTANGLE, { x: 8.44, y: 0.4, w: 0.06, h: 1.5, fill: { color: C.mazeWall } });
  slide.addShape(pres.shapes.RECTANGLE, { x: 8.44, y: 2.7, w: 0.06, h: 2.2, fill: { color: C.mazeWall } });
  slide.addShape(pres.shapes.RECTANGLE, { x: 1.5, y: 4.84, w: 7, h: 0.06, fill: { color: C.mazeWall } });
  // Exit glow
  slide.addShape(pres.shapes.OVAL, { x: 8.3, y: 1.85, w: 0.4, h: 0.8, fill: { color: C.mint, transparency: 40 } });
  slide.addShape(pres.shapes.OVAL, { x: 8.37, y: 1.97, w: 0.26, h: 0.56, fill: { color: C.mint } });

  slide.addText("YOU'VE NAVIGATED\nTHE QUANTUM MAZE", {
    x: 2, y: 0.7, w: 6, h: 1.3,
    fontSize: 32, color: C.mint, fontFace: "Arial Black", bold: true, align: "center", valign: "middle", margin: 0,
  });

  slide.addText("From classical bits to qubits, from single paths to superposition, from isolated corridors to entangled passages — you've traveled through the fundamental ideas that make quantum computing one of the most exciting frontiers in science and technology.", {
    x: 2.2, y: 2.1, w: 5.6, h: 1.3,
    fontSize: 13, color: C.offWhite, fontFace: "Calibri", align: "center", valign: "top", margin: 0,
    lineSpacingMultiple: 1.2,
  });

  slide.addText("The maze of quantum computing is still being built.\nMaybe one day, you'll help design its next corridor.", {
    x: 2.2, y: 3.5, w: 5.6, h: 0.7,
    fontSize: 14, color: C.gold, fontFace: "Calibri", italic: true, align: "center", valign: "top", margin: 0,
  });

  slide.addText("Thank you for exploring with us.", {
    x: 1, y: 5.0, w: 8, h: 0.4,
    fontSize: 12, color: C.dimGray, fontFace: "Consolas", align: "center",
  });

  addSlideNumber(slide, 10);
}

// ========== SAVE ==========
pres.writeFile({ fileName: "deliverable/Quantum_Computing_Maze.pptx" })
  .then(() => console.log("✅ Presentation saved to deliverable/Quantum_Computing_Maze.pptx"))
  .catch(err => console.error("❌ Error:", err));
