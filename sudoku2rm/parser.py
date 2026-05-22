import base64
import json
from pathlib import Path

import anthropic

_MEDIA_TYPES = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".gif": "image/gif",
    ".webp": "image/webp",
}

_PROMPT = """Analyze this sudoku puzzle image and extract the complete 9x9 grid.

Rules:
- Pre-printed/given numbers: use that digit (1-9)
- Empty cells (player fills in): use 0

Return ONLY a JSON array of 9 arrays, each containing exactly 9 integers.
No markdown, no explanation — raw JSON only.

Example: [[5,3,0,0,7,0,0,0,0],[6,0,0,1,9,5,0,0,0],...]"""


def parse_sudoku_from_image(image_path: str) -> list[list[int]]:
    """Use Claude vision to extract a 9x9 sudoku grid from a photo.

    Returns a 9x9 list of ints where 0 = empty cell, 1-9 = given digit.
    """
    path = Path(image_path)
    media_type = _MEDIA_TYPES.get(path.suffix.lower(), "image/jpeg")

    with open(image_path, "rb") as f:
        image_data = base64.standard_b64encode(f.read()).decode("utf-8")

    client = anthropic.Anthropic()
    message = client.messages.create(
        model="claude-opus-4-7",
        max_tokens=1024,
        messages=[
            {
                "role": "user",
                "content": [
                    {
                        "type": "image",
                        "source": {
                            "type": "base64",
                            "media_type": media_type,
                            "data": image_data,
                        },
                    },
                    {"type": "text", "text": _PROMPT},
                ],
            }
        ],
    )

    text = message.content[0].text.strip()
    # Strip markdown code fences if present
    if text.startswith("```"):
        lines = text.splitlines()
        text = "\n".join(lines[1:-1])

    grid = json.loads(text)

    if len(grid) != 9 or any(len(row) != 9 for row in grid):
        raise ValueError(f"Expected 9x9 grid, got shape {len(grid)}x{len(grid[0]) if grid else '?'}")

    for row in grid:
        for val in row:
            if not isinstance(val, int) or not (0 <= val <= 9):
                raise ValueError(f"Invalid grid value: {val!r}")

    return grid
