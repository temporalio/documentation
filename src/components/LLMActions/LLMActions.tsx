import React, { useState, useCallback } from 'react';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import { FaRegCopy, FaCheck, FaMarkdown } from 'react-icons/fa';
import styles from './LLMActions.module.css';

/**
 * Converts GitHub edit URL to raw content URL
 * e.g., https://github.com/org/repo/edit/main/docs/file.md
 * becomes https://raw.githubusercontent.com/org/repo/main/docs/file.md
 */
function getGitHubRawUrl(editUrl: string): string | null {
  try {
    const match = editUrl.match(/github\.com\/([^/]+)\/([^/]+)\/edit\/([^/]+)\/(.+)/);
    if (match) {
      const [, owner, repo, branch, path] = match;
      // Fix double docs/docs issue in path
      const fixedPath = path.replace(/^docs\/docs\//, 'docs/');
      return `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${fixedPath}`;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Build raw GitHub URL from slug/permalink for this specific repo
 */
function buildRawUrlFromSlug(slug: string): string {
  // Remove leading slash and convert to file path
  const path = slug.replace(/^\//, '');
  // Try index.mdx first for directory-style URLs
  return `https://raw.githubusercontent.com/temporalio/documentation/main/docs/${path}/index.mdx`;
}

export default function LLMActions() {
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const { metadata } = useDoc();
  const { editUrl, slug } = metadata;

  // Try to get raw URL from editUrl first, then fall back to slug-based construction
  let rawUrl = editUrl ? getGitHubRawUrl(editUrl) : null;
  if (!rawUrl && slug) {
    rawUrl = buildRawUrlFromSlug(slug);
  }

  const handleCopyForLLM = useCallback(async () => {
    if (!rawUrl) {
      console.error('No raw URL available');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(rawUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`);
      }
      const markdown = await response.text();
      const pageUrl = window.location.href;
      const content = `Source: ${pageUrl}\n\n${markdown}`;

      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    } finally {
      setLoading(false);
    }
  }, [rawUrl]);

  const handleViewMarkdown = useCallback(() => {
    if (rawUrl) {
      window.open(rawUrl, '_blank', 'noopener,noreferrer');
    }
  }, [rawUrl]);

  if (!rawUrl) {
    return null;
  }

  return (
    <div className={styles.container}>
      <button
        className={styles.actionButton}
        onClick={handleCopyForLLM}
        disabled={loading}
        title="Copy page markdown for use with LLMs"
      >
        {copied ? (
          <FaCheck className={styles.icon} />
        ) : (
          <FaRegCopy className={styles.icon} />
        )}
        {loading ? 'Loading...' : copied ? 'Copied!' : 'Copy for LLM'}
      </button>
      <button
        className={styles.actionButton}
        onClick={handleViewMarkdown}
        title="View raw markdown in new tab"
      >
        <FaMarkdown className={styles.icon} />
        View as Markdown
      </button>
    </div>
  );
}
