import React, { useState } from 'react';
import styles from './HADemo.module.css';

type Props = { onNext: () => void };
type Tab = 'create' | 'add' | 'remove';

const TABS: { id: Tab; label: string }[] = [
  { id: 'create', label: 'Create with HA' },
  { id: 'add', label: 'Add replica to existing' },
  { id: 'remove', label: 'Remove replica' },
];

function Cmd({ prompt, cmd }: { prompt: string; cmd: string }) {
  return (
    <div className={styles.cmdBlock}>
      <span className={styles.cmdPrompt}>{prompt}&nbsp;</span>
      <span className={styles.cmdText}>{cmd}</span>
    </div>
  );
}

export default function EnableIt({ onNext }: Props) {
  const [tab, setTab] = useState<Tab>('create');

  return (
    <div className={styles.section}>
      <div className={styles.progressBar}>
        <div className={styles.progressFill} style={{ width: '71%' }} />
      </div>

      <h1>Enable High Availability</h1>
      <p className={styles.lead}>
        You can add a replica when creating a new Namespace or at any time on an existing one.
        Both the Web UI and <code>tcld</code> CLI are supported.
      </p>

      <div className={styles.runTabs}>
        {TABS.map((t) => (
          <button
            key={t.id}
            className={`${styles.runTab} ${tab === t.id ? styles.runTabActive : ''}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── Create with HA ── */}
      {tab === 'create' && (
        <>
          <div className={styles.card} style={{ marginBottom: 20 }}>
            <div className={`${styles.tag} ${styles.tagBlue}`}>New Namespace</div>
            <p style={{ fontSize: 13, color: 'var(--hd-muted)', margin: '0 0 0' }}>
              Specify both a primary region and a replica region when creating the Namespace.
              Temporal Cloud immediately begins replicating all new Workflow history to the replica.
            </p>
          </div>

          <div className={styles.enableSectionLabel}>Via tcld</div>
          <Cmd
            prompt="$"
            cmd={`tcld namespace create \\
  --namespace <namespace_id>.<account_id> \\
  --region <primary_region> \\
  --region <replica_region>`}
          />
          <div className={styles.cmdOutput}>
            # Example (multi-region, GA):
            # --region aws-us-east-1 --region aws-us-west-2
          </div>

          <div className={styles.enableSectionLabel}>Via Web UI</div>
          <div className={styles.failoverSteps}>
            <div className={styles.failoverStep}>
              <div className={styles.failoverStepNum}>1</div>
              <div>
                <div className={styles.failoverStepText}>Navigate to Temporal Cloud and click <strong>Create Namespace</strong></div>
              </div>
            </div>
            <div className={styles.failoverStep}>
              <div className={styles.failoverStepNum}>2</div>
              <div>
                <div className={styles.failoverStepText}>Select the <strong>primary region</strong></div>
                <div className={styles.failoverStepNote}>e.g. AWS us-east-1</div>
              </div>
            </div>
            <div className={styles.failoverStep}>
              <div className={styles.failoverStepNum}>3</div>
              <div>
                <div className={styles.failoverStepText}>Click <strong>"Add a replica"</strong> and choose the replica region</div>
                <div className={styles.failoverStepNote}>
                  Same-region and multi-cloud are in Public Preview; multi-region is GA.
                </div>
              </div>
            </div>
            <div className={styles.failoverStep}>
              <div className={styles.failoverStepNum}>4</div>
              <div>
                <div className={styles.failoverStepText}>Confirm and create</div>
                <div className={styles.failoverStepNote}>
                  Replication begins immediately for all new and existing Workflow Executions.
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ── Add to existing ── */}
      {tab === 'add' && (
        <>
          <div className={styles.card} style={{ marginBottom: 20 }}>
            <div className={`${styles.tag} ${styles.tagGreen}`}>Existing Namespace</div>
            <p style={{ fontSize: 13, color: 'var(--hd-muted)', margin: 0 }}>
              You can add a replica to an existing Namespace at any time. Temporal Cloud begins
              asynchronously replicating <strong>all ongoing and historical</strong> Workflow
              Executions to the new replica.
            </p>
          </div>

          <div className={styles.enableSectionLabel}>Via tcld</div>
          <Cmd
            prompt="$"
            cmd={`tcld namespace add-region \\
  --namespace <namespace_id>.<account_id> \\
  --region <replica_region>`}
          />

          <div className={styles.enableSectionLabel}>Via Web UI</div>
          <div className={styles.failoverSteps}>
            <div className={styles.failoverStep}>
              <div className={styles.failoverStepNum}>1</div>
              <div>
                <div className={styles.failoverStepText}>
                  Go to your Namespace detail page in Temporal Cloud
                </div>
              </div>
            </div>
            <div className={styles.failoverStep}>
              <div className={styles.failoverStepNum}>2</div>
              <div>
                <div className={styles.failoverStepText}>
                  Click <strong>"Add a replica"</strong>
                </div>
              </div>
            </div>
            <div className={styles.failoverStep}>
              <div className={styles.failoverStepNum}>3</div>
              <div>
                <div className={styles.failoverStepText}>
                  Select the desired replica region and confirm
                </div>
                <div className={styles.failoverStepNote}>
                  Replication of existing history begins immediately.
                </div>
              </div>
            </div>
          </div>

          <div className={styles.enableNote}>
            <span className={styles.enableNoteIcon}>ℹ️</span>
            <span>
              <strong>Changing replica location:</strong> Direct migration of a replica to a
              different region is not supported. Remove the existing replica first, then add a new
              one in the desired location. You must wait <strong>7 days</strong> before re-enabling
              HA in the same region after removal.
            </span>
          </div>
        </>
      )}

      {/* ── Remove replica ── */}
      {tab === 'remove' && (
        <>
          <div className={styles.card} style={{ marginBottom: 20 }}>
            <div className={`${styles.tag} ${styles.tagAmber}`}>Disable HA</div>
            <p style={{ fontSize: 13, color: 'var(--hd-muted)', margin: 0 }}>
              Removing a replica disables replication and reduces the Namespace back to a standard
              single-isolation-domain configuration. The 7-day cooldown applies before you can
              re-add a replica in the same location.
            </p>
          </div>

          <div className={styles.enableSectionLabel}>Via tcld</div>
          <Cmd
            prompt="$"
            cmd={`tcld namespace delete-region \\
  --api-key <api_key> \\
  --namespace <namespace_id>.<account_id> \\
  --region <replica_region_name>`}
          />

          <div className={styles.enableSectionLabel}>Via Web UI</div>
          <div className={styles.failoverSteps}>
            <div className={styles.failoverStep}>
              <div className={styles.failoverStepNum}>1</div>
              <div>
                <div className={styles.failoverStepText}>
                  Go to your Namespace detail page
                </div>
              </div>
            </div>
            <div className={styles.failoverStep}>
              <div className={styles.failoverStepNum}>2</div>
              <div>
                <div className={styles.failoverStepText}>
                  Find the replica entry and click <strong>"Remove replica"</strong>
                </div>
              </div>
            </div>
            <div className={styles.failoverStep}>
              <div className={styles.failoverStepNum}>3</div>
              <div>
                <div className={styles.failoverStepText}>Confirm the removal</div>
                <div className={styles.failoverStepNote}>
                  The Namespace reverts to standard configuration. SLA reverts to 99.9%.
                </div>
              </div>
            </div>
          </div>

          <div className={styles.enableNote}>
            <span className={styles.enableNoteIcon}>⚠️</span>
            <span>
              <strong>7-day cooldown:</strong> After removing a replica, you cannot re-enable HA
              in the same location for 7 days. Plan replica migrations carefully — remove first,
              add the new location, then remove the old one if needed.
            </span>
          </div>
        </>
      )}

      <h2 className={styles.sectionHeading}>Monitoring Replication Health</h2>
      <div className={styles.cardGrid} style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
        <div className={styles.card}>
          <div className={`${styles.tag} ${styles.tagBlue}`}>Cloud UI</div>
          <p style={{ fontSize: 13, color: 'var(--ifm-font-color-base)', margin: '0 0 8px', lineHeight: 1.6 }}>
            The Temporal Cloud UI displays replica status and health. When a replica becomes
            unhealthy, failover options are automatically disabled to prevent cascading issues.
          </p>
        </div>
        <div className={styles.card}>
          <div className={`${styles.tag} ${styles.tagPurple}`}>Metrics</div>
          <p style={{ fontSize: 13, color: 'var(--ifm-font-color-base)', margin: '0 0 8px', lineHeight: 1.6 }}>
            Replication lag is emitted as pre-computed percentiles (p50, p95, p99) on the metric{' '}
            <code>temporal_cloud_v0_replication_lag_bucket</code>, labeled with{' '}
            <code>temporal_namespace</code>. Target: p95 &lt; 1 minute.
          </p>
          <p style={{ fontSize: 12, color: 'var(--hd-muted)', margin: 0, lineHeight: 1.5 }}>
            Note: <code>temporal_cloud_v1_total_action_count</code> may appear doubled for HA
            Namespaces — actions are replicated on both primary and replica.
          </p>
        </div>
      </div>

      <div className={styles.nextRow}>
        <button className={styles.btn} onClick={onNext}>
          Next: Test Yourself →
        </button>
      </div>
    </div>
  );
}
