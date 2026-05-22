import Anthropic from "@anthropic-ai/sdk";

const PROMPT = `Analyze this sudoku puzzle image and extract the complete 9x9 grid.

Rules:
- Pre-printed/given numbers: use that digit (1-9)
- Empty cells the player fills in: use 0

Return ONLY a JSON array of 9 arrays, each containing exactly 9 integers (0-9).
No markdown, no explanation — raw JSON only.

Example: [[5,3,0,0,7,0,0,0,0],[6,0,0,1,9,5,0,0,0],...]`;

export async function parseSudokuFromImage(
  imageBase64: string,
  mediaType: string
): Promise<number[][]> {
  const client = new Anthropic();

  const message = await client.messages.create({
    model: "claude-opus-4-7",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "image",
            source: {
              type: "base64",
              media_type: mediaType as "image/jpeg" | "image/png" | "image/gif" | "image/webp",
              data: imageBase64,
            },
          },
          { type: "text", text: PROMPT },
        ],
      },
    ],
  });

  let text = (message.content[0] as { type: string; text: string }).text.trim();
  if (text.startsWith("```")) {
    text = text.split("\n").slice(1, -1).join("\n");
  }

  const grid = JSON.parse(text) as number[][];

  if (grid.length !== 9 || grid.some((r) => r.length !== 9)) {
    throw new Error(`Expected 9x9 grid, got ${grid.length} rows`);
  }
  for (const row of grid) {
    for (const val of row) {
      if (!Number.isInteger(val) || val < 0 || val > 9) {
        throw new Error(`Invalid grid value: ${val}`);
      }
    }
  }

  return grid;
}
