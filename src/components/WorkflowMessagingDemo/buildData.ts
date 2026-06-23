export type LangId = 'python' | 'typescript' | 'go' | 'java' | 'dotnet';
export type MessageTypeId = 'signal' | 'query' | 'update';

export const LANGUAGES: { id: LangId; label: string; syntax: string }[] = [
  { id: 'python', label: 'Python', syntax: 'python' },
  { id: 'typescript', label: 'TypeScript', syntax: 'typescript' },
  { id: 'go', label: 'Go', syntax: 'go' },
  { id: 'java', label: 'Java', syntax: 'java' },
  { id: 'dotnet', label: '.NET', syntax: 'csharp' },
];

export type AnnotationLines = {
  workflowLines: number[];
  clientLines: number[];
};

export type Annotation = {
  label: string;
  description: string;
  lines: Record<LangId, AnnotationLines>;
};

export type LangCode = {
  workflowCode: string;
  clientCode: string;
};

export type MessageTypeData = {
  description: string;
  note: string;
  accentColor: string;
  code: Record<LangId, LangCode>;
  annotations: Annotation[];
};

/* ─────────────────────────────────────────────────
   SIGNAL
───────────────────────────────────────────────── */
export const signalData: MessageTypeData = {
  description:
    'A Signal is a one-way push into a running Workflow. The caller does not wait for the handler to run. Temporal persists signals so they are delivered even if the Worker is temporarily offline.',
  note:
    'The Workflow parks at the blocking condition until a Signal arrives and flips the flag. The client only waits for the server to accept the signal, not for the handler to finish.',
  accentColor: 'var(--nd-green)',
  code: {
    python: {
      workflowCode: `from temporalio import workflow

@workflow.defn
class OrderWorkflow:
    def __init__(self) -> None:
        self._approved: bool = False
        self._status: str = "pending"

    @workflow.run
    async def run(self, order_id: str) -> str:
        await workflow.wait_condition(
            lambda: self._approved
        )
        return f"Order {order_id} processed"

    @workflow.signal
    async def approve(self) -> None:
        self._approved = True
        self._status = "approved"

    @workflow.signal
    async def cancel(self, reason: str) -> None:
        self._status = f"cancelled: {reason}"`,
      clientCode: `from temporalio.client import Client
from order_workflow import OrderWorkflow

async def main():
    client = await Client.connect("localhost:7233")
    handle = await client.start_workflow(
        OrderWorkflow.run,
        "order-123",
        id="order-wf-123",
        task_queue="orders",
    )

    # Returns when server accepts the signal
    await handle.signal(OrderWorkflow.approve)

    # Signals can carry arguments
    await handle.signal(
        OrderWorkflow.cancel, "out of stock"
    )`,
    },
    typescript: {
      workflowCode: `import { defineSignal, setHandler, condition } from '@temporalio/workflow';

export const approveSignal = defineSignal('approve');
export const cancelSignal = defineSignal<[string]>('cancel');

export async function orderWorkflow(orderId: string): Promise<string> {
    let approved = false;
    let status = 'pending';

    setHandler(approveSignal, () => {
        approved = true;
        status = 'approved';
    });

    setHandler(cancelSignal, (reason: string) => {
        status = \`cancelled: \${reason}\`;
    });

    await condition(() => approved);
    return \`Order \${orderId} processed\`;
}`,
      clientCode: `import { Client } from '@temporalio/client';
import { orderWorkflow, approveSignal, cancelSignal } from './workflows';

async function main() {
    const client = new Client();
    const handle = await client.workflow.start(orderWorkflow, {
        taskQueue: 'orders',
        workflowId: 'order-wf-123',
        args: ['order-123'],
    });

    // Returns when server accepts the signal
    await handle.signal(approveSignal);

    // Signals can carry arguments
    await handle.signal(cancelSignal, 'out of stock');
}`,
    },
    go: {
      workflowCode: `package workflows

import "go.temporal.io/sdk/workflow"

func OrderWorkflow(ctx workflow.Context, orderID string) (string, error) {
    approved := false
    status := "pending"

    workflow.SetSignalHandler(ctx, "approve", func() {
        approved = true
        status = "approved"
    })

    workflow.SetSignalHandler(ctx, "cancel", func(reason string) {
        status = "cancelled: " + reason
    })

    _ = workflow.Await(ctx, func() bool { return approved })
    return "Order " + orderID + " processed", nil
}`,
      clientCode: `package main

import (
    "context"
    "go.temporal.io/sdk/client"
)

func main() {
    c, _ := client.Dial(client.Options{})
    defer c.Close()

    run, _ := c.ExecuteWorkflow(
        context.Background(),
        client.StartWorkflowOptions{
            ID: "order-wf-123", TaskQueue: "orders",
        },
        OrderWorkflow, "order-123",
    )

    // Returns when server accepts the signal
    _ = c.SignalWorkflow(
        context.Background(),
        "order-wf-123", run.GetRunID(), "approve", nil,
    )

    // Signals can carry arguments
    _ = c.SignalWorkflow(
        context.Background(),
        "order-wf-123", run.GetRunID(), "cancel", "out of stock",
    )
}`,
    },
    java: {
      workflowCode: `import io.temporal.workflow.*;

@WorkflowInterface
public interface OrderWorkflow {
    @WorkflowMethod
    String run(String orderId);

    @SignalMethod
    void approve();

    @SignalMethod
    void cancel(String reason);
}

public class OrderWorkflowImpl implements OrderWorkflow {
    private boolean approved = false;
    private String status = "pending";

    @Override
    public String run(String orderId) {
        Workflow.await(() -> approved);
        return "Order " + orderId + " processed";
    }

    @Override
    public void approve() {
        approved = true;
        status = "approved";
    }

    @Override
    public void cancel(String reason) {
        status = "cancelled: " + reason;
    }
}`,
      clientCode: `WorkflowOptions options = WorkflowOptions.newBuilder()
    .setWorkflowId("order-wf-123")
    .setTaskQueue("orders")
    .build();
OrderWorkflow workflow = client.newWorkflowStub(
    OrderWorkflow.class, options
);
WorkflowClient.start(workflow::run, "order-123");

// Returns when server accepts the signal
workflow.approve();

// Signals can carry arguments
workflow.cancel("out of stock");`,
    },
    dotnet: {
      workflowCode: `using Temporalio.Workflows;

[Workflow]
public class OrderWorkflow
{
    private bool _approved = false;
    private string _status = "pending";

    [WorkflowRun]
    public async Task<string> RunAsync(string orderId)
    {
        await Workflow.WaitConditionAsync(() => _approved);
        return $"Order {orderId} processed";
    }

    [WorkflowSignal]
    public async Task ApproveAsync()
    {
        _approved = true;
        _status = "approved";
    }

    [WorkflowSignal]
    public async Task CancelAsync(string reason)
    {
        _status = $"cancelled: {reason}";
    }
}`,
      clientCode: `var client = await TemporalClient.ConnectAsync(
    new("localhost:7233")
);
var handle = await client.StartWorkflowAsync(
    (OrderWorkflow wf) => wf.RunAsync("order-123"),
    new WorkflowOptions("order-wf-123", "orders")
);

// Returns when server accepts the signal
await handle.SignalAsync(wf => wf.ApproveAsync());

// Signals can carry arguments
await handle.SignalAsync(wf => wf.CancelAsync("out of stock"));`,
    },
  },
  annotations: [
    {
      label: '@workflow.signal decorator',
      description:
        'The decorator marks the method as a signal handler. The handler cannot return a value — signals are always fire-and-forget from the caller\'s perspective. The method can be either async def or a plain def.',
      lines: {
        python:     { workflowLines: [16, 17, 18, 19, 21, 22, 23], clientLines: [] },
        typescript: { workflowLines: [3, 4],                        clientLines: [] },
        go:         { workflowLines: [9, 10, 11, 12],               clientLines: [] },
        java:       { workflowLines: [8, 9, 10, 11],                clientLines: [] },
        dotnet:     { workflowLines: [14, 15, 16, 17, 18, 19],      clientLines: [] },
      },
    },
    {
      label: 'Handler updates instance variables',
      description:
        'The signal handler writes to instance variables that the main run() loop reads. This is the core pattern: the handler mutates state, and wait_condition re-evaluates based on that state.',
      lines: {
        python:     { workflowLines: [5, 6, 7, 16, 17, 18, 19], clientLines: [] },
        typescript: { workflowLines: [7, 8, 10, 11, 12, 13],     clientLines: [] },
        go:         { workflowLines: [6, 7, 9, 10, 11, 12],      clientLines: [] },
        java:       { workflowLines: [15, 16, 24, 25, 26, 27],   clientLines: [] },
        dotnet:     { workflowLines: [6, 7, 17, 18, 19, 20],     clientLines: [] },
      },
    },
    {
      label: 'wait_condition unblocks the Workflow',
      description:
        'wait_condition() (or the equivalent in each SDK) pauses the Workflow without spinning. When the signal handler updates the watched variable, Temporal re-evaluates the condition and resumes the Workflow automatically.',
      lines: {
        python:     { workflowLines: [9, 10, 11, 12, 13, 14], clientLines: [] },
        typescript: { workflowLines: [18, 19, 20],             clientLines: [] },
        go:         { workflowLines: [17, 18],                 clientLines: [] },
        java:       { workflowLines: [19, 20, 21],             clientLines: [] },
        dotnet:     { workflowLines: [11, 12, 13],             clientLines: [] },
      },
    },
    {
      label: 'handle.signal() from the client',
      description:
        'WorkflowHandle.signal() sends the signal. It returns as soon as the server accepts it — your code does not wait for the handler to run. Pass arguments as additional parameters after the signal name.',
      lines: {
        python:     { workflowLines: [], clientLines: [13, 14, 16, 17, 18] },
        typescript: { workflowLines: [], clientLines: [12, 13, 15] },
        go:         { workflowLines: [], clientLines: [20, 21, 22, 23, 24, 26, 27, 28, 29, 30] },
        java:       { workflowLines: [], clientLines: [9, 10, 12, 13] },
        dotnet:     { workflowLines: [], clientLines: [9, 10, 12, 13] },
      },
    },
  ],
};

/* ─────────────────────────────────────────────────
   QUERY
───────────────────────────────────────────────── */
export const queryData: MessageTypeData = {
  description:
    'A Query reads the current in-memory state of a running Workflow. The caller waits for the return value. Query handlers must not change state. If no Worker is running when a query arrives, it fails immediately.',
  note:
    'Queries are not written to event history, so they have no impact on Workflow execution. Use them freely for dashboards or status checks.',
  accentColor: 'var(--nd-purple)',
  code: {
    python: {
      workflowCode: `from temporalio import workflow

@workflow.defn
class OrderWorkflow:
    def __init__(self) -> None:
        self._status: str = "pending"
        self._approved: bool = False
        self._priority: int = 3

    @workflow.query
    def get_status(self) -> str:
        return self._status

    @workflow.query
    def get_details(self) -> dict:
        return {
            "status": self._status,
            "approved": self._approved,
            "priority": self._priority,
        }`,
      clientCode: `from temporalio.client import Client
from order_workflow import OrderWorkflow

async def main():
    client = await Client.connect("localhost:7233")
    handle = client.get_workflow_handle("order-wf-123")

    status = await handle.query(
        OrderWorkflow.get_status
    )
    print(f"Status: {status}")

    details = await handle.query(
        OrderWorkflow.get_details
    )
    print(details)`,
    },
    typescript: {
      workflowCode: `import { defineQuery, setHandler } from '@temporalio/workflow';

export const getStatusQuery = defineQuery<string>('getStatus');
export const getDetailsQuery = defineQuery<Record<string, unknown>>('getDetails');

export async function orderWorkflow(orderId: string): Promise<string> {
    let status = 'pending';
    let approved = false;
    let priority = 3;

    setHandler(getStatusQuery, () => status);

    setHandler(getDetailsQuery, () => ({
        status,
        approved,
        priority,
    }));

    // ... workflow logic
    return \`Order \${orderId} processed\`;
}`,
      clientCode: `import { Client } from '@temporalio/client';
import { getStatusQuery, getDetailsQuery } from './workflows';

async function main() {
    const client = new Client();
    const handle = client.workflow.getHandle('order-wf-123');

    const status = await handle.query(getStatusQuery);
    console.log(\`Status: \${status}\`);

    const details = await handle.query(getDetailsQuery);
    console.log(details);
}`,
    },
    go: {
      workflowCode: `package workflows

import "go.temporal.io/sdk/workflow"

func OrderWorkflow(ctx workflow.Context, orderID string) (string, error) {
    status := "pending"
    approved := false
    priority := 3

    workflow.SetQueryHandler(ctx, "getStatus",
        func() (string, error) {
            return status, nil
        },
    )

    workflow.SetQueryHandler(ctx, "getDetails",
        func() (map[string]interface{}, error) {
            return map[string]interface{}{
                "status":   status,
                "approved": approved,
                "priority": priority,
            }, nil
        },
    )

    // ... workflow logic
    return "Order " + orderID + " processed", nil
}`,
      clientCode: `resp, _ := c.QueryWorkflow(
    context.Background(),
    "order-wf-123", "",
    "getStatus",
)
var status string
_ = resp.Get(&status)
fmt.Printf("Status: %s\\n", status)

resp2, _ := c.QueryWorkflow(
    context.Background(),
    "order-wf-123", "",
    "getDetails",
)
var details map[string]interface{}
_ = resp2.Get(&details)
fmt.Println(details)`,
    },
    java: {
      workflowCode: `import io.temporal.workflow.*;
import java.util.Map;

@WorkflowInterface
public interface OrderWorkflow {
    @WorkflowMethod
    String run(String orderId);

    @QueryMethod
    String getStatus();

    @QueryMethod
    Map<String, Object> getDetails();
}

public class OrderWorkflowImpl implements OrderWorkflow {
    private String status = "pending";
    private boolean approved = false;
    private int priority = 3;

    @Override
    public String run(String orderId) {
        return "Order " + orderId + " processed";
    }

    @Override
    public String getStatus() {
        return status;
    }

    @Override
    public Map<String, Object> getDetails() {
        return Map.of(
            "status", status,
            "approved", approved,
            "priority", priority
        );
    }
}`,
      clientCode: `OrderWorkflow workflow = client.newWorkflowStub(
    OrderWorkflow.class, "order-wf-123"
);

String status = workflow.getStatus();
System.out.println("Status: " + status);

Map<String, Object> details = workflow.getDetails();
System.out.println(details);`,
    },
    dotnet: {
      workflowCode: `using Temporalio.Workflows;
using System.Collections.Generic;

[Workflow]
public class OrderWorkflow
{
    private string _status = "pending";
    private bool _approved = false;
    private int _priority = 3;

    [WorkflowRun]
    public async Task<string> RunAsync(string orderId)
    {
        return $"Order {orderId} processed";
    }

    [WorkflowQuery]
    public string GetStatus() => _status;

    [WorkflowQuery]
    public Dictionary<string, object> GetDetails() =>
        new() {
            ["status"]   = _status,
            ["approved"] = _approved,
            ["priority"] = _priority,
        };
}`,
      clientCode: `var handle = client.GetWorkflowHandle("order-wf-123");

var status = await handle.QueryAsync(
    wf => wf.GetStatus()
);
Console.WriteLine($"Status: {status}");

var details = await handle.QueryAsync(
    wf => wf.GetDetails()
);
Console.WriteLine(details);`,
    },
  },
  annotations: [
    {
      label: '@workflow.query decorator',
      description:
        'This decorator (or its SDK equivalent) is what registers the method as a query handler in Temporal. Without it, calling handle.query() by that name will fail.',
      lines: {
        python:     { workflowLines: [10, 11, 12, 14, 15],        clientLines: [] },
        typescript: { workflowLines: [3, 4],                       clientLines: [] },
        go:         { workflowLines: [10, 11, 12, 13, 14],         clientLines: [] },
        java:       { workflowLines: [9, 10, 12, 13],              clientLines: [] },
        dotnet:     { workflowLines: [17, 18, 20, 21],             clientLines: [] },
      },
    },
    {
      label: 'Must be synchronous',
      description:
        'Query handlers must not be async. The SDK enforces this at registration time. Queries read in-memory state and must return immediately without yielding to the event loop.',
      lines: {
        python:     { workflowLines: [11],     clientLines: [] },
        typescript: { workflowLines: [11, 13], clientLines: [] },
        go:         { workflowLines: [11, 12, 13], clientLines: [] },
        java:       { workflowLines: [27, 28, 29, 31, 32, 33], clientLines: [] },
        dotnet:     { workflowLines: [18],     clientLines: [] },
      },
    },
    {
      label: 'Not buffered',
      description:
        'Unlike Signals, queries are not persisted. If no Worker is polling the task queue when a query arrives, it fails immediately. This is the key behavioral difference to understand between Signals and Queries.',
      lines: {
        python:     { workflowLines: [], clientLines: [8, 9, 10] },
        typescript: { workflowLines: [], clientLines: [8] },
        go:         { workflowLines: [], clientLines: [1, 2, 3, 4, 5] },
        java:       { workflowLines: [], clientLines: [5] },
        dotnet:     { workflowLines: [], clientLines: [3, 4, 5] },
      },
    },
    {
      label: 'handle.query()',
      description:
        'The client sends the query and waits synchronously for the return value. The Workflow keeps running — queries do not pause or interrupt it, and nothing is written to event history.',
      lines: {
        python:     { workflowLines: [], clientLines: [8, 9, 10, 11, 13, 14, 15, 16] },
        typescript: { workflowLines: [], clientLines: [8, 9, 11, 12] },
        go:         { workflowLines: [], clientLines: [1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15, 16, 17] },
        java:       { workflowLines: [], clientLines: [5, 6, 8, 9] },
        dotnet:     { workflowLines: [], clientLines: [3, 4, 5, 6, 8, 9, 10, 11] },
      },
    },
  ],
};

/* ─────────────────────────────────────────────────
   UPDATE
───────────────────────────────────────────────── */
export const updateData: MessageTypeData = {
  description:
    'An Update can change Workflow state and return a result to the caller. An optional validator runs before any changes happen — if it rejects the input, the Workflow state is left untouched and the caller receives the error.',
  note:
    'The validator runs first. Only if it passes does the handler execute and state change. The caller waits for the full outcome: either the return value or the rejection error.',
  accentColor: 'var(--ifm-color-primary)',
  code: {
    python: {
      workflowCode: `from temporalio import workflow

@workflow.defn
class OrderWorkflow:
    def __init__(self) -> None:
        self._priority: int = 3

    @workflow.update
    async def set_priority(self, priority: int) -> str:
        self._priority = priority
        return f"Priority set to {priority}"

    @set_priority.validator
    def validate_priority(self, priority: int) -> None:
        if not (1 <= priority <= 5):
            raise ValueError(
                f"Priority must be 1-5, got {priority}"
            )`,
      clientCode: `from temporalio.client import Client
from order_workflow import OrderWorkflow

async def main():
    client = await Client.connect("localhost:7233")
    handle = client.get_workflow_handle("order-wf-123")

    try:
        result = await handle.execute_update(
            OrderWorkflow.set_priority, 3
        )
        print(result)   # "Priority set to 3"
    except Exception as e:
        print(e)        # "Priority must be 1-5, got 6"`,
    },
    typescript: {
      workflowCode: `import { defineUpdate, setHandler } from '@temporalio/workflow';

export const setPriorityUpdate = defineUpdate<string, [number]>('setPriority');

export async function orderWorkflow(orderId: string): Promise<string> {
    let priority = 3;

    setHandler(
        setPriorityUpdate,
        (newPriority: number) => {
            priority = newPriority;
            return \`Priority set to \${newPriority}\`;
        },
        {
            validator: (newPriority: number) => {
                if (newPriority < 1 || newPriority > 5) {
                    throw new Error(
                        \`Priority must be 1-5, got \${newPriority}\`
                    );
                }
            },
        }
    );

    // ... workflow logic
    return \`Order \${orderId} processed\`;
}`,
      clientCode: `import { Client } from '@temporalio/client';
import { setPriorityUpdate } from './workflows';

async function main() {
    const client = new Client();
    const handle = client.workflow.getHandle('order-wf-123');

    try {
        const result = await handle.executeUpdate(
            setPriorityUpdate, { args: [3] }
        );
        console.log(result);  // "Priority set to 3"
    } catch (err) {
        console.error(err);   // "Priority must be 1-5, got 6"
    }
}`,
    },
    go: {
      workflowCode: `package workflows

import (
    "fmt"
    "go.temporal.io/sdk/workflow"
)

func OrderWorkflow(ctx workflow.Context, orderID string) (string, error) {
    priority := 3

    workflow.SetUpdateHandlerWithOptions(ctx, "setPriority",
        func(ctx workflow.Context, p int) (string, error) {
            priority = p
            return fmt.Sprintf("Priority set to %d", p), nil
        },
        workflow.UpdateHandlerOptions{
            Validator: func(ctx workflow.Context, p int) error {
                if p < 1 || p > 5 {
                    return fmt.Errorf("priority must be 1-5, got %d", p)
                }
                return nil
            },
        },
    )

    // ... workflow logic
    return "Order " + orderID + " processed", nil
}`,
      clientCode: `updateHandle, _ := c.UpdateWorkflow(
    context.Background(),
    client.UpdateWorkflowOptions{
        WorkflowID:   "order-wf-123",
        UpdateName:   "setPriority",
        Args:         []interface{}{3},
        WaitForStage: client.WorkflowUpdateStageCompleted,
    },
)

var result string
err := updateHandle.Get(context.Background(), &result)
if err != nil {
    fmt.Println(err)    // "priority must be 1-5, got 6"
} else {
    fmt.Println(result) // "Priority set to 3"
}`,
    },
    java: {
      workflowCode: `import io.temporal.workflow.*;

@WorkflowInterface
public interface OrderWorkflow {
    @WorkflowMethod
    String run(String orderId);

    @UpdateMethod
    String setPriority(int priority);

    @UpdateValidatorMethod(updateName = "setPriority")
    void validatePriority(int priority);
}

public class OrderWorkflowImpl implements OrderWorkflow {
    private int priority = 3;

    @Override
    public String run(String orderId) {
        return "Order " + orderId + " processed";
    }

    @Override
    public String setPriority(int priority) {
        this.priority = priority;
        return "Priority set to " + priority;
    }

    @Override
    public void validatePriority(int priority) {
        if (priority < 1 || priority > 5) {
            throw new IllegalArgumentException(
                "Priority must be 1-5, got " + priority
            );
        }
    }
}`,
      clientCode: `OrderWorkflow workflow = client.newWorkflowStub(
    OrderWorkflow.class, "order-wf-123"
);

try {
    String result = workflow.setPriority(3);
    System.out.println(result);  // "Priority set to 3"
} catch (Exception e) {
    System.out.println(e.getMessage());  // "Priority must be 1-5"
}`,
    },
    dotnet: {
      workflowCode: `using Temporalio.Workflows;

[Workflow]
public class OrderWorkflow
{
    private int _priority = 3;

    [WorkflowRun]
    public async Task<string> RunAsync(string orderId)
    {
        return $"Order {orderId} processed";
    }

    [WorkflowUpdate]
    public async Task<string> SetPriorityAsync(int priority)
    {
        _priority = priority;
        return $"Priority set to {priority}";
    }

    [WorkflowUpdateValidator(nameof(SetPriorityAsync))]
    public void ValidatePriority(int priority)
    {
        if (priority < 1 || priority > 5)
            throw new ArgumentException(
                $"Priority must be 1-5, got {priority}"
            );
    }
}`,
      clientCode: `var handle = client.GetWorkflowHandle("order-wf-123");

try {
    var result = await handle.ExecuteUpdateAsync(
        wf => wf.SetPriorityAsync(3)
    );
    Console.WriteLine(result);  // "Priority set to 3"
} catch (Exception ex) {
    Console.WriteLine(ex.Message);  // "Priority must be 1-5, got 6"
}`,
    },
  },
  annotations: [
    {
      label: '@workflow.update decorator',
      description:
        'This decorator registers the method as an Update handler. Unlike a Signal, the handler can return a value. Unlike a Query, it can change state. It is the only type that does both.',
      lines: {
        python:     { workflowLines: [8, 9, 10, 11],        clientLines: [] },
        typescript: { workflowLines: [3, 8, 9],              clientLines: [] },
        go:         { workflowLines: [11, 12, 13, 14, 15],   clientLines: [] },
        java:       { workflowLines: [8, 9, 21, 22, 23, 24, 25], clientLines: [] },
        dotnet:     { workflowLines: [12, 13, 14, 15, 16, 17, 18], clientLines: [] },
      },
    },
    {
      label: 'Validator runs first',
      description:
        'The validator is a separate method linked to the handler. It runs before any state is touched. If it raises an exception, the Update is rejected and the Workflow state is unchanged — the handler never runs.',
      lines: {
        python:     { workflowLines: [13, 14, 15, 16, 17, 18], clientLines: [13, 14] },
        typescript: { workflowLines: [14, 15, 16, 17, 18, 19, 20], clientLines: [12, 13, 14] },
        go:         { workflowLines: [9, 10, 11, 12, 13, 14, 15, 16, 17], clientLines: [12, 13] },
        java:       { workflowLines: [10, 11, 27, 28, 29, 30, 31, 32, 33], clientLines: [8, 9] },
        dotnet:     { workflowLines: [19, 20, 21, 22, 23, 24, 25, 26, 27], clientLines: [8, 9] },
      },
    },
    {
      label: 'handle.execute_update()',
      description:
        'The client call blocks until the full round trip completes: validator runs, handler runs, result returns. There is no fire-and-forget option for Updates. The caller always waits for either a result or a rejection.',
      lines: {
        python:     { workflowLines: [], clientLines: [7, 8, 9, 10, 11, 12, 13, 14] },
        typescript: { workflowLines: [], clientLines: [7, 8, 9, 10, 11, 12, 13, 14] },
        go:         { workflowLines: [], clientLines: [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16] },
        java:       { workflowLines: [], clientLines: [4, 5, 6, 7, 8, 9] },
        dotnet:     { workflowLines: [], clientLines: [2, 3, 4, 5, 6, 7, 8, 9, 10] },
      },
    },
  ],
};

export const MESSAGE_TYPE_DATA: Record<MessageTypeId, MessageTypeData> = {
  signal: signalData,
  query: queryData,
  update: updateData,
};
