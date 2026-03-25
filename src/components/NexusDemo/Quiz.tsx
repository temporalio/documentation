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

  const scoreLabel =
    pct >= 85 ? 'You got it' : pct >= 57 ? 'Getting there' : 'Keep exploring';
  const scoreSub =
    pct >= 85
      ? "You have a solid grasp of Temporal Nexus. You're ready to build."
      : pct >= 57
        ? 'Good foundation. Review the sections on the topics you missed.'
        : 'Go back through the demo — the concepts will click. Try again when ready.';

  return (
    <div className={styles.section}>
      <div className={styles.progressBar}>
        <div className={styles.progressFill} style={{ width: '100%' }} />
      </div>

      <h1>Test Your Understanding</h1>
      <p className={styles.lead}>
        {quizQuestions.length} questions. No time limit. See the explanation after each answer.
      </p>

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
                  {given === q.correct ? '✓ Correct — ' : '✗ Not quite — '}
                  {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {allAnswered && (
        <div className={styles.scoreCard}>
          <div className={styles.scoreTitle}>{scoreLabel}</div>
          <div className={styles.scoreText}>
            {correctCount} / {quizQuestions.length} correct ({pct}%)
          </div>
          <div className={styles.scoreSub}>{scoreSub}</div>
          <button className={styles.btn} onClick={reset}>
            Try again
          </button>
        </div>
      )}
    </div>
  );
}
