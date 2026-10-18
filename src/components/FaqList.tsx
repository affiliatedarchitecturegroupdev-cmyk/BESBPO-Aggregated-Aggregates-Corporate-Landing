import { Plus } from "lucide-react";

export type Faq = { question: string; answer: string };

/** Questions and answers as native disclosure widgets — they work without JavaScript. */
export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="divide-y divide-basalt/10 rounded-sm border border-basalt/10 bg-white">
      {faqs.map((faq) => (
        <details key={faq.question} className="group px-5 py-4 md:px-6">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-display text-base font-semibold text-basalt marker:hidden group-open:text-seam-blue">
            {faq.question}
            <Plus className="mt-0.5 h-5 w-5 shrink-0 text-ochre-gold transition duration-300 group-open:rotate-45" aria-hidden />
          </summary>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
