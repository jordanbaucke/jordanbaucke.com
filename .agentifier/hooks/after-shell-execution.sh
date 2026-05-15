#!/usr/bin/env bash
set -euo pipefail

GLOBAL_CONFIG="$HOME/.agentifier/config.json"
API_BASE="${AGENTIFIER_API_URL:-$(jq -r '.apiBaseUrl // "http://localhost:8080"' "$GLOBAL_CONFIG" 2>/dev/null || echo "http://localhost:8080")}"
API_KEY="${AGENTIFIER_API_KEY:-$(jq -r '.apiKey // empty' "$GLOBAL_CONFIG" 2>/dev/null || true)}"
RAW_DIR=".agentifier/trace-data/raw-hooks"
mkdir -p "$RAW_DIR"

PAYLOAD=$(cat)
TIMESTAMP=$(date -u +%Y-%m-%dT%H:%M:%SZ)
EVENT_TYPE="afterShellExecution"

echo "{\"timestamp\":\"$TIMESTAMP\",\"eventType\":\"$EVENT_TYPE\",\"payload\":$PAYLOAD}" >> "$RAW_DIR/raw-$(date +%Y%m%d).jsonl"

PROJECT_ID=$(jq -r '.projectId // empty' .agentifier/config.json 2>/dev/null || true)
if [ -z "$PROJECT_ID" ] || [ -z "$API_KEY" ]; then
  echo "$PAYLOAD" >> "$RAW_DIR/fallback.jsonl"
  exit 0
fi

SESSION_ID=$(echo "$PAYLOAD" | jq -r '.session_id // empty')
EVENT_ID=$(uuidgen 2>/dev/null || cat /proc/sys/kernel/random/uuid 2>/dev/null || echo "$(date +%s)-$$")

BODY=$(jq -n \
  --arg et "$EVENT_TYPE" \
  --arg ts "$TIMESTAMP" \
  --arg sid "$SESSION_ID" \
  --arg eid "$EVENT_ID" \
  --argjson p "$PAYLOAD" \
  '{events: [{
    runExternalId: $sid,
    externalEventId: $eid,
    kind: "event",
    name: ("hook." + $et),
    ts: $ts,
    payload: {
      commandText: $p.command,
      stdout: $p.output,
      exitCode: $p.exit_code,
      duration: $p.duration,
      cursorVersion: $p.cursor_version
    },
    attributes: {eventType: $et}
  }]}')

RESP=$(curl -s -X POST "$API_BASE/v1/projects/$PROJECT_ID/telemetry/events" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $API_KEY" \
  -d "$BODY" 2>/dev/null || true)

if [ -z "$RESP" ] || ! echo "$RESP" | jq -e '.accepted // .ok // .events' > /dev/null 2>&1; then
  echo "$BODY" >> "$RAW_DIR/fallback.jsonl"
fi
