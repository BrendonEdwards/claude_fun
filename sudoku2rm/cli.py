import argparse
import sys
from datetime import date
from pathlib import Path

from .parser import parse_sudoku_from_image
from .remarkable import CONFIG_FILE, register_device, upload_pdf
from .renderer import render_sudoku_to_pdf


def _print_grid(grid: list[list[int]]) -> None:
    for i, row in enumerate(grid):
        if i in (3, 6):
            print("──────┼───────┼──────")
        parts = []
        for j, val in enumerate(row):
            if j in (3, 6):
                parts.append("│")
            parts.append(str(val) if val else "·")
        print(" ".join(parts))


def cmd_setup(_args) -> None:
    print("reMarkable authentication setup")
    print()
    print("1. Open this URL on any browser:")
    print("   https://my.remarkable.com/connect/mobile")
    print("2. Sign in if prompted.")
    print("3. You will see a short one-time code (e.g. 'ab1c2d3e').")
    print()
    code = input("Paste the code here: ").strip()
    if not code:
        sys.exit("Aborted — no code entered.")

    try:
        register_device(code)
    except Exception as exc:
        sys.exit(f"Registration failed: {exc}")

    print(f"\nAuthenticated! Credentials saved to {CONFIG_FILE}")


def cmd_transfer(args) -> None:
    image = args.image
    if not Path(image).exists():
        sys.exit(f"File not found: {image}")

    if not args.dry_run and not CONFIG_FILE.exists():
        sys.exit(
            "Not authenticated. Run first:\n"
            "  python run.py setup"
        )

    # ── Parse ──────────────────────────────────────────────────────────────
    print(f"Parsing sudoku from {image} …")
    try:
        grid = parse_sudoku_from_image(image)
    except Exception as exc:
        sys.exit(f"Could not parse sudoku: {exc}")

    given = sum(v != 0 for row in grid for v in row)
    print(f"Detected {given} given numbers.\n")
    _print_grid(grid)
    print()

    name = args.name or f"Sudoku {date.today()}"

    # ── Render PDF ─────────────────────────────────────────────────────────
    print("Rendering PDF …")
    try:
        pdf_bytes = render_sudoku_to_pdf(grid, name)
    except Exception as exc:
        sys.exit(f"PDF rendering failed: {exc}")

    if args.dry_run:
        out = Path(image).stem + "_sudoku.pdf"
        Path(out).write_bytes(pdf_bytes)
        print(f"Dry-run: PDF saved to {out}")
        return

    # ── Upload ─────────────────────────────────────────────────────────────
    print(f'Uploading "{name}" to reMarkable cloud …')
    try:
        doc_id = upload_pdf(pdf_bytes, name)
    except Exception as exc:
        sys.exit(f"Upload failed: {exc}")

    print(f"Done! Document ID: {doc_id}")
    print("It should appear on your reMarkable 2 within seconds.")


def main() -> None:
    parser = argparse.ArgumentParser(
        prog="sudoku2rm",
        description="Snap a sudoku photo → play it on your reMarkable 2",
    )
    sub = parser.add_subparsers(dest="cmd", required=True)

    # setup
    sub.add_parser("setup", help="Authenticate with the reMarkable cloud (one-time)")

    # transfer
    t = sub.add_parser("transfer", help="Parse a sudoku photo and send it to your reMarkable")
    t.add_argument("image", help="Path to the sudoku photo (jpg/png/webp)")
    t.add_argument("--name", help="Document title (default: 'Sudoku YYYY-MM-DD')")
    t.add_argument(
        "--dry-run",
        action="store_true",
        help="Render the PDF locally only — don't upload",
    )

    args = parser.parse_args()
    {"setup": cmd_setup, "transfer": cmd_transfer}[args.cmd](args)
