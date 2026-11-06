#!/bin/bash
set -Eeuo pipefail

COZE_WORKSPACE_PATH="${COZE_WORKSPACE_PATH:-$(pwd)}"
cd "${COZE_WORKSPACE_PATH}"

echo "Static site — skipping Next.js build."

required=(
  "index.html"
  "server.cjs"
  "assets/style.css"
  "assets/app.js"
  "assets/words.js"
  "assets/scenes.js"
  "assets/songs.js"
  "assets/stories.js"
)

for file in "${required[@]}"; do
  if [ ! -f "${file}" ]; then
    echo "Missing required file: ${file}" >&2
    exit 1
  fi
done

echo "Static assets verified. Deploy will serve the repository root."