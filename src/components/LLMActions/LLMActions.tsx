import React, { useState, useCallback } from 'react';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { FaRegCopy, FaCheck, FaMarkdown } from 'react-icons/fa';
import { SiOpenai, SiClaude } from 'react-icons/si';
import styles from './LLMActions.module.css';
import { getMarkdownPath } from './markdownPath';

export default function LLMActions() {
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

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

  if (!permalink || frontMatter.llm_exclude) {
    return null;
  }

  return (
    <div className={styles.container} data-analytics-component="llm-actions">
      <div className={styles.row}>
        <button
          className={styles.button}
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

        <a
          className={styles.button}
          href={mdPath}
          target="_blank"
          rel="noopener noreferrer"
          title="View this page as Markdown"
          data-analytics-id="view-as-markdown"
          data-analytics-action="click"
        >
          <FaMarkdown className={styles.icon} />
          <span>View Markdown</span>
        </a>

        <div className={styles.openIn}>
          <a
            className={styles.iconLink}
            href={chatGptUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Open in ChatGPT"
            aria-label="Open in ChatGPT"
            data-analytics-id="open-in-chatgpt"
            data-analytics-action="click"
          >
            <SiOpenai className={styles.icon} />
          </a>
          <a
            className={styles.iconLink}
            href={claudeUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Open in Claude"
            aria-label="Open in Claude"
            data-analytics-id="open-in-claude"
            data-analytics-action="click"
          >
            <SiClaude className={styles.icon} />
          </a>
        </div>
      </div>
    </div>
  );
}
