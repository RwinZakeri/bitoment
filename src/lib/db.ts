import postgres from "postgres";

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://user:password@localhost:5432/dbname";

const sql = postgres(connectionString, {
  ssl: "require",
});

async function initializeDatabase() {
  try {
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
      currency TEXT, 
      theme TEXT, 
      language TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

    await sql`
      DO $$ 
      BEGIN
        IF EXISTS (
          SELECT 1 FROM information_schema.columns 
          WHERE table_name = 'users' AND column_name = 'phoneNumber' AND data_type = 'integer'
        ) THEN
          ALTER TABLE users ALTER COLUMN phoneNumber TYPE TEXT USING phoneNumber::TEXT;
        END IF;
      END $$;
    `;

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

    await sql`
      CREATE INDEX IF NOT EXISTS idx_user_devices_user_id ON user_devices (user_id)
    `;

    await sql`
      CREATE INDEX IF NOT EXISTS idx_user_devices_device_id ON user_devices (device_id)
    `;

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

    await sql`
      CREATE INDEX IF NOT EXISTS idx_login_sessions_user_email ON login_sessions (user_email)
    `;

    await sql`
      CREATE INDEX IF NOT EXISTS idx_login_sessions_created_at ON login_sessions (created_at)
    `;

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

    await sql`
      CREATE INDEX IF NOT EXISTS idx_wallets_user_id ON wallets (user_id)
    `;

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

    await sql`
      CREATE INDEX IF NOT EXISTS idx_cpg_links_user_id ON cpg_links (user_id)
    `;

    await sql`
      CREATE INDEX IF NOT EXISTS idx_cpg_links_link_id ON cpg_links (link_id)
    `;
  } catch (error) {
    console.error("Error initializing database schema:", error);
  }
}

async function forcePhoneNumberMigration() {
  try {
    const columnInfo = await sql`
      SELECT data_type, udt_name
      FROM information_schema.columns 
      WHERE table_name = 'users' 
        AND column_name = 'phoneNumber'
      LIMIT 1
    `;

    if (columnInfo && columnInfo.length > 0) {
      const currentType = columnInfo[0].data_type || columnInfo[0].udt_name;

      if (
        currentType === "integer" ||
        currentType === "int4" ||
        currentType === "int" ||
        currentType === "int32" ||
        columnInfo[0].udt_name === "int4"
      ) {
        await sql.unsafe(`
          ALTER TABLE users 
          ALTER COLUMN phoneNumber TYPE TEXT 
          USING phoneNumber::TEXT
        `);
      } else if (
        currentType === "text" ||
        currentType === "character varying" ||
        currentType === "varchar" ||
        columnInfo[0].udt_name === "text"
      ) {
      } else {
        try {
          await sql.unsafe(`
            ALTER TABLE users 
            ALTER COLUMN phoneNumber TYPE TEXT 
            USING COALESCE(phoneNumber::TEXT, '')
          `);
        } catch {}
      }
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("❌ Error during phoneNumber migration:", errorMessage);

    try {
      await sql.unsafe(
        `ALTER TABLE users ALTER COLUMN phoneNumber TYPE TEXT USING phoneNumber::TEXT`
      );
    } catch (fallbackError: unknown) {
      const fallbackMessage =
        fallbackError instanceof Error
          ? fallbackError.message
          : String(fallbackError);
      const fallbackCode =
        fallbackError &&
        typeof fallbackError === "object" &&
        "code" in fallbackError
          ? String(fallbackError.code)
          : "";
      if (
        fallbackMessage.includes("does not exist") ||
        fallbackMessage.includes("already") ||
        fallbackCode === "42704"
      ) {
      } else {
        console.error("❌ Failed to migrate phoneNumber:", fallbackMessage);
      }
    }
  }
}

initializeDatabase()
  .then(async () => {
    await forcePhoneNumberMigration();
  })
  .catch((error) => {
    console.error("Failed to initialize database:", error);

    forcePhoneNumberMigration().catch(console.error);
  });

function convertQuery(
  query: string,
  params: unknown[]
): { query: string; values: unknown[] } {
  let paramIndex = 0;
  const convertedQuery = query.replace(/\?/g, () => `$${++paramIndex}`);
  return { query: convertedQuery, values: params };
}

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

const db: DbInterface = {
  prepare(query: string) {
    return {
      async get<T = unknown>(...params: unknown[]): Promise<T | undefined> {
        const { query: convertedQuery, values } = convertQuery(query, params);
        const result = await sql.unsafe(convertedQuery, values as never[]);
        return (result[0] as unknown as T) || undefined;
      },

      async all<T = unknown>(...params: unknown[]): Promise<T[]> {
        const { query: convertedQuery, values } = convertQuery(query, params);
        const result = await sql.unsafe(convertedQuery, values as never[]);
        return result as unknown[] as T[];
      },

      async run(
        ...params: unknown[]
      ): Promise<{ lastInsertRowid?: number; changes?: number }> {
        if (query.trim().toUpperCase().startsWith("INSERT")) {
          const insertMatch = query.match(/INSERT\s+INTO\s+(\w+)/i);
          if (insertMatch) {
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
              const { query: convertedQuery, values } = convertQuery(
                query,
                params
              );
              await sql.unsafe(convertedQuery, values as never[]);
              return { changes: 1 };
            }
          }
        }

        const { query: convertedQuery, values } = convertQuery(query, params);
        const result = await sql.unsafe(convertedQuery, values as never[]);

        const hasReturning = query.toUpperCase().includes("RETURNING");
        return { changes: hasReturning ? result.length : result.length || 1 };
      },
    };
  },

  transaction<T>(callback?: () => T): T {
    if (callback) {
    }
    throw new Error(
      "Transaction must be called asynchronously. Use db.transactionAsync() instead."
    );
  },

  async transactionAsync<T>(
    callback: (transactionDb: DbInterface) => Promise<T>
  ): Promise<T> {
    return (await sql.begin(async (transactionSql) => {
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

              const hasReturning = query.toUpperCase().includes("RETURNING");
              return {
                changes: hasReturning ? result.length : result.length || 1,
              };
            },
          };
        },
        transaction<T>(callback?: () => T): T {
          if (callback) {
          }
          throw new Error("Nested transactions not supported");
        },
        transactionAsync<T>(
          callback?: (db: DbInterface) => Promise<T>
        ): Promise<T> {
          if (callback) {
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
