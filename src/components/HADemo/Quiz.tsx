import React, { useState } from 'react';
import styles from './HADemo.module.css';
import { quizQuestions } from './quizQuestions';

type AnswerState = number | null;

export default function Quiz() {
  const [answers, setAnswers] = useState<AnswerState[]>(
    () => new Array(quizQuestions.length).fill(null),
  );
  const [key, setKey] = useState(0);

  const allAnswered = answers.every((a) => a !== null);
  const correctCount = answers.filter((a, i) => a === quizQuestions[i].correct).length;
  const pct = Math.round((correctCount / quizQuestions.length) * 100);

  function answer(qi: number, oi: number) {
    if (answers[qi] !== null) return;
    setAnswers((prev) => {
      const next = [...prev];
      next[qi] = oi;
      return next;
    });
  }

  function reset() {
    setAnswers(new Array(quizQuestions.length).fill(null));
    setKey((k) => k + 1);
  }

  return (
    <div className={styles.section}>
      <div className={styles.progressBar}>
        <div className={styles.progressFill} style={{ width: '100%' }} />
      </div>

      <h1>Test Your Understanding</h1>

      <div key={key}>
        {quizQuestions.map((q, qi) => {
          const given = answers[qi];
          const answered = given !== null;

          return (
            <div key={qi} className={styles.quizCard}>
              <div className={styles.quizQ}>
                Q{qi + 1}. {q.q}
              </div>
              <div className={styles.quizOptions}>
                {q.options.map((opt, oi) => {
                  const isCorrect = oi === q.correct;
                  const isChosen = oi === given;

                  let optClass = styles.quizOpt;
                  if (answered && isChosen && isCorrect) optClass += ` ${styles.quizOptCorrect}`;
                  else if (answered && isChosen && !isCorrect) optClass += ` ${styles.quizOptWrong}`;
                  else if (answered && isCorrect) optClass += ` ${styles.quizOptCorrect}`;

                  return (
                    <button
                      key={oi}
                      className={optClass}
                      onClick={() => answer(qi, oi)}
                      disabled={answered}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {answered && (
                <div
                  className={`${styles.quizFeedback} ${
                    given === q.correct ? styles.quizFeedbackCorrect : styles.quizFeedbackWrong
                  }`}
                >
                  {given === q.correct ? 'Correct: ' : 'Not quite: '}
                  {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {allAnswered && (
        <div className={styles.scoreCard}>
          <div className={styles.scoreText}>
            {correctCount} / {quizQuestions.length} correct ({pct}%)
          </div>
          <button className={styles.btn} onClick={reset}>
            Try again
          </button>
        </div>
      )}

      <h2 className={styles.sectionHeading} style={{ marginTop: 48 }}>Resources</h2>
      <div className={styles.cardGrid} style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
        <div className={styles.card}>
          <div className={`${styles.tag} ${styles.tagBlue}`}>Overview</div>
          <h3 style={{ fontSize: 15, marginBottom: 6 }}>High Availability</h3>
          <p style={{ fontSize: 13, color: 'var(--ifm-font-color-base)', margin: '0 0 14px', lineHeight: 1.6 }}>
            Introduction to Temporal Cloud HA, replication types, SLAs, and target workloads.
          </p>
          <a href="/cloud/high-availability" className={styles.resourceLink}>
            Read the docs →
          </a>
        </div>

        <div className={styles.card}>
          <div className={`${styles.tag} ${styles.tagGreen}`}>Setup</div>
          <h3 style={{ fontSize: 15, marginBottom: 6 }}>Enable High Availability</h3>
          <p style={{ fontSize: 13, color: 'var(--ifm-font-color-base)', margin: '0 0 14px', lineHeight: 1.6 }}>
            Step-by-step instructions for enabling HA via the Web UI and tcld CLI.
          </p>
          <a href="/cloud/high-availability/enable" className={styles.resourceLink}>
            Enable HA →
          </a>
        </div>

        <div className={styles.card}>
          <div className={`${styles.tag} ${styles.tagAmber}`}>Operations</div>
          <h3 style={{ fontSize: 15, marginBottom: 6 }}>Configure and Trigger Failovers</h3>
          <p style={{ fontSize: 13, color: 'var(--ifm-font-color-base)', margin: '0 0 14px', lineHeight: 1.6 }}>
            Automatic failover behavior, manual failover triggers, graceful vs. forced modes.
          </p>
          <a href="/cloud/high-availability/failovers" className={styles.resourceLink}>
            Failover docs →
          </a>
        </div>

        <div className={styles.card}>
          <div className={`${styles.tag} ${styles.tagPurple}`}>SLAs</div>
          <h3 style={{ fontSize: 15, marginBottom: 6 }}>RPO and RTO</h3>
          <p style={{ fontSize: 13, color: 'var(--ifm-font-color-base)', margin: '0 0 14px', lineHeight: 1.6 }}>
            Detailed Recovery Point Objective and Recovery Time Objective targets by outage type.
          </p>
          <a href="/cloud/rpo-rto" className={styles.resourceLink}>
            RPO / RTO →
          </a>
        </div>

        <div className={styles.card}>
          <div className={`${styles.tag} ${styles.tagTeal}`}>Monitoring</div>
          <h3 style={{ fontSize: 15, marginBottom: 6 }}>Monitor Replication Health</h3>
          <p style={{ fontSize: 13, color: 'var(--ifm-font-color-base)', margin: '0 0 14px', lineHeight: 1.6 }}>
            Replication lag metrics, replica health status, and audit logging for failover events.
          </p>
          <a href="/cloud/high-availability/monitoring" className={styles.resourceLink}>
            Monitoring docs →
          </a>
        </div>

        <div className={styles.card}>
          <div className={`${styles.tag} ${styles.tagOrange}`}>Networking</div>
          <h3 style={{ fontSize: 15, marginBottom: 6 }}>HA Connectivity</h3>
          <p style={{ fontSize: 13, color: 'var(--ifm-font-color-base)', margin: '0 0 14px', lineHeight: 1.6 }}>
            DNS configuration, AWS PrivateLink setup, and routing requirements for HA Namespaces.
          </p>
          <a href="/cloud/high-availability/ha-connectivity" className={styles.resourceLink}>
            Connectivity docs →
          </a>
        </div>
      </div>
    </div>
  );
}
