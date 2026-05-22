#!/usr/bin/env python3
"""Entry point — can be called directly without installing the package.

Usage:
  python run.py setup
  python run.py transfer photo.jpg
  python run.py transfer photo.jpg --name "Monday puzzle" --dry-run
"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))

from sudoku2rm.cli import main

main()
