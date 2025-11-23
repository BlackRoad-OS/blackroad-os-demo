import crypto from "crypto";

export interface DemoJournalEntry {
  id: string;
  timestamp: string;
  actorId: string;
  actionType: string;
  payload: unknown;
  previousHash?: string;
  hash: string;
}

export class DemoJournal {
  private lastHash: string | undefined;
  private entries: DemoJournalEntry[] = [];

  journal(actorId: string, actionType: string, payload: unknown): DemoJournalEntry {
    const id = crypto.randomUUID();
    const timestamp = new Date().toISOString();
    const previousHash = this.lastHash;
    const hash = this.computeHash({ id, timestamp, actorId, actionType, payload, previousHash });

    const entry: DemoJournalEntry = { id, timestamp, actorId, actionType, payload, previousHash, hash };
    this.entries.push(entry);
    this.lastHash = hash;
    return entry;
  }

  private computeHash(obj: Omit<DemoJournalEntry, "hash">): string {
    const h = crypto.createHash("sha256");
    h.update(JSON.stringify(obj));
    return h.digest("hex");
  }

  getEntries(): DemoJournalEntry[] {
    return [...this.entries];
  }
}
