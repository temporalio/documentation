import React, { useEffect, useMemo, useState } from "react";
import LifecycleDiagram from "./LifecycleDiagram";
import styles from "./temporal-lifecycle-demo.module.css";
import { LIFECYCLE_STEPS } from "./temporal-lifecycle-steps";

function StepPanel({ display, step11Variant, onStep11Variant, showStep11Toggle }) {
  return (
    <div className={styles.detailsPanel} aria-live="polite">
      <div className={styles.stepMeta}>
        <span className={styles.stepBadge}>
          Step {display.number}/{LIFECYCLE_STEPS.length}
        </span>
      </div>

      <h4 className={styles.stepTitle}>{display.title}</h4>

      {showStep11Toggle && (
        <div className={styles.variantToggle}>
          <button
            type="button"
            className={`${styles.variantBtn} ${step11Variant === "success" ? styles.variantBtnActive : ""}`}
            onClick={() => onStep11Variant("success")}
          >
            Success
          </button>
          <button
            type="button"
            className={`${styles.variantBtn} ${step11Variant === "failure" ? styles.variantBtnActive : ""}`}
            onClick={() => onStep11Variant("failure")}
          >
            Failure
          </button>
        </div>
      )}

      {display.callout && (
        <div className={styles.chipRow}>
          <span className={styles.chip}>
            {display.callout.label}: {display.callout.value}
          </span>
        </div>
      )}

      {display.events?.length > 0 && (
        <div className={styles.chipRow}>
          {display.events.map((event) => (
            <span key={event} className={`${styles.chip} ${styles.chipEvent}`}>
              {event}
            </span>
          ))}
        </div>
      )}

      <p className={styles.note}>{display.note}</p>
    </div>
  );
}

function Controls({ currentStep, onStep, onPrev, onNext }) {
  return (
    <div className={styles.controls}>
      <button type="button" className={styles.navBtn} onClick={onPrev} disabled={currentStep === 1} aria-label="Previous step">
        ← Previous
      </button>

      <div className={styles.stepDots}>
        {LIFECYCLE_STEPS.map((s) => (
          <button
            key={s.number}
            type="button"
            className={`${styles.stepDot} ${s.number === currentStep ? styles.stepDotActive : ""}`}
            onClick={() => onStep(s.number)}
            aria-label={`Step ${s.number}: ${s.title}`}
            aria-current={s.number === currentStep ? "step" : undefined}
          >
            {s.number}
          </button>
        ))}
      </div>

      <button
        type="button"
        className={styles.navBtn}
        onClick={onNext}
        disabled={currentStep === LIFECYCLE_STEPS.length}
        aria-label="Next step"
      >
        Next →
      </button>
    </div>
  );
}

const TemporalLifecycleDemo = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [step11Variant, setStep11Variant] = useState("success");

  const step = LIFECYCLE_STEPS[currentStep - 1];

  const display = useMemo(() => {
    if (currentStep === 11 && step.variants) {
      return { ...step, ...step.variants[step11Variant] };
    }
    return step;
  }, [currentStep, step, step11Variant]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "ArrowLeft") setCurrentStep((s) => Math.max(1, s - 1));
      if (event.key === "ArrowRight") setCurrentStep((s) => Math.min(LIFECYCLE_STEPS.length, s + 1));
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className={styles.demo} role="region" aria-label="Temporal architecture lifecycle demo">
      <div className={styles.header}>
        <h3 className={styles.headerTitle}>Temporal Architecture: 15-Step Lifecycle</h3>
        <p className={styles.headerDesc}>
          Interactive visualization of how the Client, Frontend Service, History Service, Matching Service, Workers,
          and database collaborate to execute Workflows and Activities.
        </p>
      </div>

      <div className={styles.content}>
        <div className={styles.diagramPanel}>
          <LifecycleDiagram step={display} prefix="lifecycle" />
        </div>

        <StepPanel
          display={display}
          step11Variant={step11Variant}
          onStep11Variant={setStep11Variant}
          showStep11Toggle={currentStep === 11}
        />
      </div>

      <Controls
        currentStep={currentStep}
        onStep={setCurrentStep}
        onPrev={() => setCurrentStep(Math.max(1, currentStep - 1))}
        onNext={() => setCurrentStep(Math.min(LIFECYCLE_STEPS.length, currentStep + 1))}
      />

      <p className={styles.legend}>
        <strong>Purple arrows</strong> show requests sent through the Frontend. <strong>Green arrows</strong> show
        responses coming back. Your Worker runs in YOUR ENVIRONMENT. The internal Worker Service inside the server stays
        dim.
      </p>
    </div>
  );
};

export default TemporalLifecycleDemo;
