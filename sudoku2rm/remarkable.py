"""Unofficial reMarkable cloud API integration.

Authentication flow (one-time):
  1. Visit https://my.remarkable.com/connect/mobile
  2. Copy the 8-character code shown
  3. Run: python run.py setup

Credentials are stored at ~/.config/sudoku2rm/auth.json.
"""

import io
import json
import uuid
import zipfile
from datetime import datetime, timezone
from pathlib import Path

import requests

_AUTH_BASE = "https://my.remarkable.com"
_STORAGE_BASE = (
    "https://document-storage-production-dot-remarkable-production.appspot.com"
    "/document-storage/json/2"
)

CONFIG_DIR = Path.home() / ".config" / "sudoku2rm"
CONFIG_FILE = CONFIG_DIR / "auth.json"


# ── Auth helpers ──────────────────────────────────────────────────────────────

def register_device(code: str) -> None:
    """Register this client with the reMarkable cloud using a one-time code."""
    device_id = str(uuid.uuid4())
    resp = requests.post(
        f"{_AUTH_BASE}/token/json/2/device/new",
        json={
            "code": code.strip().lower(),
            "deviceDesc": "desktop-linux",
            "deviceID": device_id,
        },
        timeout=15,
    )
    _check(resp, "Device registration")

    CONFIG_DIR.mkdir(parents=True, exist_ok=True)
    CONFIG_FILE.write_text(json.dumps({"device_token": resp.text}))
    CONFIG_FILE.chmod(0o600)


def _load_device_token() -> str:
    if not CONFIG_FILE.exists():
        raise RuntimeError(
            "Not authenticated. Run:  python run.py setup"
        )
    return json.loads(CONFIG_FILE.read_text())["device_token"]


def _session_token(device_token: str) -> str:
    resp = requests.post(
        f"{_AUTH_BASE}/token/json/2/user/new",
        headers={"Authorization": f"Bearer {device_token}"},
        timeout=15,
    )
    _check(resp, "Session token refresh")
    return resp.text


def _check(resp: requests.Response, label: str) -> None:
    if not resp.ok:
        raise RuntimeError(f"{label} failed ({resp.status_code}): {resp.text[:200]}")


# ── Document package ──────────────────────────────────────────────────────────

def _now_iso() -> str:
    return datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%S.%f")[:-3] + "Z"


def _make_package(doc_id: str, pdf_bytes: bytes, name: str) -> bytes:
    """Wrap a PDF in the reMarkable ZIP document format."""
    content = json.dumps({
        "extraMetadata": {},
        "fileType": "pdf",
        "lastOpenedPage": 0,
        "lineHeight": -1,
        "margins": 100,
        "pageCount": 1,
        "textScale": 1,
        "transform": {},
    })
    metadata = json.dumps({
        "deleted": False,
        "lastModified": _now_iso(),
        "metadatamodified": False,
        "modified": False,
        "parent": "",
        "pinned": False,
        "synced": False,
        "type": "DocumentType",
        "version": 1,
        "visibleName": name,
    })

    buf = io.BytesIO()
    with zipfile.ZipFile(buf, "w", zipfile.ZIP_DEFLATED) as zf:
        zf.writestr(f"{doc_id}.content", content)
        zf.writestr(f"{doc_id}.metadata", metadata)
        zf.writestr(f"{doc_id}.pagedata", "")
        zf.writestr(f"{doc_id}.pdf", pdf_bytes)
    buf.seek(0)
    return buf.read()


# ── Upload ────────────────────────────────────────────────────────────────────

def upload_pdf(pdf_bytes: bytes, name: str) -> str:
    """Upload a PDF to the reMarkable cloud. Returns the new document ID."""
    device_token = _load_device_token()
    session = _session_token(device_token)
    headers = {"Authorization": f"Bearer {session}"}
    doc_id = str(uuid.uuid4())

    # 1. Request a blob upload URL
    resp = requests.post(
        f"{_STORAGE_BASE}/upload/request",
        headers=headers,
        json=[{"ID": doc_id, "Type": "DocumentType", "Version": 1}],
        timeout=15,
    )
    _check(resp, "Upload request")
    info = resp.json()[0]
    if not info.get("Success"):
        raise RuntimeError(f"Upload request rejected: {info.get('Message')}")

    # 2. PUT the ZIP package to the pre-signed blob URL
    resp = requests.put(
        info["BlobURLPut"],
        data=_make_package(doc_id, pdf_bytes, name),
        headers={"Content-Type": "application/octet-stream"},
        timeout=60,
    )
    _check(resp, "Blob upload")

    # 3. Finalise: update document status
    resp = requests.put(
        f"{_STORAGE_BASE}/upload/update-status",
        headers=headers,
        json=[{
            "ID": doc_id,
            "deleted": False,
            "lastModified": _now_iso(),
            "metadatamodified": True,
            "modified": True,
            "parent": "",
            "pinned": False,
            "synced": True,
            "Type": "DocumentType",
            "Version": 1,
            "VissibleName": name,   # intentional API typo
        }],
        timeout=15,
    )
    _check(resp, "Status update")

    return doc_id
