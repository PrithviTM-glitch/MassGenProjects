"""Minimal logger for standalone custom tools."""
import logging
import sys

# Create simple logger
logger = logging.getLogger("custom_tools")
logger.setLevel(logging.INFO)

# Add console handler if not already present
if not logger.handlers:
    handler = logging.StreamHandler(sys.stdout)
    handler.setFormatter(logging.Formatter('%(levelname)s - %(message)s'))
    logger.addHandler(handler)
