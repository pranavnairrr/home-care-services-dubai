'use server'

import { sendLeadToGroup } from '@/lib/telegram'
import { registerLead } from '@/lib/claimStore'

export interface FormState {
  success: boolean
  message: string
}

function generateClaimId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`
}

export async function submitLead(_prevState: FormState, formData: FormData): Promise<FormState> {
  const fullName = formData.get('fullName') as string
  const email = formData.get('email') as string
  const country = formData.get('country') as string
  const phone = formData.get('phone') as string
  const medicalHistory = (formData.get('medicalHistory') as string) ?? ''

  if (!fullName || !email || !country || !phone) {
    return { success: false, message: 'Please fill in all required fields.' }
  }

  // ── TELEGRAM — send lead to group ─────────────────────────────────────────
  try {
    const claimId = generateClaimId()
    const lead = { claimId, fullName, email, country, phone, medicalHistory }

    const sent = await sendLeadToGroup(lead)

    if (sent) {
      registerLead(claimId, { fullName, email, country, phone, medicalHistory }, sent.messageId, sent.chatId)
    }
  } catch (err) {
    // Log silently — Telegram issues must never affect the user's form submit
    console.error('[Telegram notify]', err)
  }

  return { success: true, message: 'Request received! A care coordinator will call or WhatsApp you within 2 hours.' }
}
