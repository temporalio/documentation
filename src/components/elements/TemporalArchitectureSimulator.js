import React, { useState } from "react";
import styles from "./temporal-architecture-simulator.module.css";
import { useColorMode } from "@docusaurus/theme-common";

const TemporalArchitectureSimulator = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  const steps = [
    {
      number: 1,
      title: "Client requests Workflow start",
      description:
        "Your application calls StartWorkflowExecution on the Temporal API (gRPC) exposed by the Frontend Service.",
      actors: ["Client", "Frontend"],
      message: "StartWorkflowExecution(workflowType, inputs, taskQueue)",
      color: "#FF6B6B",
    },
    {
      number: 2,
      title: "History Service creates Workflow Execution",
      description:
        "History creates a new Workflow Execution in the database and initializes its Event History with WorkflowExecutionStarted and WorkflowTaskScheduled.",
      actors: ["Frontend", "History", "Database"],
      message: "Create Workflow + Transfer Task",
      color: "#4ECDC4",
    },
    {
      number: 3,
      title: "Matching Service adds Workflow Task to Queue",
      description:
        "A background queue processor in History Service reads the Transfer Task and calls Matching Service to add the Workflow Task to the Task Queue.",
      actors: ["History", "Matching"],
      message: "AddWorkflowTask(taskQueue)",
      color: "#45B7D1",
    },
    {
      number: 4,
      title: "Worker polls for Workflow Task",
      description:
        "A Worker process polls the Task Queue using PollWorkflowTask. The Matching Service picks this task and History appends WorkflowTaskStarted.",
      actors: ["Worker", "Matching", "History"],
      message: "PollWorkflowTask → returns task + history",
      color: "#FFA07A",
    },
    {
      number: 5,
      title: "Worker runs Workflow code",
      description:
        "The SDK replays the Event History to reconstruct logical Workflow state, then starts your Workflow function. The Workflow runs until it needs to wait.",
      actors: ["Worker"],
      message: "Execute Workflow logic",
      color: "#98D8C8",
    },
    {
      number: 6,
      title: "Workflow asks for work via Commands",
      description:
        "When your Workflow calls Temporal APIs (e.g., execute Activity), the SDK records Commands like ScheduleActivityTask. The Worker sends RespondWorkflowTaskCompleted.",
      actors: ["Worker", "Frontend"],
      message: "RespondWorkflowTaskCompleted(Commands[])",
      color: "#F7DC6F",
    },
    {
      number: 7,
      title: "History Service processes Commands",
      description:
        "History appends Events based on Commands and creates new internal tasks. For ScheduleActivityTask: it creates ActivityTaskScheduled and Transfer Tasks.",
      actors: ["History", "Matching"],
      message: "Append Events + create Transfer Tasks",
      color: "#BB8FCE",
    },
    {
      number: 8,
      title: "Matching Service queues Activity Task",
      description:
        "For each ActivityTaskScheduled Event, a queue processor in History calls Matching to add the Activity Task to the Activity Task Queue.",
      actors: ["History", "Matching"],
      message: "AddActivityTask(taskQueue)",
      color: "#85C1E2",
    },
    {
      number: 9,
      title: "Activity Worker polls and starts Activity",
      description:
        "A (possibly different) Worker polls the Activity Task Queue using PollActivityTask. The Matching Service selects the task and History appends ActivityTaskStarted.",
      actors: ["Worker", "Matching", "History"],
      message: "PollActivityTask → returns task",
      color: "#F8B88B",
    },
    {
      number: 10,
      title: "Worker runs Activity code",
      description:
        "The Worker calls your Activity function/method with the inputs from the task. This code can do I/O and call external services.",
      actors: ["Worker"],
      message: "Execute Activity logic (external calls allowed)",
      color: "#A9DFBF",
    },
    {
      number: 11,
      title: "Activity reports result",
      description:
        "On success, the Worker sends RespondActivityTaskCompleted (with result) to History. History appends ActivityTaskCompleted and schedules a new Workflow Task.",
      actors: ["Worker", "Frontend", "History"],
      message: "RespondActivityTaskCompleted(result)",
      color: "#F5B041",
    },
    {
      number: 12,
      title: "New Workflow Task scheduled",
      description:
        "Because of the Activity completion, History has appended Events and scheduled a new Workflow Task. A queue processor calls Matching to add it to the Workflow Task Queue.",
      actors: ["History", "Matching"],
      message: "AddWorkflowTask(taskQueue)",
      color: "#D7BDE2",
    },
    {
      number: 13,
      title: "Worker picks up next Workflow Task",
      description:
        "A Worker polls the Workflow Task Queue again. The Matching Service selects the task; History appends WorkflowTaskStarted. The Worker receives updated Event History.",
      actors: ["Worker", "Matching", "History"],
      message: "PollWorkflowTask → returns updated history",
      color: "#85C1E2",
    },
    {
      number: 14,
      title: "Workflow continues and eventually closes",
      description:
        "The workflow execution repeats the cycle. When the Workflow function returns a result, History appends WorkflowTaskCompleted and WorkflowExecutionCompleted.",
      actors: ["Worker", "History"],
      message: "RespondWorkflowTaskCompleted(CompleteWorkflowExecution)",
      color: "#82E0AA",
    },
    {
      number: 15,
      title: "Client reads result from Frontend",
      description:
        "After the Workflow is closed, a Client can request the final result by calling the SDK, which talks to Frontend. Frontend reads data from History/Database.",
      actors: ["Client", "Frontend", "History", "Database"],
      message: "GetWorkflowResult → returns outcome",
      color: "#FF6B6B",
    },
  ];

  const currentStepData = steps[currentStep - 1];

  const components = [
    { name: "Client", x: 10, y: 15, isActive: currentStepData.actors.includes("Client") },
    { name: "Frontend", x: 50, y: 15, isActive: currentStepData.actors.includes("Frontend") },
    { name: "History", x: 30, y: 50, isActive: currentStepData.actors.includes("History") },
    { name: "Matching", x: 70, y: 50, isActive: currentStepData.actors.includes("Matching") },
    { name: "Worker", x: 50, y: 75, isActive: currentStepData.actors.includes("Worker") },
    { name: "Database", x: 30, y: 85, isActive: currentStepData.actors.includes("Database") },
  ];

  const getConnectionPairs = () => {
    const pairs = [];
    for (let i = 0; i < currentStepData.actors.length - 1; i++) {
      pairs.push([currentStepData.actors[i], currentStepData.actors[i + 1]]);
    }
    return pairs;
  };

  return (
    <div className={`${styles.simulator} ${isDark ? styles.dark : styles.light}`}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Temporal Architecture: 15-Step Lifecycle</h2>
          <p>
            Interactive visualization of how the Client, Frontend Service, History Service, Matching Service, Workers,
            and Database collaborate to execute Workflows and Activities.
          </p>
        </div>

        <div className={styles.content}>
          <div className={styles.diagram}>
            <svg className={styles.svg} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
              {/* Draw connections between active components */}
              {getConnectionPairs().map((pair, idx) => {
                const comp1 = components.find((c) => c.name === pair[0]);
                const comp2 = components.find((c) => c.name === pair[1]);
                return (
                  <line
                    key={`connection-${idx}`}
                    x1={comp1.x}
                    y1={comp1.y}
                    x2={comp2.x}
                    y2={comp2.y}
                    className={styles.connection}
                    strokeWidth="0.5"
                    stroke={currentStepData.color}
                  />
                );
              })}

              {/* Draw components */}
              {components.map((comp) => (
                <g key={comp.name}>
                  <circle
                    cx={comp.x}
                    cy={comp.y}
                    r="4"
                    className={`${styles.component} ${comp.isActive ? styles.active : styles.inactive}`}
                    fill={comp.isActive ? currentStepData.color : "#ccc"}
                  />
                  <text
                    x={comp.x}
                    y={comp.y + 6}
                    textAnchor="middle"
                    className={styles.label}
                    fontSize="3"
                    fill={isDark ? "#fff" : "#000"}
                  >
                    {comp.name}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          <div className={styles.details}>
            <div className={styles.stepInfo}>
              <div className={styles.stepNumber} style={{ backgroundColor: currentStepData.color }}>
                Step {currentStepData.number}/{steps.length}
              </div>
              <h3>{currentStepData.title}</h3>
              <p className={styles.description}>{currentStepData.description}</p>

              <div className={styles.messageBox}>
                <strong>Message:</strong>
                <code>{currentStepData.message}</code>
              </div>

              <div className={styles.actors}>
                <strong>Components involved:</strong>
                <div className={styles.actorsList}>
                  {currentStepData.actors.map((actor) => (
                    <span key={actor} className={styles.actor}>
                      {actor}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.controls}>
          <button
            className={styles.button}
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
          >
            ← Previous
          </button>

          <div className={styles.stepIndicator}>
            {steps.map((_, idx) => (
              <button
                key={idx}
                className={`${styles.stepDot} ${idx + 1 === currentStep ? styles.active : ""}`}
                onClick={() => setCurrentStep(idx + 1)}
                title={`Step ${idx + 1}`}
              />
            ))}
          </div>

          <button
            className={styles.button}
            onClick={() => setCurrentStep(Math.min(steps.length, currentStep + 1))}
            disabled={currentStep === steps.length}
          >
            Next →
          </button>
        </div>

        <div className={styles.legend}>
          <p>
            <strong>How to use:</strong> Click through the steps to see how each component in Temporal interacts
            during a Workflow and Activity execution. The diagram highlights which components are communicating in
            each step.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TemporalArchitectureSimulator;
