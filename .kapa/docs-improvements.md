# Docs improvements from Kapa

Decision log for the [kapa-improve-docs](https://docs.kapa.ai/analytics/guides/improve-documentation-with-an-agent)
workflow. One entry per topic, newest first. Records topics, counts, and decisions, so a later run doesn't propose the
same topic again unless its volume roughly doubles. Never put user questions, names, or Internal-project content here.

Signals in this repo's runs also include a "certain but hedged" scan: answers Kapa marked certain whose text still
hedges ("can't tell with certainty", "recommend reaching out"). Kapa's uncertain flag and Coverage Gaps miss these.

## Upgrade guide and production checklist disagree on skipping patch versions

- Decided: 2026-11-12, documented
- Signal: 1 agent feedback report (documentation, low), 2026-11-04
- Change: docs/production-deployment/self-hosted-guide/checklist.mdx, PR #5716
- Why: #4498 changed the upgrade guide to require the latest patch before the next minor but left the checklist saying
  patch versions can be skipped

## Permissions tables lose their role headers when chunked

- Decided: 2026-11-12, documented
- Signal: certain-but-hedged answer (window 2026-10-13 to 2026-11-12), 1 conversation; Kapa said it couldn't tell which
  columns the check marks were in
- Change: docs/cloud/manage-access/permissions-reference.mdx and new `RoleCheck` component, PR #5715
- Why: rows of ✅ marks lose the header row once a long table is split; each check mark now carries its role name as
  hidden text

## PostgreSQL 17/18, postgres12 vs postgres12_pgx drivers, Aurora

- Decided: 2026-11-12, not now
- Signal: 11 users, 14 uncertain answers (2026-10-13 to 2026-11-12); coverage gap "Database support and compatibility"
  (monthly, Oct 2026), 3 conversations, 3 users; also in the 2026-10-06 gap review
- Why: needs a supported-versions policy from the Server team; may need an Internal-project search

## Self-hosted Multi-Cluster Replication status, minimum version, and configuration

- Decided: 2026-11-12, not now
- Signal: 9 users, 16 answers (14 uncertain, 2 certain-but-hedged); coverage gap "Self-hosted multi-cluster
  replication status" (monthly, Oct 2026), 3 conversations, 3 users
- Why: partly covered by open PRs #5693 and #5347; status label and minimum version still open

## Web UI SSO and OIDC configuration

- Decided: 2026-11-12, not now
- Signal: 8 users, 12 answers (10 uncertain, 2 certain-but-hedged); also in the 2026-10-06 gap review
- Why: PKCE, client secret, `TEMPORAL_AUTH_LABEL`, and JWT passthrough aren't covered; draft PR #5498 covers session
  length only

## Upgrade-on-Continue-as-New minimum versions

- Decided: 2026-11-12, not now
- Signal: 2 agent feedback reports (documentation, low), 2026-10-14 and 2026-10-15
- Why: small fix; agents found the versions in the release notes, so verify them before documenting

## Temporal Cloud limits

- Decided: 2026-11-12, not now
- Signal: 19 users, 20 answers (17 uncertain, 3 certain-but-hedged), spread across many separate limits
- Why: needs splitting into specific limits; draft PRs #5343, #5395, and #5692 cover some

## Temporal Cloud metrics

- Decided: 2026-11-12, not now
- Signal: 24 users, 31 answers (24 uncertain, 7 certain-but-hedged), spread across v0/v2, units, and storage metrics
- Why: needs splitting into specific questions before deciding
