'use client'

import { useState } from 'react'
import { HOW_IT_WORKS_STEPS } from '@/lib/data'
import PopupModal from './PopupModal'

export default function HowItWorks() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <section className="py-16 bg-gradient-to-b from-white to-[#effcf9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">From Call to Caregiver in Hours</h2>
          <p className="section-subtitle">Three steps. No paperwork, no waiting rooms, no agency fees.</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 relative">
            {HOW_IT_WORKS_STEPS.map((step, i) => (
              <div key={step.num} className="flex flex-col items-center text-center relative">
                {i < HOW_IT_WORKS_STEPS.length - 1 && (
                  <div className="hidden sm:block absolute top-8 left-[60%] w-[80%] border-t-2 border-dashed border-[#b2dfdb] z-0" />
                )}
                <p className="text-7xl font-bold text-[#b2dfdb] leading-none mb-3 relative z-10">{step.num}</p>
                <h3 className="font-bold text-[#1a2332] text-base mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <button onClick={() => setModalOpen(true)} className="btn-primary">
              Start Now — It&apos;s Free to Ask →
            </button>
          </div>
        </div>
      </section>
      <PopupModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}
