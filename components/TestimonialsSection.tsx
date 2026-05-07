'use client'

import { useState, useEffect, useRef } from 'react'
import { TESTIMONIALS } from '@/lib/data'

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const [fade, setFade] = useState(true)
  const paused = useRef(false)

  useEffect(() => {
    const timer = setInterval(() => {
      if (paused.current) return
      setFade(false)
      setTimeout(() => {
        setCurrent(c => (c + 1) % TESTIMONIALS.length)
        setFade(true)
      }, 300)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const goTo = (i: number) => {
    setFade(false)
    setTimeout(() => { setCurrent(i); setFade(true) }, 300)
  }

  const t = TESTIMONIALS[current]

  return (
    <section className="py-16 bg-[#004d40]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl md:text-3xl font-bold text-white mb-1">
          500+ Families. One Common Feeling: Relief.
        </h2>
        <p className="text-center text-[#80cbc4] text-sm mb-8">Real stories from families we&apos;ve helped across Dubai</p>

        <div
          className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden"
          onMouseEnter={() => { paused.current = true }}
          onMouseLeave={() => { paused.current = false }}
        >
          <div
            className="p-8"
            style={{ opacity: fade ? 1 : 0, transition: 'opacity 0.3s ease' }}
          >
            <svg className="w-7 h-7 text-[#80cbc4] mb-3 opacity-70" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <p className="text-white/90 text-base leading-relaxed mb-5">{t.text}</p>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <p className="font-semibold text-white">— {t.author}</p>
                <p className="text-[#80cbc4] text-xs">{t.area} · {t.careType}</p>
              </div>
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-2 text-[#80cbc4] text-xs">Verified Family</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-1.5 mt-5">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`rounded-full transition-all duration-300 ${i === current ? 'w-5 h-2 bg-white' : 'w-2 h-2 bg-white/30 hover:bg-white/60'}`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>

        <div className="flex items-center justify-center gap-1.5 mt-5">
          <svg className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <p className="text-[#80cbc4] text-xs">4.9 on Google · 120+ reviews</p>
        </div>
      </div>
    </section>
  )
}
