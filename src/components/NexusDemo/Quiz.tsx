import React, { useState } from 'react';
import styles from './NexusDemo.module.css';
import { quizQuestions } from './quizQuestions';

type AnswerState = number | null;

export default function Quiz() {
  const [answers, setAnswers] = useState<AnswerState[]>(
    () => new Array(quizQuestions.length).fill(null),
  );
  const [key, setKey] = useState(0); // increment to reset

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
                  else if (answered && isChosen && !isCorrect)
                    optClass += ` ${styles.quizOptWrong}`;
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
          <div className={`${styles.tag} ${styles.tagBlue}`}>Encyclopedia</div>
          <h3 style={{ fontSize: 15, marginBottom: 6 }}>Temporal Nexus</h3>
          <p style={{ fontSize: 13, color: 'var(--ifm-font-color-base)', margin: '0 0 14px', lineHeight: 1.6 }}>
            In-depth coverage of how Nexus works, from core concepts to security and observability.
          </p>
          <a href="/nexus" className={`${styles.runitLink}`}>
            Read the docs →
          </a>
        </div>

        <div className={styles.card}>
          <div className={`${styles.tag} ${styles.tagPurple}`}>SDK Guides</div>
          <h3 style={{ fontSize: 15, marginBottom: 6 }}>Build with Nexus</h3>
          <p style={{ fontSize: 13, color: 'var(--ifm-font-color-base)', margin: '0 0 14px', lineHeight: 1.6 }}>
            SDK-specific guidance for Go, TypeScript, .NET, Java, and Python.
          </p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <a href="/develop/go/nexus" className={`${styles.runitLink}`}>Go</a>
            <a href="/develop/typescript/nexus" className={`${styles.runitLink}`}>TypeScript</a>
            <a href="/develop/dotnet/nexus" className={`${styles.runitLink}`}>.NET</a>
            <a href="/develop/java/nexus" className={`${styles.runitLink}`}>Java</a>
            <a href="/develop/python/nexus" className={`${styles.runitLink}`}>Python</a>
          </div>
        </div>

        <div className={styles.card}>
          <div className={`${styles.tag} ${styles.tagGreen}`}>Temporal Cloud</div>
          <h3 style={{ fontSize: 15, marginBottom: 6 }}>Nexus on Temporal Cloud</h3>
          <p style={{ fontSize: 13, color: 'var(--ifm-font-color-base)', margin: '0 0 14px', lineHeight: 1.6 }}>
            Everything you need to know about using Nexus on Temporal Cloud.
          </p>
          <a href="/cloud/nexus" className={`${styles.runitLink}`}>
            Cloud docs →
          </a>
        </div>

        <div className={styles.card}>
          <div className={`${styles.tag} ${styles.tagAmber}`}>Evaluate</div>
          <h3 style={{ fontSize: 15, marginBottom: 6 }}>Learn More About Nexus</h3>
          <p style={{ fontSize: 13, color: 'var(--ifm-font-color-base)', margin: '0 0 14px', lineHeight: 1.6 }}>
            Customer use cases, a breakdown of benefits, and guidance on when Nexus is the right choice.
          </p>
          <a href="/evaluate/nexus" className={`${styles.runitLink}`}>
            Explore →
          </a>
        </div>
      </div>
    </div>
  );
}
