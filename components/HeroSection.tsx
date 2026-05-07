import Image from 'next/image'
import { WHATSAPP_URL } from '@/lib/data'
import ContactForm from './ContactForm'

const TRUST_BADGES = [
  {
    icon: (
      <svg className="w-5 h-5 text-[#004d40]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    label: 'DHA Licensed & Insured',
  },
  {
    icon: (
      <svg className="w-5 h-5 text-[#004d40]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: '24/7 Availability',
  },
  {
    icon: (
      <svg className="w-5 h-5 text-[#004d40]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: 'All Dubai Areas',
  },
]

const TRUST_BAR = ['DHA Licensed & Insured', '24/7 Availability', 'All Dubai Areas', 'Same-Day Booking', '500+ Families Served']

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-[#effcf9] via-white to-blue-50 pt-8 pb-12 lg:pt-12 lg:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left column */}
          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm border border-gray-100 w-fit text-sm text-gray-600 font-medium">
              <svg className="w-4 h-4 text-[#004d40]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Trusted by 500+ Families Across Dubai
            </div>

            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1a2332] leading-tight font-montserrat mb-4">
                Home Care Services in Dubai
              </h1>
              <p className="text-lg md:text-xl font-semibold text-gray-600 leading-snug">
                DHA-licensed nurses, physiotherapists and doctors — at your door across Dubai. Available 24/7.
              </p>
            </div>

            {/* Hero image */}
            <div className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden shadow-md">
              <Image
                src="/images/hero-slide-1.avif"
                alt="DHA-licensed caregiver assisting a patient at home in Dubai"
                fill
                priority
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3">
              {TRUST_BADGES.map((badge) => (
                <div key={badge.label} className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 text-center">
                  <div className="flex items-center justify-center mb-2">{badge.icon}</div>
                  <p className="text-xs font-medium text-gray-600 leading-tight">{badge.label}</p>
                </div>
              ))}
            </div>

            {/* Trust bar */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
              {TRUST_BAR.map((item, i) => (
                <span key={item} className="flex items-center gap-1">
                  {i > 0 && <span className="hidden sm:inline text-gray-300 mr-1">|</span>}
                  <svg className="w-3 h-3 text-[#004d40] shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {item}
                </span>
              ))}
            </div>

            {/* Urgency signal */}
            <div className="w-fit">
              <span className="inline-flex items-center gap-2 bg-green-50 text-green-700 border border-green-200 rounded-full text-xs px-3 py-1.5 font-medium">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse inline-block shrink-0" />
                3 caregivers available in your area today · Slots fill fast
              </span>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Book a Caregiver on WhatsApp
              </a>
              <a href="#services" className="btn-primary">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                Explore Our Services ↓
              </a>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <svg className="w-4 h-4 text-[#004d40]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Speak to a real care coordinator — not a call centre
            </div>
          </div>

          {/* Right column — contact form */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 lg:sticky lg:top-24">
            <h2 className="text-xl font-bold text-[#1a2332] mb-1">Get a Caregiver Today</h2>
            <p className="text-sm text-gray-500 mb-5">Tell us who needs care — we&apos;ll match you with an available DHA-licensed caregiver and confirm within 2 hours.</p>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}
