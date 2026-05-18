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

# Filter out expired artifacts
VALID_ARTIFACTS=$(echo "${ARTIFACTS}" | jq '.artifacts | map(select(.expired == false))')
VALID_COUNT=$(echo "${VALID_ARTIFACTS}" | jq 'length')

if [[ "${COUNT}" -eq 0 ]]; then
  echo "No artifacts available for run ${RUN_ID}." >&2
  exit 1
fi

if [[ "${VALID_COUNT}" -eq 0 ]]; then
  echo "All ${COUNT} artifact(s) from run ${RUN_ID} have expired." >&2
  exit 1
fi

echo "Found ${VALID_COUNT} valid (non-expired) artifact(s) from run ${RUN_ID} (${COUNT} total)..."

INDEX=0
DOWNLOADED=0
while IFS= read -r artifact; do
  NAME=$(echo "${artifact}" | jq -r '.name')

  # Only download the merged screenshots artifact, skip individual shards and build
  if [[ "${NAME}" =~ ^screenshots-[0-9]+$ ]]; then
    echo "Skipping shard artifact ${NAME} (merged artifact preferred)"
    continue
  fi

  if [[ "${NAME}" == "build" ]]; then
    echo "Skipping build artifact ${NAME} (not needed for references)"
    continue
  fi

  echo "Processing artifact ${NAME}..."

  URL=$(echo "${artifact}" | jq -r '.archive_download_url')
  if [[ -z "${URL}" || "${URL}" == "null" ]]; then
    echo "Skipping artifact ${NAME} with no download URL" >&2
    continue
  fi

  TMP_ZIP="$(mktemp)"
  TMP_DIR="$(mktemp -d)"

  echo "Downloading ${NAME} from ${URL}..."
  if ! curl -fsSL -H "Authorization: Bearer ${TOKEN}" -H "Accept: application/vnd.github+json" "${URL}" -o "${TMP_ZIP}"; then
    echo "Failed to download artifact ${NAME}" >&2
    rm -rf "${TMP_ZIP}" "${TMP_DIR}"
    continue
  fi

  # Verify the download produced a valid zip file
  if [[ ! -s "${TMP_ZIP}" ]]; then
    echo "Downloaded file is empty for artifact ${NAME}" >&2
    rm -rf "${TMP_ZIP}" "${TMP_DIR}"
    continue
  fi

  if ! unzip -tq "${TMP_ZIP}" >/dev/null 2>&1; then
    echo "Downloaded file is not a valid zip for artifact ${NAME}" >&2
    rm -rf "${TMP_ZIP}" "${TMP_DIR}"
    continue
  fi

  unzip -oq "${TMP_ZIP}" -d "${TMP_DIR}"

  if [[ -d "${TMP_DIR}/screenshots" ]]; then
    # Artifact contains a screenshots/ subdirectory - extract its contents
    shopt -s dotglob
    mkdir -p "${TARGET_DIR}"
    cp -R "${TMP_DIR}/screenshots"/* "${TARGET_DIR}/" 2>/dev/null || true
    shopt -u dotglob
  elif [[ "${NAME}" == "screenshots" ]]; then
    # Merged screenshots artifact extracts directly to target
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
  DOWNLOADED=$((DOWNLOADED + 1))
  echo "Successfully downloaded artifact ${NAME}"
done < <(echo "${VALID_ARTIFACTS}" | jq -c '.[]')

if [[ "${DOWNLOADED}" -eq 0 ]]; then
  echo "No artifacts were downloaded successfully" >&2
  exit 1
fi

echo "Successfully downloaded ${DOWNLOADED} artifact(s) to ${TARGET_DIR}"