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
    password TEXT,
    name TEXT,
    phoneNumber INTEGER,
    nationalInsuranceNumber TEXT,
    birthDate TEXT,
    oauth_provider TEXT,
    oauth_id TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  )
`
).run();

// Ensure password column allows NULL for OAuth users
// SQLite doesn't support dropping NOT NULL constraints directly
// We need to recreate the table to remove the constraint
try {
  // Check table info to see if password column has NOT NULL constraint
  const tableInfo = db.prepare("PRAGMA table_info(users)").all() as Array<{
    cid: number;
    name: string;
    type: string;
    notnull: number;
    dflt_value: string | null;
    pk: number;
  }>;

  const passwordColumn = tableInfo.find((col) => col.name === "password");

  // If password column has NOT NULL constraint (notnull = 1), migrate the table
  if (passwordColumn && passwordColumn.notnull === 1) {
    console.log(
      "Migrating users table to allow NULL passwords for OAuth users..."
    );

    // Disable foreign key constraints temporarily for migration
    db.prepare("PRAGMA foreign_keys = OFF").run();

    // Create a new table with the correct schema (password nullable)
    db.prepare(
      `
      CREATE TABLE users_migration (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL UNIQUE,
        password TEXT,
        name TEXT,
        phoneNumber INTEGER,
        nationalInsuranceNumber TEXT,
        birthDate TEXT,
        oauth_provider TEXT,
        oauth_id TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `
    ).run();

    // Copy data from old table to new table
    db.prepare(
      `
      INSERT INTO users_migration 
      SELECT id, email, password, name, phoneNumber, nationalInsuranceNumber, 
             birthDate, oauth_provider, oauth_id, created_at
      FROM users
    `
    ).run();

    // Drop old table
    db.prepare("DROP TABLE users").run();

    // Rename new table to original name
    db.prepare("ALTER TABLE users_migration RENAME TO users").run();

    // Re-enable foreign key constraints
    db.prepare("PRAGMA foreign_keys = ON").run();

    console.log(
      "Migration completed successfully - password column now allows NULL."
    );
  }
} catch (error) {
  // If migration fails, log but don't crash - the INSERT with explicit NULL should still work
  console.error("Error during password column migration:", error);
  // Re-enable foreign keys in case of error
  try {
    db.prepare("PRAGMA foreign_keys = ON").run();
  } catch {
    // Ignore
  }
}

try {
  db.prepare(`ALTER TABLE users ADD COLUMN oauth_provider TEXT`).run();
} catch {
  // Column already exists, ignore error
}

try {
  db.prepare(`ALTER TABLE users ADD COLUMN oauth_id TEXT`).run();
} catch {
  // Column already exists, ignore error
}

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
}

// Add verified_at column to existing table if it doesn't exist
try {
  db.prepare(
    `ALTER TABLE password_reset_otps ADD COLUMN verified_at TEXT`
  ).run();
} catch {
  // Column already exists, ignore error
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

// Create cpg_links table for payment links
db.prepare(
  `
  CREATE TABLE IF NOT EXISTS cpg_links (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    link_id TEXT NOT NULL UNIQUE,
    order_id TEXT,
    price REAL NOT NULL,
    currency TEXT NOT NULL DEFAULT 'USDT',
    url TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'active',
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
  )
`
).run();

// Create index for better performance on cpg_links
db.prepare(
  `CREATE INDEX IF NOT EXISTS idx_cpg_links_user_id ON cpg_links (user_id)`
).run();

db.prepare(
  `CREATE INDEX IF NOT EXISTS idx_cpg_links_link_id ON cpg_links (link_id)`
).run();

export default db;
