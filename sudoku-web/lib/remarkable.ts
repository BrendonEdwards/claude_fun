import JSZip from "jszip";

const AUTH = "https://my.remarkable.com";
const STORAGE = "https://document-storage-production-dot-remarkable-production.appspot.com/document-storage/json/2";

function nowIso(): string {
  return new Date().toISOString().replace(/(\.\d{3})\d*Z/, "$1Z");
}

async function check(res: Response, label: string): Promise<void> {
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`${label} failed (${res.status}): ${body.slice(0, 200)}`);
  }
}

export async function registerDevice(code: string): Promise<string> {
  const res = await fetch(`${AUTH}/token/json/2/device/new`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      code: code.trim().toLowerCase(),
      deviceDesc: "desktop-linux",
      deviceID: crypto.randomUUID(),
    }),
  });
  await check(res, "Device registration");
  return res.text();
}

async function sessionToken(deviceToken: string): Promise<string> {
  const res = await fetch(`${AUTH}/token/json/2/user/new`, {
    method: "POST",
    headers: { Authorization: `Bearer ${deviceToken}` },
  });
  await check(res, "Session token");
  return res.text();
}

export async function uploadPdf(
  pdfBytes: Uint8Array,
  name: string,
  deviceToken: string
): Promise<string> {
  const session = await sessionToken(deviceToken);
  const authHeaders = { Authorization: `Bearer ${session}` };
  const docId = crypto.randomUUID();
  const now = nowIso();

  // 1. Request blob upload URL
  const reqRes = await fetch(`${STORAGE}/upload/request`, {
    method: "POST",
    headers: { ...authHeaders, "Content-Type": "application/json" },
    body: JSON.stringify([{ ID: docId, Type: "DocumentType", Version: 1 }]),
  });
  await check(reqRes, "Upload request");
  const [info] = await reqRes.json();
  if (!info.Success) throw new Error(`Upload rejected: ${info.Message}`);

  // 2. Build the document ZIP
  const zip = new JSZip();
  zip.file(`${docId}.content`, JSON.stringify({
    extraMetadata: {}, fileType: "pdf", lastOpenedPage: 0,
    lineHeight: -1, margins: 100, pageCount: 1, textScale: 1, transform: {},
  }));
  zip.file(`${docId}.metadata`, JSON.stringify({
    deleted: false, lastModified: now, metadatamodified: false,
    modified: false, parent: "", pinned: false, synced: false,
    type: "DocumentType", version: 1, visibleName: name,
  }));
  zip.file(`${docId}.pagedata`, "");
  zip.file(`${docId}.pdf`, pdfBytes);
  const zipBytes = await zip.generateAsync({ type: "uint8array" });

  // 3. Upload blob
  const blobRes = await fetch(info.BlobURLPut, {
    method: "PUT",
    headers: { "Content-Type": "application/octet-stream" },
    body: Buffer.from(zipBytes),
  });
  await check(blobRes, "Blob upload");

  // 4. Finalise
  const statusRes = await fetch(`${STORAGE}/upload/update-status`, {
    method: "PUT",
    headers: { ...authHeaders, "Content-Type": "application/json" },
    body: JSON.stringify([{
      ID: docId, deleted: false, lastModified: now,
      metadatamodified: true, modified: true, parent: "",
      pinned: false, synced: true, Type: "DocumentType",
      Version: 1, VissibleName: name,   // intentional API typo
    }]),
  });
  await check(statusRes, "Status update");

  return docId;
}
