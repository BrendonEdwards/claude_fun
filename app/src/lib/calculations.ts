import { Expense, Income, ProfitAndLoss, QuarterlySummary, EXPENSE_CATEGORIES } from "./types";

export function calculateProfitAndLoss(
  incomes: Income[],
  expenses: Expense[],
  startDate: string,
  endDate: string
): ProfitAndLoss {
  const filteredIncome = incomes.filter(
    (i) => i.date >= startDate && i.date <= endDate
  );
  const filteredExpenses = expenses.filter(
    (e) => e.date >= startDate && e.date <= endDate
  );

  const totalIncome = filteredIncome.reduce((sum, i) => sum + i.amount, 0);
  const totalExpenses = filteredExpenses.reduce((sum, e) => sum + e.amount, 0);

  const expensesByCategory: Record<string, number> = {};
  for (const expense of filteredExpenses) {
    const label = EXPENSE_CATEGORIES[expense.category] || expense.category;
    expensesByCategory[label] = (expensesByCategory[label] || 0) + expense.amount;
  }

  const vatCollected = filteredIncome.reduce((sum, i) => sum + i.amount * 0.2, 0);
  const vatPaid = filteredExpenses.reduce((sum, e) => sum + e.vatAmount, 0);

  return {
    period: { start: startDate, end: endDate },
    totalIncome,
    totalExpenses,
    expensesByCategory,
    netProfit: totalIncome - totalExpenses,
    vatCollected,
    vatPaid,
    vatOwed: vatCollected - vatPaid,
  };
}

export function getQuarterlySummaries(
  incomes: Income[],
  expenses: Expense[],
  taxYear: string
): QuarterlySummary[] {
  const year = parseInt(taxYear);
  const quarters: { start: string; end: string; q: 1 | 2 | 3 | 4 }[] = [
    { start: `${year}-04-06`, end: `${year}-07-05`, q: 1 },
    { start: `${year}-07-06`, end: `${year}-10-05`, q: 2 },
    { start: `${year}-10-06`, end: `${year + 1}-01-05`, q: 3 },
    { start: `${year + 1}-01-06`, end: `${year + 1}-04-05`, q: 4 },
  ];

  return quarters.map(({ start, end, q }) => {
    const qIncome = incomes
      .filter((i) => i.date >= start && i.date <= end)
      .reduce((sum, i) => sum + i.amount, 0);
    const qExpenses = expenses
      .filter((e) => e.date >= start && e.date <= end)
      .reduce((sum, e) => sum + e.amount, 0);

    return {
      quarter: q,
      taxYear: `${year}/${year + 1}`,
      income: qIncome,
      expenses: qExpenses,
      profit: qIncome - qExpenses,
    };
  });
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(amount);
}

export function exportToCSV(
  data: Record<string, unknown>[],
  filename: string
): void {
  if (!data.length) return;
  const headers = Object.keys(data[0]);
  const csv = [
    headers.join(","),
    ...data.map((row) =>
      headers.map((h) => {
        const val = row[h];
        const str = String(val ?? "");
        return str.includes(",") ? `"${str}"` : str;
      }).join(",")
    ),
  ].join("\n");

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
