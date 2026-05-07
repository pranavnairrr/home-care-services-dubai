'use client'

import { useState } from 'react'
import { FAQS } from '@/lib/data'

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null)

  const left  = FAQS.filter((_, i) => i % 2 === 0)
  const right = FAQS.filter((_, i) => i % 2 !== 0)

  const FaqItem = ({ faq, index }: { faq: typeof FAQS[0]; index: number }) => (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <button
        onClick={() => setOpen(open === index ? null : index)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="font-medium text-[#1a2332] text-sm pr-4">{faq.question}</span>
        <svg
          className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-200 ${open === index ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open === index && (
        <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100">
          <p className="pt-3">{faq.answer}</p>
        </div>
      )}
    </div>
  )

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 via-[#effcf9] to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title">Questions Families Ask Us Most</h2>
        <p className="section-subtitle">Everything you need to know about home care services in Dubai</p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-3 items-start">
          <div className="flex flex-col gap-3">
            {left.map((faq, i) => (
              <FaqItem key={i} faq={faq} index={i * 2} />
            ))}
          </div>
          <div className="flex flex-col gap-3">
            {right.map((faq, i) => (
              <FaqItem key={i} faq={faq} index={i * 2 + 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
