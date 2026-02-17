// Client-side image compression for receipt photos
// Resizes to max 800px wide and compresses to JPEG ~0.7 quality
// Typically reduces a 4MB phone photo to ~100-200KB
// PDFs accepted up to 500KB (can't compress client-side)

const MAX_WIDTH = 800;
const QUALITY = 0.7;
const MAX_PDF_SIZE = 500 * 1024; // 500KB

export function compressImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    // For PDFs, check size then read as-is (no compression possible client-side)
    if (file.type === "application/pdf") {
      if (file.size > MAX_PDF_SIZE) {
        reject(
          new Error(
            `PDF too large (${(file.size / 1024).toFixed(0)}KB). Maximum is 500KB. Try a photo of the receipt instead.`
          )
        );
        return;
      }
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error("Failed to read PDF"));
      reader.readAsDataURL(file);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let { width, height } = img;

        if (width > MAX_WIDTH) {
          height = Math.round((height * MAX_WIDTH) / width);
          width = MAX_WIDTH;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Canvas not supported"));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", QUALITY));
      };
      img.onerror = () => reject(new Error("Failed to load image"));
      img.src = reader.result as string;
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}
