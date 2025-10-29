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
    phoneNumber INTEGER,
    nationalInsuranceNumber TEXT,
    birthDate TEXT,
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
} catch {
  // Column already exists, ignore error
  console.log("State column already exists or table doesn't exist yet");
}

// Add verified_at column to existing table if it doesn't exist
try {
  db.prepare(
    `ALTER TABLE password_reset_otps ADD COLUMN verified_at TEXT`
  ).run();
} catch {
  // Column already exists, ignore error
  console.log("Verified_at column already exists or table doesn't exist yet");
}

// Create user_devices table for tracking user device information
db.prepare(
  `
  CREATE TABLE IF NOT EXISTS user_devices (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    device_id TEXT NOT NULL,
    device_name TEXT,
    device_type TEXT,
    operating_system TEXT,
    browser TEXT,
    browser_version TEXT,
    user_agent TEXT,
    ip_address TEXT,
    location TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    last_seen TEXT DEFAULT CURRENT_TIMESTAMP,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    UNIQUE(user_id, device_id)
  )
`
).run();

// Create index for better performance
db.prepare(
  `CREATE INDEX IF NOT EXISTS idx_user_devices_user_id ON user_devices (user_id)`
).run();

db.prepare(
  `CREATE INDEX IF NOT EXISTS idx_user_devices_device_id ON user_devices (device_id)`
).run();

// Create login_sessions table for tracking login sessions
db.prepare(
  `
  CREATE TABLE IF NOT EXISTS login_sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_email TEXT NOT NULL,
    device_name TEXT,
    os TEXT,
    browser TEXT,
    ip TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`
).run();

// Create index for better performance on login_sessions
db.prepare(
  `CREATE INDEX IF NOT EXISTS idx_login_sessions_user_email ON login_sessions (user_email)`
).run();

db.prepare(
  `CREATE INDEX IF NOT EXISTS idx_login_sessions_created_at ON login_sessions (created_at)`
).run();

// Create wallets table for user wallet balances
db.prepare(
  `
  CREATE TABLE IF NOT EXISTS wallets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL UNIQUE,
    balance REAL DEFAULT 0.0,
    currency TEXT DEFAULT 'USD',
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
  )
`
).run();

// Create index for better performance on wallets
db.prepare(
  `CREATE INDEX IF NOT EXISTS idx_wallets_user_id ON wallets (user_id)`
).run();

export default db;
