import fs from "fs";
import path from "path";
import { db, representationsTable, type Representation } from "@workspace/db";
import { eq } from "drizzle-orm";
import { logger } from "./logger";

export interface RepresentationInput {
  name: string;
  mobile: string;
  email?: string;
  constituency: string;
  category: string;
  message: string;
}

export interface StoredRepresentation {
  id: string | number;
  referenceNumber: string;
  name: string;
  mobile: string;
  email: string | null;
  constituency: string;
  category: string;
  message: string;
  status: string;
  createdAt: string;
}

const isVercel = !!process.env.VERCEL;
const LOCAL_DATA_DIR = path.resolve(process.cwd(), "data");
const TMP_DATA_DIR = path.join("/tmp", "data");
const DATA_DIR = isVercel ? TMP_DATA_DIR : LOCAL_DATA_DIR;
const STORE_FILE = path.join(DATA_DIR, "representations.json");
const SEED_FILE = path.join(LOCAL_DATA_DIR, "representations.json");

// In-memory fallback cache for serverless environments
let memoryStore: StoredRepresentation[] = [];
let isStoreInitialized = false;

function ensureStoreFile(): StoredRepresentation[] {
  if (isStoreInitialized && memoryStore.length > 0) {
    return memoryStore;
  }

  try {
    if (fs.existsSync(STORE_FILE)) {
      const raw = fs.readFileSync(STORE_FILE, "utf-8");
      memoryStore = JSON.parse(raw);
      isStoreInitialized = true;
      return memoryStore;
    }

    if (fs.existsSync(SEED_FILE)) {
      const raw = fs.readFileSync(SEED_FILE, "utf-8");
      memoryStore = JSON.parse(raw);
      isStoreInitialized = true;
      return memoryStore;
    }

    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(STORE_FILE, JSON.stringify([], null, 2), "utf-8");
    memoryStore = [];
    isStoreInitialized = true;
    return [];
  } catch (err) {
    logger.warn({ err }, "File store read failed; using in-memory representation store");
    isStoreInitialized = true;
    return memoryStore;
  }
}

function saveStoreFile(items: StoredRepresentation[]): void {
  memoryStore = items;
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(STORE_FILE, JSON.stringify(items, null, 2), "utf-8");
  } catch (err) {
    logger.warn({ err }, "File store write failed; state preserved in memory");
  }
}

export async function createRepresentation(input: RepresentationInput): Promise<StoredRepresentation> {
  const referenceNumber = `DSG-REP-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
  const now = new Date();

  const record: StoredRepresentation = {
    id: `rep_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    referenceNumber,
    name: input.name.trim(),
    mobile: input.mobile.trim(),
    email: input.email?.trim() || null,
    constituency: input.constituency.trim(),
    category: input.category.trim(),
    message: input.message.trim(),
    status: "RECEIVED",
    createdAt: now.toISOString(),
  };

  // 1. Persist to Postgres if available
  if (db) {
    try {
      const [inserted] = await db.insert(representationsTable).values({
        referenceNumber,
        name: record.name,
        mobile: record.mobile,
        email: record.email,
        constituency: record.constituency,
        category: record.category,
        message: record.message,
        status: record.status,
      }).returning();

      if (inserted) {
        record.id = inserted.id;
        record.createdAt = inserted.createdAt.toISOString();
      }
    } catch (err) {
      logger.warn({ err }, "Database insert failed; falling back to local file store");
    }
  }

  // 2. Persist to file store
  const items = ensureStoreFile();
  items.unshift(record);
  saveStoreFile(items);

  logger.info({ referenceNumber: record.referenceNumber, name: record.name }, "Representation stored successfully");
  return record;
}

export async function getAllRepresentations(): Promise<StoredRepresentation[]> {
  if (db) {
    try {
      const rows = await db.select().from(representationsTable);
      return rows.map((r: Representation) => ({
        id: r.id,
        referenceNumber: r.referenceNumber,
        name: r.name,
        mobile: r.mobile,
        email: r.email,
        constituency: r.constituency,
        category: r.category,
        message: r.message,
        status: r.status,
        createdAt: r.createdAt.toISOString(),
      }));
    } catch (err) {
      logger.warn({ err }, "Database select failed; returning file store");
    }
  }
  return ensureStoreFile();
}

export async function getRepresentationByReference(referenceNumber: string): Promise<StoredRepresentation | null> {
  if (db) {
    try {
      const [row] = await db
        .select()
        .from(representationsTable)
        .where(eq(representationsTable.referenceNumber, referenceNumber));
      if (row) {
        return {
          id: row.id,
          referenceNumber: row.referenceNumber,
          name: row.name,
          mobile: row.mobile,
          email: row.email,
          constituency: row.constituency,
          category: row.category,
          message: row.message,
          status: row.status,
          createdAt: row.createdAt.toISOString(),
        };
      }
    } catch (err) {
      logger.warn({ err }, "Database lookup failed; falling back to file store");
    }
  }

  const items = ensureStoreFile();
  return items.find((i) => i.referenceNumber === referenceNumber) || null;
}

