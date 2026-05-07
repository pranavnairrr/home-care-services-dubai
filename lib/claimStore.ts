import path from 'path'

interface LeadSnapshot {
  fullName: string
  email: string
  country: string
  phone: string
  medicalHistory: string
}

export interface ClaimRecord {
  lead: LeadSnapshot
  messageId: number
  chatId: number
  claimerName?: string
  claimedAt?: Date
}

declare global {
  // eslint-disable-next-line no-var
  var __claimDb: ReturnType<typeof import('better-sqlite3')> | undefined
  // eslint-disable-next-line no-var
  var __claimDbFailed: boolean | undefined
  // eslint-disable-next-line no-var
  var __claimStore: Map<string, ClaimRecord> | undefined
}

// Dynamic require so a missing/incompatible native binary never crashes the module.
// Falls back to in-memory Map (ephemeral, but Telegram still works within a process lifetime).
function getDb() {
  if (global.__claimDbFailed) return null
  if (global.__claimDb) return global.__claimDb

  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const Database = require('better-sqlite3')
    const dbPath = process.env.VERCEL
      ? '/tmp/claims.db'
      : path.join(process.cwd(), 'data', 'claims.db')
    const db = new Database(dbPath)
    db.exec(`
      CREATE TABLE IF NOT EXISTS claims (
        claim_id     TEXT PRIMARY KEY,
        full_name    TEXT NOT NULL,
        email        TEXT NOT NULL,
        country      TEXT NOT NULL,
        phone        TEXT NOT NULL,
        medical      TEXT,
        message_id   INTEGER NOT NULL,
        chat_id      INTEGER NOT NULL,
        claimer_name TEXT,
        claimed_at   TEXT,
        created_at   TEXT NOT NULL DEFAULT (datetime('now'))
      )
    `)
    global.__claimDb = db
    return db
  } catch {
    global.__claimDbFailed = true
    return null
  }
}

function getMemStore(): Map<string, ClaimRecord> {
  if (!global.__claimStore) global.__claimStore = new Map()
  return global.__claimStore
}

export function registerLead(
  claimId: string,
  lead: LeadSnapshot,
  messageId: number,
  chatId: number
): void {
  const db = getDb()
  if (db) {
    db.prepare(
      `INSERT OR IGNORE INTO claims
        (claim_id, full_name, email, country, phone, medical, message_id, chat_id)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    ).run(claimId, lead.fullName, lead.email, lead.country, lead.phone, lead.medicalHistory ?? '', messageId, chatId)
  } else {
    getMemStore().set(claimId, { lead, messageId, chatId })
  }
}

export function tryClaimLead(
  claimId: string,
  claimerName: string
): { success: true } | { success: false; claimerName: string } {
  const db = getDb()

  if (db) {
    const row = db.prepare('SELECT claimer_name FROM claims WHERE claim_id = ?').get(claimId) as
      | { claimer_name: string | null }
      | undefined
    if (!row) return { success: false, claimerName: 'someone' }
    if (row.claimer_name) return { success: false, claimerName: row.claimer_name }
    db.prepare(
      `UPDATE claims SET claimer_name = ?, claimed_at = datetime('now') WHERE claim_id = ?`
    ).run(claimerName, claimId)
    return { success: true }
  } else {
    const store = getMemStore()
    const record = store.get(claimId)
    if (!record) return { success: false, claimerName: 'someone' }
    if (record.claimerName) return { success: false, claimerName: record.claimerName }
    record.claimerName = claimerName
    record.claimedAt = new Date()
    return { success: true }
  }
}

export function getRecord(claimId: string): ClaimRecord | undefined {
  const db = getDb()

  if (db) {
    const row = db.prepare('SELECT * FROM claims WHERE claim_id = ?').get(claimId) as
      | { full_name: string; email: string; country: string; phone: string; medical: string; message_id: number; chat_id: number; claimer_name: string | null; claimed_at: string | null }
      | undefined
    if (!row) return undefined
    return {
      lead: { fullName: row.full_name, email: row.email, country: row.country, phone: row.phone, medicalHistory: row.medical },
      messageId: row.message_id,
      chatId: row.chat_id,
      claimerName: row.claimer_name ?? undefined,
      claimedAt: row.claimed_at ? new Date(row.claimed_at) : undefined,
    }
  } else {
    return getMemStore().get(claimId)
  }
}
