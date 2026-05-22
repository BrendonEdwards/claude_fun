"use client";
import { useRef, useState } from "react";

type Status = "idle" | "loading" | "done" | "error";

// Resize image client-side before upload (stays under Vercel's 4.5MB limit)
function resizeImage(file: File, maxPx = 1600): Promise<{ base64: string; blob: Blob }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      let { width, height } = img;
      const ratio = Math.min(maxPx / width, maxPx / height, 1);
      width = Math.round(width * ratio);
      height = Math.round(height * ratio);
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      canvas.getContext("2d")!.drawImage(img, 0, 0, width, height);
      canvas.toBlob(
        (blob) => {
          if (!blob) return reject(new Error("Canvas toBlob failed"));
          const reader = new FileReader();
          reader.onload = () => resolve({ base64: (reader.result as string).split(",")[1], blob });
          reader.readAsDataURL(blob);
        },
        "image/jpeg",
        0.88
      );
    };
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}

function GridPreview({ grid }: { grid: number[][] }) {
  return (
    <div style={{ margin: "1.5rem auto", maxWidth: 320 }}>
      <table style={{ borderCollapse: "collapse", width: "100%", tableLayout: "fixed" }}>
        <tbody>
          {grid.map((row, r) => (
            <tr key={r}>
              {row.map((val, c) => (
                <td
                  key={c}
                  style={{
                    textAlign: "center",
                    padding: "6px 0",
                    fontSize: 18,
                    fontWeight: val ? 700 : 400,
                    color: val ? "#111" : "#ccc",
                    borderTop: r % 3 === 0 ? "2px solid #333" : "1px solid #bbb",
                    borderLeft: c % 3 === 0 ? "2px solid #333" : "1px solid #bbb",
                    borderBottom: r === 8 ? "2px solid #333" : undefined,
                    borderRight: c === 8 ? "2px solid #333" : undefined,
                  }}
                >
                  {val || "·"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Home() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [grid, setGrid] = useState<number[][] | null>(null);

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    setGrid(null);
    setStatus("idle");
    setMessage("");
  }

  async function transfer() {
    const file = fileRef.current?.files?.[0];
    if (!file) return;
    setStatus("loading");
    setMessage("Analysing with Claude…");
    setGrid(null);

    try {
      const { blob } = await resizeImage(file);
      const fd = new FormData();
      fd.append("image", blob, "sudoku.jpg");
      if (name) fd.append("name", name);

      setMessage("Parsing grid → rendering PDF → uploading to reMarkable…");
      const res = await fetch("/api/transfer", { method: "POST", body: fd });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Unknown error");

      setGrid(data.grid);
      setMessage(`✓ "${data.name}" is on your reMarkable!`);
      setStatus("done");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : String(err));
      setStatus("error");
    }
  }

  const s: Record<string, React.CSSProperties> = {
    page: { minHeight: "100dvh", display: "flex", flexDirection: "column", alignItems: "center", padding: "2rem 1rem" },
    title: { fontSize: 28, fontWeight: 700, marginBottom: 4 },
    sub: { fontSize: 14, color: "#666", marginBottom: "2rem" },
    card: { background: "#fff", borderRadius: 16, padding: "1.5rem", width: "100%", maxWidth: 400, boxShadow: "0 2px 12px #0001" },
    photoArea: {
      border: "2px dashed #ccc", borderRadius: 12, overflow: "hidden", aspectRatio: "4/3",
      display: "flex", alignItems: "center", justifyContent: "center",
      cursor: "pointer", marginBottom: "1rem", background: "#fafafa",
    },
    img: { width: "100%", height: "100%", objectFit: "cover" },
    input: { width: "100%", padding: "10px 12px", borderRadius: 8, border: "1.5px solid #ddd", fontSize: 15, boxSizing: "border-box", marginBottom: "1rem" },
    btn: { width: "100%", padding: "14px", borderRadius: 10, border: "none", fontSize: 17, fontWeight: 600, cursor: "pointer", background: "#222", color: "#fff" },
    btnDisabled: { background: "#bbb", cursor: "not-allowed" },
    msg: { marginTop: "1rem", padding: "12px", borderRadius: 8, fontSize: 14, textAlign: "center" },
    setup: { marginTop: "1.5rem", fontSize: 13, color: "#999", textAlign: "center" },
  };

  const busy = status === "loading";
  const hasFile = !!preview;

  return (
    <div style={s.page}>
      <div style={s.title}>Sudoku → reMarkable</div>
      <div style={s.sub}>Snap a photo and it appears on your tablet</div>

      <div style={s.card}>
        {/* Photo area */}
        <div style={s.photoArea} onClick={() => fileRef.current?.click()}>
          {preview ? (
            <img src={preview} alt="sudoku" style={s.img} />
          ) : (
            <div style={{ textAlign: "center", color: "#aaa" }}>
              <div style={{ fontSize: 48 }}>📷</div>
              <div style={{ fontSize: 14 }}>Tap to take or choose a photo</div>
            </div>
          )}
        </div>
        <input ref={fileRef} type="file" accept="image/*" capture="environment" onChange={onFile} style={{ display: "none" }} />

        {/* Optional name */}
        <input
          style={s.input}
          type="text"
          placeholder={`Document name (optional)`}
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={busy}
        />

        {/* Transfer button */}
        <button
          style={{ ...s.btn, ...(!hasFile || busy ? s.btnDisabled : {}) }}
          disabled={!hasFile || busy}
          onClick={transfer}
        >
          {busy ? "Working…" : "Send to reMarkable"}
        </button>

        {/* Status */}
        {message && (
          <div style={{
            ...s.msg,
            background: status === "error" ? "#fff0f0" : status === "done" ? "#f0fff4" : "#f5f5ff",
            color: status === "error" ? "#c00" : status === "done" ? "#060" : "#444",
          }}>
            {message}
          </div>
        )}

        {/* Grid preview */}
        {grid && <GridPreview grid={grid} />}
      </div>

      <div style={s.setup}>
        First time? <a href="/setup" style={{ color: "#555" }}>Connect your reMarkable →</a>
      </div>
    </div>
  );
}
