#!/bin/zsh

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PORT=8787
URL="http://127.0.0.1:${PORT}/index.html"

if ! lsof -iTCP:$PORT -sTCP:LISTEN >/dev/null 2>&1; then
  cd "$SCRIPT_DIR" || exit 1
  python3 -m http.server "$PORT" >/tmp/robot_record_ranking_server.log 2>&1 &
  sleep 1
fi

open "$URL"
