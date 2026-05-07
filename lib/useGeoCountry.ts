'use client'

import { useState, useEffect } from 'react'
import { COUNTRIES, COUNTRY_ISO_CODES } from './data'

// Shared across all hook instances — fetch runs at most once per page load
let cachedCountry: string | null = null
let inflight: Promise<string | null> | null = null

function matchCountry(name: string, code: string): string | null {
  if (COUNTRIES.includes(name)) return name
  return COUNTRY_ISO_CODES[code] ?? null
}

async function fetchGeo(): Promise<string | null> {
  // Primary: ipwho.is (no strict rate limit)
  try {
    const r = await fetch('https://ipwho.is/')
    const d = await r.json()
    if (d.success) {
      const match = matchCountry(d.country ?? '', d.country_code ?? '')
      if (match) return match
    }
  } catch { /* fall through */ }

  // Fallback: api.country.is (ISO code only)
  try {
    const r = await fetch('https://api.country.is/')
    const d = await r.json()
    const match = matchCountry('', d.country ?? '')
    if (match) return match
  } catch { /* fall through */ }

  return null
}

function resolveGeoCountry(): Promise<string | null> {
  if (cachedCountry !== null) return Promise.resolve(cachedCountry)
  if (inflight) return inflight
  inflight = fetchGeo().then(c => { cachedCountry = c; return c })
  return inflight
}

export function useGeoCountry() {
  const [country, setCountry] = useState<string | null>(cachedCountry)

  useEffect(() => {
    if (cachedCountry) return
    resolveGeoCountry().then(c => { if (c) setCountry(c) })
  }, [])

  return country
}
