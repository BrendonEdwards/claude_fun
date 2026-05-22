import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Sudoku → reMarkable",
  description: "Snap a sudoku, play it on your reMarkable 2",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif", background: "#f5f5f5" }}>
        {children}
      </body>
    </html>
  );
}
