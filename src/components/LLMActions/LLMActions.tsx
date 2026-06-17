import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { FaRegCopy, FaCheck, FaMarkdown, FaExternalLinkAlt, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { SiOpenai, SiClaude } from 'react-icons/si';
import styles from './LLMActions.module.css';
import { getMarkdownPath } from './markdownPath';

export default function LLMActions() {
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { metadata, frontMatter } = useDoc();
  const { permalink } = metadata;
  const { siteConfig } = useDocusaurusContext();

  const pageUrl = `${siteConfig.url}${permalink}`;

  // Clean Markdown is generated for every page at <permalink>.md by the
  // markdown-pages plugin (see MARKDOWN_PIPELINE.md). These actions point at
  // that build output rather than the raw MDX source.
  // NOTE: the .md files only exist after `yarn build`; under `yarn start` (dev
  // server) these requests will 404. Verify locally with `yarn build && yarn serve`.
  const mdPath = getMarkdownPath(permalink);
  const mdUrl = `${siteConfig.url}${mdPath}`;

  const prompt = `Read ${mdUrl} and answer questions about the content.`;
  const chatGptUrl = `https://chatgpt.com/?prompt=${encodeURIComponent(prompt)}`;
  const claudeUrl = `https://claude.ai/new?q=${encodeURIComponent(prompt)}`;

  const handleCopyForLLM = useCallback(async () => {
    setLoading(true);
    setOpen(false);
    try {
      const response = await fetch(mdPath);
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
  }, [mdPath, pageUrl]);

  const handleViewMarkdown = useCallback(() => {
    window.open(mdPath, '_blank', 'noopener,noreferrer');
    setOpen(false);
  }, [mdPath]);

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

  if (!permalink || frontMatter.llm_exclude) {
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
