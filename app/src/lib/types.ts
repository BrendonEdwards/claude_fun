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
  jobId?: string;
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

// Labels aligned with HMRC SA103F Self-Employment (Short) boxes
export const EXPENSE_CATEGORIES: Record<ExpenseCategory, string> = {
  office_supplies: "Stationery & Office Costs",
  travel: "Car, Van & Travel Expenses",
  utilities: "Power & Utility Costs",
  insurance: "Insurance",
  professional_services: "Accountancy, Legal & Professional Fees",
  marketing: "Advertising & Promotion",
  equipment: "Equipment & Capital Allowances",
  software: "Software & Subscriptions",
  meals_entertainment: "Business Entertainment",
  rent: "Rent, Rates & Property Costs",
  phone_internet: "Phone, Internet & Communications",
  training: "Training & Development",
  bank_charges: "Bank & Financial Charges",
  other: "Other Business Expenses",
};

// SA103F box mapping for export/reference
export const SA103F_BOX: Record<ExpenseCategory, string> = {
  office_supplies: "Box 15",
  travel: "Box 11",
  utilities: "Box 13",
  insurance: "Box 13",
  professional_services: "Box 20",
  marketing: "Box 16",
  equipment: "Box 23",
  software: "Box 15",
  meals_entertainment: "Box 16",
  rent: "Box 13",
  phone_internet: "Box 15",
  training: "Box 22",
  bank_charges: "Box 18",
  other: "Box 22",
};

// Keyword → category auto-suggest map
export const CATEGORY_KEYWORDS: Record<string, ExpenseCategory> = {
  // Travel
  uber: "travel", bolt: "travel", taxi: "travel", train: "travel",
  bus: "travel", petrol: "travel", diesel: "travel", fuel: "travel",
  shell: "travel", bp: "travel", esso: "travel", parking: "travel",
  tfl: "travel", oyster: "travel", railcard: "travel", mileage: "travel",
  // Office
  staples: "office_supplies", ryman: "office_supplies", ink: "office_supplies",
  paper: "office_supplies", stationery: "office_supplies", pen: "office_supplies",
  printer: "office_supplies", envelope: "office_supplies", stamp: "office_supplies",
  // Software
  adobe: "software", microsoft: "software", google: "software",
  aws: "software", hosting: "software", domain: "software",
  slack: "software", zoom: "software", canva: "software",
  dropbox: "software", notion: "software", figma: "software",
  // Phone & Internet
  vodafone: "phone_internet", ee: "phone_internet", "o2": "phone_internet",
  three: "phone_internet", bt: "phone_internet", broadband: "phone_internet",
  mobile: "phone_internet", sim: "phone_internet", wifi: "phone_internet",
  // Professional
  accountant: "professional_services", solicitor: "professional_services",
  lawyer: "professional_services", legal: "professional_services",
  bookkeeper: "professional_services", consultant: "professional_services",
  // Marketing
  facebook: "marketing", instagram: "marketing", linkedin: "marketing",
  advert: "marketing", flyer: "marketing", leaflet: "marketing",
  // Rent & Property
  rent: "rent", rates: "rent", lease: "rent",
  // Insurance
  insurance: "insurance", indemnity: "insurance",
  // Bank
  bank: "bank_charges", stripe: "bank_charges", paypal: "bank_charges",
  // Equipment
  laptop: "equipment", computer: "equipment", monitor: "equipment",
  keyboard: "equipment", desk: "equipment", chair: "equipment",
  // Training
  course: "training", udemy: "training", seminar: "training",
  conference: "training", workshop: "training",
  // Meals & Entertainment
  lunch: "meals_entertainment", dinner: "meals_entertainment",
  restaurant: "meals_entertainment", coffee: "meals_entertainment",
  // Utilities
  electric: "utilities", gas: "utilities", water: "utilities", energy: "utilities",
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
  jobId?: string;
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

export interface Job {
  id: string;
  name: string;
  client: string;
  description?: string;
  status: "active" | "completed";
  createdAt: string;
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
