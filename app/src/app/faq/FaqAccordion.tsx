"use client";

import { useState } from "react";

interface FaqItem {
  question: string;
  answer: React.ReactNode;
}

interface FaqSection {
  title: string;
  items: FaqItem[];
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`w-5 h-5 text-accent transition-transform duration-200 flex-shrink-0 ${open ? "rotate-180" : ""}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function AccordionItem({ item }: { item: FaqItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors rounded-lg"
      >
        <span className="text-sm font-semibold text-primary pr-4">{item.question}</span>
        <ChevronIcon open={open} />
      </button>
      {open && (
        <div className="px-5 pb-4 text-sm text-gray-700 leading-relaxed">
          {item.answer}
        </div>
      )}
    </div>
  );
}

export default function FaqAccordion({ sections }: { sections: FaqSection[] }) {
  return (
    <div className="space-y-10">
      {sections.map((section) => (
        <div key={section.title}>
          <h2 className="text-lg font-bold text-primary mb-4">{section.title}</h2>
          <div className="space-y-3">
            {section.items.map((item) => (
              <AccordionItem key={item.question} item={item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
