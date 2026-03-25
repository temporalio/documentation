import React, { useState } from 'react';
import styles from './NexusDemo.module.css';

type Props = { onNext: () => void };
type Lang = 'dotnet' | 'go' | 'typescript';

const TABS: { id: Lang; label: string }[] = [
  { id: 'dotnet', label: '.NET' },
  { id: 'go', label: 'Go' },
  { id: 'typescript', label: 'TypeScript' },
];

function Cmd({ prompt, cmd }: { prompt: string; cmd: string }) {
  return (
    <div className={styles.runitCmd}>
      <span className={styles.runitPrompt}>{prompt}</span>
      <span className={styles.runitCmdText}>{cmd}</span>
    </div>
  );
}

export default function RunIt({ onNext }: Props) {
  const [lang, setLang] = useState<Lang>('dotnet');

  return (
    <div className={styles.section}>
      <div className={styles.progressBar}>
        <div className={styles.progressFill} style={{ width: '57%' }} />
      </div>

      <h1>Run It Yourself</h1>
      <p className={styles.lead}>
        Three official Nexus samples — pick your language and run locally in minutes.
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

      {lang === 'dotnet' && (
        <>
          <div className={styles.card} style={{ marginBottom: 20 }}>
            <div className={`${styles.tag} ${styles.tagBlue}`} style={{ marginBottom: 10 }}>
              samples-dotnet / NexusSimple
            </div>
            <p style={{ fontSize: 13, color: 'var(--nd-muted)', margin: '0 0 14px' }}>
              Defines a typed <code>IHelloService</code> interface with a sync Echo and async
              SayHello (workflow-backed) operation across two namespaces.
            </p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <a
                href="https://github.com/temporalio/samples-dotnet/tree/main/src/NexusSimple"
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.runitLink} ${styles.runitLinkPrimary}`}
              >
                View on GitHub →
              </a>
            </div>
          </div>

          <h3 className={styles.runitSectionLabel}>Setup</h3>
          <Cmd prompt="#" cmd="Create two namespaces + a Nexus endpoint first (see README)" />
          <Cmd
            prompt="$"
            cmd="git clone https://github.com/temporalio/samples-dotnet && cd samples-dotnet/src/NexusSimple"
          />

          <h3 className={styles.runitSectionLabel} style={{ marginTop: 16 }}>
            Run (3 terminals)
          </h3>
          <Cmd prompt="T1 $" cmd="dotnet run handler-worker" />
          <Cmd prompt="T2 $" cmd="dotnet run caller-worker" />
          <Cmd prompt="T3 $" cmd="dotnet run caller-workflow" />
          <div className={styles.runitOutput}># Output: ¡Hola! Temporal 👋</div>
        </>
      )}

      {lang === 'go' && (
        <>
          <div className={styles.card} style={{ marginBottom: 20 }}>
            <div className={`${styles.tag} ${styles.tagPurple}`} style={{ marginBottom: 10 }}>
              samples-go / nexus
            </div>
            <p style={{ fontSize: 13, color: 'var(--nd-muted)', margin: '0 0 14px' }}>
              Go implementation of the same Hello/Echo pattern with sync and workflow-backed async
              operations.
            </p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <a
                href="https://github.com/temporalio/samples-go/tree/main/nexus"
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.runitLink} ${styles.runitLinkPrimary}`}
              >
                View on GitHub →
              </a>
            </div>
          </div>

          <h3 className={styles.runitSectionLabel}>Setup</h3>
          <Cmd prompt="#" cmd="Create two namespaces + a Nexus endpoint first (see README)" />
          <Cmd
            prompt="$"
            cmd="git clone https://github.com/temporalio/samples-go && cd samples-go/nexus"
          />

          <h3 className={styles.runitSectionLabel} style={{ marginTop: 16 }}>
            Run (3 terminals)
          </h3>
          <Cmd prompt="T1 $" cmd="go run ./handler/worker/main.go" />
          <Cmd prompt="T2 $" cmd="go run ./caller/worker/main.go" />
          <Cmd prompt="T3 $" cmd="go run ./caller/starter/main.go" />
          <div className={styles.runitOutput}># Output: ¡Hola! Temporal 👋</div>
        </>
      )}

      {lang === 'typescript' && (
        <>
          <div className={styles.card} style={{ marginBottom: 20 }}>
            <div className={`${styles.tag} ${styles.tagGreen}`} style={{ marginBottom: 10 }}>
              samples-typescript / nexus-hello
            </div>
            <p style={{ fontSize: 13, color: 'var(--nd-muted)', margin: '0 0 14px' }}>
              TypeScript version using <code>nexus-rpc</code> and <code>@temporalio/nexus</code>.
            </p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <a
                href="https://github.com/temporalio/samples-typescript/tree/main/nexus-hello"
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.runitLink} ${styles.runitLinkPrimary}`}
              >
                View on GitHub →
              </a>
              <a
                href="https://stackblitz.com/github/temporalio/samples-typescript/tree/main/nexus-hello"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.runitLink}
              >
                Open in StackBlitz ↗
              </a>
            </div>
          </div>

          <h3 className={styles.runitSectionLabel}>Setup</h3>
          <Cmd prompt="#" cmd="Create two namespaces + a Nexus endpoint first (see README)" />
          <Cmd
            prompt="$"
            cmd="git clone https://github.com/temporalio/samples-typescript && cd samples-typescript/nexus-hello && npm install"
          />

          <h3 className={styles.runitSectionLabel} style={{ marginTop: 16 }}>
            Run (3 terminals)
          </h3>
          <Cmd prompt="T1 $" cmd="npm run start:service-worker" />
          <Cmd prompt="T2 $" cmd="npm run start:caller-worker" />
          <Cmd prompt="T3 $" cmd="npm run start:caller-workflow" />
          <div className={styles.runitOutput}># Output: ¡Hola! Temporal 👋</div>
        </>
      )}

      <div className={styles.nextRow}>
        <button className={styles.btn} onClick={onNext}>
          Next: Build It →
        </button>
      </div>
    </div>
  );
}
