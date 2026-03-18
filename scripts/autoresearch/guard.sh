#!/bin/bash
# guard.sh — Build guard for autoresearch iterations.
# Exit 0 = build passes, exit 1 = build broken.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$(dirname "$SCRIPT_DIR")")"

cd "$PROJECT_DIR"
npm run build > /dev/null 2>&1
