import CodeBlock from '@theme/CodeBlock';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './serverless-worker-demo.module.css';

// ---------------------------------------------------------------------------
// Code generation
// ---------------------------------------------------------------------------

function generateWorkerCode(config) {
  const { deploymentName, buildId, taskQueue } = config;
  return `package main

import (
\tlambdaworker "go.temporal.io/sdk/contrib/aws/lambdaworker"
\t"go.temporal.io/sdk/worker"
\t"go.temporal.io/sdk/workflow"
)

func main() {
\tlambdaworker.RunWorker(worker.WorkerDeploymentVersion{
\t\tDeploymentName: "${deploymentName}",
\t\tBuildID:        "${buildId}",
\t}, func(opts *lambdaworker.Options) error {
\t\topts.TaskQueue = "${taskQueue}"

\t\topts.RegisterWorkflowWithOptions(MyWorkflow, workflow.RegisterOptions{
\t\t\tVersioningBehavior: workflow.VersioningBehaviorAutoUpgrade,
\t\t})
\t\topts.RegisterActivity(MyActivity)

\t\treturn nil
\t})
}`;
}

function generateTomlCode(config) {
  const { namespace } = config;
  return `[profile.default]
address = "${namespace}.tmprl.cloud:7233"
namespace = "${namespace}"
[profile.default.tls]
client_cert_path = "client.pem"
client_key_path = "client.key"`;
}

function generateDeployScript(config) {
  const { namespace, lambdaFunctionName } = config;
  return `# Create temporal.toml for connection config
cat > temporal.toml <<'EOF'
[profile.default]
address = "${namespace}.tmprl.cloud:7233"
namespace = "${namespace}"
[profile.default.tls]
client_cert_path = "client.pem"
client_key_path = "client.key"
EOF

# Build for Lambda
GOOS=linux GOARCH=amd64 go build -tags lambda.norpc -o bootstrap ./worker

# Bundle binary with config and credentials
zip function.zip bootstrap client.pem client.key temporal.toml

# Deploy to Lambda
aws lambda update-function-code \\
  --function-name ${lambdaFunctionName} \\
  --zip-file fileb://function.zip`;
}

function generateIamScript() {
  return `# Create the IAM role using the CloudFormation template
./mk-iam-role.sh <stack-name> <external-id> <lambda-arn>

# The External ID is provided by Temporal
# in your namespace's serverless worker configuration.`;
}

function generateCliCode(config) {
  const { namespace, deploymentName, buildId, lambdaArn, scalerMin, scalerMax } = config;
  return `temporal worker deployment create-version \\
  --namespace ${namespace} \\
  --deployment-name ${deploymentName} \\
  --build-id ${buildId} \\
  --aws-lambda-invoke ${lambdaArn} \\
  --scaler-min-instances ${scalerMin} \\
  --scaler-max-instances ${scalerMax}`;
}

function generateStartWorkflow(config) {
  const { namespace, taskQueue } = config;
  return `temporal workflow start \\
  --namespace ${namespace} \\
  --task-queue ${taskQueue} \\
  --type MyWorkflow \\
  --input '"Hello, serverless!"'`;
}

// ---------------------------------------------------------------------------
// Steps configuration — ties steps to code tabs
// ---------------------------------------------------------------------------

const STEPS = [
  {
    id: 'worker',
    number: '1',
    title: 'Write worker code',
    description:
      'Use the lambdaworker package to write a Worker that runs inside a Lambda function. Register Workflows and Activities the same way you would with a standard Worker.',
    codeLabel: 'Worker Code',
    language: 'go',
    generate: generateWorkerCode,
  },
  {
    id: 'deploy',
    number: '2',
    title: 'Deploy to Lambda',
    description:
      'Create a temporal.toml connection config, cross-compile for Linux, bundle everything together, and deploy to AWS Lambda.',
    codeLabel: 'Deploy Script',
    language: 'bash',
    generate: generateDeployScript,
  },
  {
    id: 'iam',
    number: '3',
    title: 'Configure IAM',
    description:
      'Create an IAM role that allows Temporal to invoke your Lambda function. Temporal provides a CloudFormation template. The External ID prevents unauthorized access.',
    codeLabel: 'IAM Setup',
    language: 'bash',
    generate: generateIamScript,
  },
  {
    id: 'cli',
    number: '4',
    title: 'Register compute config',
    description:
      'Use the CLI to create a Worker Deployment Version with your Lambda ARN as the compute provider. The deployment name and build ID must match your worker code.',
    codeLabel: 'CLI Command',
    language: 'bash',
    generate: generateCliCode,
  },
  {
    id: 'start',
    number: '5',
    title: 'Start a Workflow',
    description:
      'Start a Workflow on the same Task Queue. When the task arrives with no active pollers, Temporal invokes your Lambda function. The Worker starts, processes the task, and shuts down.',
    codeLabel: 'Start Workflow',
    language: 'bash',
    generate: generateStartWorkflow,
  },
];

// ---------------------------------------------------------------------------
// Flow diagram nodes
// ---------------------------------------------------------------------------

const FLOW_NODES = [
  { label: 'Start', sub: 'Client' },
  { label: 'Task Queue', sub: 'No pollers' },
  { label: 'Temporal', sub: 'Invokes Lambda' },
  { label: 'Worker', sub: 'Lambda' },
  { label: 'Done', sub: 'Result' },
];

const IDLE_NODES = Array(FLOW_NODES.length).fill('pending');

const DEFAULT_CONFIG = {
  deploymentName: 'my-app',
  buildId: 'build-1',
  taskQueue: 'serverless-task-queue',
  namespace: 'your-namespace.your-account',
  lambdaFunctionName: 'my-temporal-worker',
  lambdaArn: 'arn:aws:lambda:us-east-1:123456789012:function:my-temporal-worker',
  scalerMin: 0,
  scalerMax: 5,
};

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function ServerlessWorkerDemo() {
  const [activeStep, setActiveStep] = useState(0);
  const [config, setConfig] = useState({ ...DEFAULT_CONFIG });

  const [sim, setSim] = useState({
    running: false,
    nodeStates: [...IDLE_NODES],
    log: [],
    status: 'idle',
    result: null,
  });

  const runIdRef = useRef(0);
  const logScrollRef = useRef(null);
  const codeRef = useRef(null);

  useEffect(() => {
    if (logScrollRef.current) {
      logScrollRef.current.scrollTop = logScrollRef.current.scrollHeight;
    }
  }, [sim.log]);

  const updateConfig = useCallback((key, value) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleFunctionNameChange = useCallback((value) => {
    setConfig((prev) => ({
      ...prev,
      lambdaFunctionName: value,
      lambdaArn: `arn:aws:lambda:us-east-1:123456789012:function:${value}`,
    }));
  }, []);

  const handleStepClick = useCallback((index) => {
    setActiveStep(index);
  }, []);

  const currentStep = STEPS[activeStep];
  const code = currentStep.generate(config);

  const handleSimulate = useCallback(() => {
    const runId = ++runIdRef.current;
    const isCancelled = () => runIdRef.current !== runId;
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const startTime = Date.now();
    const logEntries = [];

    const elapsed = () => ((Date.now() - startTime) / 1000).toFixed(2);

    const update = (nodeStates, msg, type = 'info') => {
      if (isCancelled()) return;
      if (msg) logEntries.push({ time: elapsed(), msg, type });
      setSim((prev) => ({
        ...prev,
        running: true,
        nodeStates,
        log: [...logEntries],
        status: 'running',
      }));
    };

    // Jump to the last step and start simulation
    setActiveStep(STEPS.length - 1);

    setSim({
      running: true,
      nodeStates: [...IDLE_NODES],
      log: [],
      status: 'running',
      result: null,
    });

    (async () => {
      update(
        ['active', 'pending', 'pending', 'pending', 'pending'],
        `Workflow started on task queue "${config.taskQueue}"...`
      );
      await sleep(600);
      if (isCancelled()) return;

      update(
        ['completed', 'active', 'pending', 'pending', 'pending'],
        'Task enqueued. No active pollers detected on task queue.'
      );
      await sleep(800);
      if (isCancelled()) return;

      update(
        ['completed', 'completed', 'active', 'pending', 'pending'],
        'Temporal Service detected unpolled task. Invoking compute provider...'
      );
      await sleep(600);
      if (isCancelled()) return;

      update(
        ['completed', 'completed', 'active', 'pending', 'pending'],
        'Assuming IAM role via cross-account trust. Validating External ID.',
        'info'
      );
      await sleep(500);
      if (isCancelled()) return;

      update(
        ['completed', 'completed', 'completed', 'active', 'pending'],
        `Lambda function "${config.lambdaFunctionName}" invoked.`
      );
      await sleep(500);
      if (isCancelled()) return;

      update(
        ['completed', 'completed', 'completed', 'active', 'pending'],
        `Worker started. Deployment: "${config.deploymentName}", Build: "${config.buildId}".`
      );
      await sleep(400);
      if (isCancelled()) return;

      update(
        ['completed', 'completed', 'completed', 'active', 'pending'],
        `Worker polling task queue "${config.taskQueue}" for tasks...`
      );
      await sleep(500);
      if (isCancelled()) return;

      update(
        ['completed', 'completed', 'completed', 'active', 'pending'],
        'Picked up Workflow Task. Executing MyWorkflow...'
      );
      await sleep(600);
      if (isCancelled()) return;

      update(
        ['completed', 'completed', 'completed', 'active', 'pending'],
        'Executing Activity: MyActivity...'
      );
      await sleep(500);
      if (isCancelled()) return;

      const result = 'Workflow completed successfully';
      logEntries.push({
        time: elapsed(),
        msg: 'Activity completed. Workflow result returned to caller.',
        type: 'success',
      });
      logEntries.push({
        time: elapsed(),
        msg: 'Worker draining. Graceful shutdown before Lambda deadline.',
        type: 'info',
      });

      setSim({
        running: false,
        nodeStates: ['completed', 'completed', 'completed', 'completed', 'completed'],
        log: [...logEntries],
        status: 'completed',
        result,
      });
    })();
  }, [config]);

  return (
    <div className={styles.demo}>
      {/* ── Simulation: the main interactive area ── */}
      <div className={styles.columns}>
        <div className={styles.leftCol}>
          <section className={styles.section}>
            <button
              className={`${styles.executeBtn} ${sim.running ? styles.executeBtnDisabled : ''}`}
              onClick={handleSimulate}
              disabled={sim.running}
            >
              {sim.running ? (
                <>
                  <span className={styles.spinner} />
                  Running...
                </>
              ) : (
                'Simulate Workflow'
              )}
            </button>
          </section>

          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Serverless Worker Flow</h3>
            <div className={styles.flowDiagram}>
              {FLOW_NODES.map((node, i) => (
                <React.Fragment key={i}>
                  <div
                    className={[
                      styles.flowNode,
                      styles['flowNode_' + sim.nodeStates[i]],
                    ].join(' ')}
                  >
                    <div className={styles.flowNodeLabel}>{node.label}</div>
                    <div className={styles.flowNodeSub}>{node.sub}</div>
                  </div>
                  {i < FLOW_NODES.length - 1 && (
                    <div
                      className={[
                        styles.flowArrow,
                        sim.nodeStates[i] === 'completed' ? styles.flowArrowLit : '',
                      ].join(' ')}
                    >
                      &rsaquo;
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </section>

          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Execution Log</h3>
            <div className={styles.log} ref={logScrollRef}>
              {sim.log.length === 0 ? (
                <div className={styles.logPlaceholder}>
                  Click &ldquo;Simulate Workflow&rdquo; to see the serverless worker flow in action
                </div>
              ) : (
                sim.log.map((entry, i) => (
                  <div
                    key={i}
                    className={[styles.logLine, styles['logLine_' + entry.type]].join(' ')}
                  >
                    <span className={styles.logTime}>[{entry.time}s]</span>
                    <span className={styles.logMsg}>{entry.msg}</span>
                  </div>
                ))
              )}
            </div>

            {sim.status === 'completed' && (
              <div className={styles.resultSuccess}>Workflow completed successfully.</div>
            )}
          </section>
        </div>

        <div className={styles.rightCol}>
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Configuration</h3>
            <div className={styles.configGrid}>
              <ConfigField
                label="Deployment Name"
                value={config.deploymentName}
                onChange={(v) => updateConfig('deploymentName', v)}
              />
              <ConfigField
                label="Build ID"
                value={config.buildId}
                onChange={(v) => updateConfig('buildId', v)}
              />
              <ConfigField
                label="Task Queue"
                value={config.taskQueue}
                onChange={(v) => updateConfig('taskQueue', v)}
              />
              <ConfigField
                label="Namespace"
                value={config.namespace}
                onChange={(v) => updateConfig('namespace', v)}
              />
              <ConfigField
                label="Lambda Function Name"
                value={config.lambdaFunctionName}
                onChange={handleFunctionNameChange}
              />
              <ConfigField
                label="Min Instances"
                value={config.scalerMin}
                type="number"
                min={0}
                max={100}
                onChange={(v) => updateConfig('scalerMin', Number(v))}
              />
              <ConfigField
                label="Max Instances"
                value={config.scalerMax}
                type="number"
                min={0}
                max={100}
                onChange={(v) => updateConfig('scalerMax', Number(v))}
              />
            </div>
          </section>
        </div>
      </div>

      {/* ── Step-by-step walkthrough: steps left, code right ── */}
      <div className={styles.stepsAndCode}>
        <div className={styles.stepsCol}>
          <h3 className={styles.sectionTitle}>Step-by-step walkthrough</h3>
          <div className={styles.stepsContainer}>
            {STEPS.map((step, i) => (
              <button
                key={step.id}
                className={[
                  styles.step,
                  activeStep === i ? styles.stepActive : '',
                ].join(' ')}
                onClick={() => handleStepClick(i)}
              >
                <div className={[
                  styles.stepNumber,
                  activeStep === i ? styles.stepNumberActive : '',
                ].join(' ')}>
                  {step.number}
                </div>
                <div className={styles.stepContent}>
                  <div className={styles.stepTitle}>{step.title}</div>
                  {activeStep === i && (
                    <div className={styles.stepDesc}>{step.description}</div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className={styles.codeCol} ref={codeRef}>
          <h3 className={styles.sectionTitle}>
            <span className={styles.codeStepLabel}>Step {currentStep.number}:</span>{' '}
            {currentStep.codeLabel}
          </h3>
          <CodeBlock language={currentStep.language}>{code}</CodeBlock>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function ConfigField({ label, value, onChange, type = 'text', min, max }) {
  return (
    <div className={styles.configRow}>
      <label className={styles.configLabel}>{label}</label>
      <input
        className={styles.configInput}
        type={type}
        value={value}
        min={min}
        max={max}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
