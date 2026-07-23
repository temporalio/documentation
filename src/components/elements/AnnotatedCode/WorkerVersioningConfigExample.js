import React from 'react';
import AnnotatedCode from '@site/src/components/elements/AnnotatedCode';
import SdkTabs from '@site/src/components/elements/Sdk/SdkTabs';

const DESCRIPTIONS = {
  useVersioning:
    'Enables Worker Versioning for this Worker so Tasks are matched to Deployment Versions.',
  version:
    'Identifies the revision this Worker may execute: a deployment name plus a Build ID.',
  defaultBehavior:
    'Optional. If unset, you must set the Versioning Behavior on each Workflow. Otherwise default to Pinned or Auto-Upgrade.',
};

const EXAMPLES = {
  go: {
    code: `buildID := mustGetEnv("MY_BUILD_ID")
w := worker.New(c, myTaskQueue, worker.Options{
  DeploymentOptions: worker.DeploymentOptions{
    UseVersioning: true,
    Version: worker.WorkerDeploymentVersion{
      DeploymentName: "llm_srv",
      BuildID:        buildID,
    },
    DefaultVersioningBehavior: workflow.VersioningBehaviorUnspecified,
  },
})`,
    annotations: [
      {
        label: 'UseVersioning',
        description: DESCRIPTIONS.useVersioning,
        lines: [4],
      },
      {
        label: 'Version',
        description: DESCRIPTIONS.version,
        lines: [5, 6, 7, 8],
      },
      {
        label: 'Default Versioning Behavior',
        description: DESCRIPTIONS.defaultBehavior,
        lines: [9],
      },
    ],
  },
  java: {
    code: `import io.temporal.worker.WorkerOptions;
import io.temporal.common.VersioningBehavior;
import io.temporal.common.WorkerDeploymentVersion;
import io.temporal.worker.WorkerDeploymentOptions;

WorkerOptions.newBuilder()
  .setDeploymentOptions(
      WorkerDeploymentOptions.newBuilder()
      .setVersion(new WorkerDeploymentVersion("llm_srv", "1.0"))
      .setUseVersioning(true)
      .setDefaultVersioningBehavior(VersioningBehavior.AUTO_UPGRADE)
      .build())
  .build();`,
    annotations: [
      {
        label: 'UseVersioning',
        description: DESCRIPTIONS.useVersioning,
        lines: [10],
      },
      {
        label: 'Version',
        description: DESCRIPTIONS.version,
        lines: [9],
      },
      {
        label: 'Default Versioning Behavior',
        description: DESCRIPTIONS.defaultBehavior,
        lines: [11],
      },
    ],
  },
  python: {
    code: `from temporalio.common import WorkerDeploymentVersion, VersioningBehavior
from temporalio.worker import Worker, WorkerDeploymentConfig

Worker(
    client,
    task_queue="mytaskqueue",
    workflows=workflows,
    activities=activities,
    deployment_config=WorkerDeploymentConfig(
        version=WorkerDeploymentVersion(
            deployment_name="llm_srv",
            build_id=my_env.build_id),
        use_worker_versioning=True,
        default_versioning_behavior=VersioningBehavior.UNSPECIFIED
    ),
)`,
    annotations: [
      {
        label: 'UseVersioning',
        description: DESCRIPTIONS.useVersioning,
        lines: [13],
      },
      {
        label: 'Version',
        description: DESCRIPTIONS.version,
        lines: [10, 11, 12],
      },
      {
        label: 'Default Versioning Behavior',
        description: DESCRIPTIONS.defaultBehavior,
        lines: [14],
      },
    ],
  },
  typescript: {
    code: `const myWorker = await Worker.create({
  workflowsPath: require.resolve('./workflows'),
  taskQueue,
  workerDeploymentOptions: {
    useWorkerVersioning: true,
    version: { buildId: '1.0', deploymentName: 'llm_srv' },
  },
  connection: nativeConnection,
});`,
    annotations: [
      {
        label: 'UseVersioning',
        description: DESCRIPTIONS.useVersioning,
        lines: [5],
      },
      {
        label: 'Version',
        description: DESCRIPTIONS.version,
        lines: [6],
      },
      {
        label: 'Default Versioning Behavior',
        description:
          'Optional. This TypeScript example does not set a default; set Versioning Behavior on each Workflow, or add a default when your SDK supports it on Worker options.',
        lines: [],
      },
    ],
  },
  dotnet: {
    code: `var myWorker = new TemporalWorker(
    Client,
    new TemporalWorkerOptions(taskQueue)
    {
      DeploymentOptions = new(new("llm_srv", "1.0"), true)
      {
        DefaultVersioningBehavior = VersioningBehavior.Unspecified,
      },
    }.AddWorkflow<MyWorkflow>());`,
    annotations: [
      {
        label: 'UseVersioning',
        description: DESCRIPTIONS.useVersioning,
        lines: [5],
      },
      {
        label: 'Version',
        description: DESCRIPTIONS.version,
        lines: [5],
      },
      {
        label: 'Default Versioning Behavior',
        description: DESCRIPTIONS.defaultBehavior,
        lines: [7],
      },
    ],
  },
  ruby: {
    code: `worker = Temporalio::Worker.new(
  client: client,
  task_queue: task_queue,
  workflows: [MyWorkflow],
  deployment_options: Temporalio::Worker::DeploymentOptions.new(
      version: Temporalio::WorkerDeploymentVersion.new(
          deployment_name: 'llm_srv',
          build_id: '1.0'
      ),
      use_worker_versioning: true,
      default_versioning_behavior: Temporalio::VersioningBehavior::UNSPECIFIED
  )
)`,
    annotations: [
      {
        label: 'UseVersioning',
        description: DESCRIPTIONS.useVersioning,
        lines: [10],
      },
      {
        label: 'Version',
        description: DESCRIPTIONS.version,
        lines: [6, 7, 8, 9],
      },
      {
        label: 'Default Versioning Behavior',
        description: DESCRIPTIONS.defaultBehavior,
        lines: [11],
      },
    ],
  },
};

function Example({ lang }) {
  const example = EXAMPLES[lang];
  return (
    <AnnotatedCode code={example.code} annotations={example.annotations} />
  );
}

/** Annotated Worker Versioning setup examples for each supported SDK. */
export default function WorkerVersioningConfigExample() {
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
