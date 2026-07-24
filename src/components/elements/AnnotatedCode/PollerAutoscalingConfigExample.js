import React from 'react';
import AnnotatedCode from '@site/src/components/elements/AnnotatedCode';
import SdkTabs from '@site/src/components/elements/Sdk/SdkTabs';

const DESCRIPTIONS = {
  workflow:
    'Autoscales the number of pollers for Workflow Tasks based on load.',
  activity:
    'Autoscales the number of pollers for Activity Tasks based on load.',
  nexus:
    'Autoscales the number of pollers for Nexus Tasks based on load.',
};

const DOCS = {
  go: 'https://pkg.go.dev/go.temporal.io/sdk/worker#PollerBehaviorAutoscalingOptions',
  java: 'https://javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/worker/tuning/PollerBehaviorAutoscaling.html',
  python: 'https://python.temporal.io/temporalio.worker.PollerBehaviorAutoscaling.html',
  typescript:
    'https://typescript.temporal.io/api/interfaces/proto.temporal.api.sdk.v1.WorkerConfig.IAutoscalingPollerBehavior',
  dotnet:
    'https://dotnet.temporal.io/api/Temporalio.Worker.Tuning.PollerBehavior.Autoscaling.html',
  ruby: 'https://ruby.temporal.io/Temporalio/Worker/PollerBehavior/Autoscaling.html',
};

const DOC_LABELS = {
  go: 'Go SDK docs',
  java: 'Java SDK docs',
  python: 'Python SDK docs',
  typescript: 'TypeScript SDK docs',
  dotnet: '.NET SDK docs',
  ruby: 'Ruby SDK docs',
};

const EXAMPLES = {
  go: {
    code: `w := worker.New(c, "my-task-queue", worker.Options{
  WorkflowTaskPollerBehavior: worker.NewPollerBehaviorAutoscaling(worker.PollerBehaviorAutoscalingOptions{}),
  ActivityTaskPollerBehavior: worker.NewPollerBehaviorAutoscaling(worker.PollerBehaviorAutoscalingOptions{}),
  NexusTaskPollerBehavior: worker.NewPollerBehaviorAutoscaling(worker.PollerBehaviorAutoscalingOptions{}),
})`,
    annotations: [
      { label: 'Workflow Task poller', description: DESCRIPTIONS.workflow, lines: [2] },
      { label: 'Activity Task poller', description: DESCRIPTIONS.activity, lines: [3] },
      { label: 'Nexus Task poller', description: DESCRIPTIONS.nexus, lines: [4] },
    ],
  },
  java: {
    code: `public class WorkerExample {
    public static void main(String[] args) {
        WorkflowServiceStubs service = WorkflowServiceStubs.newLocalServiceStubs();
        WorkflowClient client = WorkflowClient.newInstance(service);
        WorkerFactory factory = WorkerFactory.newInstance(client);
        WorkerOptions workerOptions = WorkerOptions.newBuilder()
            .setWorkflowTaskPollersBehavior(new PollerBehaviorAutoscaling())
            .setActivityTaskPollersBehavior(new PollerBehaviorAutoscaling())
            .setNexusTaskPollersBehavior(new PollerBehaviorAutoscaling())
            .build();

        Worker worker = factory.newWorker("my-task-queue", workerOptions);
    }
}`,
    annotations: [
      { label: 'Workflow Task poller', description: DESCRIPTIONS.workflow, lines: [7] },
      { label: 'Activity Task poller', description: DESCRIPTIONS.activity, lines: [8] },
      { label: 'Nexus Task poller', description: DESCRIPTIONS.nexus, lines: [9] },
    ],
  },
  python: {
    code: `worker = Worker(
    client,
    task_queue="my-task-queue",
    workflows=[MyWorkflow],
    activities=[my_activity],

    workflow_task_poller_behavior=PollerBehaviorAutoscaling(),
    activity_task_poller_behavior=PollerBehaviorAutoscaling(),
    nexus_task_poller_behavior=PollerBehaviorAutoscaling(),
)`,
    annotations: [
      { label: 'Workflow Task poller', description: DESCRIPTIONS.workflow, lines: [7] },
      { label: 'Activity Task poller', description: DESCRIPTIONS.activity, lines: [8] },
      { label: 'Nexus Task poller', description: DESCRIPTIONS.nexus, lines: [9] },
    ],
  },
  typescript: {
    code: `const worker = await Worker.create({
  connection,
  taskQueue: 'my-task-queue',
  workflowsPath: require.resolve('./workflows'),
  activities,

  workflowTaskPollerBehavior: PollerBehavior.autoscaling(),
  activityTaskPollerBehavior: PollerBehavior.autoscaling(),
  nexusTaskPollerBehavior: PollerBehavior.autoscaling(),
});`,
    annotations: [
      { label: 'Workflow Task poller', description: DESCRIPTIONS.workflow, lines: [7] },
      { label: 'Activity Task poller', description: DESCRIPTIONS.activity, lines: [8] },
      { label: 'Nexus Task poller', description: DESCRIPTIONS.nexus, lines: [9] },
    ],
  },
  dotnet: {
    code: `using var worker = new TemporalWorker(
    client,
    new TemporalWorkerOptions("my-task-queue")
    {
        WorkflowTaskPollerBehavior = new PollerBehavior.Autoscaling(),
        ActivityTaskPollerBehavior = new PollerBehavior.Autoscaling(),
        NexusTaskPollerBehavior = new PollerBehavior.Autoscaling(),
    }
    .AddWorkflow<MyWorkflow>()
    .AddActivity(MyActivities.MyActivity)
);`,
    annotations: [
      { label: 'Workflow Task poller', description: DESCRIPTIONS.workflow, lines: [5] },
      { label: 'Activity Task poller', description: DESCRIPTIONS.activity, lines: [6] },
      { label: 'Nexus Task poller', description: DESCRIPTIONS.nexus, lines: [7] },
    ],
  },
  ruby: {
    code: `worker = Temporalio::Worker.new(
  client,
  'my-task-queue',
  workflows: [MyWorkflow],
  activities: [MyActivity],

  workflow_task_poller_behavior: Temporalio::Worker::PollerBehavior::Autoscaling.new,
  activity_task_poller_behavior: Temporalio::Worker::PollerBehavior::Autoscaling.new,
  nexus_task_poller_behavior: Temporalio::Worker::PollerBehavior::Autoscaling.new,
)`,
    annotations: [
      { label: 'Workflow Task poller', description: DESCRIPTIONS.workflow, lines: [7] },
      { label: 'Activity Task poller', description: DESCRIPTIONS.activity, lines: [8] },
      { label: 'Nexus Task poller', description: DESCRIPTIONS.nexus, lines: [9] },
    ],
  },
};

function Example({ lang }) {
  const example = EXAMPLES[lang];
  return (
    <>
      <p>
        <a href={DOCS[lang]}>{DOC_LABELS[lang]}</a>
      </p>
      <AnnotatedCode code={example.code} annotations={example.annotations} />
    </>
  );
}

/** Annotated Poller Autoscaling Worker options for each supported SDK. */
export default function PollerAutoscalingConfigExample() {
  return (
    <SdkTabs hideUnsupportedLanguages>
      <SdkTabs.Go>
        <Example lang="go" />
      </SdkTabs.Go>
      <SdkTabs.Java>
        <Example lang="java" />
      </SdkTabs.Java>
      <SdkTabs.Python>
        <Example lang="python" />
      </SdkTabs.Python>
      <SdkTabs.TypeScript>
        <Example lang="typescript" />
      </SdkTabs.TypeScript>
      <SdkTabs.DotNet>
        <Example lang="dotnet" />
      </SdkTabs.DotNet>
      <SdkTabs.Ruby>
        <Example lang="ruby" />
      </SdkTabs.Ruby>
    </SdkTabs>
  );
}
