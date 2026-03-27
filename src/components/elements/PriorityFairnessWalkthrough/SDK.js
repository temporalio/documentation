import CodeBlock from '@theme/CodeBlock';
import React, { useState } from 'react';
import styles from './walkthrough.module.css';

const LANGS = ['Go', 'Java', 'Python', 'TypeScript', '.NET'];

const EXAMPLES = {
  priorityOnly: {
    title: 'Workflow - Priority only',
    Go: `workflowOptions := client.StartWorkflowOptions{
  ID:        "my-workflow-id",
  TaskQueue: "my-task-queue",
  Priority:  temporal.Priority{PriorityKey: 1},
}
we, err := c.ExecuteWorkflow(ctx, workflowOptions, MyWorkflow)`,
    Java: `WorkflowOptions options = WorkflowOptions.newBuilder()
  .setTaskQueue("my-task-queue")
  .setPriority(Priority.newBuilder().setPriorityKey(1).build())
  .build();
MyWorkflow workflow = client.newWorkflowStub(MyWorkflow.class, options);
workflow.run();`,
    Python: `await client.start_workflow(
  MyWorkflow.run,
  id="my-workflow-id",
  task_queue="my-task-queue",
  priority=Priority(priority_key=1),
)`,
    TypeScript: `const handle = await client.workflow.start(MyWorkflow, {
  workflowId: "my-workflow-id",
  taskQueue: "my-task-queue",
  priority: { priorityKey: 1 },
});`,
    '.NET': `var handle = await Client.StartWorkflowAsync(
  (MyWorkflow wf) => wf.RunAsync(),
  new StartWorkflowOptions("my-workflow-id", "my-task-queue")
  {
    Priority = new Priority(priorityKey: 1),
  }
);`,
  },
  priorityAndFairness: {
    title: 'Workflow - Priority + Fairness',
    Go: `workflowOptions := client.StartWorkflowOptions{
  ID:        "my-workflow-id",
  TaskQueue: "my-task-queue",
  Priority: temporal.Priority{
    PriorityKey:    1,
    FairnessKey:    "tenant-acme",
    FairnessWeight: 3.0,
  },
}
we, err := c.ExecuteWorkflow(ctx, workflowOptions, MyWorkflow)`,
    Java: `WorkflowOptions options = WorkflowOptions.newBuilder()
  .setTaskQueue("my-task-queue")
  .setPriority(Priority.newBuilder()
    .setPriorityKey(1)
    .setFairnessKey("tenant-acme")
    .setFairnessWeight(3.0)
    .build())
  .build();
MyWorkflow workflow = client.newWorkflowStub(MyWorkflow.class, options);
workflow.run();`,
    Python: `await client.start_workflow(
  MyWorkflow.run,
  id="my-workflow-id",
  task_queue="my-task-queue",
  priority=Priority(priority_key=1, fairness_key="tenant-acme", fairness_weight=3.0),
)`,
    TypeScript: `const handle = await client.workflow.start(MyWorkflow, {
  workflowId: "my-workflow-id",
  taskQueue: "my-task-queue",
  priority: { priorityKey: 1, fairnessKey: "tenant-acme", fairnessWeight: 3.0 },
});`,
    '.NET': `var handle = await Client.StartWorkflowAsync(
  (MyWorkflow wf) => wf.RunAsync(),
  new StartWorkflowOptions("my-workflow-id", "my-task-queue")
  {
    Priority = new Priority(
      priorityKey: 1,
      fairnessKey: "tenant-acme",
      fairnessWeight: 3.0
    ),
  }
);`,
  },
};

const LANG_META = {
  Go: 'go',
  Java: 'java',
  Python: 'python',
  TypeScript: 'typescript',
  '.NET': 'csharp',
};

export default function SDK() {
  const [activeLang, setActiveLang] = useState('Go');

  return (
    <div className={styles.section}>
      <p className={styles.lead}>
        Set <code>priorityKey</code>, <code>fairnessKey</code>, or both when starting Workflows or
        scheduling Activities. Priority and Fairness are enabled by default - no configuration
        required for Temporal Cloud or self-hosted clusters running Temporal 1.26+.
      </p>

      {/* Language picker */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        {LANGS.map((lang) => (
          <button
            key={lang}
            onClick={() => setActiveLang(lang)}
            style={{
              border: '1px solid',
              borderColor: activeLang === lang ? 'var(--pfw-nav-active)' : 'var(--pfw-border)',
              background: activeLang === lang ? 'var(--pfw-badge-bg)' : 'transparent',
              color: activeLang === lang ? 'var(--pfw-nav-active)' : 'var(--pfw-muted)',
              padding: '5px 14px',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              borderRadius: 0,
              fontFamily: 'var(--ifm-font-family-base)',
              transition: 'all 0.15s',
            }}
          >
            {lang}
          </button>
        ))}
      </div>

      {/* Priority only */}
      <div className={styles.sdkGroup}>
        <div className={styles.sdkGroupTitle}>Priority only</div>
        <CodeBlock language={LANG_META[activeLang]}>
          {EXAMPLES.priorityOnly[activeLang]}
        </CodeBlock>
      </div>

      {/* Priority + Fairness */}
      <div className={styles.sdkGroup}>
        <div className={styles.sdkGroupTitle}>Priority + Fairness</div>
        <CodeBlock language={LANG_META[activeLang]}>
          {EXAMPLES.priorityAndFairness[activeLang]}
        </CodeBlock>
      </div>

      {/* CLI */}
      <div className={styles.sdkGroup}>
        <div className={styles.sdkGroupTitle}>Temporal CLI</div>
        <CodeBlock language="bash">{`temporal workflow start \\
  --type MyWorkflow \\
  --task-queue my-task-queue \\
  --workflow-id my-workflow-id \\
  --priority-key 1 \\
  --fairness-key tenant-acme \\
  --fairness-weight 3.0`}</CodeBlock>
      </div>

      <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--pfw-border)' }}>
        <p style={{ fontSize: '0.875rem', color: 'var(--pfw-muted)', margin: '0 0 0.5rem' }}>
          Next steps
        </p>
        <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.875rem', lineHeight: 1.8 }}>
          <li>
            <a href="/develop/task-queue-priority-fairness">Task Queue Priority and Fairness - full reference</a>
          </li>
          <li>
            <a href="/task-queue">Task Queue overview</a>
          </li>
          <li>
            <a href="/develop/worker-performance">Worker performance tuning</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
