# Q4 Earnings Deck Generator

This folder contains a Python script that generates an **8-slide** quarterly earnings PowerPoint deck for a SaaS company using **python-pptx**.

## Files
- `generate_q4_earnings_deck.py` — generates the deck
- `Q4_Earnings.pptx` — output (created after running the script)
- `requirements.txt` — dependency list

## Setup
```bash
pip install -r requirements.txt
```

## Run
```bash
python generate_q4_earnings_deck.py
# or
python generate_q4_earnings_deck.py --output Q4_Earnings.pptx
```

## What it creates
- **8 slides**
- **Slide 3**: native PowerPoint **bar chart** comparing quarterly revenue (Q1–Q4)
- **Slide 5**: native PowerPoint **pie chart** showing churn breakdown (baseline vs +4% Q4 increase)
- A **"Key Takeaway" textbox on every slide**
- **CFO speaker notes on every slide** addressing the Q4 revenue dip
