import React from 'react';
import AnnotatedCode from '@site/src/components/elements/AnnotatedCode';
import SdkTabs from '@site/src/components/elements/Sdk/SdkTabs';

const DESCRIPTIONS = {
  priorityKey:
    'Priority key in the range [1, 5]. Lower values run first. If unset, Tasks default to priority 3.',
  fairnessKey:
    'Groups Tasks into a virtual queue (for example by tenant or workload type) so no single group monopolizes the Task Queue.',
  fairnessWeight:
    'Relative dispatch weight for this fairness key. Default is 1.0. Higher weights get a larger share of dispatches.',
};

const EXAMPLES = {
  go: {
    code: `workflowOptions := client.StartWorkflowOptions{
  ID:        "my-workflow-id",
  TaskQueue: "my-task-queue",
  Priority:  temporal.Priority{
    PriorityKey:    1,
    FairnessKey:    "a-key",
    FairnessWeight: 3.14,
  },
}
we, err := c.ExecuteWorkflow(context.Background(), workflowOptions, MyWorkflow)`,
    annotations: [
      { label: 'Priority key', description: DESCRIPTIONS.priorityKey, lines: [5] },
      { label: 'Fairness key', description: DESCRIPTIONS.fairnessKey, lines: [6] },
      { label: 'Fairness weight', description: DESCRIPTIONS.fairnessWeight, lines: [7] },
    ],
  },
  java: {
    code: `WorkflowOptions options = WorkflowOptions.newBuilder()
  .setTaskQueue("my-task-queue")
  .setPriority(Priority.newBuilder()
      .setPriorityKey(5)
      .setFairnessKey("a-key")
      .setFairnessWeight(3.14)
      .build())
  .build();
WorkflowClient client = WorkflowClient.newInstance(service);
MyWorkflow workflow = client.newWorkflowStub(MyWorkflow.class, options);
workflow.run();`,
    annotations: [
      { label: 'Priority key', description: DESCRIPTIONS.priorityKey, lines: [4] },
      { label: 'Fairness key', description: DESCRIPTIONS.fairnessKey, lines: [5] },
      { label: 'Fairness weight', description: DESCRIPTIONS.fairnessWeight, lines: [6] },
    ],
  },
  python: {
    code: `await client.start_workflow(
  MyWorkflow.run,
  args="hello",
  id="my-workflow-id",
  task_queue="my-task-queue",
  priority=Priority(
      priority_key=3,
      fairness_key="a-key",
      fairness_weight=3.14,
  ),
)`,
    annotations: [
      { label: 'Priority key', description: DESCRIPTIONS.priorityKey, lines: [7] },
      { label: 'Fairness key', description: DESCRIPTIONS.fairnessKey, lines: [8] },
      { label: 'Fairness weight', description: DESCRIPTIONS.fairnessWeight, lines: [9] },
    ],
  },
  ruby: {
    code: `client.start_workflow(
  MyWorkflow, "input-arg",
  id: "my-workflow-id",
  task_queue: "my-task-queue",
  priority: Temporalio::Priority.new(
    priority_key: 3,
    fairness_key: "a-key",
    fairness_weight: 3.14
  )
)`,
    annotations: [
      { label: 'Priority key', description: DESCRIPTIONS.priorityKey, lines: [6] },
      { label: 'Fairness key', description: DESCRIPTIONS.fairnessKey, lines: [7] },
      { label: 'Fairness weight', description: DESCRIPTIONS.fairnessWeight, lines: [8] },
    ],
  },
  typescript: {
    code: `const handle = await startWorkflow(workflows.priorityWorkflow, {
  args: [false, 1],
  priority: {
    priorityKey: 3,
    fairnessKey: 'a-key',
    fairnessWeight: 3.14,
  },
});`,
    annotations: [
      { label: 'Priority key', description: DESCRIPTIONS.priorityKey, lines: [4] },
      { label: 'Fairness key', description: DESCRIPTIONS.fairnessKey, lines: [5] },
      { label: 'Fairness weight', description: DESCRIPTIONS.fairnessWeight, lines: [6] },
    ],
  },
  dotnet: {
    code: `var handle = await Client.StartWorkflowAsync(
  (MyWorkflow wf) => wf.RunAsync("hello"),
  new StartWorkflowOptions(
    id: "my-workflow-id",
    taskQueue: "my-task-queue"
  )
  {
    Priority = new Priority(
      priorityKey: 3,
      fairnessKey: "a-key",
      fairnessWeight: 3.14
    )
  }
);`,
    annotations: [
      { label: 'Priority key', description: DESCRIPTIONS.priorityKey, lines: [8] },
      { label: 'Fairness key', description: DESCRIPTIONS.fairnessKey, lines: [9] },
      { label: 'Fairness weight', description: DESCRIPTIONS.fairnessWeight, lines: [10] },
    ],
  },
};

function Example({ lang }) {
  const example = EXAMPLES[lang];
  return <AnnotatedCode code={example.code} annotations={example.annotations} />;
}

/** Annotated Fairness + Priority Workflow start examples for each supported SDK. */
export default function FairnessWorkflowConfigExample() {
  return (
    <SdkTabs>
      <SdkTabs.Go>
        <Example lang="go" />
      </SdkTabs.Go>
      <SdkTabs.Java>
        <Example lang="java" />
      </SdkTabs.Java>
      <SdkTabs.Python>
        <Example lang="python" />
      </SdkTabs.Python>
      <SdkTabs.Ruby>
        <Example lang="ruby" />
      </SdkTabs.Ruby>
      <SdkTabs.TypeScript>
        <Example lang="typescript" />
      </SdkTabs.TypeScript>
      <SdkTabs.DotNet>
        <Example lang="dotnet" />
      </SdkTabs.DotNet>
    </SdkTabs>
  );
}
