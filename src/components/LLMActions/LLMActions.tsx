import React, { useState, useCallback } from 'react';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { FaRegCopy, FaCheck, FaMarkdown, FaExternalLinkAlt } from 'react-icons/fa';
import { SiOpenai, SiClaude } from 'react-icons/si';
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

  const { metadata, frontMatter } = useDoc();
  const { editUrl, slug, permalink } = metadata;
  const { siteConfig } = useDocusaurusContext();

  // Canonical, absolute page URL derived from Docusaurus config + permalink.
  // Available during SSR and the first render, so the prompts are always valid.
  const pageUrl = `${siteConfig.url}${permalink}`;

  // Prefilled prompts that point the assistant at this page.
  const prompt = `Read ${pageUrl} and answer questions about the content.`;
  const chatGptUrl = `https://chatgpt.com/?prompt=${encodeURIComponent(prompt)}`;
  const claudeUrl = `https://claude.ai/new?q=${encodeURIComponent(prompt)}`;

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
      const content = `Source: ${pageUrl}\n\n${markdown}`;

      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    } finally {
      setLoading(false);
    }
  }, [rawUrl, pageUrl]);

  const handleViewMarkdown = useCallback(() => {
    if (rawUrl) {
      window.open(rawUrl, '_blank', 'noopener,noreferrer');
    }
  }, [rawUrl]);

  if (!rawUrl || frontMatter.llm_exclude) {
    return null;
  }

  return (
    <div className={styles.container} data-analytics-component="llm-actions">
      <button
        className={styles.actionButton}
        onClick={handleCopyForLLM}
        disabled={loading}
        title="Copy page markdown for use with LLMs"
        data-analytics-id="copy-for-llm"
        data-analytics-action="click"
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
        data-analytics-id="view-as-markdown"
        data-analytics-action="click"
      >
        <FaMarkdown className={styles.icon} />
        View as Markdown
      </button>
      <a
        className={styles.actionButton}
        href={chatGptUrl}
        target="_blank"
        rel="noopener noreferrer"
        title="Open this page in ChatGPT"
        data-analytics-id="open-in-chatgpt"
        data-analytics-action="click"
      >
        <SiOpenai className={styles.icon} />
        Open in ChatGPT
        <FaExternalLinkAlt className={styles.externalIcon} />
      </a>
      <a
        className={styles.actionButton}
        href={claudeUrl}
        target="_blank"
        rel="noopener noreferrer"
        title="Open this page in Claude"
        data-analytics-id="open-in-claude"
        data-analytics-action="click"
      >
        <SiClaude className={styles.icon} />
        Open in Claude
        <FaExternalLinkAlt className={styles.externalIcon} />
      </a>
    </div>
  );
}
