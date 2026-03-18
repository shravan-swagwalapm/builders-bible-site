#!/bin/bash
# Copies book content from builders-bible repo into content/ for build.
# Used locally when content/ directory doesn't exist.
# On Vercel, content/ is committed directly to the repo.

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
CONTENT_DIR="$PROJECT_DIR/content"
BOOK_DIR="$HOME/builders-bible/book"

if [ -d "$CONTENT_DIR" ] && [ "$(ls -A "$CONTENT_DIR" 2>/dev/null)" ]; then
  echo "content/ already exists and is not empty, skipping copy."
  exit 0
fi

if [ ! -d "$BOOK_DIR" ]; then
  echo "Warning: $BOOK_DIR not found. Using existing content/ directory."
  exit 0
fi

echo "Copying book content from $BOOK_DIR to $CONTENT_DIR..."
rm -rf "$CONTENT_DIR"
cp -r "$BOOK_DIR" "$CONTENT_DIR"
echo "Done. $(find "$CONTENT_DIR" -name '*.md' | wc -l | tr -d ' ') markdown files copied."
