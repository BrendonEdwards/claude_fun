"use client";

import { useState, useEffect } from "react";
import {
  getInvoices,
  saveInvoice,
  deleteInvoice,
  generateId,
  generateInvoiceNumber,
  getBusinessDetails,
  saveBusinessDetails,
} from "@/lib/store";
import { formatCurrency } from "@/lib/calculations";
import type { Invoice, InvoiceItem, BusinessDetails, ClientDetails } from "@/lib/types";

const emptyItem: InvoiceItem = {
  description: "",
  quantity: 1,
  unitPrice: 0,
  vatRate: 20,
  total: 0,
};

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [mounted, setMounted] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showPreview, setShowPreview] = useState<Invoice | null>(null);

  const [business, setBusiness] = useState<BusinessDetails>({
    name: "",
    address: "",
    email: "",
    phone: "",
    vatNumber: "",
    utr: "",
  });

  const [client, setClient] = useState<ClientDetails>({
    name: "",
    address: "",
    email: "",
  });

  const [items, setItems] = useState<InvoiceItem[]>([{ ...emptyItem }]);
  const [dueDate, setDueDate] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    setInvoices(getInvoices());
    const saved = getBusinessDetails();
    if (saved) setBusiness(saved);
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const calcItem = (item: InvoiceItem): InvoiceItem => ({
    ...item,
    total: item.quantity * item.unitPrice * (1 + item.vatRate / 100),
  });

  const subtotal = items.reduce((s, i) => s + i.quantity * i.unitPrice, 0);
  const vatTotal = items.reduce(
    (s, i) => s + i.quantity * i.unitPrice * (i.vatRate / 100),
    0
  );
  const total = subtotal + vatTotal;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!business.name || !client.name || items.length === 0) return;

    saveBusinessDetails(business);

    const invoice: Invoice = {
      id: generateId(),
      invoiceNumber: generateInvoiceNumber(),
      date: new Date().toISOString().split("T")[0],
      dueDate: dueDate || new Date(Date.now() + 30 * 86400000).toISOString().split("T")[0],
      from: business,
      to: client,
      items: items.map(calcItem),
      notes: notes || undefined,
      vatRegistered: !!business.vatNumber,
      vatNumber: business.vatNumber || undefined,
      subtotal,
      vatTotal,
      total,
      status: "draft",
    };

    saveInvoice(invoice);
    setInvoices(getInvoices());
    setShowForm(false);
    setClient({ name: "", address: "", email: "" });
    setItems([{ ...emptyItem }]);
    setNotes("");
  };

  const handleDelete = (id: string) => {
    deleteInvoice(id);
    setInvoices(getInvoices());
  };

  const markPaid = (invoice: Invoice) => {
    saveInvoice({ ...invoice, status: "paid" });
    setInvoices(getInvoices());
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Invoices</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 text-sm bg-accent text-white rounded-lg font-semibold hover:opacity-90"
        >
          + New Invoice
        </button>
      </div>

      {/* Invoice Form */}
      {showForm && (
        <div className="bg-white rounded-xl border border-border p-6 mb-6">
          <h2 className="font-bold text-lg mb-4">Create Invoice</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Your details */}
            <div>
              <h3 className="font-semibold text-sm text-gray-500 uppercase mb-3">
                Your Business Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Business name"
                  value={business.name}
                  onChange={(e) =>
                    setBusiness({ ...business, name: e.target.value })
                  }
                  className="border border-border rounded-lg px-3 py-2 text-sm"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={business.email}
                  onChange={(e) =>
                    setBusiness({ ...business, email: e.target.value })
                  }
                  className="border border-border rounded-lg px-3 py-2 text-sm"
                  required
                />
                <input
                  type="text"
                  placeholder="Address"
                  value={business.address}
                  onChange={(e) =>
                    setBusiness({ ...business, address: e.target.value })
                  }
                  className="border border-border rounded-lg px-3 py-2 text-sm"
                  required
                />
                <input
                  type="text"
                  placeholder="UTR (optional)"
                  value={business.utr || ""}
                  onChange={(e) =>
                    setBusiness({ ...business, utr: e.target.value })
                  }
                  className="border border-border rounded-lg px-3 py-2 text-sm"
                />
              </div>
            </div>

            {/* Client details */}
            <div>
              <h3 className="font-semibold text-sm text-gray-500 uppercase mb-3">
                Client Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Client name"
                  value={client.name}
                  onChange={(e) =>
                    setClient({ ...client, name: e.target.value })
                  }
                  className="border border-border rounded-lg px-3 py-2 text-sm"
                  required
                />
                <input
                  type="email"
                  placeholder="Client email"
                  value={client.email}
                  onChange={(e) =>
                    setClient({ ...client, email: e.target.value })
                  }
                  className="border border-border rounded-lg px-3 py-2 text-sm"
                  required
                />
                <input
                  type="text"
                  placeholder="Client address"
                  value={client.address}
                  onChange={(e) =>
                    setClient({ ...client, address: e.target.value })
                  }
                  className="border border-border rounded-lg px-3 py-2 text-sm sm:col-span-2"
                  required
                />
              </div>
            </div>

            {/* Line items */}
            <div>
              <h3 className="font-semibold text-sm text-gray-500 uppercase mb-3">
                Line Items
              </h3>
              {items.map((item, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-12 gap-2 mb-2 items-end"
                >
                  <div className="col-span-5">
                    {idx === 0 && (
                      <label className="text-xs text-gray-500">
                        Description
                      </label>
                    )}
                    <input
                      type="text"
                      placeholder="Service description"
                      value={item.description}
                      onChange={(e) => {
                        const updated = [...items];
                        updated[idx] = { ...item, description: e.target.value };
                        setItems(updated);
                      }}
                      className="w-full border border-border rounded-lg px-3 py-2 text-sm"
                      required
                    />
                  </div>
                  <div className="col-span-2">
                    {idx === 0 && (
                      <label className="text-xs text-gray-500">Qty</label>
                    )}
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => {
                        const updated = [...items];
                        updated[idx] = {
                          ...item,
                          quantity: parseInt(e.target.value) || 1,
                        };
                        setItems(updated);
                      }}
                      className="w-full border border-border rounded-lg px-3 py-2 text-sm"
                    />
                  </div>
                  <div className="col-span-2">
                    {idx === 0 && (
                      <label className="text-xs text-gray-500">
                        Price (£)
                      </label>
                    )}
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={item.unitPrice || ""}
                      onChange={(e) => {
                        const updated = [...items];
                        updated[idx] = {
                          ...item,
                          unitPrice: parseFloat(e.target.value) || 0,
                        };
                        setItems(updated);
                      }}
                      className="w-full border border-border rounded-lg px-3 py-2 text-sm"
                      required
                    />
                  </div>
                  <div className="col-span-2">
                    {idx === 0 && (
                      <label className="text-xs text-gray-500">VAT %</label>
                    )}
                    <select
                      value={item.vatRate}
                      onChange={(e) => {
                        const updated = [...items];
                        updated[idx] = {
                          ...item,
                          vatRate: parseInt(e.target.value),
                        };
                        setItems(updated);
                      }}
                      className="w-full border border-border rounded-lg px-3 py-2 text-sm"
                    >
                      <option value={20}>20%</option>
                      <option value={5}>5%</option>
                      <option value={0}>0%</option>
                    </select>
                  </div>
                  <div className="col-span-1">
                    {items.length > 1 && (
                      <button
                        type="button"
                        onClick={() =>
                          setItems(items.filter((_, i) => i !== idx))
                        }
                        className="text-danger text-lg hover:bg-red-50 rounded-lg px-2 py-1"
                      >
                        ×
                      </button>
                    )}
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() => setItems([...items, { ...emptyItem }])}
                className="text-sm text-primary font-medium mt-2"
              >
                + Add line item
              </button>
            </div>

            {/* Due date and notes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Due Date
                </label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full border border-border rounded-lg px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Notes (optional)
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Payment terms, bank details, etc."
                  className="w-full border border-border rounded-lg px-3 py-2 text-sm"
                />
              </div>
            </div>

            {/* Totals */}
            <div className="bg-surface rounded-lg p-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm mb-1">
                <span>VAT</span>
                <span>{formatCurrency(vatTotal)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t border-border pt-2 mt-2">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="px-6 py-2 bg-accent text-white rounded-lg font-semibold text-sm"
              >
                Create Invoice
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-6 py-2 border border-border rounded-lg text-sm"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Invoice preview modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-2xl font-bold">INVOICE</h2>
                <p className="text-gray-500">{showPreview.invoiceNumber}</p>
              </div>
              <button
                onClick={() => setShowPreview(null)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold mb-1">
                  From
                </p>
                <p className="font-semibold">{showPreview.from.name}</p>
                <p className="text-sm text-gray-600">
                  {showPreview.from.address}
                </p>
                <p className="text-sm text-gray-600">
                  {showPreview.from.email}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold mb-1">
                  To
                </p>
                <p className="font-semibold">{showPreview.to.name}</p>
                <p className="text-sm text-gray-600">
                  {showPreview.to.address}
                </p>
                <p className="text-sm text-gray-600">{showPreview.to.email}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
              <div>
                <span className="text-gray-500">Date: </span>
                {showPreview.date}
              </div>
              <div>
                <span className="text-gray-500">Due: </span>
                {showPreview.dueDate}
              </div>
            </div>
            <table className="w-full text-sm mb-6">
              <thead className="border-b-2 border-gray-200">
                <tr>
                  <th className="text-left py-2">Description</th>
                  <th className="text-right py-2">Qty</th>
                  <th className="text-right py-2">Price</th>
                  <th className="text-right py-2">VAT</th>
                  <th className="text-right py-2">Total</th>
                </tr>
              </thead>
              <tbody>
                {showPreview.items.map((item, i) => (
                  <tr key={i} className="border-b border-gray-100">
                    <td className="py-2">{item.description}</td>
                    <td className="text-right py-2">{item.quantity}</td>
                    <td className="text-right py-2">
                      {formatCurrency(item.unitPrice)}
                    </td>
                    <td className="text-right py-2">{item.vatRate}%</td>
                    <td className="text-right py-2">
                      {formatCurrency(item.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="text-right space-y-1">
              <p className="text-sm">
                Subtotal: {formatCurrency(showPreview.subtotal)}
              </p>
              <p className="text-sm">
                VAT: {formatCurrency(showPreview.vatTotal)}
              </p>
              <p className="text-xl font-bold">
                Total: {formatCurrency(showPreview.total)}
              </p>
            </div>
            {showPreview.notes && (
              <p className="mt-4 text-sm text-gray-500 border-t border-border pt-4">
                {showPreview.notes}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Invoice list */}
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        {invoices.length === 0 ? (
          <div className="p-8 text-center text-gray-400">
            <p className="text-lg mb-2">No invoices yet</p>
            <p className="text-sm">Create your first professional invoice.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-surface-dark border-b border-border">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold">
                    Invoice #
                  </th>
                  <th className="text-left px-4 py-3 font-semibold">Client</th>
                  <th className="text-left px-4 py-3 font-semibold">Date</th>
                  <th className="text-right px-4 py-3 font-semibold">Total</th>
                  <th className="text-center px-4 py-3 font-semibold">
                    Status
                  </th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv) => (
                  <tr
                    key={inv.id}
                    className="border-b border-border last:border-0 hover:bg-gray-50"
                  >
                    <td className="px-4 py-3 font-medium">
                      {inv.invoiceNumber}
                    </td>
                    <td className="px-4 py-3">{inv.to.name}</td>
                    <td className="px-4 py-3">{inv.date}</td>
                    <td className="px-4 py-3 text-right font-semibold">
                      {formatCurrency(inv.total)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          inv.status === "paid"
                            ? "bg-green-100 text-green-700"
                            : inv.status === "overdue"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {inv.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right space-x-2">
                      <button
                        onClick={() => setShowPreview(inv)}
                        className="text-primary hover:underline text-xs"
                      >
                        View
                      </button>
                      {inv.status !== "paid" && (
                        <button
                          onClick={() => markPaid(inv)}
                          className="text-accent hover:underline text-xs"
                        >
                          Mark Paid
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(inv.id)}
                        className="text-danger hover:underline text-xs"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
