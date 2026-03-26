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
    </div>
  );
}
