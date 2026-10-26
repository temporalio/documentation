import React, { useEffect, useRef, useState } from 'react';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import { hasAnalyticsConsent, readConsentFromDocumentCookie } from '@temporalio-web/consent-banner/core';
import styles from './PageFeedback.module.css';

// "Was this page helpful?" at the bottom of each docs page, modeled on the
// widget on Stripe's docs. The Yes or No click is stored right away by
// /api/feedback. A reason and comment picked afterward are sent as an
// amendment to the same entry. See readme/FEEDBACK.md.

type Rating = 'up' | 'down';

type Stage =
  | { name: 'checking' }
  | { name: 'ask' }
  | { name: 'sending' }
  | { name: 'reason'; rating: Rating; id: string; amendToken: string }
  | { name: 'thanks' }
  | { name: 'done' }
  | { name: 'error' };

// The values match REASONS in api/_feedback-lib.js.
const REASONS: Record<Rating, { legend: string; options: { value: string; label: string; description?: string }[] }> = {
  down: {
    legend: 'What went wrong?',
    options: [
      { value: 'inaccurate', label: 'Inaccurate', description: "Doesn't accurately describe the product or feature." },
      {
        value: 'not_found',
        label: "Couldn't find what I was looking for",
        description: 'Missing important information.',
      },
      { value: 'hard_to_understand', label: 'Hard to understand', description: 'Too complicated or unclear.' },
      {
        value: 'code_sample_errors',
        label: 'Code sample errors',
        description: 'One or more code samples are incorrect.',
      },
      { value: 'other', label: 'Another reason' },
    ],
  },
  up: {
    legend: 'What did you like?',
    options: [
      { value: 'accurate', label: 'Accurate', description: 'Accurately describes the product or feature.' },
      { value: 'solved_problem', label: 'Solved my problem', description: 'Helped me resolve an issue.' },
      { value: 'easy_to_understand', label: 'Easy to understand', description: 'Easy to follow and comprehend.' },
      {
        value: 'helped_decide',
        label: 'Helped me decide to use the product',
        description: 'Convinced me to adopt the product or feature.',
      },
      { value: 'other', label: 'Another reason' },
    ],
  },
};

const COMMENT_MAX = 1000;

const storageKey = (pathname: string) => `docs-page-feedback:${pathname}`;

const hasConsent = () => ExecutionEnvironment.canUseDOM && hasAnalyticsConsent(readConsentFromDocumentCookie());

function track(eventName: string, properties: Record<string, unknown>) {
  if (hasConsent() && window.amplitude) window.amplitude.track(eventName, properties);
}

// BotID's fetch wrapper waits for its challenge script before sending, and
// never settles if that script is blocked or fails, so the widget gives up
// after this long and shows an error instead of staying disabled.
const SEND_TIMEOUT_MS = 10_000;

async function send(body: Record<string, unknown>): Promise<Record<string, unknown>> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error('Feedback timed out')), SEND_TIMEOUT_MS);
  });
  try {
    const response = await Promise.race([
      fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ channel: 'widget', ...body }),
      }),
      timeout,
    ]);
    if (!response.ok) throw new Error(`Feedback returned ${response.status}`);
    return await response.json();
  } finally {
    clearTimeout(timer);
  }
}

export default function PageFeedback({ pathname }: { pathname: string }): JSX.Element {
  // Starts as 'checking' so the server render and first paint show neither
  // the buttons nor the thank-you line until localStorage has been read.
  const [stage, setStage] = useState<Stage>({ name: 'checking' });
  const [reason, setReason] = useState('');
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [amendFailed, setAmendFailed] = useState(false);
  const reasonRef = useRef<HTMLFieldSetElement>(null);
  const thanksRef = useRef<HTMLParagraphElement>(null);

  // A reader who already rated this page sees the thank-you line instead of
  // the question. localStorage can be blocked, so every access is guarded.
  useEffect(() => {
    let rated = false;
    try {
      rated = Boolean(window.localStorage.getItem(storageKey(pathname)));
    } catch {
      // Ask again.
    }
    setStage({ name: rated ? 'done' : 'ask' });
  }, [pathname]);

  useEffect(() => {
    if (stage.name === 'reason') reasonRef.current?.focus();
    if (stage.name === 'thanks') thanksRef.current?.focus();
  }, [stage.name]);

  const rate = async (rating: Rating) => {
    setStage({ name: 'sending' });
    track('Docs Page Feedback', { rating, url: pathname });
    try {
      const { id, amend_token: amendToken } = await send({ page_url: pathname, rating });
      try {
        window.localStorage.setItem(storageKey(pathname), rating);
      } catch {
        // The reader may be asked again on a later visit.
      }
      setStage({ name: 'reason', rating, id: String(id), amendToken: String(amendToken) });
    } catch {
      setStage({ name: 'error' });
    }
  };

  const submitReason = async (event: React.FormEvent) => {
    event.preventDefault();
    if (stage.name !== 'reason' || !reason) return;
    setSubmitting(true);
    setAmendFailed(false);
    track('Docs Page Feedback Reason', { rating: stage.rating, reason, url: pathname });
    try {
      await send({
        id: stage.id,
        amend_token: stage.amendToken,
        rating: stage.rating,
        reason,
        ...(comment.trim() ? { comment: comment.trim() } : {}),
      });
      setStage({ name: 'thanks' });
    } catch {
      setAmendFailed(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (stage.name === 'done' || stage.name === 'thanks') {
    return (
      <section className={styles.feedback} aria-label="Page feedback">
        <div className={styles.row}>
          <p className={styles.thanks} ref={thanksRef} tabIndex={-1} role="status">
            Thanks for your feedback.
          </p>
        </div>
      </section>
    );
  }

  if (stage.name === 'reason') {
    const { legend, options } = REASONS[stage.rating];
    return (
      <section className={styles.feedback} aria-label="Page feedback">
        <p className={styles.recorded} role="status">
          Thanks. Your answer is recorded. Tell us more, if you like.
        </p>
        <form onSubmit={submitReason}>
          <fieldset className={styles.reasons} ref={reasonRef} tabIndex={-1}>
            <legend className={styles.legend}>{legend}</legend>
            {options.map((option) => (
              <label key={option.value} className={styles.option}>
                <input
                  type="radio"
                  name="page-feedback-reason"
                  value={option.value}
                  checked={reason === option.value}
                  onChange={() => setReason(option.value)}
                />
                <span>
                  <span className={styles.optionLabel}>{option.label}</span>
                  {option.description && <span className={styles.optionDescription}>{option.description}</span>}
                </span>
              </label>
            ))}
          </fieldset>
          {reason && (
            <div className={styles.commentBlock}>
              <label htmlFor="page-feedback-comment" className={styles.commentLabel}>
                Anything else? (optional)
              </label>
              <textarea
                id="page-feedback-comment"
                className={styles.comment}
                value={comment}
                maxLength={COMMENT_MAX}
                rows={3}
                onChange={(event) => setComment(event.target.value)}
                aria-describedby="page-feedback-comment-hint"
              />
              <p id="page-feedback-comment-hint" className={styles.hint}>
                Don't include personal information, credentials, or Namespace names.
              </p>
              <button type="submit" className="button button--primary button--sm" disabled={submitting}>
                {submitting ? 'Sending…' : 'Submit'}
              </button>
              {amendFailed && (
                <p className={styles.error} role="alert">
                  Your details couldn't be sent. Your Yes or No answer is still recorded.
                </p>
              )}
            </div>
          )}
        </form>
      </section>
    );
  }

  // While checking, the question row is laid out but hidden, so the space it
  // takes is reserved and the page doesn't shift when it or the thank-you
  // line appears.
  const checking = stage.name === 'checking';
  return (
    <section className={styles.feedback} aria-label="Page feedback">
      <div className={checking ? `${styles.row} ${styles.hidden}` : styles.row} aria-hidden={checking || undefined}>
        <p className={styles.question} id="page-feedback-question">
          Was this page helpful?
        </p>
        <div className={styles.buttons} role="group" aria-labelledby="page-feedback-question">
          <button
            type="button"
            className="button button--secondary button--outline button--sm"
            disabled={stage.name === 'sending'}
            onClick={() => rate('up')}
          >
            Yes
          </button>
          <button
            type="button"
            className="button button--secondary button--outline button--sm"
            disabled={stage.name === 'sending'}
            onClick={() => rate('down')}
          >
            No
          </button>
        </div>
      </div>
      {stage.name === 'error' && (
        <p className={styles.error} role="alert">
          Your feedback couldn't be sent. Try again later.
        </p>
      )}
    </section>
  );
}
