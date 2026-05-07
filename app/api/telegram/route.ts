import { NextRequest, NextResponse } from 'next/server'
import { answerCallback, markAsClaimed } from '@/lib/telegram'
import { tryClaimLead } from '@/lib/claimStore'

// Parse lead fields out of the plain-text Telegram message.
// message.text strips HTML tags, so the emoji prefixes are reliable anchors.
function parseLeadFromText(text: string) {
  const name    = text.match(/👤\s+(.+)/)?.[1]?.trim()
  const country = text.match(/🌍\s+(.+)/)?.[1]?.trim()
  const phone   = text.match(/📞\s+(.+)/)?.[1]?.trim()
  const email   = text.match(/📧\s+(.+)/)?.[1]?.trim()
  const medical = text.match(/💊\s+(.+)/)?.[1]?.trim() ?? ''
  if (!name || !country || !phone || !email) return null
  return { fullName: name, country, phone, email, medicalHistory: medical }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const cq = body.callback_query
    if (!cq) return NextResponse.json({ ok: true })

    const { id: callbackId, from, data: callbackData } = cq

    // chatId and messageId come directly from the callback — no DB needed
    const chatId: number    = cq.message?.chat?.id
    const messageId: number = cq.message?.message_id
    const messageText: string = cq.message?.text ?? ''

    if (!callbackData?.startsWith('claim:')) {
      await answerCallback(callbackId, '❓ Unknown action')
      return NextResponse.json({ ok: true })
    }

    const claimId = callbackData.slice('claim:'.length)
    const claimerName =
      [from.first_name, from.last_name].filter(Boolean).join(' ') ||
      (from.username ? `@${from.username}` : 'A staff member')

    // Already-claimed check: read from message text (works across all Vercel instances)
    const claimedMatch = messageText.match(/✅ Claimed by (.+?) ·/)
    if (claimedMatch) {
      await answerCallback(callbackId, `❌ Already claimed by ${claimedMatch[1]}`, true)
      return NextResponse.json({ ok: true })
    }

    // Best-effort in-process dedup (handles same-instance race)
    const result = tryClaimLead(claimId, claimerName)

    if (result.success) {
      await answerCallback(callbackId, '✅ Lead claimed! Coordinate in the group.')
      const lead = parseLeadFromText(messageText)
      if (lead && chatId && messageId) {
        await markAsClaimed(chatId, messageId, lead, claimerName, new Date())
      }
    } else {
      await answerCallback(callbackId, `❌ Already claimed by ${result.claimerName}`, true)
    }
  } catch (err) {
    console.error('[Telegram webhook]', err)
  }

  // Always 200 — Telegram retries on any other status
  return NextResponse.json({ ok: true })
}
