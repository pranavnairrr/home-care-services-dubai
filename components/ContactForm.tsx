'use client'

import { useState } from 'react'
import { COUNTRIES, COUNTRY_DIAL_CODES } from '@/lib/data'
import { useGeoCountry } from '@/lib/useGeoCountry'

interface ContactFormProps {
  onSuccess?: () => void
  modal?: boolean
}

export default function ContactForm({ onSuccess, modal }: ContactFormProps) {
  const [pending, setPending]   = useState(false)
  const [success, setSuccess]   = useState(false)
  const [error, setError]       = useState('')
  const geoCountry = useGeoCountry()
  const [manualCountry, setManualCountry] = useState<string | null>(null)
  const [phoneNum, setPhoneNum] = useState('')

  const country = manualCountry ?? geoCountry ?? ''

  const dialCode = country ? (COUNTRY_DIAL_CODES[country] ?? '') : ''
  const fullPhone = dialCode ? `${dialCode} ${phoneNum}`.trim() : phoneNum

  const inputCls = `w-full border border-gray-300 rounded-lg px-4 ${modal ? 'py-2' : 'py-2.5'} text-sm focus:outline-none focus:ring-2 focus:ring-[#004d40] focus:border-transparent`
  const labelCls = `block text-sm font-medium text-gray-700 ${modal ? 'mb-0.5' : 'mb-1'}`

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setManualCountry(e.target.value)
    setPhoneNum('')
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setPending(true)
    setError('')

    const fd = new FormData(e.currentTarget)
    const data = {
      fullName:       fd.get('fullName')       as string,
      email:          fd.get('email')          as string,
      country,
      phone:          fullPhone,
      medicalHistory: (fd.get('medicalHistory') as string) ?? '',
    }

    try {
      const res = await fetch('/api/submit-lead', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(data),
      })

      if (!res.ok) {
        setError('Something went wrong. Please try again.')
        setPending(false)
        return
      }

      setSuccess(true)
      onSuccess?.()
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setPending(false)
    }
  }

  if (success) {
    return (
      <div className="text-center py-8 px-4">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-[#004d40] mb-2">Request Received!</h3>
        <p className="text-gray-600">Thank you! We will contact you within 24 hours.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={modal ? 'space-y-2' : 'space-y-4'}>
      <div>
        <label className={labelCls}>
          Full Name <span className="text-red-500">*</span>
        </label>
        <input name="fullName" type="text" required placeholder="Your full name" className={inputCls} />
      </div>

      <div>
        <label className={labelCls}>
          Email Address <span className="text-red-500">*</span>
        </label>
        <input name="email" type="email" required placeholder="your.email@example.com" className={inputCls} />
      </div>

      <div>
        <label className={labelCls}>
          Country <span className="text-red-500">*</span>
        </label>
        <select
          name="country"
          required
          value={country}
          onChange={handleCountryChange}
          className={`${inputCls} bg-white`}
        >
          <option value="" disabled>Select your country</option>
          {COUNTRIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelCls}>
          Phone Number <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-2">
          {/* Read-only country code badge */}
          <div className={`shrink-0 flex items-center justify-center border border-gray-300 rounded-lg bg-gray-50 px-3 ${modal ? 'py-2' : 'py-2.5'} text-sm font-medium text-gray-700 min-w-[64px]`}>
            {dialCode || '—'}
          </div>
          <input
            type="tel"
            required
            value={phoneNum}
            onChange={(e) => setPhoneNum(e.target.value)}
            placeholder={dialCode ? 'Number' : 'Select country first'}
            disabled={!dialCode}
            className={`flex-1 border border-gray-300 rounded-lg px-4 ${modal ? 'py-2' : 'py-2.5'} text-sm focus:outline-none focus:ring-2 focus:ring-[#004d40] focus:border-transparent disabled:bg-gray-50 disabled:text-gray-400`}
          />
        </div>
      </div>

      <div>
        <label className={labelCls}>
          Brief Medical History / Current Condition
        </label>
        <textarea
          name="medicalHistory"
          rows={modal ? 2 : 3}
          placeholder="Describe your condition, symptoms..."
          className={`${inputCls} resize-none`}
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="w-full bg-[#004d40] hover:bg-[#00695c] text-white font-semibold py-3 rounded-lg transition-colors duration-200 disabled:opacity-60"
      >
        {pending ? 'Submitting...' : 'Book a Caregiver — Confirm in 2 Hours'}
      </button>
      <p className="text-xs text-gray-400 text-center flex items-center justify-center gap-2 flex-wrap">
        <span className="text-gray-500">DHA-licensed caregivers · No obligation</span>
        <span className="hidden sm:inline text-gray-300">|</span>
        <span className="flex items-center gap-1">
          <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" /></svg>
          Your data is safe &amp; confidential
        </span>
      </p>
    </form>
  )
}
