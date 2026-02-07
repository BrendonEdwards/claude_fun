"use client";

import { Expense, Income, Invoice, BusinessDetails } from "./types";

const STORAGE_KEYS = {
  expenses: "taxmate_expenses",
  income: "taxmate_income",
  invoices: "taxmate_invoices",
  business: "taxmate_business",
} as const;

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

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

export function generateInvoiceNumber(): string {
  const invoices = getInvoices();
  const num = invoices.length + 1;
  return `INV-${String(num).padStart(4, "0")}`;
}
