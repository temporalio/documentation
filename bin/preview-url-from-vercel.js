#!/usr/bin/env node

const MAX_SUBDOMAIN_LENGTH = 63;
const MAX_ATTEMPTS = 18;
const INTERVAL_MS = 10_000;
const PREVIEW_DOMAIN = 'preview.thundergun.io';

function branchToSlug(branchName) {
  return branchName
    .toLowerCase()
    .replace(/_/g, '')
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-/, '')
    .replace(/-$/, '');
}

function buildSubdomain(branchSlug) {
  return `temporal-documentation-git-${branchSlug}`;
}

function extractPreviewUrlFromComment(body) {
  const match = body.match(/\[vc\]:\s*#[^:]*:(eyJ[A-Za-z0-9+/=]+)/);
  if (!match) return null;

  const payload = JSON.parse(Buffer.from(match[1], 'base64').toString('utf8'));
  return payload.projects?.[0]?.previewUrl || null;
}

async function resolvePreviewUrl({ github, context, core }) {
  const branchName = process.env.GITHUB_HEAD_REF || process.env.GITHUB_REF_NAME;
  const branchSlug = branchToSlug(branchName);
  const subdomain = buildSubdomain(branchSlug);

  if (subdomain.length <= MAX_SUBDOMAIN_LENGTH) {
    const baseUrl = `https://${subdomain}.${PREVIEW_DOMAIN}`;
    core.info(`Branch name is short enough (${subdomain.length} chars), using constructed URL: ${baseUrl}`);
    return baseUrl;
  }

  core.info(`Subdomain would be ${subdomain.length} chars (exceeds ${MAX_SUBDOMAIN_LENGTH}), polling for Vercel comment...`);

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    core.info(`Polling for Vercel comment (attempt ${attempt}/${MAX_ATTEMPTS})...`);
    const { data: comments } = await github.rest.issues.listComments({
      owner: context.repo.owner,
      repo: context.repo.repo,
      issue_number: context.issue.number,
      per_page: 100,
    });

    const vercelComment = comments.find(
      (c) => c.user?.login === 'vercel[bot]' && c.body?.includes('[vc]:'),
    );

    if (vercelComment) {
      const previewUrl = extractPreviewUrlFromComment(vercelComment.body);
      if (previewUrl) {
        const baseUrl = `https://${previewUrl}`;
        core.info(`Found Vercel preview URL: ${baseUrl}`);
        return baseUrl;
      }
    }

    if (attempt < MAX_ATTEMPTS) {
      await new Promise((resolve) => setTimeout(resolve, INTERVAL_MS));
    }
  }

  core.warning('Vercel comment not found after polling, using constructed URL as fallback (links may be broken for this long branch name)');
  return `https://${subdomain}.${PREVIEW_DOMAIN}`;
}

module.exports = { resolvePreviewUrl, branchToSlug, buildSubdomain, extractPreviewUrlFromComment };
