/* eslint-disable no-console */
const path = require('path');
const fs = require('fs');
const { Pool } = require('pg');

const connectionString =
  process.env.POSTGRES_URL ||
  process.env.DATABASE_URL ||
  process.env.POSTGRES_CONNECTION_STRING ||
  process.env.POSTGRES_PRISMA_URL ||
  process.env.POSTGRES_URL_NON_POOLING;

if (!connectionString) {
  console.error('Missing POSTGRES_URL (or DATABASE_URL).');
  process.exit(1);
}

const ssl = (process.env.NODE_ENV === 'production' || process.env.VERCEL === '1')
  ? { rejectUnauthorized: false }
  : undefined;

const pool = new Pool({ connectionString, ssl });

async function main() {
  const schemaPath = path.join(__dirname, '..', 'sql', 'schema.sql');
  const sql = fs.readFileSync(schemaPath, 'utf8');
  await pool.query(sql);
  console.log('Database schema applied successfully.');
}

main()
  .then(() => pool.end())
  .catch((err) => {
    console.error('Failed to apply schema:', err);
    pool.end().finally(() => process.exit(1));
  });
