/**
 * Local dev polling script — no public URL needed.
 * Run: node scripts/telegram-poll.mjs
 * Stop: Ctrl+C
 */

import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

function readEnvLocal() {
  try {
    const content = readFileSync(join(__dirname, '..', '.env.local'), 'utf8')
    return Object.fromEntries(
      content.split('\n')
        .filter(l => l.includes('=') && !l.startsWith('#'))
        .map(l => l.split('=').map(s => s.trim()))
    )
  } catch {
    return {}
  }
}

const env = readEnvLocal()
const TOKEN = env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_BOT_TOKEN

if (!TOKEN) {
  console.error('ERROR: TELEGRAM_BOT_TOKEN not found in .env.local')
  process.exit(1)
}

const LOCAL = 'http://localhost:3000/api/telegram'
const API   = `https://api.telegram.org/bot${TOKEN}`

let offset  = 0
let running = false   // mutex — never two requests at once

async function poll() {
  if (running) return
  running = true

  try {
    // timeout=0  → short poll, returns immediately, no conflict ever
    const res  = await fetch(`${API}/getUpdates?offset=${offset}&timeout=0&allowed_updates=["callback_query"]`)
    const body = await res.json()

    if (!body.ok) {
      console.error('getUpdates error:', body.description)
      running = false
      return
    }

    for (const update of body.result) {
      offset = update.update_id + 1

      if (!update.callback_query) continue

      const { data, from } = update.callback_query
      const name = [from.first_name, from.last_name].filter(Boolean).join(' ') || from.username
      console.log(`[click] ${name}  →  ${data}`)

      const fwd = await fetch(LOCAL, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(update),
      })

      console.log(`[webhook] → HTTP ${fwd.status}`)
    }
  } catch (err) {
    console.error('poll error:', err.message)
  }

  running = false
}

console.log('Polling Telegram for button clicks  (Ctrl+C to stop)...\n')
setInterval(poll, 1000)
poll()
