import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

// A4 in points (1pt = 1/72 inch)
const PAGE_W = 595.28;
const PAGE_H = 841.89;
// 180mm grid → 510 pts; each cell = 56.7 pts (~20mm, comfortable for handwriting)
const GRID_SIZE = 510;
const CELL = GRID_SIZE / 9;

export async function renderSudokuToPdf(
  grid: number[][],
  title: string
): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  const page = doc.addPage([PAGE_W, PAGE_H]);
  const font = await doc.embedFont(StandardFonts.HelveticaBold);

  // grid bottom-left: centred horizontally, 30mm (85 pt) from top
  const gx = (PAGE_W - GRID_SIZE) / 2;
  const gy = PAGE_H - 85 - GRID_SIZE;

  // Title
  const titleSize = 26;
  const titleW = font.widthOfTextAtSize(title, titleSize);
  page.drawText(title, {
    x: (PAGE_W - titleW) / 2,
    y: PAGE_H - 62,
    font,
    size: titleSize,
    color: rgb(0, 0, 0),
  });

  // Given numbers
  const numSize = 22;
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const val = grid[row][col];
      if (!val) continue;
      const text = String(val);
      const cx = gx + col * CELL;
      const cy = gy + (8 - row) * CELL;
      const tw = font.widthOfTextAtSize(text, numSize);
      page.drawText(text, {
        x: cx + (CELL - tw) / 2,
        y: cy + CELL * 0.33,
        font,
        size: numSize,
        color: rgb(0, 0, 0),
      });
    }
  }

  // Thin cell lines
  for (let i = 1; i < 9; i++) {
    if (i % 3 === 0) continue;
    const x = gx + i * CELL;
    page.drawLine({ start: { x, y: gy }, end: { x, y: gy + GRID_SIZE }, thickness: 0.6, color: rgb(0, 0, 0) });
    const y = gy + i * CELL;
    page.drawLine({ start: { x: gx, y }, end: { x: gx + GRID_SIZE, y }, thickness: 0.6, color: rgb(0, 0, 0) });
  }

  // Thick box lines (every 3 cells)
  for (let i = 0; i <= 3; i++) {
    const x = gx + i * 3 * CELL;
    page.drawLine({ start: { x, y: gy }, end: { x, y: gy + GRID_SIZE }, thickness: 2.5, color: rgb(0, 0, 0) });
    const y = gy + i * 3 * CELL;
    page.drawLine({ start: { x: gx, y }, end: { x: gx + GRID_SIZE, y }, thickness: 2.5, color: rgb(0, 0, 0) });
  }

  return doc.save();
}
