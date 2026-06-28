"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What's the minimum annual revenue to qualify?",
    answer:
      "We typically work with businesses doing $250K–$10M+ annually. Below $250K, options narrow but aren't impossible. Let's talk about your specific situation.",
  },
  {
    question: "Do you require a personal guarantee?",
    answer:
      "No. We structure deals to minimize your personal exposure. Sometimes lenders will ask for one—when that happens, we negotiate limits or collateral swaps to protect your personal assets.",
  },
  {
    question: "How much does this cost?",
    answer:
      "We charge no upfront fees. Our compensation comes from lender referral relationships—we only win if you fund. Lender costs vary by product (LOC = 8–12% APR, RBF = 6–8% cost of capital, etc.) and your profile.",
  },
  {
    question: "What if I've been rejected by banks before?",
    answer:
      "Good. That's 70% of our client base. Banks use narrow criteria; alternative lenders use different models. We find the lender whose criteria match your actual strength.",
  },
  {
    question: "How long does the whole process take?",
    answer:
      "From initial call to funds landed: 5–30 days depending on the product and how clean your financials are. SBAs take longer (20–45 days). RBF and lines of credit move faster (5–15 days).",
  },
];

function FAQItem({ item, isOpen, onToggle }: { item: FAQItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-vault-border last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full py-6 md:py-8 flex items-start md:items-center justify-between gap-4 hover:bg-vault-gold/5 -mx-6 md:-mx-10 px-6 md:px-10 transition-colors"
      >
        <h3 className="heading-md text-vault-ink text-left">
          {item.question}
        </h3>
        <div
          className={`text-vault-gold text-2xl flex-shrink-0 transition-transform ${
            isOpen ? "rotate-45" : ""
          }`}
        >
          +
        </div>
      </button>
      {isOpen && (
        <div className="px-6 md:px-10 pb-6 md:pb-8">
          <p className="text-vault-muted leading-relaxed">{item.answer}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="section-padding bg-vault-gold/5 border-y border-vault-border">
      <div className="container-vault">
        <div className="grid md:grid-cols-3 gap-12 lg:gap-20">
          <div className="md:col-span-1 scroll-reveal">
            <p className="kicker text-vault-gold mb-4">QUESTIONS</p>
            <h2 className="heading-md text-vault-ink">Frequently Asked</h2>
          </div>

          <div className="md:col-span-2 scroll-reveal delay-1">
            <div className="divide-y divide-hairline -mx-6 md:-mx-0">
              {faqs.map((faq, idx) => (
                <FAQItem
                  key={faq.question}
                  item={faq}
                  isOpen={openIndex === idx}
                  onToggle={() => setOpenIndex(openIndex === idx ? -1 : idx)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
