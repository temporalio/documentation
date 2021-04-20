# Namespace: WorkflowService

[workflowservice](proto.temporal.api.workflowservice.md).[v1](proto.temporal.api.workflowservice.v1.md).WorkflowService

## Table of contents

### Type aliases

- [CountWorkflowExecutionsCallback](proto.temporal.api.workflowservice.v1.workflowservice.md#countworkflowexecutionscallback)
- [DeprecateNamespaceCallback](proto.temporal.api.workflowservice.v1.workflowservice.md#deprecatenamespacecallback)
- [DescribeNamespaceCallback](proto.temporal.api.workflowservice.v1.workflowservice.md#describenamespacecallback)
- [DescribeTaskQueueCallback](proto.temporal.api.workflowservice.v1.workflowservice.md#describetaskqueuecallback)
- [DescribeWorkflowExecutionCallback](proto.temporal.api.workflowservice.v1.workflowservice.md#describeworkflowexecutioncallback)
- [GetClusterInfoCallback](proto.temporal.api.workflowservice.v1.workflowservice.md#getclusterinfocallback)
- [GetSearchAttributesCallback](proto.temporal.api.workflowservice.v1.workflowservice.md#getsearchattributescallback)
- [GetWorkflowExecutionHistoryCallback](proto.temporal.api.workflowservice.v1.workflowservice.md#getworkflowexecutionhistorycallback)
- [ListArchivedWorkflowExecutionsCallback](proto.temporal.api.workflowservice.v1.workflowservice.md#listarchivedworkflowexecutionscallback)
- [ListClosedWorkflowExecutionsCallback](proto.temporal.api.workflowservice.v1.workflowservice.md#listclosedworkflowexecutionscallback)
- [ListNamespacesCallback](proto.temporal.api.workflowservice.v1.workflowservice.md#listnamespacescallback)
- [ListOpenWorkflowExecutionsCallback](proto.temporal.api.workflowservice.v1.workflowservice.md#listopenworkflowexecutionscallback)
- [ListTaskQueuePartitionsCallback](proto.temporal.api.workflowservice.v1.workflowservice.md#listtaskqueuepartitionscallback)
- [ListWorkflowExecutionsCallback](proto.temporal.api.workflowservice.v1.workflowservice.md#listworkflowexecutionscallback)
- [PollActivityTaskQueueCallback](proto.temporal.api.workflowservice.v1.workflowservice.md#pollactivitytaskqueuecallback)
- [PollWorkflowTaskQueueCallback](proto.temporal.api.workflowservice.v1.workflowservice.md#pollworkflowtaskqueuecallback)
- [QueryWorkflowCallback](proto.temporal.api.workflowservice.v1.workflowservice.md#queryworkflowcallback)
- [RecordActivityTaskHeartbeatByIdCallback](proto.temporal.api.workflowservice.v1.workflowservice.md#recordactivitytaskheartbeatbyidcallback)
- [RecordActivityTaskHeartbeatCallback](proto.temporal.api.workflowservice.v1.workflowservice.md#recordactivitytaskheartbeatcallback)
- [RegisterNamespaceCallback](proto.temporal.api.workflowservice.v1.workflowservice.md#registernamespacecallback)
- [RequestCancelWorkflowExecutionCallback](proto.temporal.api.workflowservice.v1.workflowservice.md#requestcancelworkflowexecutioncallback)
- [ResetStickyTaskQueueCallback](proto.temporal.api.workflowservice.v1.workflowservice.md#resetstickytaskqueuecallback)
- [ResetWorkflowExecutionCallback](proto.temporal.api.workflowservice.v1.workflowservice.md#resetworkflowexecutioncallback)
- [RespondActivityTaskCanceledByIdCallback](proto.temporal.api.workflowservice.v1.workflowservice.md#respondactivitytaskcanceledbyidcallback)
- [RespondActivityTaskCanceledCallback](proto.temporal.api.workflowservice.v1.workflowservice.md#respondactivitytaskcanceledcallback)
- [RespondActivityTaskCompletedByIdCallback](proto.temporal.api.workflowservice.v1.workflowservice.md#respondactivitytaskcompletedbyidcallback)
- [RespondActivityTaskCompletedCallback](proto.temporal.api.workflowservice.v1.workflowservice.md#respondactivitytaskcompletedcallback)
- [RespondActivityTaskFailedByIdCallback](proto.temporal.api.workflowservice.v1.workflowservice.md#respondactivitytaskfailedbyidcallback)
- [RespondActivityTaskFailedCallback](proto.temporal.api.workflowservice.v1.workflowservice.md#respondactivitytaskfailedcallback)
- [RespondQueryTaskCompletedCallback](proto.temporal.api.workflowservice.v1.workflowservice.md#respondquerytaskcompletedcallback)
- [RespondWorkflowTaskCompletedCallback](proto.temporal.api.workflowservice.v1.workflowservice.md#respondworkflowtaskcompletedcallback)
- [RespondWorkflowTaskFailedCallback](proto.temporal.api.workflowservice.v1.workflowservice.md#respondworkflowtaskfailedcallback)
- [ScanWorkflowExecutionsCallback](proto.temporal.api.workflowservice.v1.workflowservice.md#scanworkflowexecutionscallback)
- [SignalWithStartWorkflowExecutionCallback](proto.temporal.api.workflowservice.v1.workflowservice.md#signalwithstartworkflowexecutioncallback)
- [SignalWorkflowExecutionCallback](proto.temporal.api.workflowservice.v1.workflowservice.md#signalworkflowexecutioncallback)
- [StartWorkflowExecutionCallback](proto.temporal.api.workflowservice.v1.workflowservice.md#startworkflowexecutioncallback)
- [TerminateWorkflowExecutionCallback](proto.temporal.api.workflowservice.v1.workflowservice.md#terminateworkflowexecutioncallback)
- [UpdateNamespaceCallback](proto.temporal.api.workflowservice.v1.workflowservice.md#updatenamespacecallback)

## Type aliases

### CountWorkflowExecutionsCallback

Ƭ **CountWorkflowExecutionsCallback**: (`error`: Error \| *null*, `response?`: [*CountWorkflowExecutionsResponse*](../classes/proto.temporal.api.workflowservice.v1.countworkflowexecutionsresponse.md)) => *void*

Callback as used by {@link temporal.api.workflowservice.v1.WorkflowService#countWorkflowExecutions}.

**`param`** Error, if any

**`param`** 

#### Type declaration:

▸ (`error`: Error \| *null*, `response?`: [*CountWorkflowExecutionsResponse*](../classes/proto.temporal.api.workflowservice.v1.countworkflowexecutionsresponse.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`error` | Error \| *null* |
`response?` | [*CountWorkflowExecutionsResponse*](../classes/proto.temporal.api.workflowservice.v1.countworkflowexecutionsresponse.md) |

**Returns:** *void*

___

### DeprecateNamespaceCallback

Ƭ **DeprecateNamespaceCallback**: (`error`: Error \| *null*, `response?`: [*DeprecateNamespaceResponse*](../classes/proto.temporal.api.workflowservice.v1.deprecatenamespaceresponse.md)) => *void*

Callback as used by {@link temporal.api.workflowservice.v1.WorkflowService#deprecateNamespace}.

**`param`** Error, if any

**`param`** 

#### Type declaration:

▸ (`error`: Error \| *null*, `response?`: [*DeprecateNamespaceResponse*](../classes/proto.temporal.api.workflowservice.v1.deprecatenamespaceresponse.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`error` | Error \| *null* |
`response?` | [*DeprecateNamespaceResponse*](../classes/proto.temporal.api.workflowservice.v1.deprecatenamespaceresponse.md) |

**Returns:** *void*

___

### DescribeNamespaceCallback

Ƭ **DescribeNamespaceCallback**: (`error`: Error \| *null*, `response?`: [*DescribeNamespaceResponse*](../classes/proto.temporal.api.workflowservice.v1.describenamespaceresponse.md)) => *void*

Callback as used by {@link temporal.api.workflowservice.v1.WorkflowService#describeNamespace}.

**`param`** Error, if any

**`param`** 

#### Type declaration:

▸ (`error`: Error \| *null*, `response?`: [*DescribeNamespaceResponse*](../classes/proto.temporal.api.workflowservice.v1.describenamespaceresponse.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`error` | Error \| *null* |
`response?` | [*DescribeNamespaceResponse*](../classes/proto.temporal.api.workflowservice.v1.describenamespaceresponse.md) |

**Returns:** *void*

___

### DescribeTaskQueueCallback

Ƭ **DescribeTaskQueueCallback**: (`error`: Error \| *null*, `response?`: [*DescribeTaskQueueResponse*](../classes/proto.temporal.api.workflowservice.v1.describetaskqueueresponse.md)) => *void*

Callback as used by {@link temporal.api.workflowservice.v1.WorkflowService#describeTaskQueue}.

**`param`** Error, if any

**`param`** 

#### Type declaration:

▸ (`error`: Error \| *null*, `response?`: [*DescribeTaskQueueResponse*](../classes/proto.temporal.api.workflowservice.v1.describetaskqueueresponse.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`error` | Error \| *null* |
`response?` | [*DescribeTaskQueueResponse*](../classes/proto.temporal.api.workflowservice.v1.describetaskqueueresponse.md) |

**Returns:** *void*

___

### DescribeWorkflowExecutionCallback

Ƭ **DescribeWorkflowExecutionCallback**: (`error`: Error \| *null*, `response?`: [*DescribeWorkflowExecutionResponse*](../classes/proto.temporal.api.workflowservice.v1.describeworkflowexecutionresponse.md)) => *void*

Callback as used by {@link temporal.api.workflowservice.v1.WorkflowService#describeWorkflowExecution}.

**`param`** Error, if any

**`param`** 

#### Type declaration:

▸ (`error`: Error \| *null*, `response?`: [*DescribeWorkflowExecutionResponse*](../classes/proto.temporal.api.workflowservice.v1.describeworkflowexecutionresponse.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`error` | Error \| *null* |
`response?` | [*DescribeWorkflowExecutionResponse*](../classes/proto.temporal.api.workflowservice.v1.describeworkflowexecutionresponse.md) |

**Returns:** *void*

___

### GetClusterInfoCallback

Ƭ **GetClusterInfoCallback**: (`error`: Error \| *null*, `response?`: [*GetClusterInfoResponse*](../classes/proto.temporal.api.workflowservice.v1.getclusterinforesponse.md)) => *void*

Callback as used by {@link temporal.api.workflowservice.v1.WorkflowService#getClusterInfo}.

**`param`** Error, if any

**`param`** 

#### Type declaration:

▸ (`error`: Error \| *null*, `response?`: [*GetClusterInfoResponse*](../classes/proto.temporal.api.workflowservice.v1.getclusterinforesponse.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`error` | Error \| *null* |
`response?` | [*GetClusterInfoResponse*](../classes/proto.temporal.api.workflowservice.v1.getclusterinforesponse.md) |

**Returns:** *void*

___

### GetSearchAttributesCallback

Ƭ **GetSearchAttributesCallback**: (`error`: Error \| *null*, `response?`: [*GetSearchAttributesResponse*](../classes/proto.temporal.api.workflowservice.v1.getsearchattributesresponse.md)) => *void*

Callback as used by {@link temporal.api.workflowservice.v1.WorkflowService#getSearchAttributes}.

**`param`** Error, if any

**`param`** 

#### Type declaration:

▸ (`error`: Error \| *null*, `response?`: [*GetSearchAttributesResponse*](../classes/proto.temporal.api.workflowservice.v1.getsearchattributesresponse.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`error` | Error \| *null* |
`response?` | [*GetSearchAttributesResponse*](../classes/proto.temporal.api.workflowservice.v1.getsearchattributesresponse.md) |

**Returns:** *void*

___

### GetWorkflowExecutionHistoryCallback

Ƭ **GetWorkflowExecutionHistoryCallback**: (`error`: Error \| *null*, `response?`: [*GetWorkflowExecutionHistoryResponse*](../classes/proto.temporal.api.workflowservice.v1.getworkflowexecutionhistoryresponse.md)) => *void*

Callback as used by {@link temporal.api.workflowservice.v1.WorkflowService#getWorkflowExecutionHistory}.

**`param`** Error, if any

**`param`** 

#### Type declaration:

▸ (`error`: Error \| *null*, `response?`: [*GetWorkflowExecutionHistoryResponse*](../classes/proto.temporal.api.workflowservice.v1.getworkflowexecutionhistoryresponse.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`error` | Error \| *null* |
`response?` | [*GetWorkflowExecutionHistoryResponse*](../classes/proto.temporal.api.workflowservice.v1.getworkflowexecutionhistoryresponse.md) |

**Returns:** *void*

___

### ListArchivedWorkflowExecutionsCallback

Ƭ **ListArchivedWorkflowExecutionsCallback**: (`error`: Error \| *null*, `response?`: [*ListArchivedWorkflowExecutionsResponse*](../classes/proto.temporal.api.workflowservice.v1.listarchivedworkflowexecutionsresponse.md)) => *void*

Callback as used by {@link temporal.api.workflowservice.v1.WorkflowService#listArchivedWorkflowExecutions}.

**`param`** Error, if any

**`param`** 

#### Type declaration:

▸ (`error`: Error \| *null*, `response?`: [*ListArchivedWorkflowExecutionsResponse*](../classes/proto.temporal.api.workflowservice.v1.listarchivedworkflowexecutionsresponse.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`error` | Error \| *null* |
`response?` | [*ListArchivedWorkflowExecutionsResponse*](../classes/proto.temporal.api.workflowservice.v1.listarchivedworkflowexecutionsresponse.md) |

**Returns:** *void*

___

### ListClosedWorkflowExecutionsCallback

Ƭ **ListClosedWorkflowExecutionsCallback**: (`error`: Error \| *null*, `response?`: [*ListClosedWorkflowExecutionsResponse*](../classes/proto.temporal.api.workflowservice.v1.listclosedworkflowexecutionsresponse.md)) => *void*

Callback as used by {@link temporal.api.workflowservice.v1.WorkflowService#listClosedWorkflowExecutions}.

**`param`** Error, if any

**`param`** 

#### Type declaration:

▸ (`error`: Error \| *null*, `response?`: [*ListClosedWorkflowExecutionsResponse*](../classes/proto.temporal.api.workflowservice.v1.listclosedworkflowexecutionsresponse.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`error` | Error \| *null* |
`response?` | [*ListClosedWorkflowExecutionsResponse*](../classes/proto.temporal.api.workflowservice.v1.listclosedworkflowexecutionsresponse.md) |

**Returns:** *void*

___

### ListNamespacesCallback

Ƭ **ListNamespacesCallback**: (`error`: Error \| *null*, `response?`: [*ListNamespacesResponse*](../classes/proto.temporal.api.workflowservice.v1.listnamespacesresponse.md)) => *void*

Callback as used by {@link temporal.api.workflowservice.v1.WorkflowService#listNamespaces}.

**`param`** Error, if any

**`param`** 

#### Type declaration:

▸ (`error`: Error \| *null*, `response?`: [*ListNamespacesResponse*](../classes/proto.temporal.api.workflowservice.v1.listnamespacesresponse.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`error` | Error \| *null* |
`response?` | [*ListNamespacesResponse*](../classes/proto.temporal.api.workflowservice.v1.listnamespacesresponse.md) |

**Returns:** *void*

___

### ListOpenWorkflowExecutionsCallback

Ƭ **ListOpenWorkflowExecutionsCallback**: (`error`: Error \| *null*, `response?`: [*ListOpenWorkflowExecutionsResponse*](../classes/proto.temporal.api.workflowservice.v1.listopenworkflowexecutionsresponse.md)) => *void*

Callback as used by {@link temporal.api.workflowservice.v1.WorkflowService#listOpenWorkflowExecutions}.

**`param`** Error, if any

**`param`** 

#### Type declaration:

▸ (`error`: Error \| *null*, `response?`: [*ListOpenWorkflowExecutionsResponse*](../classes/proto.temporal.api.workflowservice.v1.listopenworkflowexecutionsresponse.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`error` | Error \| *null* |
`response?` | [*ListOpenWorkflowExecutionsResponse*](../classes/proto.temporal.api.workflowservice.v1.listopenworkflowexecutionsresponse.md) |

**Returns:** *void*

___

### ListTaskQueuePartitionsCallback

Ƭ **ListTaskQueuePartitionsCallback**: (`error`: Error \| *null*, `response?`: [*ListTaskQueuePartitionsResponse*](../classes/proto.temporal.api.workflowservice.v1.listtaskqueuepartitionsresponse.md)) => *void*

Callback as used by {@link temporal.api.workflowservice.v1.WorkflowService#listTaskQueuePartitions}.

**`param`** Error, if any

**`param`** 

#### Type declaration:

▸ (`error`: Error \| *null*, `response?`: [*ListTaskQueuePartitionsResponse*](../classes/proto.temporal.api.workflowservice.v1.listtaskqueuepartitionsresponse.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`error` | Error \| *null* |
`response?` | [*ListTaskQueuePartitionsResponse*](../classes/proto.temporal.api.workflowservice.v1.listtaskqueuepartitionsresponse.md) |

**Returns:** *void*

___

### ListWorkflowExecutionsCallback

Ƭ **ListWorkflowExecutionsCallback**: (`error`: Error \| *null*, `response?`: [*ListWorkflowExecutionsResponse*](../classes/proto.temporal.api.workflowservice.v1.listworkflowexecutionsresponse.md)) => *void*

Callback as used by {@link temporal.api.workflowservice.v1.WorkflowService#listWorkflowExecutions}.

**`param`** Error, if any

**`param`** 

#### Type declaration:

▸ (`error`: Error \| *null*, `response?`: [*ListWorkflowExecutionsResponse*](../classes/proto.temporal.api.workflowservice.v1.listworkflowexecutionsresponse.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`error` | Error \| *null* |
`response?` | [*ListWorkflowExecutionsResponse*](../classes/proto.temporal.api.workflowservice.v1.listworkflowexecutionsresponse.md) |

**Returns:** *void*

___

### PollActivityTaskQueueCallback

Ƭ **PollActivityTaskQueueCallback**: (`error`: Error \| *null*, `response?`: [*PollActivityTaskQueueResponse*](../classes/proto.temporal.api.workflowservice.v1.pollactivitytaskqueueresponse.md)) => *void*

Callback as used by {@link temporal.api.workflowservice.v1.WorkflowService#pollActivityTaskQueue}.

**`param`** Error, if any

**`param`** 

#### Type declaration:

▸ (`error`: Error \| *null*, `response?`: [*PollActivityTaskQueueResponse*](../classes/proto.temporal.api.workflowservice.v1.pollactivitytaskqueueresponse.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`error` | Error \| *null* |
`response?` | [*PollActivityTaskQueueResponse*](../classes/proto.temporal.api.workflowservice.v1.pollactivitytaskqueueresponse.md) |

**Returns:** *void*

___

### PollWorkflowTaskQueueCallback

Ƭ **PollWorkflowTaskQueueCallback**: (`error`: Error \| *null*, `response?`: [*PollWorkflowTaskQueueResponse*](../classes/proto.temporal.api.workflowservice.v1.pollworkflowtaskqueueresponse.md)) => *void*

Callback as used by {@link temporal.api.workflowservice.v1.WorkflowService#pollWorkflowTaskQueue}.

**`param`** Error, if any

**`param`** 

#### Type declaration:

▸ (`error`: Error \| *null*, `response?`: [*PollWorkflowTaskQueueResponse*](../classes/proto.temporal.api.workflowservice.v1.pollworkflowtaskqueueresponse.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`error` | Error \| *null* |
`response?` | [*PollWorkflowTaskQueueResponse*](../classes/proto.temporal.api.workflowservice.v1.pollworkflowtaskqueueresponse.md) |

**Returns:** *void*

___

### QueryWorkflowCallback

Ƭ **QueryWorkflowCallback**: (`error`: Error \| *null*, `response?`: [*QueryWorkflowResponse*](../classes/proto.temporal.api.workflowservice.v1.queryworkflowresponse.md)) => *void*

Callback as used by {@link temporal.api.workflowservice.v1.WorkflowService#queryWorkflow}.

**`param`** Error, if any

**`param`** 

#### Type declaration:

▸ (`error`: Error \| *null*, `response?`: [*QueryWorkflowResponse*](../classes/proto.temporal.api.workflowservice.v1.queryworkflowresponse.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`error` | Error \| *null* |
`response?` | [*QueryWorkflowResponse*](../classes/proto.temporal.api.workflowservice.v1.queryworkflowresponse.md) |

**Returns:** *void*

___

### RecordActivityTaskHeartbeatByIdCallback

Ƭ **RecordActivityTaskHeartbeatByIdCallback**: (`error`: Error \| *null*, `response?`: [*RecordActivityTaskHeartbeatByIdResponse*](../classes/proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatbyidresponse.md)) => *void*

Callback as used by {@link temporal.api.workflowservice.v1.WorkflowService#recordActivityTaskHeartbeatById}.

**`param`** Error, if any

**`param`** 

#### Type declaration:

▸ (`error`: Error \| *null*, `response?`: [*RecordActivityTaskHeartbeatByIdResponse*](../classes/proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatbyidresponse.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`error` | Error \| *null* |
`response?` | [*RecordActivityTaskHeartbeatByIdResponse*](../classes/proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatbyidresponse.md) |

**Returns:** *void*

___

### RecordActivityTaskHeartbeatCallback

Ƭ **RecordActivityTaskHeartbeatCallback**: (`error`: Error \| *null*, `response?`: [*RecordActivityTaskHeartbeatResponse*](../classes/proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatresponse.md)) => *void*

Callback as used by {@link temporal.api.workflowservice.v1.WorkflowService#recordActivityTaskHeartbeat}.

**`param`** Error, if any

**`param`** 

#### Type declaration:

▸ (`error`: Error \| *null*, `response?`: [*RecordActivityTaskHeartbeatResponse*](../classes/proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatresponse.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`error` | Error \| *null* |
`response?` | [*RecordActivityTaskHeartbeatResponse*](../classes/proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatresponse.md) |

**Returns:** *void*

___

### RegisterNamespaceCallback

Ƭ **RegisterNamespaceCallback**: (`error`: Error \| *null*, `response?`: [*RegisterNamespaceResponse*](../classes/proto.temporal.api.workflowservice.v1.registernamespaceresponse.md)) => *void*

Callback as used by {@link temporal.api.workflowservice.v1.WorkflowService#registerNamespace}.

**`param`** Error, if any

**`param`** 

#### Type declaration:

▸ (`error`: Error \| *null*, `response?`: [*RegisterNamespaceResponse*](../classes/proto.temporal.api.workflowservice.v1.registernamespaceresponse.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`error` | Error \| *null* |
`response?` | [*RegisterNamespaceResponse*](../classes/proto.temporal.api.workflowservice.v1.registernamespaceresponse.md) |

**Returns:** *void*

___

### RequestCancelWorkflowExecutionCallback

Ƭ **RequestCancelWorkflowExecutionCallback**: (`error`: Error \| *null*, `response?`: [*RequestCancelWorkflowExecutionResponse*](../classes/proto.temporal.api.workflowservice.v1.requestcancelworkflowexecutionresponse.md)) => *void*

Callback as used by {@link temporal.api.workflowservice.v1.WorkflowService#requestCancelWorkflowExecution}.

**`param`** Error, if any

**`param`** 

#### Type declaration:

▸ (`error`: Error \| *null*, `response?`: [*RequestCancelWorkflowExecutionResponse*](../classes/proto.temporal.api.workflowservice.v1.requestcancelworkflowexecutionresponse.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`error` | Error \| *null* |
`response?` | [*RequestCancelWorkflowExecutionResponse*](../classes/proto.temporal.api.workflowservice.v1.requestcancelworkflowexecutionresponse.md) |

**Returns:** *void*

___

### ResetStickyTaskQueueCallback

Ƭ **ResetStickyTaskQueueCallback**: (`error`: Error \| *null*, `response?`: [*ResetStickyTaskQueueResponse*](../classes/proto.temporal.api.workflowservice.v1.resetstickytaskqueueresponse.md)) => *void*

Callback as used by {@link temporal.api.workflowservice.v1.WorkflowService#resetStickyTaskQueue}.

**`param`** Error, if any

**`param`** 

#### Type declaration:

▸ (`error`: Error \| *null*, `response?`: [*ResetStickyTaskQueueResponse*](../classes/proto.temporal.api.workflowservice.v1.resetstickytaskqueueresponse.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`error` | Error \| *null* |
`response?` | [*ResetStickyTaskQueueResponse*](../classes/proto.temporal.api.workflowservice.v1.resetstickytaskqueueresponse.md) |

**Returns:** *void*

___

### ResetWorkflowExecutionCallback

Ƭ **ResetWorkflowExecutionCallback**: (`error`: Error \| *null*, `response?`: [*ResetWorkflowExecutionResponse*](../classes/proto.temporal.api.workflowservice.v1.resetworkflowexecutionresponse.md)) => *void*

Callback as used by {@link temporal.api.workflowservice.v1.WorkflowService#resetWorkflowExecution}.

**`param`** Error, if any

**`param`** 

#### Type declaration:

▸ (`error`: Error \| *null*, `response?`: [*ResetWorkflowExecutionResponse*](../classes/proto.temporal.api.workflowservice.v1.resetworkflowexecutionresponse.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`error` | Error \| *null* |
`response?` | [*ResetWorkflowExecutionResponse*](../classes/proto.temporal.api.workflowservice.v1.resetworkflowexecutionresponse.md) |

**Returns:** *void*

___

### RespondActivityTaskCanceledByIdCallback

Ƭ **RespondActivityTaskCanceledByIdCallback**: (`error`: Error \| *null*, `response?`: [*RespondActivityTaskCanceledByIdResponse*](../classes/proto.temporal.api.workflowservice.v1.respondactivitytaskcanceledbyidresponse.md)) => *void*

Callback as used by {@link temporal.api.workflowservice.v1.WorkflowService#respondActivityTaskCanceledById}.

**`param`** Error, if any

**`param`** 

#### Type declaration:

▸ (`error`: Error \| *null*, `response?`: [*RespondActivityTaskCanceledByIdResponse*](../classes/proto.temporal.api.workflowservice.v1.respondactivitytaskcanceledbyidresponse.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`error` | Error \| *null* |
`response?` | [*RespondActivityTaskCanceledByIdResponse*](../classes/proto.temporal.api.workflowservice.v1.respondactivitytaskcanceledbyidresponse.md) |

**Returns:** *void*

___

### RespondActivityTaskCanceledCallback

Ƭ **RespondActivityTaskCanceledCallback**: (`error`: Error \| *null*, `response?`: [*RespondActivityTaskCanceledResponse*](../classes/proto.temporal.api.workflowservice.v1.respondactivitytaskcanceledresponse.md)) => *void*

Callback as used by {@link temporal.api.workflowservice.v1.WorkflowService#respondActivityTaskCanceled}.

**`param`** Error, if any

**`param`** 

#### Type declaration:

▸ (`error`: Error \| *null*, `response?`: [*RespondActivityTaskCanceledResponse*](../classes/proto.temporal.api.workflowservice.v1.respondactivitytaskcanceledresponse.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`error` | Error \| *null* |
`response?` | [*RespondActivityTaskCanceledResponse*](../classes/proto.temporal.api.workflowservice.v1.respondactivitytaskcanceledresponse.md) |

**Returns:** *void*

___

### RespondActivityTaskCompletedByIdCallback

Ƭ **RespondActivityTaskCompletedByIdCallback**: (`error`: Error \| *null*, `response?`: [*RespondActivityTaskCompletedByIdResponse*](../classes/proto.temporal.api.workflowservice.v1.respondactivitytaskcompletedbyidresponse.md)) => *void*

Callback as used by {@link temporal.api.workflowservice.v1.WorkflowService#respondActivityTaskCompletedById}.

**`param`** Error, if any

**`param`** 

#### Type declaration:

▸ (`error`: Error \| *null*, `response?`: [*RespondActivityTaskCompletedByIdResponse*](../classes/proto.temporal.api.workflowservice.v1.respondactivitytaskcompletedbyidresponse.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`error` | Error \| *null* |
`response?` | [*RespondActivityTaskCompletedByIdResponse*](../classes/proto.temporal.api.workflowservice.v1.respondactivitytaskcompletedbyidresponse.md) |

**Returns:** *void*

___

### RespondActivityTaskCompletedCallback

Ƭ **RespondActivityTaskCompletedCallback**: (`error`: Error \| *null*, `response?`: [*RespondActivityTaskCompletedResponse*](../classes/proto.temporal.api.workflowservice.v1.respondactivitytaskcompletedresponse.md)) => *void*

Callback as used by {@link temporal.api.workflowservice.v1.WorkflowService#respondActivityTaskCompleted}.

**`param`** Error, if any

**`param`** 

#### Type declaration:

▸ (`error`: Error \| *null*, `response?`: [*RespondActivityTaskCompletedResponse*](../classes/proto.temporal.api.workflowservice.v1.respondactivitytaskcompletedresponse.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`error` | Error \| *null* |
`response?` | [*RespondActivityTaskCompletedResponse*](../classes/proto.temporal.api.workflowservice.v1.respondactivitytaskcompletedresponse.md) |

**Returns:** *void*

___

### RespondActivityTaskFailedByIdCallback

Ƭ **RespondActivityTaskFailedByIdCallback**: (`error`: Error \| *null*, `response?`: [*RespondActivityTaskFailedByIdResponse*](../classes/proto.temporal.api.workflowservice.v1.respondactivitytaskfailedbyidresponse.md)) => *void*

Callback as used by {@link temporal.api.workflowservice.v1.WorkflowService#respondActivityTaskFailedById}.

**`param`** Error, if any

**`param`** 

#### Type declaration:

▸ (`error`: Error \| *null*, `response?`: [*RespondActivityTaskFailedByIdResponse*](../classes/proto.temporal.api.workflowservice.v1.respondactivitytaskfailedbyidresponse.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`error` | Error \| *null* |
`response?` | [*RespondActivityTaskFailedByIdResponse*](../classes/proto.temporal.api.workflowservice.v1.respondactivitytaskfailedbyidresponse.md) |

**Returns:** *void*

___

### RespondActivityTaskFailedCallback

Ƭ **RespondActivityTaskFailedCallback**: (`error`: Error \| *null*, `response?`: [*RespondActivityTaskFailedResponse*](../classes/proto.temporal.api.workflowservice.v1.respondactivitytaskfailedresponse.md)) => *void*

Callback as used by {@link temporal.api.workflowservice.v1.WorkflowService#respondActivityTaskFailed}.

**`param`** Error, if any

**`param`** 

#### Type declaration:

▸ (`error`: Error \| *null*, `response?`: [*RespondActivityTaskFailedResponse*](../classes/proto.temporal.api.workflowservice.v1.respondactivitytaskfailedresponse.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`error` | Error \| *null* |
`response?` | [*RespondActivityTaskFailedResponse*](../classes/proto.temporal.api.workflowservice.v1.respondactivitytaskfailedresponse.md) |

**Returns:** *void*

___

### RespondQueryTaskCompletedCallback

Ƭ **RespondQueryTaskCompletedCallback**: (`error`: Error \| *null*, `response?`: [*RespondQueryTaskCompletedResponse*](../classes/proto.temporal.api.workflowservice.v1.respondquerytaskcompletedresponse.md)) => *void*

Callback as used by {@link temporal.api.workflowservice.v1.WorkflowService#respondQueryTaskCompleted}.

**`param`** Error, if any

**`param`** 

#### Type declaration:

▸ (`error`: Error \| *null*, `response?`: [*RespondQueryTaskCompletedResponse*](../classes/proto.temporal.api.workflowservice.v1.respondquerytaskcompletedresponse.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`error` | Error \| *null* |
`response?` | [*RespondQueryTaskCompletedResponse*](../classes/proto.temporal.api.workflowservice.v1.respondquerytaskcompletedresponse.md) |

**Returns:** *void*

___

### RespondWorkflowTaskCompletedCallback

Ƭ **RespondWorkflowTaskCompletedCallback**: (`error`: Error \| *null*, `response?`: [*RespondWorkflowTaskCompletedResponse*](../classes/proto.temporal.api.workflowservice.v1.respondworkflowtaskcompletedresponse.md)) => *void*

Callback as used by {@link temporal.api.workflowservice.v1.WorkflowService#respondWorkflowTaskCompleted}.

**`param`** Error, if any

**`param`** 

#### Type declaration:

▸ (`error`: Error \| *null*, `response?`: [*RespondWorkflowTaskCompletedResponse*](../classes/proto.temporal.api.workflowservice.v1.respondworkflowtaskcompletedresponse.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`error` | Error \| *null* |
`response?` | [*RespondWorkflowTaskCompletedResponse*](../classes/proto.temporal.api.workflowservice.v1.respondworkflowtaskcompletedresponse.md) |

**Returns:** *void*

___

### RespondWorkflowTaskFailedCallback

Ƭ **RespondWorkflowTaskFailedCallback**: (`error`: Error \| *null*, `response?`: [*RespondWorkflowTaskFailedResponse*](../classes/proto.temporal.api.workflowservice.v1.respondworkflowtaskfailedresponse.md)) => *void*

Callback as used by {@link temporal.api.workflowservice.v1.WorkflowService#respondWorkflowTaskFailed}.

**`param`** Error, if any

**`param`** 

#### Type declaration:

▸ (`error`: Error \| *null*, `response?`: [*RespondWorkflowTaskFailedResponse*](../classes/proto.temporal.api.workflowservice.v1.respondworkflowtaskfailedresponse.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`error` | Error \| *null* |
`response?` | [*RespondWorkflowTaskFailedResponse*](../classes/proto.temporal.api.workflowservice.v1.respondworkflowtaskfailedresponse.md) |

**Returns:** *void*

___

### ScanWorkflowExecutionsCallback

Ƭ **ScanWorkflowExecutionsCallback**: (`error`: Error \| *null*, `response?`: [*ScanWorkflowExecutionsResponse*](../classes/proto.temporal.api.workflowservice.v1.scanworkflowexecutionsresponse.md)) => *void*

Callback as used by {@link temporal.api.workflowservice.v1.WorkflowService#scanWorkflowExecutions}.

**`param`** Error, if any

**`param`** 

#### Type declaration:

▸ (`error`: Error \| *null*, `response?`: [*ScanWorkflowExecutionsResponse*](../classes/proto.temporal.api.workflowservice.v1.scanworkflowexecutionsresponse.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`error` | Error \| *null* |
`response?` | [*ScanWorkflowExecutionsResponse*](../classes/proto.temporal.api.workflowservice.v1.scanworkflowexecutionsresponse.md) |

**Returns:** *void*

___

### SignalWithStartWorkflowExecutionCallback

Ƭ **SignalWithStartWorkflowExecutionCallback**: (`error`: Error \| *null*, `response?`: [*SignalWithStartWorkflowExecutionResponse*](../classes/proto.temporal.api.workflowservice.v1.signalwithstartworkflowexecutionresponse.md)) => *void*

Callback as used by {@link temporal.api.workflowservice.v1.WorkflowService#signalWithStartWorkflowExecution}.

**`param`** Error, if any

**`param`** 

#### Type declaration:

▸ (`error`: Error \| *null*, `response?`: [*SignalWithStartWorkflowExecutionResponse*](../classes/proto.temporal.api.workflowservice.v1.signalwithstartworkflowexecutionresponse.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`error` | Error \| *null* |
`response?` | [*SignalWithStartWorkflowExecutionResponse*](../classes/proto.temporal.api.workflowservice.v1.signalwithstartworkflowexecutionresponse.md) |

**Returns:** *void*

___

### SignalWorkflowExecutionCallback

Ƭ **SignalWorkflowExecutionCallback**: (`error`: Error \| *null*, `response?`: [*SignalWorkflowExecutionResponse*](../classes/proto.temporal.api.workflowservice.v1.signalworkflowexecutionresponse.md)) => *void*

Callback as used by {@link temporal.api.workflowservice.v1.WorkflowService#signalWorkflowExecution}.

**`param`** Error, if any

**`param`** 

#### Type declaration:

▸ (`error`: Error \| *null*, `response?`: [*SignalWorkflowExecutionResponse*](../classes/proto.temporal.api.workflowservice.v1.signalworkflowexecutionresponse.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`error` | Error \| *null* |
`response?` | [*SignalWorkflowExecutionResponse*](../classes/proto.temporal.api.workflowservice.v1.signalworkflowexecutionresponse.md) |

**Returns:** *void*

___

### StartWorkflowExecutionCallback

Ƭ **StartWorkflowExecutionCallback**: (`error`: Error \| *null*, `response?`: [*StartWorkflowExecutionResponse*](../classes/proto.temporal.api.workflowservice.v1.startworkflowexecutionresponse.md)) => *void*

Callback as used by {@link temporal.api.workflowservice.v1.WorkflowService#startWorkflowExecution}.

**`param`** Error, if any

**`param`** 

#### Type declaration:

▸ (`error`: Error \| *null*, `response?`: [*StartWorkflowExecutionResponse*](../classes/proto.temporal.api.workflowservice.v1.startworkflowexecutionresponse.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`error` | Error \| *null* |
`response?` | [*StartWorkflowExecutionResponse*](../classes/proto.temporal.api.workflowservice.v1.startworkflowexecutionresponse.md) |

**Returns:** *void*

___

### TerminateWorkflowExecutionCallback

Ƭ **TerminateWorkflowExecutionCallback**: (`error`: Error \| *null*, `response?`: [*TerminateWorkflowExecutionResponse*](../classes/proto.temporal.api.workflowservice.v1.terminateworkflowexecutionresponse.md)) => *void*

Callback as used by {@link temporal.api.workflowservice.v1.WorkflowService#terminateWorkflowExecution}.

**`param`** Error, if any

**`param`** 

#### Type declaration:

▸ (`error`: Error \| *null*, `response?`: [*TerminateWorkflowExecutionResponse*](../classes/proto.temporal.api.workflowservice.v1.terminateworkflowexecutionresponse.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`error` | Error \| *null* |
`response?` | [*TerminateWorkflowExecutionResponse*](../classes/proto.temporal.api.workflowservice.v1.terminateworkflowexecutionresponse.md) |

**Returns:** *void*

___

### UpdateNamespaceCallback

Ƭ **UpdateNamespaceCallback**: (`error`: Error \| *null*, `response?`: [*UpdateNamespaceResponse*](../classes/proto.temporal.api.workflowservice.v1.updatenamespaceresponse.md)) => *void*

Callback as used by {@link temporal.api.workflowservice.v1.WorkflowService#updateNamespace}.

**`param`** Error, if any

**`param`** 

#### Type declaration:

▸ (`error`: Error \| *null*, `response?`: [*UpdateNamespaceResponse*](../classes/proto.temporal.api.workflowservice.v1.updatenamespaceresponse.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`error` | Error \| *null* |
`response?` | [*UpdateNamespaceResponse*](../classes/proto.temporal.api.workflowservice.v1.updatenamespaceresponse.md) |

**Returns:** *void*
