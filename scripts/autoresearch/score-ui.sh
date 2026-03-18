#!/bin/bash
# score-ui.sh — Takes a screenshot of a URL and scores it using Haiku vision.
#
# Usage: ./score-ui.sh http://localhost:3333
# Outputs: A single number 0-100 to stdout
# Requires: ANTHROPIC_API_KEY env var, Playwright installed

set -euo pipefail

URL="${1:?Usage: score-ui.sh <url>}"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
SCREENSHOTS_DIR="$SCRIPT_DIR/screenshots"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
SCREENSHOT_PATH="$SCREENSHOTS_DIR/${TIMESTAMP}.png"

# Take screenshot
npx playwright screenshot "$URL" --full-page -o "$SCREENSHOT_PATH" 2>/dev/null

# Base64 encode the image
BASE64_IMAGE=$(base64 < "$SCREENSHOT_PATH")

# Score with Haiku vision
RESPONSE=$(curl -s https://api.anthropic.com/v1/messages \
  -H "content-type: application/json" \
  -H "x-api-key: ${ANTHROPIC_API_KEY}" \
  -H "anthropic-version: 2023-06-01" \
  -d "{
    \"model\": \"claude-haiku-4-5-20251001\",
    \"max_tokens\": 100,
    \"temperature\": 0,
    \"messages\": [{
      \"role\": \"user\",
      \"content\": [
        {
          \"type\": \"image\",
          \"source\": {
            \"type\": \"base64\",
            \"media_type\": \"image/png\",
            \"data\": \"${BASE64_IMAGE}\"
          }
        },
        {
          \"type\": \"text\",
          \"text\": \"Score this web page UI on a scale of 0-100 for visual quality. Consider: typography hierarchy, color harmony, spacing rhythm, visual hierarchy, whitespace, professional polish. Dark mode execution. Deduct for: pure black/white, inconsistent spacing, cluttered layout, generic feel, poor contrast. Output ONLY a single integer, nothing else.\"
        }
      ]
    }]
  }")

# Extract the score number
SCORE=$(echo "$RESPONSE" | python3 -c "import sys,json; data=json.load(sys.stdin); print(data['content'][0]['text'].strip())" 2>/dev/null || echo "0")

# Log to results.tsv
echo -e "${TIMESTAMP}\t${SCORE}\t${URL}" >> "$SCRIPT_DIR/results.tsv"

echo "$SCORE"
