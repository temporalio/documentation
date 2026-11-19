import React, { type ReactNode, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import { hasAnalyticsConsent, readConsentFromDocumentCookie } from '@temporalio-web/consent-banner/core';
import type { IconType } from 'react-icons';
import { LuCheck, LuThumbsDown, LuThumbsUp } from 'react-icons/lu';
import styles from './PageFeedback.module.css';

// "Was this page helpful?" in the footer row of each docs page, modeled on the
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
const REASONS: Record<Rating, { legend: string; options: { value: string; label: string }[] }> = {
  down: {
    legend: 'What went wrong?',
    options: [
      { value: 'inaccurate', label: 'Inaccurate' },
      { value: 'not_found', label: "Couldn't find what I was looking for" },
      { value: 'hard_to_understand', label: 'Hard to understand' },
      { value: 'code_sample_errors', label: 'Code sample errors' },
      { value: 'other', label: 'Another reason' },
    ],
  },
  up: {
    legend: 'What did you like?',
    options: [
      { value: 'accurate', label: 'Accurate' },
      { value: 'solved_problem', label: 'Solved my problem' },
      { value: 'easy_to_understand', label: 'Easy to understand' },
      { value: 'helped_decide', label: 'Helped me decide to use the product' },
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

type Props = {
  pathname: string;
  // Shown at the start of the widget's row: the "View this page on GitHub" link.
  children?: ReactNode;
};

export default function PageFeedback({ pathname, children }: Props): ReactNode {
  // Starts as 'checking' so the server render and first paint show neither
  // the buttons nor the thank-you line until localStorage has been read.
  const [stage, setStage] = useState<Stage>({ name: 'checking' });
  const [reason, setReason] = useState('');
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [amendFailed, setAmendFailed] = useState(false);
  const reasonRef = useRef<HTMLFieldSetElement>(null);
  const thanksRef = useRef<HTMLParagraphElement>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);
  const amendErrorRef = useRef<HTMLParagraphElement>(null);

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
    // The clicked button was disabled while sending, so focus was lost.
    if (stage.name === 'error') errorRef.current?.focus();
  }, [stage.name]);

  // Submit was disabled while sending, so focus was lost.
  useEffect(() => {
    if (amendFailed) amendErrorRef.current?.focus();
  }, [amendFailed]);

  const rate = async (rating: Rating) => {
    setStage({ name: 'sending' });
    track('Docs Page Feedback', { rating, url: pathname });
    try {
      const { id, amend_token: amendToken } = await send({ page_url: pathname, rating });
      try {
        // `at` is when the reader rated the page. The widget only checks that
        // the entry exists.
        window.localStorage.setItem(storageKey(pathname), JSON.stringify({ rating, at: new Date().toISOString() }));
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

  // The rating is already stored, so skipping only closes the panel.
  const skip = () => setStage({ name: 'thanks' });

  const rated = stage.name === 'done' || stage.name === 'thanks';
  const pressed = stage.name === 'reason' ? stage.rating : undefined;
  // While checking, the question is laid out but hidden, so the space it takes
  // is reserved and the page doesn't shift when it or the thank-you line
  // appears.
  const checking = stage.name === 'checking';

  const ratingButton = (rating: Rating, label: string, Icon: IconType) => (
    <button
      type="button"
      className={clsx(styles.rate, pressed === rating && styles.pressed)}
      aria-label={label}
      title={label}
      // Set only once the reader has answered, so the buttons aren't announced
      // as toggles while they're still a question.
      aria-pressed={pressed ? pressed === rating : undefined}
      disabled={stage.name === 'sending' || stage.name === 'reason'}
      onClick={() => rate(rating)}
    >
      <Icon aria-hidden="true" />
    </button>
  );

  return (
    <section className={styles.feedback} aria-label="Page feedback">
      <div className={styles.row}>
        {children && <div className={styles.lead}>{children}</div>}
        {rated ? (
          <div className={styles.status}>
            <LuCheck className={styles.check} aria-hidden="true" />
            <p className={styles.thanks} ref={thanksRef} tabIndex={-1} role="status">
              Thanks for your feedback.
            </p>
          </div>
        ) : (
          <div className={clsx(styles.question, checking && styles.hidden)} aria-hidden={checking || undefined}>
            <p className={styles.prompt} id="page-feedback-question">
              Was this page helpful?
            </p>
            <div className={styles.buttons} role="group" aria-labelledby="page-feedback-question">
              {ratingButton('up', 'Yes', LuThumbsUp)}
              {ratingButton('down', 'No', LuThumbsDown)}
            </div>
          </div>
        )}
      </div>
      {stage.name === 'error' && (
        // Focusing the error reads it out, so it has no role="alert", which would read it twice.
        <p className={clsx(styles.error, styles.rateError)} ref={errorRef} tabIndex={-1}>
          Your feedback couldn't be sent. Try again later.
        </p>
      )}
      {stage.name === 'reason' && (
        <form className={styles.panel} onSubmit={submitReason}>
          {/* Read out with the reasons when focus moves to them. A live region
              that mounts with its text already in it often isn't announced. */}
          <p className={styles.recorded} id="page-feedback-recorded">
            Saved. Feel free to provide more detail (optional)
          </p>
          <fieldset className={styles.reasons} ref={reasonRef} tabIndex={-1} aria-describedby="page-feedback-recorded">
            <legend className={styles.legend}>{REASONS[stage.rating].legend}</legend>
            {REASONS[stage.rating].options.map((option) => (
              <label key={option.value} className={styles.option}>
                <input
                  type="radio"
                  name="page-feedback-reason"
                  value={option.value}
                  checked={reason === option.value}
                  onChange={() => setReason(option.value)}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </fieldset>
          {reason && (
            <div className={styles.commentBlock}>
              {/* No visible label, as on Stripe's docs. The placeholder disappears
                  while typing, so aria-label names the field. */}
              <textarea
                className={styles.comment}
                aria-label="Any more information you'd like to add"
                placeholder="Any more information you'd like to add…"
                value={comment}
                maxLength={COMMENT_MAX}
                rows={2}
                onChange={(event) => setComment(event.target.value)}
                aria-describedby="page-feedback-comment-hint"
              />
              <p id="page-feedback-comment-hint" className={styles.hint}>
                Don't include personal information, credentials, or Namespace names.
              </p>
            </div>
          )}
          <div className={styles.actions}>
            {reason && (
              <button type="submit" className={styles.submit} disabled={submitting}>
                {submitting ? 'Sending…' : 'Submit'}
              </button>
            )}
            <button type="button" className={styles.skip} disabled={submitting} onClick={skip}>
              Skip
            </button>
          </div>
          {amendFailed && (
            <p className={styles.error} ref={amendErrorRef} tabIndex={-1}>
              Your details couldn't be sent. Your Yes or No answer is still recorded.
            </p>
          )}
        </form>
      )}
    </section>
  );
}
