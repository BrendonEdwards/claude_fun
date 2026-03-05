"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { downloadBackup, restoreBackup, daysSinceLastBackup } from "@/lib/calculations";
import { getExpenses, getEffectiveIncomes, getInvoices, getJobs } from "@/lib/store";

export default function BackupPage() {
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [confirmRestore, setConfirmRestore] = useState(false);
  const [pendingFile, setPendingFile] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [stats, setStats] = useState({ expenses: 0, incomes: 0, invoices: 0, jobs: 0, daysSince: null as number | null });
  const fileRef = useRef<HTMLInputElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setStats({
      expenses: getExpenses().length,
      incomes: getEffectiveIncomes().length,
      invoices: getInvoices().length,
      jobs: getJobs().length,
      daysSince: daysSinceLastBackup(),
    });
  }, []);

  function handleDownload() {
    downloadBackup();
    setStats((s) => ({ ...s, daysSince: 0 }));
    setStatus({ type: "success", message: "Backup downloaded. Keep it somewhere safe, or email it to yourself." });
  }

  function handleEmailBackup() {
    downloadBackup();
    setStats((s) => ({ ...s, daysSince: 0 }));
    const subject = encodeURIComponent(`QuarterlyUK Backup - ${new Date().toLocaleDateString("en-GB")}`);
    const body = encodeURIComponent(
      "Hi,\n\nAttach the backup file you just downloaded to this email before sending.\n\nThis is your QuarterlyUK data backup. To restore, go to Dashboard > Backup & Restore and upload this file.\n\nQuarterlyUK"
    );
    window.open(`mailto:?subject=${subject}&body=${body}`, "_blank");
    setStatus({ type: "success", message: "Backup downloaded. Now attach it to the email that just opened and hit send. If no email app opened, manually email the downloaded file to yourself." });
  }

  const processFile = useCallback((file: File) => {
    if (!file.name.endsWith(".json")) {
      setStatus({ type: "error", message: "Please select a .json backup file." });
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const content = ev.target?.result as string;
      setPendingFile(content);
      setConfirmRestore(true);
      setStatus(null);
    };
    reader.readAsText(file);
  }, []);

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    processFile(file);
    if (fileRef.current) fileRef.current.value = "";
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  }

  function handleConfirmRestore() {
    if (!pendingFile) return;
    const result = restoreBackup(pendingFile);
    setConfirmRestore(false);
    setPendingFile(null);
    if (result.success) {
      setStatus({ type: "success", message: "Backup restored successfully. Your data has been updated. Reloading..." });
      setTimeout(() => window.location.reload(), 2500);
    } else {
      setStatus({ type: "error", message: result.message });
    }
  }

  const lastBackupLabel =
    stats.daysSince === null
      ? "Never"
      : stats.daysSince === 0
      ? "Today"
      : stats.daysSince === 1
      ? "Yesterday"
      : `${stats.daysSince} days ago`;

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary tracking-tight mb-6">Backup & Restore</h1>

      {/* Status message */}
      {status && (
        <div
          className={`rounded-xl p-4 mb-6 text-sm font-medium ${
            status.type === "success"
              ? "bg-green-50 border border-green-200 text-green-800"
              : "bg-red-50 border border-red-200 text-red-800"
          }`}
        >
          {status.message}
        </div>
      )}

      {/* Current data summary */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
        <h2 className="font-bold text-primary text-base mb-4">Your Data</h2>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{stats.expenses}</div>
            <div className="text-xs text-muted mt-1">Expenses</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{stats.incomes}</div>
            <div className="text-xs text-muted mt-1">Income</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{stats.invoices}</div>
            <div className="text-xs text-muted mt-1">Invoices</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{stats.jobs}</div>
            <div className="text-xs text-muted mt-1">Jobs</div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${stats.daysSince === null || stats.daysSince > 7 ? "text-red-500" : "text-green-600"}`}>
              {lastBackupLabel}
            </div>
            <div className="text-xs text-muted mt-1">Last Backup</div>
          </div>
        </div>
      </div>

      {/* Backup section */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
        <h2 className="font-bold text-primary text-base mb-2">Download Backup</h2>
        <p className="text-sm text-muted mb-4">
          Downloads all your data as a JSON file. Keep it safe on your computer, cloud drive, or email it to yourself.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={handleDownload}
            className="inline-flex items-center justify-center gap-2 bg-primary text-white px-5 py-3 rounded-xl text-sm font-semibold hover:bg-primary-light transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            Download Backup
          </button>
          <button
            type="button"
            onClick={handleEmailBackup}
            className="inline-flex items-center justify-center gap-2 bg-accent text-white px-5 py-3 rounded-xl text-sm font-semibold hover:bg-accent/90 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
            </svg>
            Download & Email to Yourself
          </button>
        </div>
      </div>

      {/* Restore section */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
        <h2 className="font-bold text-primary text-base mb-2">Restore from Backup</h2>
        <p className="text-sm text-muted mb-4">
          Upload a QuarterlyUK backup file to restore your data. This will replace your current data with the backup.
        </p>
        <input
          ref={fileRef}
          type="file"
          accept=".json"
          onChange={handleFileSelect}
          className="hidden"
          aria-label="Upload backup JSON file"
        />
        <div
          ref={dropRef}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileRef.current?.click()}
          className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-xl px-5 py-8 cursor-pointer transition-colors ${
            dragging
              ? "border-primary bg-primary/5 text-primary"
              : "border-gray-300 text-muted hover:border-primary hover:text-primary"
          }`}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
          </svg>
          <span className="text-sm font-semibold">
            {dragging ? "Drop backup file here" : "Click or drag a backup file here"}
          </span>
          <span className="text-xs text-muted">.json files only</span>
        </div>
      </div>

      {/* Confirm restore modal */}
      {confirmRestore && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl">
            <h3 className="font-bold text-primary text-lg mb-2">Restore backup?</h3>
            <p className="text-sm text-muted mb-4">
              This will replace your current data with the backup file. Your existing data will be overwritten. Make sure you have a current backup if you want to keep your existing data.
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleConfirmRestore}
                className="flex-1 bg-primary text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary-light transition-colors"
              >
                Yes, Restore
              </button>
              <button
                type="button"
                onClick={() => { setConfirmRestore(false); setPendingFile(null); }}
                className="flex-1 border border-gray-200 text-muted px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* How it works */}
      <div className="bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/10 rounded-2xl p-6">
        <h2 className="font-bold text-primary text-base mb-3">How backups work</h2>
        <div className="space-y-3 text-sm text-muted">
          <div className="flex items-start gap-3">
            <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
            <p><span className="font-semibold text-primary">Download</span> your backup as a JSON file. It contains all your expenses, invoices, income, jobs, and settings.</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
            <p><span className="font-semibold text-primary">Email it to yourself</span> for safekeeping. Attach the downloaded file to the email that opens. If no email app opens, manually email the file to yourself.</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
            <p><span className="font-semibold text-primary">Restore any time</span> by uploading the backup file. Works on any browser, any device.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
