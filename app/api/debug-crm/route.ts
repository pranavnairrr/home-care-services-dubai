import { NextResponse } from 'next/server'

// Debug endpoint — not used in production
export async function GET() {
  return NextResponse.json({ message: 'Debug endpoint not configured for this page.' })
}
