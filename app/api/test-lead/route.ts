import { NextResponse } from 'next/server'
import { sendLeadToGroup } from '@/lib/telegram'
import { registerLead } from '@/lib/claimStore'

declare global {
  // eslint-disable-next-line no-var
  var __testLeadCounter: number | undefined
}

// Dev-only — DELETE before production
export async function GET() {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not available in production' }, { status: 403 })
  }

  global.__testLeadCounter = (global.__testLeadCounter ?? 0) + 1
  const sl = global.__testLeadCounter

  const claimId = `test-${Date.now().toString(36)}`

  const lead = {
    claimId,
    fullName: `Test Lead #${sl}`,
    email: `test${sl}@amhealthhub.com`,
    country: sl % 3 === 0 ? 'Nigeria' : sl % 2 === 0 ? 'Bangladesh' : 'Kenya',
    phone: `+9715653674${String(sl).padStart(2, '0')}`,
    medicalHistory: `Test condition #${sl} — cardiac evaluation needed`,
  }

  const sent = await sendLeadToGroup(lead)

  if (!sent) {
    return NextResponse.json({ error: 'Telegram send failed — check .env.local' }, { status: 500 })
  }

  registerLead(claimId, lead, sent.messageId, sent.chatId)

  return NextResponse.json({ ok: true, sl, claimId, telegramMessageId: sent.messageId })
}
