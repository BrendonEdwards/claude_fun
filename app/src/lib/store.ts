"use client";

import { Expense, Income, Invoice, BusinessDetails, Job } from "./types";

const STORAGE_KEYS = {
  expenses: "quarterlyuk_expenses",
  income: "quarterlyuk_income",
  invoices: "quarterlyuk_invoices",
  business: "quarterlyuk_business",
  license: "quarterlyuk_license",
  mtdChecklist: "quarterlyuk_mtd_checklist",
  recentClients: "quarterlyuk_recent_clients",
  jobs: "quarterlyuk_jobs",
  otherIncomeNotes: "quarterlyuk_other_income_notes",
} as const;

export interface RecentClient {
  name: string;
  address: string;
  email: string;
}

export function getRecentClients(): RecentClient[] {
  return getItem<RecentClient[]>(STORAGE_KEYS.recentClients, []);
}

export function saveRecentClient(client: RecentClient): void {
  if (!client.name.trim()) return;
  const clients = getRecentClients();
  const filtered = clients.filter(
    (c) => c.name.toLowerCase() !== client.name.toLowerCase()
  );
  const updated = [client, ...filtered].slice(0, 10);
  setItem(STORAGE_KEYS.recentClients, updated);
}

export interface LicenseData {
  token: string; // Signed token from server
  email: string;
  activatedAt: string;
}

function getItem<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

function setItem<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}

export function getExpenses(): Expense[] {
  return getItem<Expense[]>(STORAGE_KEYS.expenses, []);
}

export function saveExpense(expense: Expense): void {
  const expenses = getExpenses();
  const idx = expenses.findIndex((e) => e.id === expense.id);
  if (idx >= 0) {
    expenses[idx] = expense;
  } else {
    expenses.push(expense);
  }
  setItem(STORAGE_KEYS.expenses, expenses);
}

export function deleteExpense(id: string): void {
  const expenses = getExpenses().filter((e) => e.id !== id);
  setItem(STORAGE_KEYS.expenses, expenses);
}

export function getIncomes(): Income[] {
  return getItem<Income[]>(STORAGE_KEYS.income, []);
}

export function saveIncome(income: Income): void {
  const incomes = getIncomes();
  const idx = incomes.findIndex((i) => i.id === income.id);
  if (idx >= 0) {
    incomes[idx] = income;
  } else {
    incomes.push(income);
  }
  setItem(STORAGE_KEYS.income, incomes);
}

export function deleteIncome(id: string): void {
  const incomes = getIncomes().filter((i) => i.id !== id);
  setItem(STORAGE_KEYS.income, incomes);
}

export function getInvoices(): Invoice[] {
  return getItem<Invoice[]>(STORAGE_KEYS.invoices, []);
}

export function saveInvoice(invoice: Invoice): void {
  const invoices = getInvoices();
  const idx = invoices.findIndex((i) => i.id === invoice.id);
  if (idx >= 0) {
    invoices[idx] = invoice;
  } else {
    invoices.push(invoice);
  }
  setItem(STORAGE_KEYS.invoices, invoices);
}

export function deleteInvoice(id: string): void {
  const invoices = getInvoices().filter((i) => i.id !== id);
  setItem(STORAGE_KEYS.invoices, invoices);
}

export function getBusinessDetails(): BusinessDetails | null {
  return getItem<BusinessDetails | null>(STORAGE_KEYS.business, null);
}

export function saveBusinessDetails(details: BusinessDetails): void {
  setItem(STORAGE_KEYS.business, details);
}

// License key management (signed token approach)
export function getLicense(): LicenseData | null {
  return getItem<LicenseData | null>(STORAGE_KEYS.license, null);
}

export function isActivated(): boolean {
  const license = getLicense();
  if (!license || !license.token) return false;
  // Token must have the signed format: base64payload.signature
  const parts = license.token.split(".");
  return parts.length === 2 && parts[0].length > 10 && parts[1].length > 10;
}

export function saveLicense(token: string, email: string): void {
  const data: LicenseData = {
    token,
    email,
    activatedAt: new Date().toISOString(),
  };
  setItem(STORAGE_KEYS.license, data);
}

export function clearLicense(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEYS.license);
}

// MTD checklist persistence
export function getMtdChecklist(): Record<string, boolean> {
  return getItem<Record<string, boolean>>(STORAGE_KEYS.mtdChecklist, {});
}

export function saveMtdChecklist(checklist: Record<string, boolean>): void {
  setItem(STORAGE_KEYS.mtdChecklist, checklist);
}

// Free tier limits
export const FREE_LIMITS = {
  maxExpenses: 3,
  maxInvoices: 1,
  canExport: false,
  canViewReports: false,
} as const;

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

// Local date as YYYY-MM-DD (avoids UTC timezone offset issues)
export function todayLocal(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

// Jobs
export function getJobs(): Job[] {
  return getItem<Job[]>(STORAGE_KEYS.jobs, []);
}

export function saveJob(job: Job): void {
  const jobs = getJobs();
  const idx = jobs.findIndex((j) => j.id === job.id);
  if (idx >= 0) {
    jobs[idx] = job;
  } else {
    jobs.push(job);
  }
  setItem(STORAGE_KEYS.jobs, jobs);
}

export function deleteJob(id: string): void {
  const jobs = getJobs().filter((j) => j.id !== id);
  setItem(STORAGE_KEYS.jobs, jobs);
}

// Effective incomes: manual incomes + paid invoices (avoids double-counting by invoiceNumber)
export function getEffectiveIncomes(): Income[] {
  const manualIncomes = getIncomes();
  const invoices = getInvoices();

  // Convert paid invoices to Income entries, skip if manual income already references same invoice
  const linkedInvoiceNums = new Set(
    manualIncomes.filter((i) => i.invoiceNumber).map((i) => i.invoiceNumber)
  );

  const invoiceIncomes: Income[] = invoices
    .filter(
      (inv) =>
        inv.status === "paid" && !linkedInvoiceNums.has(inv.invoiceNumber)
    )
    .map((inv) => ({
      id: `inv-${inv.id}`,
      date: inv.date,
      description: `Invoice ${inv.invoiceNumber}: ${inv.to.name}`,
      amount: inv.total,
      client: inv.to.name,
      invoiceNumber: inv.invoiceNumber,
      paid: true,
    }));

  return [...manualIncomes, ...invoiceIncomes];
}

// Other income notes per tax year (e.g. savings interest, dividends)
export interface OtherIncomeNote {
  taxYear: string; // e.g. "2025"
  notes: string;
}

export function getOtherIncomeNotes(): OtherIncomeNote[] {
  return getItem<OtherIncomeNote[]>(STORAGE_KEYS.otherIncomeNotes, []);
}

export function saveOtherIncomeNote(note: OtherIncomeNote): void {
  const notes = getOtherIncomeNotes();
  const idx = notes.findIndex((n) => n.taxYear === note.taxYear);
  if (idx >= 0) {
    notes[idx] = note;
  } else {
    notes.push(note);
  }
  setItem(STORAGE_KEYS.otherIncomeNotes, notes);
}

export function generateInvoiceNumber(): string {
  const key = "quarterlyuk_next_invoice_num";
  const current = parseInt(localStorage.getItem(key) || "0", 10);
  const next = current + 1;
  localStorage.setItem(key, String(next));
  return `INV-${String(next).padStart(4, "0")}`;
}
