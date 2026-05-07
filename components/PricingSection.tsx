'use client'

import { useState } from 'react'
import { PRICING_TIERS } from '@/lib/data'
import PopupModal from './PopupModal'

export default function PricingSection() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <section className="py-16 bg-gradient-to-b from-white to-[#effcf9]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">Honest Pricing. No Surprise Bills.</h2>
          <p className="section-subtitle">
            Most home care providers hide their rates. We don&apos;t.
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRICING_TIERS.map((tier) => (
              <div
                key={tier.name}
                className={`rounded-2xl p-6 border text-center ${
                  tier.highlight
                    ? 'bg-[#004d40] text-white border-[#004d40] shadow-lg scale-[1.03]'
                    : 'bg-white text-[#1a2332] border-gray-100 shadow-sm'
                }`}
              >
                {tier.highlight && (
                  <span className="inline-block bg-yellow-400 text-[#1a2332] text-xs font-bold px-3 py-0.5 rounded-full mb-3">
                    Most Popular
                  </span>
                )}
                <h3 className={`text-lg font-bold ${tier.highlight ? 'text-white' : 'text-[#1a2332]'}`}>
                  {tier.name}
                </h3>
                <p className={`text-sm mt-1 ${tier.highlight ? 'text-white/70' : 'text-gray-400'}`}>
                  {tier.detail}
                </p>
                <p className={`text-2xl font-bold mt-4 ${tier.highlight ? 'text-white' : 'text-[#004d40]'}`}>
                  {tier.price}
                </p>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-gray-400 mt-6">
            All prices include DHA-licensed caregivers. No hidden placement fees.
          </p>

          <div className="text-center mt-6">
            <button onClick={() => setModalOpen(true)} className="btn-primary">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Get a Free Quote in 30 Minutes
            </button>
          </div>
        </div>
      </section>
      <PopupModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}
