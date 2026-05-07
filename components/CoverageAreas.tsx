'use client'

import { COVERAGE_AREAS, WHATSAPP_URL } from '@/lib/data'

export default function CoverageAreas() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title">We Cover All of Dubai</h2>
        <p className="section-subtitle">
          From Palm Jumeirah to Deira — if you&apos;re in Dubai, we&apos;re near you.
        </p>

        {/* Area pills */}
        <div className="mt-8 flex flex-wrap gap-2 justify-center">
          {COVERAGE_AREAS.map((area) => (
            <span
              key={area}
              className="bg-[#effcf9] border border-[#b2dfdb] text-[#004d40] text-sm font-medium px-4 py-1.5 rounded-full"
            >
              {area}
            </span>
          ))}
        </div>

        {/* Google Maps embed */}
        <div className="mt-8 rounded-2xl overflow-hidden border border-gray-100 shadow-sm relative">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d462143.03796047734!2d54.89776174648177!3d25.075580258955707!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43496ad9c645%3A0xbde66e5084295162!2sDubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sae!4v1746600000000!5m2!1sen!2sae"
            width="100%"
            height="300"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="AM Health Hub — Dubai coverage area"
          />
          {/* blocks the Google "Open in Maps" overlay link */}
          <div className="absolute inset-0" />
        </div>

        <div className="text-center mt-6">
          <a
            href={`${WHATSAPP_URL}?text=${encodeURIComponent('Hi, I\'d like to check if you cover my area in Dubai.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Check If We Cover Your Area
          </a>
        </div>
      </div>
    </section>
  )
}
