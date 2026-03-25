import CodeBlock from '@theme/CodeBlock';
import React, { useState } from 'react';
import styles from './NexusDemo.module.css';

type Props = { onNext: () => void };

type Lang = 'dotnet' | 'go' | 'typescript';

const TABS: { id: Lang; label: string }[] = [
  { id: 'dotnet', label: '.NET' },
  { id: 'go', label: 'Go' },
  { id: 'typescript', label: 'TypeScript' },
];

const content: Record<
  Lang,
  {
    repoUrl: string;
    repoLabel: string;
    steps: { title: string; desc: string; code: string; lang: string }[];
  }
> = {
  dotnet: {
    repoUrl: 'https://github.com/temporalio/samples-dotnet/tree/main/src/NexusSimple',
    repoLabel: 'temporalio/samples-dotnet — NexusSimple',
    steps: [
      {
        title: 'Clone the repo',
        desc: 'Get the samples repository.',
        code: 'git clone https://github.com/temporalio/samples-dotnet.git\ncd samples-dotnet/src/NexusSimple',
        lang: 'bash',
      },
      {
        title: 'Create namespaces and endpoint',
        desc: 'Follow the README to create the two namespaces and the Nexus Endpoint in Temporal Cloud or your local server.',
        code: '# See README.md for tcld / Temporal Cloud UI steps',
        lang: 'bash',
      },
      {
        title: 'Start the handler worker',
        desc: 'Run in a separate terminal. This worker handles Nexus operations in the handler namespace.',
        code: 'dotnet run -- handler-worker',
        lang: 'bash',
      },
      {
        title: 'Start the caller worker',
        desc: 'Run in a separate terminal. This worker executes caller workflows in the caller namespace.',
        code: 'dotnet run -- caller-worker',
        lang: 'bash',
      },
      {
        title: 'Execute the caller workflow',
        desc: 'Starts both the Echo and Hello caller workflows and prints the results.',
        code: 'dotnet run -- caller-workflow\n# Output:\n# Workflow result: Nexus Echo 👋\n# Workflow result: ¡Hola! Temporal 👋',
        lang: 'bash',
      },
    ],
  },
  go: {
    repoUrl: 'https://github.com/temporalio/samples-go/tree/main/nexus',
    repoLabel: 'temporalio/samples-go — nexus',
    steps: [
      {
        title: 'Clone the repo',
        desc: 'Get the samples repository.',
        code: 'git clone https://github.com/temporalio/samples-go.git\ncd samples-go/nexus',
        lang: 'bash',
      },
      {
        title: 'Create namespaces and endpoint',
        desc: 'Follow the README to create the two namespaces and the Nexus Endpoint.',
        code: '# See README.md for tcld / Temporal Cloud UI steps',
        lang: 'bash',
      },
      {
        title: 'Start the handler worker',
        desc: 'Run in a separate terminal.',
        code: 'go run ./handler/worker/main.go',
        lang: 'bash',
      },
      {
        title: 'Start the caller worker',
        desc: 'Run in a separate terminal.',
        code: 'go run ./caller/worker/main.go',
        lang: 'bash',
      },
      {
        title: 'Run the caller starter',
        desc: 'Starts both the Echo and Hello caller workflows.',
        code: 'go run ./caller/starter/main.go\n# Output:\n# Workflow result: Nexus Echo 👋\n# Workflow result: ¡Hola! Temporal 👋',
        lang: 'bash',
      },
    ],
  },
  typescript: {
    repoUrl: 'https://github.com/temporalio/samples-typescript/tree/main/nexus-hello',
    repoLabel: 'temporalio/samples-typescript — nexus-hello',
    steps: [
      {
        title: 'Clone the repo',
        desc: 'Get the samples repository.',
        code: 'git clone https://github.com/temporalio/samples-typescript.git\ncd samples-typescript/nexus-hello\nnpm install',
        lang: 'bash',
      },
      {
        title: 'Create namespaces and endpoint',
        desc: 'Follow the README to create the two namespaces and the Nexus Endpoint.',
        code: '# See README.md for tcld / Temporal Cloud UI steps',
        lang: 'bash',
      },
      {
        title: 'Start the handler worker',
        desc: 'Run in a separate terminal.',
        code: 'npm run start:service-worker',
        lang: 'bash',
      },
      {
        title: 'Start the caller worker',
        desc: 'Run in a separate terminal.',
        code: 'npm run start:caller-worker',
        lang: 'bash',
      },
      {
        title: 'Execute the caller workflow',
        desc: 'Runs the Hello caller workflow.',
        code: 'npm run start:caller-workflow\n# Output:\n# Workflow result: ¡Hola! Temporal 👋',
        lang: 'bash',
      },
    ],
  },
};

export default function RunIt({ onNext }: Props) {
  const [lang, setLang] = useState<Lang>('dotnet');
  const current = content[lang];

  return (
    <div className={styles.section}>
      <div className={styles.progressBar}>
        <div className={styles.progressFill} style={{ width: '57%' }} />
      </div>

      <h1>Run It Yourself</h1>
      <p className={styles.lead}>
        All three SDK samples are ready to run. Pick a language, follow the steps, and you'll
        have a working cross-namespace Nexus call in minutes.
      </p>

      <div className={styles.runTabs}>
        {TABS.map((t) => (
          <button
            key={t.id}
            className={`${styles.runTab} ${lang === t.id ? styles.runTabActive : ''}`}
            onClick={() => setLang(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <a
        href={current.repoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.repoLink}
        style={{ marginBottom: 28, display: 'inline-flex' }}
      >
        <span>↗</span> {current.repoLabel}
      </a>

      <div className={styles.runSteps}>
        {current.steps.map((step, i) => (
          <div key={i} className={styles.runStep}>
            <div className={styles.runStepNum}>{i + 1}</div>
            <div className={styles.runStepBody}>
              <div className={styles.runStepTitle}>{step.title}</div>
              <div className={styles.runStepDesc}>{step.desc}</div>
              <CodeBlock language={step.lang}>{step.code}</CodeBlock>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.nextRow}>
        <button className={styles.btn} onClick={onNext}>
          Next: Build It →
        </button>
      </div>
    </div>
  );
}
