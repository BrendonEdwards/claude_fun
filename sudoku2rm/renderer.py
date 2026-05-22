import io

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.pdfgen import canvas

# reMarkable 2 display is ~157mm x 210mm — A4 fits perfectly with minimal scrolling.
# Grid: 180mm × 180mm → cells of 20mm each, comfortable for handwriting.
_GRID_MM = 180
_FONT_GIVEN = "Helvetica-Bold"
_FONT_SIZE = 22
_LINE_THIN = 0.6
_LINE_THICK = 2.5


def render_sudoku_to_pdf(grid: list[list[int]], title: str = "Sudoku") -> bytes:
    """Render a parsed sudoku grid to a reMarkable-optimised A4 PDF.

    Pre-filled (given) numbers are printed in bold; empty cells are blank for
    handwriting. Returns the PDF as raw bytes.
    """
    buf = io.BytesIO()
    page_w, page_h = A4

    grid_size = _GRID_MM * mm
    cell = grid_size / 9

    # Centre grid horizontally; leave 30 mm at top for title
    gx = (page_w - grid_size) / 2          # grid left edge
    gy = page_h - 30 * mm - grid_size      # grid bottom edge (PDF y is from bottom)

    c = canvas.Canvas(buf, pagesize=A4)

    # ── Title ──────────────────────────────────────────────────────────────
    c.setFont(_FONT_GIVEN, 26)
    tw = c.stringWidth(title, _FONT_GIVEN, 26)
    c.drawString((page_w - tw) / 2, page_h - 22 * mm, title)

    # ── Given numbers ──────────────────────────────────────────────────────
    c.setFont(_FONT_GIVEN, _FONT_SIZE)
    c.setFillColor(colors.black)
    for row in range(9):
        for col in range(9):
            val = grid[row][col]
            if val == 0:
                continue
            # cell bottom-left in PDF coords (row 0 = top of grid)
            cx = gx + col * cell
            cy = gy + (8 - row) * cell
            text = str(val)
            tw = c.stringWidth(text, _FONT_GIVEN, _FONT_SIZE)
            # Horizontally centred; baseline ~33 % up the cell
            c.drawString(cx + (cell - tw) / 2, cy + cell * 0.33, text)

    # ── Thin cell lines (skip box boundaries — drawn thick below) ──────────
    c.setStrokeColor(colors.black)
    c.setLineWidth(_LINE_THIN)
    for i in range(1, 9):
        if i % 3 == 0:
            continue
        x = gx + i * cell
        c.line(x, gy, x, gy + grid_size)           # vertical
        y = gy + i * cell
        c.line(gx, y, gx + grid_size, y)           # horizontal

    # ── Thick box lines (at 0, 3, 6, 9 cell boundaries) ───────────────────
    c.setLineWidth(_LINE_THICK)
    for i in range(4):
        x = gx + i * 3 * cell
        c.line(x, gy, x, gy + grid_size)
        y = gy + i * 3 * cell
        c.line(gx, y, gx + grid_size, y)

    c.save()
    buf.seek(0)
    return buf.read()
