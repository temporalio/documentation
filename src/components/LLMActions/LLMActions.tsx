import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { FaRegCopy, FaCheck, FaMarkdown, FaExternalLinkAlt, FaChevronDown, FaChevronUp } from 'react-icons/fa';
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
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { metadata, frontMatter } = useDoc();
  const { editUrl, slug, permalink } = metadata;
  const { siteConfig } = useDocusaurusContext();

  const pageUrl = `${siteConfig.url}${permalink}`;
  const prompt = `Read ${pageUrl} and answer questions about the content.`;
  const chatGptUrl = `https://chatgpt.com/?prompt=${encodeURIComponent(prompt)}`;
  const claudeUrl = `https://claude.ai/new?q=${encodeURIComponent(prompt)}`;

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
    setOpen(false);
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
    setOpen(false);
  }, [rawUrl]);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  if (!rawUrl || frontMatter.llm_exclude) {
    return null;
  }

  return (
    <div className={styles.container} ref={containerRef} data-analytics-component="llm-actions">
      <div className={styles.splitButton}>
        <button
          className={styles.copyButton}
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
          {loading ? 'Loading...' : copied ? 'Copied!' : 'Copy'}
        </button>
        <button
          className={styles.chevronButton}
          onClick={() => setOpen((v) => !v)}
          aria-haspopup="true"
          aria-expanded={open}
          title="More options"
          data-analytics-id="llm-actions-toggle"
          data-analytics-action="click"
        >
          {open ? (
            <FaChevronUp className={styles.chevronIcon} />
          ) : (
            <FaChevronDown className={styles.chevronIcon} />
          )}
        </button>
      </div>

      {open && (
        <div className={styles.dropdown}>
          <button
            className={styles.dropdownItem}
            onClick={handleViewMarkdown}
            data-analytics-id="view-as-markdown"
            data-analytics-action="click"
          >
            <FaMarkdown className={styles.icon} />
            <span>View as Markdown</span>
            <FaExternalLinkAlt className={styles.externalIcon} />
          </button>
          <a
            className={styles.dropdownItem}
            href={chatGptUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            data-analytics-id="open-in-chatgpt"
            data-analytics-action="click"
          >
            <SiOpenai className={styles.icon} />
            <span>Open in ChatGPT</span>
            <FaExternalLinkAlt className={styles.externalIcon} />
          </a>
          <a
            className={styles.dropdownItem}
            href={claudeUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            data-analytics-id="open-in-claude"
            data-analytics-action="click"
          >
            <SiClaude className={styles.icon} />
            <span>Open in Claude</span>
            <FaExternalLinkAlt className={styles.externalIcon} />
          </a>
        </div>
      )}
    </div>
  );
}
