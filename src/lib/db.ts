import Database from "better-sqlite3";
import fs from "fs";
import path from "path";

const dataDir = path.resolve(process.cwd(), "data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.resolve(dataDir, "database.sqlite");
const db = new Database(dbPath);

db.prepare(
  `
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    name TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  )
`
).run();

// Create OTP table for password reset
db.prepare(
  `
  CREATE TABLE IF NOT EXISTS password_reset_otps (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL,
    otp TEXT NOT NULL,
    expires_at TEXT NOT NULL,
    used BOOLEAN DEFAULT FALSE,
    state INTEGER DEFAULT 0,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    verified_at TEXT
  )
`
).run();

// Add state column to existing table if it doesn't exist
try {
  db.prepare(
    `ALTER TABLE password_reset_otps ADD COLUMN state INTEGER DEFAULT 0`
  ).run();
} catch (error) {
  // Column already exists, ignore error
  console.log("State column already exists or table doesn't exist yet");
}

// Add verified_at column to existing table if it doesn't exist
try {
  db.prepare(
    `ALTER TABLE password_reset_otps ADD COLUMN verified_at TEXT`
  ).run();
} catch (error) {
  // Column already exists, ignore error
  console.log("Verified_at column already exists or table doesn't exist yet");
}

export default db;
