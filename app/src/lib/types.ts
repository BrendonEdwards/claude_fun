export interface Expense {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: ExpenseCategory;
  vatRate: number;
  vatAmount: number;
  receiptUrl?: string;
  notes?: string;
}

export type ExpenseCategory =
  | "office_supplies"
  | "travel"
  | "utilities"
  | "insurance"
  | "professional_services"
  | "marketing"
  | "equipment"
  | "software"
  | "meals_entertainment"
  | "rent"
  | "phone_internet"
  | "training"
  | "bank_charges"
  | "other";

export const EXPENSE_CATEGORIES: Record<ExpenseCategory, string> = {
  office_supplies: "Office Supplies",
  travel: "Travel",
  utilities: "Utilities",
  insurance: "Insurance",
  professional_services: "Professional Services",
  marketing: "Marketing & Advertising",
  equipment: "Equipment",
  software: "Software & Subscriptions",
  meals_entertainment: "Meals & Entertainment",
  rent: "Rent & Premises",
  phone_internet: "Phone & Internet",
  training: "Training & Education",
  bank_charges: "Bank Charges",
  other: "Other",
};

export interface Income {
  id: string;
  date: string;
  description: string;
  amount: number;
  client: string;
  invoiceNumber?: string;
  paid: boolean;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  from: BusinessDetails;
  to: ClientDetails;
  items: InvoiceItem[];
  notes?: string;
  vatRegistered: boolean;
  vatNumber?: string;
  subtotal: number;
  vatTotal: number;
  total: number;
  status: "draft" | "sent" | "paid" | "overdue";
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  vatRate: number;
  total: number;
}

export interface BusinessDetails {
  name: string;
  address: string;
  email: string;
  phone?: string;
  vatNumber?: string;
  utr?: string;
}

export interface ClientDetails {
  name: string;
  address: string;
  email: string;
}

export interface MTDReadiness {
  digitalRecords: boolean;
  quarterlyUpdates: boolean;
  compatibleSoftware: boolean;
  utrNumber: boolean;
  governmentGateway: boolean;
  incomeOver50k: boolean;
}

export interface ProfitAndLoss {
  period: { start: string; end: string };
  totalIncome: number;
  totalExpenses: number;
  expensesByCategory: Record<string, number>;
  netProfit: number;
  vatCollected: number;
  vatPaid: number;
  vatOwed: number;
}

export interface QuarterlySummary {
  quarter: 1 | 2 | 3 | 4;
  taxYear: string;
  income: number;
  expenses: number;
  profit: number;
}
