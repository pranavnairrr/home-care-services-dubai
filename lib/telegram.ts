const BASE = () =>
  `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}`

export interface LeadPayload {
  claimId: string
  fullName: string
  email: string
  country: string
  phone: string
  medicalHistory: string
}

function buildLeadText(lead: Omit<LeadPayload, 'claimId'>, claimed?: { by: string; at: Date }): string {
  const time = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Dubai',
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: 'short',
  })

  let msg = `🏥 <b>New Lead — AM Health Hub</b>\n\n`
  msg += `👤 <b>${lead.fullName}</b>\n`
  msg += `🌍 ${lead.country}\n`
  msg += `📞 <code>${lead.phone}</code>\n`
  msg += `📧 ${lead.email}\n`

  if (lead.medicalHistory?.trim()) {
    msg += `\n💊 <i>${lead.medicalHistory.trim()}</i>\n`
  }

  msg += `\n⏰ ${time} (GST)`

  if (claimed) {
    const claimTime = claimed.at.toLocaleString('en-IN', {
      timeZone: 'Asia/Dubai',
      hour: '2-digit',
      minute: '2-digit',
    })
    msg += `\n\n✅ <b>Claimed by ${claimed.by}</b> · ${claimTime}`
  } else {
    msg += `\n\n<i>Tap below to claim — first to click gets it</i>`
  }

  return msg
}

export async function sendLeadToGroup(
  lead: LeadPayload
): Promise<{ messageId: number; chatId: number } | null> {
  const groupId = process.env.TELEGRAM_GROUP_ID
  if (!groupId || !process.env.TELEGRAM_BOT_TOKEN) return null

  const res = await fetch(`${BASE()}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: groupId,
      text: buildLeadText(lead),
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: [
          [{ text: '✋  Claim This Lead', callback_data: `claim:${lead.claimId}` }],
        ],
      },
    }),
  })

  if (!res.ok) {
    console.error('[Telegram] sendMessage failed:', await res.text())
    return null
  }

  const data = await res.json()
  return {
    messageId: data.result.message_id,
    chatId: data.result.chat.id,
  }
}

export async function markAsClaimed(
  chatId: number,
  messageId: number,
  lead: Omit<LeadPayload, 'claimId'>,
  claimerName: string,
  claimedAt: Date
): Promise<void> {
  await fetch(`${BASE()}/editMessageText`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      message_id: messageId,
      text: buildLeadText(lead, { by: claimerName, at: claimedAt }),
      parse_mode: 'HTML',
      // No reply_markup = removes the inline keyboard (button disappears)
    }),
  })
}

export async function answerCallback(
  callbackQueryId: string,
  text: string,
  showAlert = false
): Promise<void> {
  await fetch(`${BASE()}/answerCallbackQuery`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      callback_query_id: callbackQueryId,
      text,
      show_alert: showAlert,
    }),
  })
}
