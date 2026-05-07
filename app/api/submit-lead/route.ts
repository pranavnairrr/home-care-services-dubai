import { NextRequest, NextResponse } from 'next/server'
import { sendLeadToGroup } from '@/lib/telegram'
import { registerLead } from '@/lib/claimStore'

function generateClaimId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`
}

export async function POST(req: NextRequest) {
  const { fullName, email, country, phone, medicalHistory } = await req.json()

  if (!fullName || !email || !country || !phone) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  // Telegram notification — this is the only destination for now
  // CRM will be wired back in once the correct Odoo API key is available
  try {
    const claimId = generateClaimId()
    const lead = { claimId, fullName, email, country, phone, medicalHistory: medicalHistory ?? '' }
    const sent = await sendLeadToGroup(lead)
    if (sent) registerLead(claimId, lead, sent.messageId, sent.chatId)
  } catch (err) {
    console.error('[Telegram]', err)
    return NextResponse.json({ error: 'Failed to send notification' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
