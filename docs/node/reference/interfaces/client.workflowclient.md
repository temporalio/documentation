# Interface: WorkflowClient<T\>

[client](../modules/client.md).WorkflowClient

Transforms a workflow interface `T` into a client interface

Given a workflow interface such as:
```ts
export interface Counter {
  main(initialValue?: number): number;
  signals: {
    increment(amount?: number): void;
  };
  queries: {
    get(): number;
  };
}
```

Create a workflow client for running and interacting with a single workflow
```ts
const connection = new Connection();
// `counter` is a registered workflow file, typically found at
// `lib/workflows/counter.js` after building the typescript project
const workflow = connection.workflow<Counter>('counter', { taskQueue: 'tutorial' });
// start workflow main function with initialValue of 2 and await it's completion
const finalValue = await workflow.start(2);
```

## Type parameters

Name | Type |
:------ | :------ |
`T` | [*Workflow*](workflow.workflow-1.md) |

## Table of contents

### Properties

- [compiledOptions](client.workflowclient.md#compiledoptions)
- [connection](client.workflowclient.md#connection)
- [options](client.workflowclient.md#options)
- [query](client.workflowclient.md#query)
- [runId](client.workflowclient.md#runid)
- [signal](client.workflowclient.md#signal)
- [started](client.workflowclient.md#started)
- [workflowId](client.workflowclient.md#workflowid)

### Methods

- [cancel](client.workflowclient.md#cancel)
- [describe](client.workflowclient.md#describe)
- [start](client.workflowclient.md#start)
- [terminate](client.workflowclient.md#terminate)

## Properties

### compiledOptions

• `Readonly` **compiledOptions**: [*CompiledWorkflowOptionsWithDefaults*](../modules/client.md#compiledworkflowoptionswithdefaults)

Readonly accessor to the compiled workflow options (with ms strings converted to numbers)

___

### connection

• `Readonly` **connection**: [*Connection*](../classes/client.connection.md)

___

### options

• `Readonly` **options**: [*WorkflowOptionsWithDefaults*](../modules/client.md#workflowoptionswithdefaults)

Readonly accessor to the supplied workflow options after applying [addDefaults](../modules/client.md#adddefaults)

___

### query

• **query**: T *extends* *Record*<*queries*, Record<string, WorkflowQueryType\>\> ? { [P in string \| number \| symbol]: AsyncOnly<T["queries"][P]\>} : *undefined*

A mapping of the different queries defined by workflow interface `T` to callbable functions.
Call to query a workflow after it's been started even if it has already completed.

**`throws`** IllegalStateError if workflow has not been started

**`example`** 
```ts
await workflow.started;
const value = await workflow.query.get();
```

___

### runId

• `Optional` `Readonly` **runId**: *string*

The assigned run ID given by the server after starting the workflow

___

### signal

• **signal**: T *extends* *Record*<*signals*, Record<string, WorkflowSignalType\>\> ? { [P in string \| number \| symbol]: AsyncOnly<T["signals"][P]\>} : *undefined*

A mapping of the different signals defined by workflow interface `T` to callbable functions.
Call to signal a running workflow.

**`throws`** IllegalStateError if workflow has not been started

**`example`** 
```ts
await workflow.started;
await workflow.signal.increment(3);
```

___

### started

• `Readonly` **started**: *PromiseLike*<string\>

Promise that resolves with current `runId` once the workflow is started
```ts
const completionPromise = workflow.start();
await workflow.started;
await workflow.describe();
const result = await completionPromise;
```

___

### workflowId

• `Readonly` **workflowId**: *string*

Alias to [options](client.workflowclient.md#options)`.workflowId`

## Methods

### cancel

▸ **cancel**(): *Promise*<[*IRequestCancelWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.irequestcancelworkflowexecutionresponse.md)\>

Cancel a running workflow, will throw if workflow was not started

**Returns:** *Promise*<[*IRequestCancelWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.irequestcancelworkflowexecutionresponse.md)\>

___

### describe

▸ **describe**(): *Promise*<[*IDescribeWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.idescribeworkflowexecutionresponse.md)\>

Describe the current workflow execution

**Returns:** *Promise*<[*IDescribeWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.idescribeworkflowexecutionresponse.md)\>

___

### start

▸ **start**(...`args`: *Parameters*<T[*main*]\>): *EnsurePromise*<ReturnType<T[*main*]\>\>

Start the workflow with arguments

#### Parameters:

Name | Type |
:------ | :------ |
`...args` | *Parameters*<T[*main*]\> |

**Returns:** *EnsurePromise*<ReturnType<T[*main*]\>\>

___

### terminate

▸ **terminate**(`reason?`: *string*): *Promise*<[*ITerminateWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.iterminateworkflowexecutionresponse.md)\>

Terminate a running workflow, will throw if workflow was not started

#### Parameters:

Name | Type |
:------ | :------ |
`reason?` | *string* |

**Returns:** *Promise*<[*ITerminateWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.iterminateworkflowexecutionresponse.md)\>
