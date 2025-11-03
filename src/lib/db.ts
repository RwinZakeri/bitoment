import postgres from "postgres";

// Get connection string from environment variable
const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://neondb_owner:npg_RYID5P6aZfzn@ep-empty-bush-ahhgx8s7-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

// Create Postgres database client
const sql = postgres(connectionString, {
  ssl: "require",
});

// Initialize database schema
async function initializeDatabase() {
  try {
    // Create users table
    // phoneNumber is TEXT to support long phone numbers (exceeding INTEGER max: 2,147,483,647)
    await sql`
  CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email TEXT NOT NULL UNIQUE,
        password TEXT,
        name TEXT,
        phoneNumber TEXT,
        nationalInsuranceNumber TEXT,
        birthDate TEXT,
        oauth_provider TEXT,
        oauth_id TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Migrate phoneNumber from INTEGER to TEXT if needed (for large phone numbers)
    // This allows phone numbers that exceed INTEGER max value (2,147,483,647)
    try {
      // First check the current type
      const columnInfo = await sql`
        SELECT data_type 
        FROM information_schema.columns 
        WHERE table_name = 'users' 
          AND column_name = 'phoneNumber'
        LIMIT 1
      `;

      if (columnInfo && columnInfo.length > 0) {
        const currentType = columnInfo[0].data_type;
        console.log(`Current phoneNumber column type: ${currentType}`);

        // If it's INTEGER or int4, migrate it
        if (currentType === "integer" || currentType === "int4") {
          console.log("Migrating phoneNumber from INTEGER to TEXT...");
          await sql`
            ALTER TABLE users 
            ALTER COLUMN phoneNumber TYPE TEXT 
            USING phoneNumber::TEXT
          `;
          console.log("✓ phoneNumber successfully migrated to TEXT");
        } else {
          console.log("✓ phoneNumber is already TEXT");
        }
      } else {
        console.log(
          "phoneNumber column doesn't exist yet (will be created as TEXT)"
        );
      }
    } catch (error) {
      console.error("Error during phoneNumber migration:", error);
      // Try direct migration as fallback (ignore errors if column doesn't exist or is already TEXT)
      try {
        await sql`ALTER TABLE users ALTER COLUMN phoneNumber TYPE TEXT USING phoneNumber::TEXT`;
        console.log("✓ phoneNumber migration completed (fallback)");
      } catch (directError: any) {
        // Column might already be TEXT or not exist, that's okay
        if (
          directError?.message?.includes("does not exist") ||
          directError?.message?.includes("already")
        ) {
          console.log("✓ phoneNumber column is already TEXT or doesn't exist");
        } else {
          console.error("Failed to migrate phoneNumber:", directError);
        }
      }
    }

    // Add oauth_provider column if it doesn't exist
    await sql`
      DO $$ 
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.columns 
          WHERE table_name = 'users' AND column_name = 'oauth_provider'
        ) THEN
          ALTER TABLE users ADD COLUMN oauth_provider TEXT;
        END IF;
      END $$;
    `;

    // Add oauth_id column if it doesn't exist
    await sql`
      DO $$ 
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.columns 
          WHERE table_name = 'users' AND column_name = 'oauth_id'
        ) THEN
          ALTER TABLE users ADD COLUMN oauth_id TEXT;
        END IF;
      END $$;
    `;

    // Create password_reset_otps table
    await sql`
  CREATE TABLE IF NOT EXISTS password_reset_otps (
        id SERIAL PRIMARY KEY,
    email TEXT NOT NULL,
    otp TEXT NOT NULL,
    expires_at TEXT NOT NULL,
    used BOOLEAN DEFAULT FALSE,
    state INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    verified_at TEXT
  )
    `;

    // Add state column if it doesn't exist
    await sql`
      DO $$ 
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.columns 
          WHERE table_name = 'password_reset_otps' AND column_name = 'state'
        ) THEN
          ALTER TABLE password_reset_otps ADD COLUMN state INTEGER DEFAULT 0;
        END IF;
      END $$;
    `;

    // Add verified_at column if it doesn't exist
    await sql`
      DO $$ 
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.columns 
          WHERE table_name = 'password_reset_otps' AND column_name = 'verified_at'
        ) THEN
          ALTER TABLE password_reset_otps ADD COLUMN verified_at TEXT;
        END IF;
      END $$;
    `;

    // Create user_devices table
    await sql`
  CREATE TABLE IF NOT EXISTS user_devices (
        id SERIAL PRIMARY KEY,
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
        last_seen TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    UNIQUE(user_id, device_id)
  )
    `;

    // Create indexes for user_devices
    await sql`
      CREATE INDEX IF NOT EXISTS idx_user_devices_user_id ON user_devices (user_id)
    `;

    await sql`
      CREATE INDEX IF NOT EXISTS idx_user_devices_device_id ON user_devices (device_id)
    `;

    // Create login_sessions table
    await sql`
  CREATE TABLE IF NOT EXISTS login_sessions (
        id SERIAL PRIMARY KEY,
    user_email TEXT NOT NULL,
    device_name TEXT,
    os TEXT,
    browser TEXT,
    ip TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create indexes for login_sessions
    await sql`
      CREATE INDEX IF NOT EXISTS idx_login_sessions_user_email ON login_sessions (user_email)
    `;

    await sql`
      CREATE INDEX IF NOT EXISTS idx_login_sessions_created_at ON login_sessions (created_at)
    `;

    // Create wallets table
    await sql`
  CREATE TABLE IF NOT EXISTS wallets (
        id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL UNIQUE,
        balance NUMERIC(20, 8) DEFAULT 0.0,
    currency TEXT DEFAULT 'USD',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
  )
    `;

    // Create index for wallets
    await sql`
      CREATE INDEX IF NOT EXISTS idx_wallets_user_id ON wallets (user_id)
    `;

    // Create cpg_links table
    await sql`
  CREATE TABLE IF NOT EXISTS cpg_links (
        id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    link_id TEXT NOT NULL UNIQUE,
    order_id TEXT,
        price NUMERIC(20, 8) NOT NULL,
    currency TEXT NOT NULL DEFAULT 'USDT',
    url TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
  )
    `;

    // Create indexes for cpg_links
    await sql`
      CREATE INDEX IF NOT EXISTS idx_cpg_links_user_id ON cpg_links (user_id)
    `;

    await sql`
      CREATE INDEX IF NOT EXISTS idx_cpg_links_link_id ON cpg_links (link_id)
    `;

    console.log("Database schema initialized successfully");
  } catch (error) {
    console.error("Error initializing database schema:", error);
    // Don't throw - let the app start, but log the error
  }
}

// Force phoneNumber migration immediately - runs on every server start
async function forcePhoneNumberMigration() {
  try {
    console.log("🔍 Checking phoneNumber column type...");

    // Try to get column info
    const columnInfo = await sql`
      SELECT data_type, udt_name
      FROM information_schema.columns 
      WHERE table_name = 'users' 
        AND column_name = 'phoneNumber'
      LIMIT 1
    `;

    if (columnInfo && columnInfo.length > 0) {
      const currentType = columnInfo[0].data_type || columnInfo[0].udt_name;
      console.log(`📊 Current phoneNumber column type: ${currentType}`);

      // Check if it's any integer type
      if (
        currentType === "integer" ||
        currentType === "int4" ||
        currentType === "int" ||
        currentType === "int32" ||
        columnInfo[0].udt_name === "int4"
      ) {
        console.log("⚠️  phoneNumber is INTEGER - migrating to TEXT NOW...");

        // Force migration - convert all existing values and change type
        await sql.unsafe(`
          ALTER TABLE users 
          ALTER COLUMN phoneNumber TYPE TEXT 
          USING phoneNumber::TEXT
        `);

        console.log("✅ SUCCESS: phoneNumber migrated from INTEGER to TEXT!");
      } else if (
        currentType === "text" ||
        currentType === "character varying" ||
        currentType === "varchar" ||
        columnInfo[0].udt_name === "text"
      ) {
        console.log("✅ phoneNumber is already TEXT - ready to use");
      } else {
        console.log(
          `⚠️  phoneNumber type is: ${currentType} - ensuring it's TEXT...`
        );
        // Try to migrate anyway if it's not TEXT
        try {
          await sql.unsafe(`
            ALTER TABLE users 
            ALTER COLUMN phoneNumber TYPE TEXT 
            USING COALESCE(phoneNumber::TEXT, '')
          `);
          console.log("✅ phoneNumber forced to TEXT");
        } catch (e) {
          console.log(
            "⚠️  Could not force migration (may already be correct):",
            e
          );
        }
      }
    } else {
      console.log(
        "ℹ️  phoneNumber column doesn't exist yet (will be created as TEXT)"
      );
    }
  } catch (error: any) {
    console.error(
      "❌ Error during phoneNumber migration:",
      error?.message || error
    );
    // Try one more time with direct SQL
    try {
      await sql.unsafe(
        `ALTER TABLE users ALTER COLUMN phoneNumber TYPE TEXT USING phoneNumber::TEXT`
      );
      console.log("✅ phoneNumber migration succeeded (fallback method)");
    } catch (fallbackError: any) {
      if (
        fallbackError?.message?.includes("does not exist") ||
        fallbackError?.message?.includes("already") ||
        fallbackError?.code === "42704"
      ) {
        console.log("ℹ️  phoneNumber column doesn't exist or is already TEXT");
      } else {
        console.error(
          "❌ Failed to migrate phoneNumber:",
          fallbackError?.message || fallbackError
        );
      }
    }
  }
}

// Initialize database on module load
initializeDatabase()
  .then(async () => {
    // Force phoneNumber migration immediately after initialization
    await forcePhoneNumberMigration();
  })
  .catch((error) => {
    console.error("Failed to initialize database:", error);
    // Try migration anyway
    forcePhoneNumberMigration().catch(console.error);
  });

// Helper to convert ? placeholders to $1, $2, etc. for Postgres
function convertQuery(
  query: string,
  params: unknown[]
): { query: string; values: unknown[] } {
  let paramIndex = 0;
  const convertedQuery = query.replace(/\?/g, () => `$${++paramIndex}`);
  return { query: convertedQuery, values: params };
}

// Type for database interface
type DbInterface = {
  prepare(query: string): {
    get<T = unknown>(...params: unknown[]): Promise<T | undefined>;
    all<T = unknown>(...params: unknown[]): Promise<T[]>;
    run(
      ...params: unknown[]
    ): Promise<{ lastInsertRowid?: number; changes?: number }>;
  };
  transaction<T>(callback: () => T): T;
  transactionAsync<T>(callback: (db: DbInterface) => Promise<T>): Promise<T>;
};

// Database interface that mimics better-sqlite3 API for easier migration
const db: DbInterface = {
  // Prepare a statement (returns an object with get, all, run methods)
  prepare(query: string) {
    return {
      // Get single row (like SQLite's .get())
      async get<T = unknown>(...params: unknown[]): Promise<T | undefined> {
        const { query: convertedQuery, values } = convertQuery(query, params);
        const result = await sql.unsafe(convertedQuery, values as never[]);
        return (result[0] as unknown as T) || undefined;
      },

      // Get all rows (like SQLite's .all())
      async all<T = unknown>(...params: unknown[]): Promise<T[]> {
        const { query: convertedQuery, values } = convertQuery(query, params);
        const result = await sql.unsafe(convertedQuery, values as never[]);
        return result as unknown[] as T[];
      },

      // Execute query (like SQLite's .run())
      async run(
        ...params: unknown[]
      ): Promise<{ lastInsertRowid?: number; changes?: number }> {
        // For INSERT queries, try to get the inserted ID using RETURNING
        if (query.trim().toUpperCase().startsWith("INSERT")) {
          const insertMatch = query.match(/INSERT\s+INTO\s+(\w+)/i);
          if (insertMatch) {
            // Try to add RETURNING id to get the inserted ID
            let queryWithReturning = query;
            if (!query.includes("RETURNING")) {
              queryWithReturning =
                query.replace(/;?\s*$/, "") + " RETURNING id";
            }

            try {
              const { query: convertedQuery, values } = convertQuery(
                queryWithReturning,
                params
              );
              const result = await sql.unsafe(
                convertedQuery,
                values as never[]
              );
              return {
                lastInsertRowid: (result[0] as unknown as { id: number })?.id,
                changes: result.length > 0 ? 1 : 0,
              };
            } catch {
              // If RETURNING fails, just execute the query
              const { query: convertedQuery, values } = convertQuery(
                query,
                params
              );
              await sql.unsafe(convertedQuery, values as never[]);
              return { changes: 1 };
            }
          }
        }

        // For UPDATE/DELETE queries, execute and return changes
        const { query: convertedQuery, values } = convertQuery(query, params);
        const result = await sql.unsafe(convertedQuery, values as never[]);
        // If RETURNING is present, result.length is the number of affected rows
        // If RETURNING is not present, result will be empty array, so we can't know the count
        // In that case, we assume 1 (for backward compatibility) but it's not accurate
        const hasReturning = query.toUpperCase().includes("RETURNING");
        return { changes: hasReturning ? result.length : result.length || 1 };
      },
    };
  },

  // Transaction helper - synchronous version throws error
  transaction<T>(callback?: () => T): T {
    if (callback) {
      // Unreachable - just here to match interface signature
    }
    throw new Error(
      "Transaction must be called asynchronously. Use db.transactionAsync() instead."
    );
  },

  // Async transaction helper
  async transactionAsync<T>(
    callback: (transactionDb: DbInterface) => Promise<T>
  ): Promise<T> {
    return (await sql.begin(async (transactionSql) => {
      // Create a transaction-specific db instance
      const transactionDb: DbInterface = {
        prepare(query: string) {
          return {
            async get<T = unknown>(
              ...params: unknown[]
            ): Promise<T | undefined> {
              const { query: convertedQuery, values } = convertQuery(
                query,
                params
              );
              const result = await transactionSql.unsafe(
                convertedQuery,
                values as never[]
              );
              return (result[0] as unknown as T) || undefined;
            },
            async all<T = unknown>(...params: unknown[]): Promise<T[]> {
              const { query: convertedQuery, values } = convertQuery(
                query,
                params
              );
              const result = await transactionSql.unsafe(
                convertedQuery,
                values as never[]
              );
              return result as unknown[] as T[];
            },
            async run(
              ...params: unknown[]
            ): Promise<{ lastInsertRowid?: number; changes?: number }> {
              if (query.trim().toUpperCase().startsWith("INSERT")) {
                const insertMatch = query.match(/INSERT\s+INTO\s+(\w+)/i);
                if (insertMatch && !query.includes("RETURNING")) {
                  const queryWithReturning =
                    query.replace(/;?\s*$/, "") + " RETURNING id";
                  try {
                    const { query: convertedQuery, values } = convertQuery(
                      queryWithReturning,
                      params
                    );
                    const result = await transactionSql.unsafe(
                      convertedQuery,
                      values as never[]
                    );
                    return {
                      lastInsertRowid: (result[0] as unknown as { id: number })
                        ?.id,
                      changes: result.length > 0 ? 1 : 0,
                    };
                  } catch {
                    const { query: convertedQuery, values } = convertQuery(
                      query,
                      params
                    );
                    await transactionSql.unsafe(
                      convertedQuery,
                      values as never[]
                    );
                    return { changes: 1 };
                  }
                }
              }
              const { query: convertedQuery, values } = convertQuery(
                query,
                params
              );
              const result = await transactionSql.unsafe(
                convertedQuery,
                values as never[]
              );
              // If RETURNING is present, result.length is the number of affected rows
              // If RETURNING is not present, result will be empty array, so we can't know the count
              const hasReturning = query.toUpperCase().includes("RETURNING");
              return {
                changes: hasReturning ? result.length : result.length || 1,
              };
            },
          };
        },
        transaction<T>(callback?: () => T): T {
          if (callback) {
            // Unreachable - just here to match interface signature
          }
          throw new Error("Nested transactions not supported");
        },
        transactionAsync<T>(
          callback?: (db: DbInterface) => Promise<T>
        ): Promise<T> {
          if (callback) {
            // Unreachable - just here to match interface signature
          }
          throw new Error("Nested transactions not supported");
        },
      };
      return await callback(transactionDb);
    })) as T;
  },
};

export default db;
export { sql };
