#!/usr/bin/env bash
set -euo pipefail

TARGET_DIR="${1:-screenshots}"
WORKFLOW_FILE="${WORKFLOW_FILE:-screenshot-capture.yml}"
REPO="${GITHUB_REPOSITORY:?GITHUB_REPOSITORY is not set}"
TOKEN="${GITHUB_TOKEN:?GITHUB_TOKEN is not set}"
DEFAULT_BRANCH="${GITHUB_BASE_REF:-${GITHUB_REF_NAME:-}}"

if [[ -z "${DEFAULT_BRANCH}" ]]; then
  DEFAULT_BRANCH=$(curl -sSL \
    -H "Authorization: Bearer ${TOKEN}" \
    -H "Accept: application/vnd.github+json" \
    "https://api.github.com/repos/${REPO}" | jq -r '.default_branch')
fi

mkdir -p "${TARGET_DIR}"

api() {
  local endpoint="$1"
  curl -sSL \
    -H "Authorization: Bearer ${TOKEN}" \
    -H "Accept: application/vnd.github+json" \
    "https://api.github.com/repos/${REPO}/${endpoint}"
}

# Fetch the most recent successful workflow run on the default branch
RUN_ID=$(api "actions/workflows/${WORKFLOW_FILE}/runs?branch=${DEFAULT_BRANCH}&status=completed&per_page=50" \
  | jq -r '.workflow_runs | map(select(.conclusion == "success")) | first | .id')

if [[ -z "${RUN_ID}" || "${RUN_ID}" == "null" ]]; then
  echo "No successful workflow runs found for ${WORKFLOW_FILE} on branch ${DEFAULT_BRANCH}" >&2
  exit 1
fi

ARTIFACTS=$(api "actions/runs/${RUN_ID}/artifacts?per_page=100")
COUNT=$(echo "${ARTIFACTS}" | jq '.total_count')

if [[ "${COUNT}" -eq 0 ]]; then
  echo "No artifacts available for run ${RUN_ID}." >&2
  exit 1
fi

echo "Downloading ${COUNT} artifact(s) from run ${RUN_ID}..."

INDEX=0
while IFS= read -r artifact; do
  NAME=$(echo "${artifact}" | jq -r '.name')
  URL=$(echo "${artifact}" | jq -r '.archive_download_url')
  if [[ -z "${URL}" || "${URL}" == "null" ]]; then
    echo "Skipping artifact ${NAME} with no download URL" >&2
    continue
  fi

  TMP_ZIP="$(mktemp)"
  TMP_DIR="$(mktemp -d)"
  curl -sSL -H "Authorization: Bearer ${TOKEN}" -H "Accept: application/vnd.github+json" "${URL}" -o "${TMP_ZIP}"
  unzip -oq "${TMP_ZIP}" -d "${TMP_DIR}"

  if [[ -d "${TMP_DIR}/screenshots" ]]; then
    # Artifact contains a screenshots/ subdirectory - extract its contents
    shopt -s dotglob
    mkdir -p "${TARGET_DIR}"
    cp -R "${TMP_DIR}/screenshots"/* "${TARGET_DIR}/" 2>/dev/null || true
    shopt -u dotglob
  elif [[ "${NAME}" == "screenshots" ]]; then
    # Special case: merged "screenshots" artifact extracts directly to target
    shopt -s dotglob
    mkdir -p "${TARGET_DIR}"
    cp -R "${TMP_DIR}"/* "${TARGET_DIR}/" 2>/dev/null || true
    shopt -u dotglob
  else
    # Other artifacts go to subdirectories
    DEST_DIR="${TARGET_DIR}/${NAME}"
    mkdir -p "${DEST_DIR}"
    cp -R "${TMP_DIR}"/* "${DEST_DIR}/" 2>/dev/null || true
  fi

  rm -rf "${TMP_ZIP}" "${TMP_DIR}"
  INDEX=$((INDEX + 1))
  echo "Downloaded artifact ${NAME}"
done < <(echo "${ARTIFACTS}" | jq -c '.artifacts[]')

echo "Downloaded ${INDEX} artifact(s) to ${TARGET_DIR}".