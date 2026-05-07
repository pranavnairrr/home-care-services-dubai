import { NextRequest, NextResponse } from 'next/server'
import { sendLeadToGroup } from '@/lib/telegram'
import { registerLead } from '@/lib/claimStore'

function generateClaimId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`
}

export async function POST(req: NextRequest) {
  try {
    const { fullName, email, country, phone, medicalHistory } = await req.json()
    const claimId = generateClaimId()
    const lead = { claimId, fullName, email, country, phone, medicalHistory: medicalHistory ?? '' }

    const sent = await sendLeadToGroup(lead)
    if (sent) {
      registerLead(claimId, { fullName, email, country, phone, medicalHistory: medicalHistory ?? '' }, sent.messageId, sent.chatId)
    }
  } catch (err) {
    console.error('[notify-telegram]', err)
  }

  // Always 200 — this is fire-and-forget from the client
  return NextResponse.json({ ok: true })
}
