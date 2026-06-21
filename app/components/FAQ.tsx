"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "How is this different from other credit repair services?",
    answer:
      "I built this system as a business owner FOR business owners. We don't just dispute negatives - we position you for business funding, teach you to leverage credit strategically, and give you the exact blueprint I used to go from 510 to launching multiple successful businesses.",
  },
  {
    question: "How long does it really take to see results?",
    answer:
      "Most clients see their first deletions within 30-45 days. Significant score improvements typically happen by day 60-90. I personally went from 510 to 697 in 62 days.",
  },
  {
    question: "What if I've tried credit repair before and it didn't work?",
    answer:
      "Those generic services use outdated dispute letters that bureaus ignore. We use advanced strategies specifically designed for business owners who need fast results and funding access.",
  },
  {
    question: "Can you really guarantee results?",
    answer:
      "Yes. If we don't remove at least one negative item in 6 months, you get a full refund. We've never had to issue one because our system works.",
  },
  {
    question: "Which tier should I choose?",
    answer:
      "Based on your situation and how fast you want results, we recommend choosing the tier that best fits your goals. Most clients start with Tier 2 for balanced progress, while Tier 3 is ideal if you want faster results and priority support.",
  },
];

function FAQItem({
  item,
  isOpen,
  onToggle,
}: {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-hairline last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full py-6 flex items-center justify-between gap-4 cursor-pointer"
      >
        <span className="text-vault-cream font-semibold text-left">{item.question}</span>
        <span className="text-vault-gold text-2xl flex-shrink-0 leading-none">
          {isOpen ? "−" : "+"}
        </span>
      </button>
      {isOpen && (
        <div className="pb-6">
          <p className="text-vault-muted leading-relaxed">{item.answer}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section id="faq" className="section-padding bg-vault-black">
      <div className="container-vault">
        <div className="text-center mb-12 scroll-reveal">
          <p className="kicker text-vault-gold mb-4">FAQ</p>
          <h2 className="heading-lg text-vault-cream">Frequently Asked Questions</h2>
        </div>

        <div className="max-w-3xl mx-auto scroll-reveal delay-1">
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
    </section>
  );
}
