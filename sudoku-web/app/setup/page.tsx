"use client";
import { useState } from "react";

export default function Setup() {
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unknown error");
      setStatus("done");
      setMessage("Connected! You can now transfer sudokus.");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : String(err));
    }
  }

  const s: Record<string, React.CSSProperties> = {
    page: { minHeight: "100dvh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem 1rem" },
    card: { background: "#fff", borderRadius: 16, padding: "2rem", width: "100%", maxWidth: 380, boxShadow: "0 2px 12px #0001" },
    title: { fontSize: 22, fontWeight: 700, marginBottom: "0.5rem" },
    step: { fontSize: 14, color: "#555", marginBottom: "1.5rem", lineHeight: 1.6 },
    label: { display: "block", fontSize: 13, fontWeight: 600, marginBottom: 4, color: "#333" },
    input: { width: "100%", padding: "10px 12px", borderRadius: 8, border: "1.5px solid #ddd", fontSize: 15, boxSizing: "border-box", marginBottom: "1rem" },
    btn: { width: "100%", padding: 14, borderRadius: 10, border: "none", fontSize: 16, fontWeight: 600, cursor: "pointer", background: "#222", color: "#fff" },
    msg: { marginTop: "1rem", padding: 12, borderRadius: 8, fontSize: 14, textAlign: "center" },
    back: { marginTop: "1.5rem", textAlign: "center", fontSize: 14 },
  };

  return (
    <div style={s.page}>
      <div style={s.card}>
        <div style={s.title}>Connect reMarkable</div>
        <div style={s.step}>
          1. Open <strong>my.remarkable.com/connect/mobile</strong> in a browser<br />
          2. Sign in if prompted<br />
          3. Copy the one-time code shown<br />
          4. Paste it below and tap Connect
        </div>

        <form onSubmit={submit}>
          <label style={s.label}>One-time code</label>
          <input
            style={s.input}
            type="text"
            placeholder="e.g. ab1c2d3e"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            autoCapitalize="none"
            autoCorrect="off"
            required
          />

          <label style={s.label}>Setup password (if set)</label>
          <input
            style={s.input}
            type="password"
            placeholder="Leave blank if none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button style={{ ...s.btn, ...(status === "loading" ? { background: "#bbb" } : {}) }} disabled={status === "loading"}>
            {status === "loading" ? "Connecting…" : "Connect"}
          </button>
        </form>

        {message && (
          <div style={{
            ...s.msg,
            background: status === "error" ? "#fff0f0" : "#f0fff4",
            color: status === "error" ? "#c00" : "#060",
          }}>
            {message}
          </div>
        )}

        <div style={s.back}>
          <a href="/" style={{ color: "#555" }}>← Back to transfer</a>
        </div>
      </div>
    </div>
  );
}
