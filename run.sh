#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log()  { echo -e "${GREEN}[run]${NC} $*"; }
warn() { echo -e "${YELLOW}[run]${NC} $*"; }
fail() { echo -e "${RED}[run]${NC} $*"; exit 1; }

# ── Preflight checks ───────────────────────────────────────────────
command -v docker   >/dev/null 2>&1 || fail "docker not found – install Docker Desktop first"
command -v python3  >/dev/null 2>&1 || fail "python3 not found"
command -v npm      >/dev/null 2>&1 || fail "npm not found"

# ── 1. Start databases ─────────────────────────────────────────────
log "Starting PostgreSQL and MongoDB containers…"
docker compose up -d

# ── 2. Wait for PostgreSQL to be ready ──────────────────────────────
log "Waiting for PostgreSQL to accept connections…"
retries=0
until docker compose exec -T postgres pg_isready -U postgres >/dev/null 2>&1; do
  retries=$((retries + 1))
  if [ "$retries" -ge 30 ]; then
    fail "PostgreSQL did not become ready in time"
  fi
  sleep 1
done
log "PostgreSQL is ready."

# ── 3. Wait for MongoDB to be ready ─────────────────────────────────
log "Waiting for MongoDB to accept connections…"
retries=0
until docker compose exec -T mongodb mongosh --quiet --eval "db.runCommand({ping:1})" >/dev/null 2>&1; do
  retries=$((retries + 1))
  if [ "$retries" -ge 30 ]; then
    fail "MongoDB did not become ready in time"
  fi
  sleep 1
done
log "MongoDB is ready."

# ── 4. Install Python deps ─────────────────────────────────────────
log "Installing Python dependencies…"
pip3 install -q -r requirements.txt

# ── 5. Build frontend (if needed) ──────────────────────────────────
if [ ! -d static/build ] || [ "$(find static/src -newer static/build -print -quit 2>/dev/null)" ]; then
  log "Building frontend…"
  (cd static && npm install --silent && npm run build)
else
  log "Frontend build is up to date – skipping."
fi

# ── 6. Start Flask ─────────────────────────────────────────────────
log "Starting Flask on http://localhost:5001 …"
exec python3 application.py
