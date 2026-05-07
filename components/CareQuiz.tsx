'use client'

import { useState } from 'react'
import { WHATSAPP_NUMBER } from '@/lib/data'

const STEPS = [
  {
    question: 'Who needs care?',
    options: ['Elderly parent / grandparent', 'Post-surgery patient', 'Newborn / new mother', 'Myself'],
    cols: 2,
  },
  {
    question: 'How soon do you need care?',
    options: ['Today / Tomorrow (urgent)', 'This week', 'Planning ahead'],
    cols: 3,
  },
  {
    question: 'How many hours per day?',
    options: ['A few hours (4–8 hrs)', 'Full day (8–12 hrs)', 'Around the clock (24 hrs)'],
    cols: 3,
  },
]

export default function CareQuiz() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<(string | undefined)[]>(Array(STEPS.length).fill(undefined))
  const [isTransitioning, setIsTransitioning] = useState(false)

  const isDone = currentStep >= STEPS.length

  const handleSelect = (option: string) => {
    if (isTransitioning) return
    const newAnswers = [...answers]
    newAnswers[currentStep] = option
    setAnswers(newAnswers)
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentStep((s) => s + 1)
      setIsTransitioning(false)
    }, 280)
  }

  const handleBack = () => {
    if (currentStep === 0) return
    setCurrentStep((s) => s - 1)
  }

  const handleReset = () => {
    setCurrentStep(0)
    setAnswers(Array(STEPS.length).fill(undefined))
  }

  const handleSend = () => {
    const [a0, a1, a2] = answers as [string, string, string]
    const text = encodeURIComponent(
      `Hi, I'd like to find the right care:\n• Who needs care: ${a0}\n• Starting: ${a1}\n• Hours/day: ${a2}\n\nPlease help me get started.`
    )
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank', 'noopener,noreferrer')
  }

  const step = isDone ? null : STEPS[currentStep]
  const progress = (Math.min(currentStep, STEPS.length) / STEPS.length) * 100

  return (
    <section className="py-16 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title">Find the Right Care Plan in 2 Minutes</h2>
        <p className="section-subtitle">
          Answer 3 quick questions and we&apos;ll match you with the right caregiver today.
        </p>

        <div className="mt-10">
          {!isDone && step ? (
            <div className="bg-gray-50 rounded-2xl p-6 sm:p-8">
              {/* Progress header */}
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium text-gray-500">Step {currentStep + 1} of {STEPS.length}</p>
                {currentStep > 0 && (
                  <button onClick={handleBack} className="text-sm text-[#004d40] hover:underline font-medium">
                    ← Back
                  </button>
                )}
              </div>

              {/* Progress bar */}
              <div className="w-full bg-gray-200 rounded-full h-1.5 mb-6">
                <div
                  className="bg-[#004d40] h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Question */}
              <p className="font-semibold text-[#1a2332] text-lg mb-4">{step.question}</p>
              <div className={`grid gap-3 ${step.cols === 2 ? 'grid-cols-2' : 'grid-cols-1 sm:grid-cols-3'}`}>
                {step.options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleSelect(opt)}
                    className={`px-4 py-3 rounded-xl border text-sm font-medium text-left transition-all duration-150 ${
                      answers[currentStep] === opt
                        ? 'bg-[#004d40] text-white border-[#004d40]'
                        : 'bg-white text-[#1a2332] border-gray-200 hover:border-[#004d40]'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Result */
            <div className="bg-[#effcf9] rounded-2xl p-6 sm:p-8 border border-[#b2dfdb]">
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-5 h-5 text-[#004d40]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-[#004d40] font-semibold text-sm">All done!</span>
              </div>
              <p className="text-[#004d40] font-semibold text-base mb-1">
                Perfect — we have DHA-licensed caregivers available for{' '}
                <span className="lowercase">{String(answers[0])}</span> care.
              </p>
              <p className="text-[#004d40]/80 text-sm mb-5">
                A coordinator will confirm your slot within 2 hours. Send your answers on WhatsApp to get started immediately.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                <button onClick={handleSend} className="btn-whatsapp">
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Connect Me with a Caregiver Now
                </button>
                <button onClick={handleReset} className="text-sm text-gray-500 hover:text-gray-700 underline">
                  Start over
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
