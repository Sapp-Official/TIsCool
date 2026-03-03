const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

let pool;
let schemaEnsured = false;
let schemaEnsurePromise;

function getConnectionString() {
  return (
    process.env.POSTGRES_URL ||
    process.env.DATABASE_URL ||
    process.env.POSTGRES_CONNECTION_STRING ||
    process.env.POSTGRES_PRISMA_URL ||
    process.env.POSTGRES_URL_NON_POOLING
  );
}

function shouldUseSsl(connectionString) {
  if (process.env.PGSSLMODE === 'disable') return false;
  if (!connectionString) return false;
  return process.env.NODE_ENV === 'production' || process.env.VERCEL === '1';
}

function getPool() {
  if (pool) return pool;

  const connectionString = getConnectionString();
  if (!connectionString) return null;

  const ssl = shouldUseSsl(connectionString) ? { rejectUnauthorized: false } : undefined;
  const max = Number.parseInt(process.env.PGPOOL_MAX || '5', 10);

  pool = new Pool({
    connectionString,
    ssl,
    max: Number.isFinite(max) ? max : 5,
  });

  return pool;
}

async function ensureSchema() {
  if (schemaEnsured) return;
  if (schemaEnsurePromise) return schemaEnsurePromise;

  const activePool = getPool();
  if (!activePool) {
    schemaEnsured = true;
    return;
  }

  schemaEnsurePromise = (async () => {
    const schemaPath = path.join(__dirname, 'sql', 'schema.sql');
    const sql = fs.readFileSync(schemaPath, 'utf8');
    await activePool.query(sql);
    schemaEnsured = true;
  })();

  return schemaEnsurePromise;
}

async function query(text, params) {
  const activePool = getPool();
  if (!activePool) {
    throw new Error('Postgres is not configured (missing POSTGRES_URL/DATABASE_URL)');
  }
  await ensureSchema();
  return activePool.query(text, params);
}

function hasDb() {
  return Boolean(getConnectionString());
}

module.exports = {
  hasDb,
  ensureSchema,
  query,
};
