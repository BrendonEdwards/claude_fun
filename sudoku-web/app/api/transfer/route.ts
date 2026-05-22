import { NextRequest, NextResponse } from "next/server";
import { parseSudokuFromImage } from "@/lib/parser";
import { renderSudokuToPdf } from "@/lib/renderer";
import { uploadPdf } from "@/lib/remarkable";

export async function POST(req: NextRequest) {
  // Read reMarkable token: env var takes priority, then cookie
  const deviceToken =
    process.env.REMARKABLE_DEVICE_TOKEN ||
    req.cookies.get("rm_token")?.value;

  if (!deviceToken) {
    return NextResponse.json(
      { error: "Not authenticated with reMarkable. Visit /setup first." },
      { status: 401 }
    );
  }

  const form = await req.formData();
  const image = form.get("image") as File | null;
  const name = (form.get("name") as string | null)?.trim() ||
    `Sudoku ${new Date().toLocaleDateString("en-GB")}`;

  if (!image) {
    return NextResponse.json({ error: "No image provided" }, { status: 400 });
  }

  const bytes = await image.arrayBuffer();
  const imageBase64 = Buffer.from(bytes).toString("base64");
  const mediaType = image.type || "image/jpeg";

  let grid: number[][];
  try {
    grid = await parseSudokuFromImage(imageBase64, mediaType);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: `Parse failed: ${msg}` }, { status: 422 });
  }

  let pdfBytes: Uint8Array;
  try {
    pdfBytes = await renderSudokuToPdf(grid, name);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: `PDF render failed: ${msg}` }, { status: 500 });
  }

  let docId: string;
  try {
    docId = await uploadPdf(pdfBytes, name, deviceToken);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: `Upload failed: ${msg}` }, { status: 502 });
  }

  return NextResponse.json({ success: true, docId, name, grid });
}
