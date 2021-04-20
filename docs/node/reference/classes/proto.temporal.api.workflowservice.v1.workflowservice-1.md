# Class: WorkflowService

[workflowservice](../modules/proto.temporal.api.workflowservice.md).[v1](../modules/proto.temporal.api.workflowservice.v1.md).WorkflowService

Represents a WorkflowService

## Hierarchy

* *Service*

  ↳ **WorkflowService**

## Table of contents

### Constructors

- [constructor](proto.temporal.api.workflowservice.v1.workflowservice-1.md#constructor)

### Properties

- [requestDelimited](proto.temporal.api.workflowservice.v1.workflowservice-1.md#requestdelimited)
- [responseDelimited](proto.temporal.api.workflowservice.v1.workflowservice-1.md#responsedelimited)
- [rpcImpl](proto.temporal.api.workflowservice.v1.workflowservice-1.md#rpcimpl)

### Methods

- [countWorkflowExecutions](proto.temporal.api.workflowservice.v1.workflowservice-1.md#countworkflowexecutions)
- [deprecateNamespace](proto.temporal.api.workflowservice.v1.workflowservice-1.md#deprecatenamespace)
- [describeNamespace](proto.temporal.api.workflowservice.v1.workflowservice-1.md#describenamespace)
- [describeTaskQueue](proto.temporal.api.workflowservice.v1.workflowservice-1.md#describetaskqueue)
- [describeWorkflowExecution](proto.temporal.api.workflowservice.v1.workflowservice-1.md#describeworkflowexecution)
- [emit](proto.temporal.api.workflowservice.v1.workflowservice-1.md#emit)
- [end](proto.temporal.api.workflowservice.v1.workflowservice-1.md#end)
- [getClusterInfo](proto.temporal.api.workflowservice.v1.workflowservice-1.md#getclusterinfo)
- [getSearchAttributes](proto.temporal.api.workflowservice.v1.workflowservice-1.md#getsearchattributes)
- [getWorkflowExecutionHistory](proto.temporal.api.workflowservice.v1.workflowservice-1.md#getworkflowexecutionhistory)
- [listArchivedWorkflowExecutions](proto.temporal.api.workflowservice.v1.workflowservice-1.md#listarchivedworkflowexecutions)
- [listClosedWorkflowExecutions](proto.temporal.api.workflowservice.v1.workflowservice-1.md#listclosedworkflowexecutions)
- [listNamespaces](proto.temporal.api.workflowservice.v1.workflowservice-1.md#listnamespaces)
- [listOpenWorkflowExecutions](proto.temporal.api.workflowservice.v1.workflowservice-1.md#listopenworkflowexecutions)
- [listTaskQueuePartitions](proto.temporal.api.workflowservice.v1.workflowservice-1.md#listtaskqueuepartitions)
- [listWorkflowExecutions](proto.temporal.api.workflowservice.v1.workflowservice-1.md#listworkflowexecutions)
- [off](proto.temporal.api.workflowservice.v1.workflowservice-1.md#off)
- [on](proto.temporal.api.workflowservice.v1.workflowservice-1.md#on)
- [pollActivityTaskQueue](proto.temporal.api.workflowservice.v1.workflowservice-1.md#pollactivitytaskqueue)
- [pollWorkflowTaskQueue](proto.temporal.api.workflowservice.v1.workflowservice-1.md#pollworkflowtaskqueue)
- [queryWorkflow](proto.temporal.api.workflowservice.v1.workflowservice-1.md#queryworkflow)
- [recordActivityTaskHeartbeat](proto.temporal.api.workflowservice.v1.workflowservice-1.md#recordactivitytaskheartbeat)
- [recordActivityTaskHeartbeatById](proto.temporal.api.workflowservice.v1.workflowservice-1.md#recordactivitytaskheartbeatbyid)
- [registerNamespace](proto.temporal.api.workflowservice.v1.workflowservice-1.md#registernamespace)
- [requestCancelWorkflowExecution](proto.temporal.api.workflowservice.v1.workflowservice-1.md#requestcancelworkflowexecution)
- [resetStickyTaskQueue](proto.temporal.api.workflowservice.v1.workflowservice-1.md#resetstickytaskqueue)
- [resetWorkflowExecution](proto.temporal.api.workflowservice.v1.workflowservice-1.md#resetworkflowexecution)
- [respondActivityTaskCanceled](proto.temporal.api.workflowservice.v1.workflowservice-1.md#respondactivitytaskcanceled)
- [respondActivityTaskCanceledById](proto.temporal.api.workflowservice.v1.workflowservice-1.md#respondactivitytaskcanceledbyid)
- [respondActivityTaskCompleted](proto.temporal.api.workflowservice.v1.workflowservice-1.md#respondactivitytaskcompleted)
- [respondActivityTaskCompletedById](proto.temporal.api.workflowservice.v1.workflowservice-1.md#respondactivitytaskcompletedbyid)
- [respondActivityTaskFailed](proto.temporal.api.workflowservice.v1.workflowservice-1.md#respondactivitytaskfailed)
- [respondActivityTaskFailedById](proto.temporal.api.workflowservice.v1.workflowservice-1.md#respondactivitytaskfailedbyid)
- [respondQueryTaskCompleted](proto.temporal.api.workflowservice.v1.workflowservice-1.md#respondquerytaskcompleted)
- [respondWorkflowTaskCompleted](proto.temporal.api.workflowservice.v1.workflowservice-1.md#respondworkflowtaskcompleted)
- [respondWorkflowTaskFailed](proto.temporal.api.workflowservice.v1.workflowservice-1.md#respondworkflowtaskfailed)
- [rpcCall](proto.temporal.api.workflowservice.v1.workflowservice-1.md#rpccall)
- [scanWorkflowExecutions](proto.temporal.api.workflowservice.v1.workflowservice-1.md#scanworkflowexecutions)
- [signalWithStartWorkflowExecution](proto.temporal.api.workflowservice.v1.workflowservice-1.md#signalwithstartworkflowexecution)
- [signalWorkflowExecution](proto.temporal.api.workflowservice.v1.workflowservice-1.md#signalworkflowexecution)
- [startWorkflowExecution](proto.temporal.api.workflowservice.v1.workflowservice-1.md#startworkflowexecution)
- [terminateWorkflowExecution](proto.temporal.api.workflowservice.v1.workflowservice-1.md#terminateworkflowexecution)
- [updateNamespace](proto.temporal.api.workflowservice.v1.workflowservice-1.md#updatenamespace)
- [create](proto.temporal.api.workflowservice.v1.workflowservice-1.md#create)

## Constructors

### constructor

\+ **new WorkflowService**(`rpcImpl`: RPCImpl, `requestDelimited?`: *boolean*, `responseDelimited?`: *boolean*): [*WorkflowService*](proto.temporal.api.workflowservice.v1.workflowservice-1.md)

Constructs a new WorkflowService service.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`rpcImpl` | RPCImpl | RPC implementation   |
`requestDelimited?` | *boolean* | - |
`responseDelimited?` | *boolean* | - |

**Returns:** [*WorkflowService*](proto.temporal.api.workflowservice.v1.workflowservice-1.md)

Overrides: $protobuf.rpc.Service.constructor

## Properties

### requestDelimited

• **requestDelimited**: *boolean*

Whether requests are length-delimited.

Inherited from: $protobuf.rpc.Service.requestDelimited

___

### responseDelimited

• **responseDelimited**: *boolean*

Whether responses are length-delimited.

Inherited from: $protobuf.rpc.Service.responseDelimited

___

### rpcImpl

• **rpcImpl**: *null* \| RPCImpl

RPC implementation. Becomes `null` once the service is ended.

Inherited from: $protobuf.rpc.Service.rpcImpl

## Methods

### countWorkflowExecutions

▸ **countWorkflowExecutions**(`request`: [*ICountWorkflowExecutionsRequest*](../interfaces/proto.temporal.api.workflowservice.v1.icountworkflowexecutionsrequest.md), `callback`: [*CountWorkflowExecutionsCallback*](../modules/proto.temporal.api.workflowservice.v1.workflowservice.md#countworkflowexecutionscallback)): *void*

Calls CountWorkflowExecutions.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`request` | [*ICountWorkflowExecutionsRequest*](../interfaces/proto.temporal.api.workflowservice.v1.icountworkflowexecutionsrequest.md) | CountWorkflowExecutionsRequest message or plain object   |
`callback` | [*CountWorkflowExecutionsCallback*](../modules/proto.temporal.api.workflowservice.v1.workflowservice.md#countworkflowexecutionscallback) | Node-style callback called with the error, if any, and CountWorkflowExecutionsResponse    |

**Returns:** *void*

▸ **countWorkflowExecutions**(`request`: [*ICountWorkflowExecutionsRequest*](../interfaces/proto.temporal.api.workflowservice.v1.icountworkflowexecutionsrequest.md)): *Promise*<[*CountWorkflowExecutionsResponse*](proto.temporal.api.workflowservice.v1.countworkflowexecutionsresponse.md)\>

Calls CountWorkflowExecutions.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`request` | [*ICountWorkflowExecutionsRequest*](../interfaces/proto.temporal.api.workflowservice.v1.icountworkflowexecutionsrequest.md) | CountWorkflowExecutionsRequest message or plain object   |

**Returns:** *Promise*<[*CountWorkflowExecutionsResponse*](proto.temporal.api.workflowservice.v1.countworkflowexecutionsresponse.md)\>

Promise

___

### deprecateNamespace

▸ **deprecateNamespace**(`request`: [*IDeprecateNamespaceRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ideprecatenamespacerequest.md), `callback`: [*DeprecateNamespaceCallback*](../modules/proto.temporal.api.workflowservice.v1.workflowservice.md#deprecatenamespacecallback)): *void*

Calls DeprecateNamespace.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`request` | [*IDeprecateNamespaceRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ideprecatenamespacerequest.md) | DeprecateNamespaceRequest message or plain object   |
`callback` | [*DeprecateNamespaceCallback*](../modules/proto.temporal.api.workflowservice.v1.workflowservice.md#deprecatenamespacecallback) | Node-style callback called with the error, if any, and DeprecateNamespaceResponse    |

**Returns:** *void*

▸ **deprecateNamespace**(`request`: [*IDeprecateNamespaceRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ideprecatenamespacerequest.md)): *Promise*<[*DeprecateNamespaceResponse*](proto.temporal.api.workflowservice.v1.deprecatenamespaceresponse.md)\>

Calls DeprecateNamespace.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`request` | [*IDeprecateNamespaceRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ideprecatenamespacerequest.md) | DeprecateNamespaceRequest message or plain object   |

**Returns:** *Promise*<[*DeprecateNamespaceResponse*](proto.temporal.api.workflowservice.v1.deprecatenamespaceresponse.md)\>

Promise

___

### describeNamespace

▸ **describeNamespace**(`request`: [*IDescribeNamespaceRequest*](../interfaces/proto.temporal.api.workflowservice.v1.idescribenamespacerequest.md), `callback`: [*DescribeNamespaceCallback*](../modules/proto.temporal.api.workflowservice.v1.workflowservice.md#describenamespacecallback)): *void*

Calls DescribeNamespace.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`request` | [*IDescribeNamespaceRequest*](../interfaces/proto.temporal.api.workflowservice.v1.idescribenamespacerequest.md) | DescribeNamespaceRequest message or plain object   |
`callback` | [*DescribeNamespaceCallback*](../modules/proto.temporal.api.workflowservice.v1.workflowservice.md#describenamespacecallback) | Node-style callback called with the error, if any, and DescribeNamespaceResponse    |

**Returns:** *void*

▸ **describeNamespace**(`request`: [*IDescribeNamespaceRequest*](../interfaces/proto.temporal.api.workflowservice.v1.idescribenamespacerequest.md)): *Promise*<[*DescribeNamespaceResponse*](proto.temporal.api.workflowservice.v1.describenamespaceresponse.md)\>

Calls DescribeNamespace.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`request` | [*IDescribeNamespaceRequest*](../interfaces/proto.temporal.api.workflowservice.v1.idescribenamespacerequest.md) | DescribeNamespaceRequest message or plain object   |

**Returns:** *Promise*<[*DescribeNamespaceResponse*](proto.temporal.api.workflowservice.v1.describenamespaceresponse.md)\>

Promise

___

### describeTaskQueue

▸ **describeTaskQueue**(`request`: [*IDescribeTaskQueueRequest*](../interfaces/proto.temporal.api.workflowservice.v1.idescribetaskqueuerequest.md), `callback`: [*DescribeTaskQueueCallback*](../modules/proto.temporal.api.workflowservice.v1.workflowservice.md#describetaskqueuecallback)): *void*

Calls DescribeTaskQueue.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`request` | [*IDescribeTaskQueueRequest*](../interfaces/proto.temporal.api.workflowservice.v1.idescribetaskqueuerequest.md) | DescribeTaskQueueRequest message or plain object   |
`callback` | [*DescribeTaskQueueCallback*](../modules/proto.temporal.api.workflowservice.v1.workflowservice.md#describetaskqueuecallback) | Node-style callback called with the error, if any, and DescribeTaskQueueResponse    |

**Returns:** *void*

▸ **describeTaskQueue**(`request`: [*IDescribeTaskQueueRequest*](../interfaces/proto.temporal.api.workflowservice.v1.idescribetaskqueuerequest.md)): *Promise*<[*DescribeTaskQueueResponse*](proto.temporal.api.workflowservice.v1.describetaskqueueresponse.md)\>

Calls DescribeTaskQueue.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`request` | [*IDescribeTaskQueueRequest*](../interfaces/proto.temporal.api.workflowservice.v1.idescribetaskqueuerequest.md) | DescribeTaskQueueRequest message or plain object   |

**Returns:** *Promise*<[*DescribeTaskQueueResponse*](proto.temporal.api.workflowservice.v1.describetaskqueueresponse.md)\>

Promise

___

### describeWorkflowExecution

▸ **describeWorkflowExecution**(`request`: [*IDescribeWorkflowExecutionRequest*](../interfaces/proto.temporal.api.workflowservice.v1.idescribeworkflowexecutionrequest.md), `callback`: [*DescribeWorkflowExecutionCallback*](../modules/proto.temporal.api.workflowservice.v1.workflowservice.md#describeworkflowexecutioncallback)): *void*

Calls DescribeWorkflowExecution.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`request` | [*IDescribeWorkflowExecutionRequest*](../interfaces/proto.temporal.api.workflowservice.v1.idescribeworkflowexecutionrequest.md) | DescribeWorkflowExecutionRequest message or plain object   |
`callback` | [*DescribeWorkflowExecutionCallback*](../modules/proto.temporal.api.workflowservice.v1.workflowservice.md#describeworkflowexecutioncallback) | Node-style callback called with the error, if any, and DescribeWorkflowExecutionResponse    |

**Returns:** *void*

▸ **describeWorkflowExecution**(`request`: [*IDescribeWorkflowExecutionRequest*](../interfaces/proto.temporal.api.workflowservice.v1.idescribeworkflowexecutionrequest.md)): *Promise*<[*DescribeWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.describeworkflowexecutionresponse.md)\>

Calls DescribeWorkflowExecution.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`request` | [*IDescribeWorkflowExecutionRequest*](../interfaces/proto.temporal.api.workflowservice.v1.idescribeworkflowexecutionrequest.md) | DescribeWorkflowExecutionRequest message or plain object   |

**Returns:** *Promise*<[*DescribeWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.describeworkflowexecutionresponse.md)\>

Promise

___

### emit

▸ **emit**(`evt`: *string*, ...`args`: *any*[]): [*WorkflowService*](proto.temporal.api.workflowservice.v1.workflowservice-1.md)

Emits an event by calling its listeners with the specified arguments.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`evt` | *string* | Event name   |
`...args` | *any*[] | Arguments   |

**Returns:** [*WorkflowService*](proto.temporal.api.workflowservice.v1.workflowservice-1.md)

`this`

Inherited from: $protobuf.rpc.Service.emit

___

### end

▸ **end**(`endedByRPC?`: *boolean*): *Service*

Ends this service and emits the `end` event.

#### Parameters:

Name | Type |
:------ | :------ |
`endedByRPC?` | *boolean* |

**Returns:** *Service*

`this`

Inherited from: $protobuf.rpc.Service.end

___

### getClusterInfo

▸ **getClusterInfo**(`request`: [*IGetClusterInfoRequest*](../interfaces/proto.temporal.api.workflowservice.v1.igetclusterinforequest.md), `callback`: [*GetClusterInfoCallback*](../modules/proto.temporal.api.workflowservice.v1.workflowservice.md#getclusterinfocallback)): *void*

Calls GetClusterInfo.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`request` | [*IGetClusterInfoRequest*](../interfaces/proto.temporal.api.workflowservice.v1.igetclusterinforequest.md) | GetClusterInfoRequest message or plain object   |
`callback` | [*GetClusterInfoCallback*](../modules/proto.temporal.api.workflowservice.v1.workflowservice.md#getclusterinfocallback) | Node-style callback called with the error, if any, and GetClusterInfoResponse    |

**Returns:** *void*

▸ **getClusterInfo**(`request`: [*IGetClusterInfoRequest*](../interfaces/proto.temporal.api.workflowservice.v1.igetclusterinforequest.md)): *Promise*<[*GetClusterInfoResponse*](proto.temporal.api.workflowservice.v1.getclusterinforesponse.md)\>

Calls GetClusterInfo.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`request` | [*IGetClusterInfoRequest*](../interfaces/proto.temporal.api.workflowservice.v1.igetclusterinforequest.md) | GetClusterInfoRequest message or plain object   |

**Returns:** *Promise*<[*GetClusterInfoResponse*](proto.temporal.api.workflowservice.v1.getclusterinforesponse.md)\>

Promise

___

### getSearchAttributes

▸ **getSearchAttributes**(`request`: [*IGetSearchAttributesRequest*](../interfaces/proto.temporal.api.workflowservice.v1.igetsearchattributesrequest.md), `callback`: [*GetSearchAttributesCallback*](../modules/proto.temporal.api.workflowservice.v1.workflowservice.md#getsearchattributescallback)): *void*

Calls GetSearchAttributes.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`request` | [*IGetSearchAttributesRequest*](../interfaces/proto.temporal.api.workflowservice.v1.igetsearchattributesrequest.md) | GetSearchAttributesRequest message or plain object   |
`callback` | [*GetSearchAttributesCallback*](../modules/proto.temporal.api.workflowservice.v1.workflowservice.md#getsearchattributescallback) | Node-style callback called with the error, if any, and GetSearchAttributesResponse    |

**Returns:** *void*

▸ **getSearchAttributes**(`request`: [*IGetSearchAttributesRequest*](../interfaces/proto.temporal.api.workflowservice.v1.igetsearchattributesrequest.md)): *Promise*<[*GetSearchAttributesResponse*](proto.temporal.api.workflowservice.v1.getsearchattributesresponse.md)\>

Calls GetSearchAttributes.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`request` | [*IGetSearchAttributesRequest*](../interfaces/proto.temporal.api.workflowservice.v1.igetsearchattributesrequest.md) | GetSearchAttributesRequest message or plain object   |

**Returns:** *Promise*<[*GetSearchAttributesResponse*](proto.temporal.api.workflowservice.v1.getsearchattributesresponse.md)\>

Promise

___

### getWorkflowExecutionHistory

▸ **getWorkflowExecutionHistory**(`request`: [*IGetWorkflowExecutionHistoryRequest*](../interfaces/proto.temporal.api.workflowservice.v1.igetworkflowexecutionhistoryrequest.md), `callback`: [*GetWorkflowExecutionHistoryCallback*](../modules/proto.temporal.api.workflowservice.v1.workflowservice.md#getworkflowexecutionhistorycallback)): *void*

Calls GetWorkflowExecutionHistory.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`request` | [*IGetWorkflowExecutionHistoryRequest*](../interfaces/proto.temporal.api.workflowservice.v1.igetworkflowexecutionhistoryrequest.md) | GetWorkflowExecutionHistoryRequest message or plain object   |
`callback` | [*GetWorkflowExecutionHistoryCallback*](../modules/proto.temporal.api.workflowservice.v1.workflowservice.md#getworkflowexecutionhistorycallback) | Node-style callback called with the error, if any, and GetWorkflowExecutionHistoryResponse    |

**Returns:** *void*

▸ **getWorkflowExecutionHistory**(`request`: [*IGetWorkflowExecutionHistoryRequest*](../interfaces/proto.temporal.api.workflowservice.v1.igetworkflowexecutionhistoryrequest.md)): *Promise*<[*GetWorkflowExecutionHistoryResponse*](proto.temporal.api.workflowservice.v1.getworkflowexecutionhistoryresponse.md)\>

Calls GetWorkflowExecutionHistory.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`request` | [*IGetWorkflowExecutionHistoryRequest*](../interfaces/proto.temporal.api.workflowservice.v1.igetworkflowexecutionhistoryrequest.md) | GetWorkflowExecutionHistoryRequest message or plain object   |

**Returns:** *Promise*<[*GetWorkflowExecutionHistoryResponse*](proto.temporal.api.workflowservice.v1.getworkflowexecutionhistoryresponse.md)\>

Promise

___

### listArchivedWorkflowExecutions

▸ **listArchivedWorkflowExecutions**(`request`: [*IListArchivedWorkflowExecutionsRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ilistarchivedworkflowexecutionsrequest.md), `callback`: [*ListArchivedWorkflowExecutionsCallback*](../modules/proto.temporal.api.workflowservice.v1.workflowservice.md#listarchivedworkflowexecutionscallback)): *void*

Calls ListArchivedWorkflowExecutions.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`request` | [*IListArchivedWorkflowExecutionsRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ilistarchivedworkflowexecutionsrequest.md) | ListArchivedWorkflowExecutionsRequest message or plain object   |
`callback` | [*ListArchivedWorkflowExecutionsCallback*](../modules/proto.temporal.api.workflowservice.v1.workflowservice.md#listarchivedworkflowexecutionscallback) | Node-style callback called with the error, if any, and ListArchivedWorkflowExecutionsResponse    |

**Returns:** *void*

▸ **listArchivedWorkflowExecutions**(`request`: [*IListArchivedWorkflowExecutionsRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ilistarchivedworkflowexecutionsrequest.md)): *Promise*<[*ListArchivedWorkflowExecutionsResponse*](proto.temporal.api.workflowservice.v1.listarchivedworkflowexecutionsresponse.md)\>

Calls ListArchivedWorkflowExecutions.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`request` | [*IListArchivedWorkflowExecutionsRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ilistarchivedworkflowexecutionsrequest.md) | ListArchivedWorkflowExecutionsRequest message or plain object   |

**Returns:** *Promise*<[*ListArchivedWorkflowExecutionsResponse*](proto.temporal.api.workflowservice.v1.listarchivedworkflowexecutionsresponse.md)\>

Promise

___

### listClosedWorkflowExecutions

▸ **listClosedWorkflowExecutions**(`request`: [*IListClosedWorkflowExecutionsRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ilistclosedworkflowexecutionsrequest.md), `callback`: [*ListClosedWorkflowExecutionsCallback*](../modules/proto.temporal.api.workflowservice.v1.workflowservice.md#listclosedworkflowexecutionscallback)): *void*

Calls ListClosedWorkflowExecutions.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`request` | [*IListClosedWorkflowExecutionsRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ilistclosedworkflowexecutionsrequest.md) | ListClosedWorkflowExecutionsRequest message or plain object   |
`callback` | [*ListClosedWorkflowExecutionsCallback*](../modules/proto.temporal.api.workflowservice.v1.workflowservice.md#listclosedworkflowexecutionscallback) | Node-style callback called with the error, if any, and ListClosedWorkflowExecutionsResponse    |

**Returns:** *void*

▸ **listClosedWorkflowExecutions**(`request`: [*IListClosedWorkflowExecutionsRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ilistclosedworkflowexecutionsrequest.md)): *Promise*<[*ListClosedWorkflowExecutionsResponse*](proto.temporal.api.workflowservice.v1.listclosedworkflowexecutionsresponse.md)\>

Calls ListClosedWorkflowExecutions.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`request` | [*IListClosedWorkflowExecutionsRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ilistclosedworkflowexecutionsrequest.md) | ListClosedWorkflowExecutionsRequest message or plain object   |

**Returns:** *Promise*<[*ListClosedWorkflowExecutionsResponse*](proto.temporal.api.workflowservice.v1.listclosedworkflowexecutionsresponse.md)\>

Promise

___

### listNamespaces

▸ **listNamespaces**(`request`: [*IListNamespacesRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ilistnamespacesrequest.md), `callback`: [*ListNamespacesCallback*](../modules/proto.temporal.api.workflowservice.v1.workflowservice.md#listnamespacescallback)): *void*

Calls ListNamespaces.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`request` | [*IListNamespacesRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ilistnamespacesrequest.md) | ListNamespacesRequest message or plain object   |
`callback` | [*ListNamespacesCallback*](../modules/proto.temporal.api.workflowservice.v1.workflowservice.md#listnamespacescallback) | Node-style callback called with the error, if any, and ListNamespacesResponse    |

**Returns:** *void*

▸ **listNamespaces**(`request`: [*IListNamespacesRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ilistnamespacesrequest.md)): *Promise*<[*ListNamespacesResponse*](proto.temporal.api.workflowservice.v1.listnamespacesresponse.md)\>

Calls ListNamespaces.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`request` | [*IListNamespacesRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ilistnamespacesrequest.md) | ListNamespacesRequest message or plain object   |

**Returns:** *Promise*<[*ListNamespacesResponse*](proto.temporal.api.workflowservice.v1.listnamespacesresponse.md)\>

Promise

___

### listOpenWorkflowExecutions

▸ **listOpenWorkflowExecutions**(`request`: [*IListOpenWorkflowExecutionsRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ilistopenworkflowexecutionsrequest.md), `callback`: [*ListOpenWorkflowExecutionsCallback*](../modules/proto.temporal.api.workflowservice.v1.workflowservice.md#listopenworkflowexecutionscallback)): *void*

Calls ListOpenWorkflowExecutions.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`request` | [*IListOpenWorkflowExecutionsRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ilistopenworkflowexecutionsrequest.md) | ListOpenWorkflowExecutionsRequest message or plain object   |
`callback` | [*ListOpenWorkflowExecutionsCallback*](../modules/proto.temporal.api.workflowservice.v1.workflowservice.md#listopenworkflowexecutionscallback) | Node-style callback called with the error, if any, and ListOpenWorkflowExecutionsResponse    |

**Returns:** *void*

▸ **listOpenWorkflowExecutions**(`request`: [*IListOpenWorkflowExecutionsRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ilistopenworkflowexecutionsrequest.md)): *Promise*<[*ListOpenWorkflowExecutionsResponse*](proto.temporal.api.workflowservice.v1.listopenworkflowexecutionsresponse.md)\>

Calls ListOpenWorkflowExecutions.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`request` | [*IListOpenWorkflowExecutionsRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ilistopenworkflowexecutionsrequest.md) | ListOpenWorkflowExecutionsRequest message or plain object   |

**Returns:** *Promise*<[*ListOpenWorkflowExecutionsResponse*](proto.temporal.api.workflowservice.v1.listopenworkflowexecutionsresponse.md)\>

Promise

___

### listTaskQueuePartitions

▸ **listTaskQueuePartitions**(`request`: [*IListTaskQueuePartitionsRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ilisttaskqueuepartitionsrequest.md), `callback`: [*ListTaskQueuePartitionsCallback*](../modules/proto.temporal.api.workflowservice.v1.workflowservice.md#listtaskqueuepartitionscallback)): *void*

Calls ListTaskQueuePartitions.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`request` | [*IListTaskQueuePartitionsRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ilisttaskqueuepartitionsrequest.md) | ListTaskQueuePartitionsRequest message or plain object   |
`callback` | [*ListTaskQueuePartitionsCallback*](../modules/proto.temporal.api.workflowservice.v1.workflowservice.md#listtaskqueuepartitionscallback) | Node-style callback called with the error, if any, and ListTaskQueuePartitionsResponse    |

**Returns:** *void*

▸ **listTaskQueuePartitions**(`request`: [*IListTaskQueuePartitionsRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ilisttaskqueuepartitionsrequest.md)): *Promise*<[*ListTaskQueuePartitionsResponse*](proto.temporal.api.workflowservice.v1.listtaskqueuepartitionsresponse.md)\>

Calls ListTaskQueuePartitions.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`request` | [*IListTaskQueuePartitionsRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ilisttaskqueuepartitionsrequest.md) | ListTaskQueuePartitionsRequest message or plain object   |

**Returns:** *Promise*<[*ListTaskQueuePartitionsResponse*](proto.temporal.api.workflowservice.v1.listtaskqueuepartitionsresponse.md)\>

Promise

___

### listWorkflowExecutions

▸ **listWorkflowExecutions**(`request`: [*IListWorkflowExecutionsRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ilistworkflowexecutionsrequest.md), `callback`: [*ListWorkflowExecutionsCallback*](../modules/proto.temporal.api.workflowservice.v1.workflowservice.md#listworkflowexecutionscallback)): *void*

Calls ListWorkflowExecutions.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`request` | [*IListWorkflowExecutionsRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ilistworkflowexecutionsrequest.md) | ListWorkflowExecutionsRequest message or plain object   |
`callback` | [*ListWorkflowExecutionsCallback*](../modules/proto.temporal.api.workflowservice.v1.workflowservice.md#listworkflowexecutionscallback) | Node-style callback called with the error, if any, and ListWorkflowExecutionsResponse    |

**Returns:** *void*

▸ **listWorkflowExecutions**(`request`: [*IListWorkflowExecutionsRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ilistworkflowexecutionsrequest.md)): *Promise*<[*ListWorkflowExecutionsResponse*](proto.temporal.api.workflowservice.v1.listworkflowexecutionsresponse.md)\>

Calls ListWorkflowExecutions.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`request` | [*IListWorkflowExecutionsRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ilistworkflowexecutionsrequest.md) | ListWorkflowExecutionsRequest message or plain object   |

**Returns:** *Promise*<[*ListWorkflowExecutionsResponse*](proto.temporal.api.workflowservice.v1.listworkflowexecutionsresponse.md)\>

Promise

___

### off

▸ **off**(`evt?`: *string*, `fn?`: EventEmitterListener): [*WorkflowService*](proto.temporal.api.workflowservice.v1.workflowservice-1.md)

Removes an event listener or any matching listeners if arguments are omitted.

#### Parameters:

Name | Type |
:------ | :------ |
`evt?` | *string* |
`fn?` | EventEmitterListener |

**Returns:** [*WorkflowService*](proto.temporal.api.workflowservice.v1.workflowservice-1.md)

`this`

Inherited from: $protobuf.rpc.Service.off

___

### on

▸ **on**(`evt`: *string*, `fn`: EventEmitterListener, `ctx?`: *any*): [*WorkflowService*](proto.temporal.api.workflowservice.v1.workflowservice-1.md)

Registers an event listener.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`evt` | *string* | Event name   |
`fn` | EventEmitterListener | Listener   |
`ctx?` | *any* | - |

**Returns:** [*WorkflowService*](proto.temporal.api.workflowservice.v1.workflowservice-1.md)

`this`

Inherited from: $protobuf.rpc.Service.on

___

### pollActivityTaskQueue

▸ **pollActivityTaskQueue**(`request`: [*IPollActivityTaskQueueRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ipollactivitytaskqueuerequest.md), `callback`: [*PollActivityTaskQueueCallback*](../modules/proto.temporal.api.workflowservice.v1.workflowservice.md#pollactivitytaskqueuecallback)): *void*

Calls PollActivityTaskQueue.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`request` | [*IPollActivityTaskQueueRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ipollactivitytaskqueuerequest.md) | PollActivityTaskQueueRequest message or plain object   |
`callback` | [*PollActivityTaskQueueCallback*](../modules/proto.temporal.api.workflowservice.v1.workflowservice.md#pollactivitytaskqueuecallback) | Node-style callback called with the error, if any, and PollActivityTaskQueueResponse    |

**Returns:** *void*

▸ **pollActivityTaskQueue**(`request`: [*IPollActivityTaskQueueRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ipollactivitytaskqueuerequest.md)): *Promise*<[*PollActivityTaskQueueResponse*](proto.temporal.api.workflowservice.v1.pollactivitytaskqueueresponse.md)\>

Calls PollActivityTaskQueue.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`request` | [*IPollActivityTaskQueueRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ipollactivitytaskqueuerequest.md) | PollActivityTaskQueueRequest message or plain object   |

**Returns:** *Promise*<[*PollActivityTaskQueueResponse*](proto.temporal.api.workflowservice.v1.pollactivitytaskqueueresponse.md)\>

Promise

___

### pollWorkflowTaskQueue

▸ **pollWorkflowTaskQueue**(`request`: [*IPollWorkflowTaskQueueRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ipollworkflowtaskqueuerequest.md), `callback`: [*PollWorkflowTaskQueueCallback*](../modules/proto.temporal.api.workflowservice.v1.workflowservice.md#pollworkflowtaskqueuecallback)): *void*

Calls PollWorkflowTaskQueue.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`request` | [*IPollWorkflowTaskQueueRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ipollworkflowtaskqueuerequest.md) | PollWorkflowTaskQueueRequest message or plain object   |
`callback` | [*PollWorkflowTaskQueueCallback*](../modules/proto.temporal.api.workflowservice.v1.workflowservice.md#pollworkflowtaskqueuecallback) | Node-style callback called with the error, if any, and PollWorkflowTaskQueueResponse    |

**Returns:** *void*

▸ **pollWorkflowTaskQueue**(`request`: [*IPollWorkflowTaskQueueRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ipollworkflowtaskqueuerequest.md)): *Promise*<[*PollWorkflowTaskQueueResponse*](proto.temporal.api.workflowservice.v1.pollworkflowtaskqueueresponse.md)\>

Calls PollWorkflowTaskQueue.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`request` | [*IPollWorkflowTaskQueueRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ipollworkflowtaskqueuerequest.md) | PollWorkflowTaskQueueRequest message or plain object   |

**Returns:** *Promise*<[*PollWorkflowTaskQueueResponse*](proto.temporal.api.workflowservice.v1.pollworkflowtaskqueueresponse.md)\>

Promise

___

### queryWorkflow

▸ **queryWorkflow**(`request`: [*IQueryWorkflowRequest*](../interfaces/proto.temporal.api.workflowservice.v1.iqueryworkflowrequest.md), `callback`: [*QueryWorkflowCallback*](../modules/proto.temporal.api.workflowservice.v1.workflowservice.md#queryworkflowcallback)): *void*

Calls QueryWorkflow.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`request` | [*IQueryWorkflowRequest*](../interfaces/proto.temporal.api.workflowservice.v1.iqueryworkflowrequest.md) | QueryWorkflowRequest message or plain object   |
`callback` | [*QueryWorkflowCallback*](../modules/proto.temporal.api.workflowservice.v1.workflowservice.md#queryworkflowcallback) | Node-style callback called with the error, if any, and QueryWorkflowResponse    |

**Returns:** *void*

▸ **queryWorkflow**(`request`: [*IQueryWorkflowRequest*](../interfaces/proto.temporal.api.workflowservice.v1.iqueryworkflowrequest.md)): *Promise*<[*QueryWorkflowResponse*](proto.temporal.api.workflowservice.v1.queryworkflowresponse.md)\>

Calls QueryWorkflow.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`request` | [*IQueryWorkflowRequest*](../interfaces/proto.temporal.api.workflowservice.v1.iqueryworkflowrequest.md) | QueryWorkflowRequest message or plain object   |

**Returns:** *Promise*<[*QueryWorkflowResponse*](proto.temporal.api.workflowservice.v1.queryworkflowresponse.md)\>

Promise

___

### recordActivityTaskHeartbeat

▸ **recordActivityTaskHeartbeat**(`request`: [*IRecordActivityTaskHeartbeatRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irecordactivitytaskheartbeatrequest.md), `callback`: [*RecordActivityTaskHeartbeatCallback*](../modules/proto.temporal.api.workflowservice.v1.workflowservice.md#recordactivitytaskheartbeatcallback)): *void*

Calls RecordActivityTaskHeartbeat.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`request` | [*IRecordActivityTaskHeartbeatRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irecordactivitytaskheartbeatrequest.md) | RecordActivityTaskHeartbeatRequest message or plain object   |
`callback` | [*RecordActivityTaskHeartbeatCallback*](../modules/proto.temporal.api.workflowservice.v1.workflowservice.md#recordactivitytaskheartbeatcallback) | Node-style callback called with the error, if any, and RecordActivityTaskHeartbeatResponse    |

**Returns:** *void*

▸ **recordActivityTaskHeartbeat**(`request`: [*IRecordActivityTaskHeartbeatRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irecordactivitytaskheartbeatrequest.md)): *Promise*<[*RecordActivityTaskHeartbeatResponse*](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatresponse.md)\>

Calls RecordActivityTaskHeartbeat.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`request` | [*IRecordActivityTaskHeartbeatRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irecordactivitytaskheartbeatrequest.md) | RecordActivityTaskHeartbeatRequest message or plain object   |

**Returns:** *Promise*<[*RecordActivityTaskHeartbeatResponse*](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatresponse.md)\>

Promise

___

### recordActivityTaskHeartbeatById

▸ **recordActivityTaskHeartbeatById**(`request`: [*IRecordActivityTaskHeartbeatByIdRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irecordactivitytaskheartbeatbyidrequest.md), `callback`: [*RecordActivityTaskHeartbeatByIdCallback*](../modules/proto.temporal.api.workflowservice.v1.workflowservice.md#recordactivitytaskheartbeatbyidcallback)): *void*

Calls RecordActivityTaskHeartbeatById.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`request` | [*IRecordActivityTaskHeartbeatByIdRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irecordactivitytaskheartbeatbyidrequest.md) | RecordActivityTaskHeartbeatByIdRequest message or plain object   |
`callback` | [*RecordActivityTaskHeartbeatByIdCallback*](../modules/proto.temporal.api.workflowservice.v1.workflowservice.md#recordactivitytaskheartbeatbyidcallback) | Node-style callback called with the error, if any, and RecordActivityTaskHeartbeatByIdResponse    |

**Returns:** *void*

▸ **recordActivityTaskHeartbeatById**(`request`: [*IRecordActivityTaskHeartbeatByIdRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irecordactivitytaskheartbeatbyidrequest.md)): *Promise*<[*RecordActivityTaskHeartbeatByIdResponse*](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatbyidresponse.md)\>

Calls RecordActivityTaskHeartbeatById.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`request` | [*IRecordActivityTaskHeartbeatByIdRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irecordactivitytaskheartbeatbyidrequest.md) | RecordActivityTaskHeartbeatByIdRequest message or plain object   |

**Returns:** *Promise*<[*RecordActivityTaskHeartbeatByIdResponse*](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatbyidresponse.md)\>

Promise

___

### registerNamespace

▸ **registerNamespace**(`request`: [*IRegisterNamespaceRequest*](../interfaces/proto.temporal.api.workflowservice.v1.iregisternamespacerequest.md), `callback`: [*RegisterNamespaceCallback*](../modules/proto.temporal.api.workflowservice.v1.workflowservice.md#registernamespacecallback)): *void*

Calls RegisterNamespace.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`request` | [*IRegisterNamespaceRequest*](../interfaces/proto.temporal.api.workflowservice.v1.iregisternamespacerequest.md) | RegisterNamespaceRequest message or plain object   |
`callback` | [*RegisterNamespaceCallback*](../modules/proto.temporal.api.workflowservice.v1.workflowservice.md#registernamespacecallback) | Node-style callback called with the error, if any, and RegisterNamespaceResponse    |

**Returns:** *void*

▸ **registerNamespace**(`request`: [*IRegisterNamespaceRequest*](../interfaces/proto.temporal.api.workflowservice.v1.iregisternamespacerequest.md)): *Promise*<[*RegisterNamespaceResponse*](proto.temporal.api.workflowservice.v1.registernamespaceresponse.md)\>

Calls RegisterNamespace.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`request` | [*IRegisterNamespaceRequest*](../interfaces/proto.temporal.api.workflowservice.v1.iregisternamespacerequest.md) | RegisterNamespaceRequest message or plain object   |

**Returns:** *Promise*<[*RegisterNamespaceResponse*](proto.temporal.api.workflowservice.v1.registernamespaceresponse.md)\>

Promise

___

### requestCancelWorkflowExecution

▸ **requestCancelWorkflowExecution**(`request`: [*IRequestCancelWorkflowExecutionRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irequestcancelworkflowexecutionrequest.md), `callback`: [*RequestCancelWorkflowExecutionCallback*](../modules/proto.temporal.api.workflowservice.v1.workflowservice.md#requestcancelworkflowexecutioncallback)): *void*

Calls RequestCancelWorkflowExecution.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`request` | [*IRequestCancelWorkflowExecutionRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irequestcancelworkflowexecutionrequest.md) | RequestCancelWorkflowExecutionRequest message or plain object   |
`callback` | [*RequestCancelWorkflowExecutionCallback*](../modules/proto.temporal.api.workflowservice.v1.workflowservice.md#requestcancelworkflowexecutioncallback) | Node-style callback called with the error, if any, and RequestCancelWorkflowExecutionResponse    |

**Returns:** *void*

▸ **requestCancelWorkflowExecution**(`request`: [*IRequestCancelWorkflowExecutionRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irequestcancelworkflowexecutionrequest.md)): *Promise*<[*RequestCancelWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.requestcancelworkflowexecutionresponse.md)\>

Calls RequestCancelWorkflowExecution.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`request` | [*IRequestCancelWorkflowExecutionRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irequestcancelworkflowexecutionrequest.md) | RequestCancelWorkflowExecutionRequest message or plain object   |

**Returns:** *Promise*<[*RequestCancelWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.requestcancelworkflowexecutionresponse.md)\>

Promise

___

### resetStickyTaskQueue

▸ **resetStickyTaskQueue**(`request`: [*IResetStickyTaskQueueRequest*](../interfaces/proto.temporal.api.workflowservice.v1.iresetstickytaskqueuerequest.md), `callback`: [*ResetStickyTaskQueueCallback*](../modules/proto.temporal.api.workflowservice.v1.workflowservice.md#resetstickytaskqueuecallback)): *void*

Calls ResetStickyTaskQueue.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`request` | [*IResetStickyTaskQueueRequest*](../interfaces/proto.temporal.api.workflowservice.v1.iresetstickytaskqueuerequest.md) | ResetStickyTaskQueueRequest message or plain object   |
`callback` | [*ResetStickyTaskQueueCallback*](../modules/proto.temporal.api.workflowservice.v1.workflowservice.md#resetstickytaskqueuecallback) | Node-style callback called with the error, if any, and ResetStickyTaskQueueResponse    |

**Returns:** *void*

▸ **resetStickyTaskQueue**(`request`: [*IResetStickyTaskQueueRequest*](../interfaces/proto.temporal.api.workflowservice.v1.iresetstickytaskqueuerequest.md)): *Promise*<[*ResetStickyTaskQueueResponse*](proto.temporal.api.workflowservice.v1.resetstickytaskqueueresponse.md)\>

Calls ResetStickyTaskQueue.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`request` | [*IResetStickyTaskQueueRequest*](../interfaces/proto.temporal.api.workflowservice.v1.iresetstickytaskqueuerequest.md) | ResetStickyTaskQueueRequest message or plain object   |

**Returns:** *Promise*<[*ResetStickyTaskQueueResponse*](proto.temporal.api.workflowservice.v1.resetstickytaskqueueresponse.md)\>

Promise

___

### resetWorkflowExecution

▸ **resetWorkflowExecution**(`request`: [*IResetWorkflowExecutionRequest*](../interfaces/proto.temporal.api.workflowservice.v1.iresetworkflowexecutionrequest.md), `callback`: [*ResetWorkflowExecutionCallback*](../modules/proto.temporal.api.workflowservice.v1.workflowservice.md#resetworkflowexecutioncallback)): *void*

Calls ResetWorkflowExecution.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`request` | [*IResetWorkflowExecutionRequest*](../interfaces/proto.temporal.api.workflowservice.v1.iresetworkflowexecutionrequest.md) | ResetWorkflowExecutionRequest message or plain object   |
`callback` | [*ResetWorkflowExecutionCallback*](../modules/proto.temporal.api.workflowservice.v1.workflowservice.md#resetworkflowexecutioncallback) | Node-style callback called with the error, if any, and ResetWorkflowExecutionResponse    |

**Returns:** *void*

▸ **resetWorkflowExecution**(`request`: [*IResetWorkflowExecutionRequest*](../interfaces/proto.temporal.api.workflowservice.v1.iresetworkflowexecutionrequest.md)): *Promise*<[*ResetWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.resetworkflowexecutionresponse.md)\>

Calls ResetWorkflowExecution.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`request` | [*IResetWorkflowExecutionRequest*](../interfaces/proto.temporal.api.workflowservice.v1.iresetworkflowexecutionrequest.md) | ResetWorkflowExecutionRequest message or plain object   |

**Returns:** *Promise*<[*ResetWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.resetworkflowexecutionresponse.md)\>

Promise

___

### respondActivityTaskCanceled

▸ **respondActivityTaskCanceled**(`request`: [*IRespondActivityTaskCanceledRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskcanceledrequest.md), `callback`: [*RespondActivityTaskCanceledCallback*](../modules/proto.temporal.api.workflowservice.v1.workflowservice.md#respondactivitytaskcanceledcallback)): *void*

Calls RespondActivityTaskCanceled.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`request` | [*IRespondActivityTaskCanceledRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskcanceledrequest.md) | RespondActivityTaskCanceledRequest message or plain object   |
`callback` | [*RespondActivityTaskCanceledCallback*](../modules/proto.temporal.api.workflowservice.v1.workflowservice.md#respondactivitytaskcanceledcallback) | Node-style callback called with the error, if any, and RespondActivityTaskCanceledResponse    |

**Returns:** *void*

▸ **respondActivityTaskCanceled**(`request`: [*IRespondActivityTaskCanceledRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskcanceledrequest.md)): *Promise*<[*RespondActivityTaskCanceledResponse*](proto.temporal.api.workflowservice.v1.respondactivitytaskcanceledresponse.md)\>

Calls RespondActivityTaskCanceled.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`request` | [*IRespondActivityTaskCanceledRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskcanceledrequest.md) | RespondActivityTaskCanceledRequest message or plain object   |

**Returns:** *Promise*<[*RespondActivityTaskCanceledResponse*](proto.temporal.api.workflowservice.v1.respondactivitytaskcanceledresponse.md)\>

Promise

___

### respondActivityTaskCanceledById

▸ **respondActivityTaskCanceledById**(`request`: [*IRespondActivityTaskCanceledByIdRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskcanceledbyidrequest.md), `callback`: [*RespondActivityTaskCanceledByIdCallback*](../modules/proto.temporal.api.workflowservice.v1.workflowservice.md#respondactivitytaskcanceledbyidcallback)): *void*

Calls RespondActivityTaskCanceledById.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`request` | [*IRespondActivityTaskCanceledByIdRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskcanceledbyidrequest.md) | RespondActivityTaskCanceledByIdRequest message or plain object   |
`callback` | [*RespondActivityTaskCanceledByIdCallback*](../modules/proto.temporal.api.workflowservice.v1.workflowservice.md#respondactivitytaskcanceledbyidcallback) | Node-style callback called with the error, if any, and RespondActivityTaskCanceledByIdResponse    |

**Returns:** *void*

▸ **respondActivityTaskCanceledById**(`request`: [*IRespondActivityTaskCanceledByIdRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskcanceledbyidrequest.md)): *Promise*<[*RespondActivityTaskCanceledByIdResponse*](proto.temporal.api.workflowservice.v1.respondactivitytaskcanceledbyidresponse.md)\>

Calls RespondActivityTaskCanceledById.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`request` | [*IRespondActivityTaskCanceledByIdRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskcanceledbyidrequest.md) | RespondActivityTaskCanceledByIdRequest message or plain object   |

**Returns:** *Promise*<[*RespondActivityTaskCanceledByIdResponse*](proto.temporal.api.workflowservice.v1.respondactivitytaskcanceledbyidresponse.md)\>

Promise

___

### respondActivityTaskCompleted

▸ **respondActivityTaskCompleted**(`request`: [*IRespondActivityTaskCompletedRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskcompletedrequest.md), `callback`: [*RespondActivityTaskCompletedCallback*](../modules/proto.temporal.api.workflowservice.v1.workflowservice.md#respondactivitytaskcompletedcallback)): *void*

Calls RespondActivityTaskCompleted.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`request` | [*IRespondActivityTaskCompletedRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskcompletedrequest.md) | RespondActivityTaskCompletedRequest message or plain object   |
`callback` | [*RespondActivityTaskCompletedCallback*](../modules/proto.temporal.api.workflowservice.v1.workflowservice.md#respondactivitytaskcompletedcallback) | Node-style callback called with the error, if any, and RespondActivityTaskCompletedResponse    |

**Returns:** *void*

▸ **respondActivityTaskCompleted**(`request`: [*IRespondActivityTaskCompletedRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskcompletedrequest.md)): *Promise*<[*RespondActivityTaskCompletedResponse*](proto.temporal.api.workflowservice.v1.respondactivitytaskcompletedresponse.md)\>

Calls RespondActivityTaskCompleted.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`request` | [*IRespondActivityTaskCompletedRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskcompletedrequest.md) | RespondActivityTaskCompletedRequest message or plain object   |

**Returns:** *Promise*<[*RespondActivityTaskCompletedResponse*](proto.temporal.api.workflowservice.v1.respondactivitytaskcompletedresponse.md)\>

Promise

___

### respondActivityTaskCompletedById

▸ **respondActivityTaskCompletedById**(`request`: [*IRespondActivityTaskCompletedByIdRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskcompletedbyidrequest.md), `callback`: [*RespondActivityTaskCompletedByIdCallback*](../modules/proto.temporal.api.workflowservice.v1.workflowservice.md#respondactivitytaskcompletedbyidcallback)): *void*

Calls RespondActivityTaskCompletedById.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`request` | [*IRespondActivityTaskCompletedByIdRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskcompletedbyidrequest.md) | RespondActivityTaskCompletedByIdRequest message or plain object   |
`callback` | [*RespondActivityTaskCompletedByIdCallback*](../modules/proto.temporal.api.workflowservice.v1.workflowservice.md#respondactivitytaskcompletedbyidcallback) | Node-style callback called with the error, if any, and RespondActivityTaskCompletedByIdResponse    |

**Returns:** *void*

▸ **respondActivityTaskCompletedById**(`request`: [*IRespondActivityTaskCompletedByIdRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskcompletedbyidrequest.md)): *Promise*<[*RespondActivityTaskCompletedByIdResponse*](proto.temporal.api.workflowservice.v1.respondactivitytaskcompletedbyidresponse.md)\>

Calls RespondActivityTaskCompletedById.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`request` | [*IRespondActivityTaskCompletedByIdRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskcompletedbyidrequest.md) | RespondActivityTaskCompletedByIdRequest message or plain object   |

**Returns:** *Promise*<[*RespondActivityTaskCompletedByIdResponse*](proto.temporal.api.workflowservice.v1.respondactivitytaskcompletedbyidresponse.md)\>

Promise

___

### respondActivityTaskFailed

▸ **respondActivityTaskFailed**(`request`: [*IRespondActivityTaskFailedRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskfailedrequest.md), `callback`: [*RespondActivityTaskFailedCallback*](../modules/proto.temporal.api.workflowservice.v1.workflowservice.md#respondactivitytaskfailedcallback)): *void*

Calls RespondActivityTaskFailed.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`request` | [*IRespondActivityTaskFailedRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskfailedrequest.md) | RespondActivityTaskFailedRequest message or plain object   |
`callback` | [*RespondActivityTaskFailedCallback*](../modules/proto.temporal.api.workflowservice.v1.workflowservice.md#respondactivitytaskfailedcallback) | Node-style callback called with the error, if any, and RespondActivityTaskFailedResponse    |

**Returns:** *void*

▸ **respondActivityTaskFailed**(`request`: [*IRespondActivityTaskFailedRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskfailedrequest.md)): *Promise*<[*RespondActivityTaskFailedResponse*](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedresponse.md)\>

Calls RespondActivityTaskFailed.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`request` | [*IRespondActivityTaskFailedRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskfailedrequest.md) | RespondActivityTaskFailedRequest message or plain object   |

**Returns:** *Promise*<[*RespondActivityTaskFailedResponse*](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedresponse.md)\>

Promise

___

### respondActivityTaskFailedById

▸ **respondActivityTaskFailedById**(`request`: [*IRespondActivityTaskFailedByIdRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskfailedbyidrequest.md), `callback`: [*RespondActivityTaskFailedByIdCallback*](../modules/proto.temporal.api.workflowservice.v1.workflowservice.md#respondactivitytaskfailedbyidcallback)): *void*

Calls RespondActivityTaskFailedById.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`request` | [*IRespondActivityTaskFailedByIdRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskfailedbyidrequest.md) | RespondActivityTaskFailedByIdRequest message or plain object   |
`callback` | [*RespondActivityTaskFailedByIdCallback*](../modules/proto.temporal.api.workflowservice.v1.workflowservice.md#respondactivitytaskfailedbyidcallback) | Node-style callback called with the error, if any, and RespondActivityTaskFailedByIdResponse    |

**Returns:** *void*

▸ **respondActivityTaskFailedById**(`request`: [*IRespondActivityTaskFailedByIdRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskfailedbyidrequest.md)): *Promise*<[*RespondActivityTaskFailedByIdResponse*](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedbyidresponse.md)\>

Calls RespondActivityTaskFailedById.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`request` | [*IRespondActivityTaskFailedByIdRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskfailedbyidrequest.md) | RespondActivityTaskFailedByIdRequest message or plain object   |

**Returns:** *Promise*<[*RespondActivityTaskFailedByIdResponse*](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedbyidresponse.md)\>

Promise

___

### respondQueryTaskCompleted

▸ **respondQueryTaskCompleted**(`request`: [*IRespondQueryTaskCompletedRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondquerytaskcompletedrequest.md), `callback`: [*RespondQueryTaskCompletedCallback*](../modules/proto.temporal.api.workflowservice.v1.workflowservice.md#respondquerytaskcompletedcallback)): *void*

Calls RespondQueryTaskCompleted.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`request` | [*IRespondQueryTaskCompletedRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondquerytaskcompletedrequest.md) | RespondQueryTaskCompletedRequest message or plain object   |
`callback` | [*RespondQueryTaskCompletedCallback*](../modules/proto.temporal.api.workflowservice.v1.workflowservice.md#respondquerytaskcompletedcallback) | Node-style callback called with the error, if any, and RespondQueryTaskCompletedResponse    |

**Returns:** *void*

▸ **respondQueryTaskCompleted**(`request`: [*IRespondQueryTaskCompletedRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondquerytaskcompletedrequest.md)): *Promise*<[*RespondQueryTaskCompletedResponse*](proto.temporal.api.workflowservice.v1.respondquerytaskcompletedresponse.md)\>

Calls RespondQueryTaskCompleted.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`request` | [*IRespondQueryTaskCompletedRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondquerytaskcompletedrequest.md) | RespondQueryTaskCompletedRequest message or plain object   |

**Returns:** *Promise*<[*RespondQueryTaskCompletedResponse*](proto.temporal.api.workflowservice.v1.respondquerytaskcompletedresponse.md)\>

Promise

___

### respondWorkflowTaskCompleted

▸ **respondWorkflowTaskCompleted**(`request`: [*IRespondWorkflowTaskCompletedRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondworkflowtaskcompletedrequest.md), `callback`: [*RespondWorkflowTaskCompletedCallback*](../modules/proto.temporal.api.workflowservice.v1.workflowservice.md#respondworkflowtaskcompletedcallback)): *void*

Calls RespondWorkflowTaskCompleted.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`request` | [*IRespondWorkflowTaskCompletedRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondworkflowtaskcompletedrequest.md) | RespondWorkflowTaskCompletedRequest message or plain object   |
`callback` | [*RespondWorkflowTaskCompletedCallback*](../modules/proto.temporal.api.workflowservice.v1.workflowservice.md#respondworkflowtaskcompletedcallback) | Node-style callback called with the error, if any, and RespondWorkflowTaskCompletedResponse    |

**Returns:** *void*

▸ **respondWorkflowTaskCompleted**(`request`: [*IRespondWorkflowTaskCompletedRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondworkflowtaskcompletedrequest.md)): *Promise*<[*RespondWorkflowTaskCompletedResponse*](proto.temporal.api.workflowservice.v1.respondworkflowtaskcompletedresponse.md)\>

Calls RespondWorkflowTaskCompleted.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`request` | [*IRespondWorkflowTaskCompletedRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondworkflowtaskcompletedrequest.md) | RespondWorkflowTaskCompletedRequest message or plain object   |

**Returns:** *Promise*<[*RespondWorkflowTaskCompletedResponse*](proto.temporal.api.workflowservice.v1.respondworkflowtaskcompletedresponse.md)\>

Promise

___

### respondWorkflowTaskFailed

▸ **respondWorkflowTaskFailed**(`request`: [*IRespondWorkflowTaskFailedRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondworkflowtaskfailedrequest.md), `callback`: [*RespondWorkflowTaskFailedCallback*](../modules/proto.temporal.api.workflowservice.v1.workflowservice.md#respondworkflowtaskfailedcallback)): *void*

Calls RespondWorkflowTaskFailed.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`request` | [*IRespondWorkflowTaskFailedRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondworkflowtaskfailedrequest.md) | RespondWorkflowTaskFailedRequest message or plain object   |
`callback` | [*RespondWorkflowTaskFailedCallback*](../modules/proto.temporal.api.workflowservice.v1.workflowservice.md#respondworkflowtaskfailedcallback) | Node-style callback called with the error, if any, and RespondWorkflowTaskFailedResponse    |

**Returns:** *void*

▸ **respondWorkflowTaskFailed**(`request`: [*IRespondWorkflowTaskFailedRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondworkflowtaskfailedrequest.md)): *Promise*<[*RespondWorkflowTaskFailedResponse*](proto.temporal.api.workflowservice.v1.respondworkflowtaskfailedresponse.md)\>

Calls RespondWorkflowTaskFailed.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`request` | [*IRespondWorkflowTaskFailedRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondworkflowtaskfailedrequest.md) | RespondWorkflowTaskFailedRequest message or plain object   |

**Returns:** *Promise*<[*RespondWorkflowTaskFailedResponse*](proto.temporal.api.workflowservice.v1.respondworkflowtaskfailedresponse.md)\>

Promise

___

### rpcCall

▸ **rpcCall**<TReq, TRes\>(`method`: *Method* \| *ServiceMethod*<TReq, TRes\>, `requestCtor`: *Constructor*<TReq\>, `responseCtor`: *Constructor*<TRes\>, `request`: TReq \| *Properties*<TReq\>, `callback`: *ServiceMethodCallback*<TRes\>): *void*

Calls a service method through {@link rpc.Service#rpcImpl|rpcImpl}.

#### Type parameters:

Name | Type |
:------ | :------ |
`TReq` | *Message*<TReq, TReq\> |
`TRes` | *Message*<TRes, TRes\> |

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`method` | *Method* \| *ServiceMethod*<TReq, TRes\> | Reflected or static method   |
`requestCtor` | *Constructor*<TReq\> | Request constructor   |
`responseCtor` | *Constructor*<TRes\> | Response constructor   |
`request` | TReq \| *Properties*<TReq\> | Request message or plain object   |
`callback` | *ServiceMethodCallback*<TRes\> | Service callback    |

**Returns:** *void*

Inherited from: $protobuf.rpc.Service.rpcCall

___

### scanWorkflowExecutions

▸ **scanWorkflowExecutions**(`request`: [*IScanWorkflowExecutionsRequest*](../interfaces/proto.temporal.api.workflowservice.v1.iscanworkflowexecutionsrequest.md), `callback`: [*ScanWorkflowExecutionsCallback*](../modules/proto.temporal.api.workflowservice.v1.workflowservice.md#scanworkflowexecutionscallback)): *void*

Calls ScanWorkflowExecutions.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`request` | [*IScanWorkflowExecutionsRequest*](../interfaces/proto.temporal.api.workflowservice.v1.iscanworkflowexecutionsrequest.md) | ScanWorkflowExecutionsRequest message or plain object   |
`callback` | [*ScanWorkflowExecutionsCallback*](../modules/proto.temporal.api.workflowservice.v1.workflowservice.md#scanworkflowexecutionscallback) | Node-style callback called with the error, if any, and ScanWorkflowExecutionsResponse    |

**Returns:** *void*

▸ **scanWorkflowExecutions**(`request`: [*IScanWorkflowExecutionsRequest*](../interfaces/proto.temporal.api.workflowservice.v1.iscanworkflowexecutionsrequest.md)): *Promise*<[*ScanWorkflowExecutionsResponse*](proto.temporal.api.workflowservice.v1.scanworkflowexecutionsresponse.md)\>

Calls ScanWorkflowExecutions.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`request` | [*IScanWorkflowExecutionsRequest*](../interfaces/proto.temporal.api.workflowservice.v1.iscanworkflowexecutionsrequest.md) | ScanWorkflowExecutionsRequest message or plain object   |

**Returns:** *Promise*<[*ScanWorkflowExecutionsResponse*](proto.temporal.api.workflowservice.v1.scanworkflowexecutionsresponse.md)\>

Promise

___

### signalWithStartWorkflowExecution

▸ **signalWithStartWorkflowExecution**(`request`: [*ISignalWithStartWorkflowExecutionRequest*](../interfaces/proto.temporal.api.workflowservice.v1.isignalwithstartworkflowexecutionrequest.md), `callback`: [*SignalWithStartWorkflowExecutionCallback*](../modules/proto.temporal.api.workflowservice.v1.workflowservice.md#signalwithstartworkflowexecutioncallback)): *void*

Calls SignalWithStartWorkflowExecution.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`request` | [*ISignalWithStartWorkflowExecutionRequest*](../interfaces/proto.temporal.api.workflowservice.v1.isignalwithstartworkflowexecutionrequest.md) | SignalWithStartWorkflowExecutionRequest message or plain object   |
`callback` | [*SignalWithStartWorkflowExecutionCallback*](../modules/proto.temporal.api.workflowservice.v1.workflowservice.md#signalwithstartworkflowexecutioncallback) | Node-style callback called with the error, if any, and SignalWithStartWorkflowExecutionResponse    |

**Returns:** *void*

▸ **signalWithStartWorkflowExecution**(`request`: [*ISignalWithStartWorkflowExecutionRequest*](../interfaces/proto.temporal.api.workflowservice.v1.isignalwithstartworkflowexecutionrequest.md)): *Promise*<[*SignalWithStartWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.signalwithstartworkflowexecutionresponse.md)\>

Calls SignalWithStartWorkflowExecution.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`request` | [*ISignalWithStartWorkflowExecutionRequest*](../interfaces/proto.temporal.api.workflowservice.v1.isignalwithstartworkflowexecutionrequest.md) | SignalWithStartWorkflowExecutionRequest message or plain object   |

**Returns:** *Promise*<[*SignalWithStartWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.signalwithstartworkflowexecutionresponse.md)\>

Promise

___

### signalWorkflowExecution

▸ **signalWorkflowExecution**(`request`: [*ISignalWorkflowExecutionRequest*](../interfaces/proto.temporal.api.workflowservice.v1.isignalworkflowexecutionrequest.md), `callback`: [*SignalWorkflowExecutionCallback*](../modules/proto.temporal.api.workflowservice.v1.workflowservice.md#signalworkflowexecutioncallback)): *void*

Calls SignalWorkflowExecution.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`request` | [*ISignalWorkflowExecutionRequest*](../interfaces/proto.temporal.api.workflowservice.v1.isignalworkflowexecutionrequest.md) | SignalWorkflowExecutionRequest message or plain object   |
`callback` | [*SignalWorkflowExecutionCallback*](../modules/proto.temporal.api.workflowservice.v1.workflowservice.md#signalworkflowexecutioncallback) | Node-style callback called with the error, if any, and SignalWorkflowExecutionResponse    |

**Returns:** *void*

▸ **signalWorkflowExecution**(`request`: [*ISignalWorkflowExecutionRequest*](../interfaces/proto.temporal.api.workflowservice.v1.isignalworkflowexecutionrequest.md)): *Promise*<[*SignalWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.signalworkflowexecutionresponse.md)\>

Calls SignalWorkflowExecution.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`request` | [*ISignalWorkflowExecutionRequest*](../interfaces/proto.temporal.api.workflowservice.v1.isignalworkflowexecutionrequest.md) | SignalWorkflowExecutionRequest message or plain object   |

**Returns:** *Promise*<[*SignalWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.signalworkflowexecutionresponse.md)\>

Promise

___

### startWorkflowExecution

▸ **startWorkflowExecution**(`request`: [*IStartWorkflowExecutionRequest*](../interfaces/proto.temporal.api.workflowservice.v1.istartworkflowexecutionrequest.md), `callback`: [*StartWorkflowExecutionCallback*](../modules/proto.temporal.api.workflowservice.v1.workflowservice.md#startworkflowexecutioncallback)): *void*

Calls StartWorkflowExecution.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`request` | [*IStartWorkflowExecutionRequest*](../interfaces/proto.temporal.api.workflowservice.v1.istartworkflowexecutionrequest.md) | StartWorkflowExecutionRequest message or plain object   |
`callback` | [*StartWorkflowExecutionCallback*](../modules/proto.temporal.api.workflowservice.v1.workflowservice.md#startworkflowexecutioncallback) | Node-style callback called with the error, if any, and StartWorkflowExecutionResponse    |

**Returns:** *void*

▸ **startWorkflowExecution**(`request`: [*IStartWorkflowExecutionRequest*](../interfaces/proto.temporal.api.workflowservice.v1.istartworkflowexecutionrequest.md)): *Promise*<[*StartWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.startworkflowexecutionresponse.md)\>

Calls StartWorkflowExecution.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`request` | [*IStartWorkflowExecutionRequest*](../interfaces/proto.temporal.api.workflowservice.v1.istartworkflowexecutionrequest.md) | StartWorkflowExecutionRequest message or plain object   |

**Returns:** *Promise*<[*StartWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.startworkflowexecutionresponse.md)\>

Promise

___

### terminateWorkflowExecution

▸ **terminateWorkflowExecution**(`request`: [*ITerminateWorkflowExecutionRequest*](../interfaces/proto.temporal.api.workflowservice.v1.iterminateworkflowexecutionrequest.md), `callback`: [*TerminateWorkflowExecutionCallback*](../modules/proto.temporal.api.workflowservice.v1.workflowservice.md#terminateworkflowexecutioncallback)): *void*

Calls TerminateWorkflowExecution.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`request` | [*ITerminateWorkflowExecutionRequest*](../interfaces/proto.temporal.api.workflowservice.v1.iterminateworkflowexecutionrequest.md) | TerminateWorkflowExecutionRequest message or plain object   |
`callback` | [*TerminateWorkflowExecutionCallback*](../modules/proto.temporal.api.workflowservice.v1.workflowservice.md#terminateworkflowexecutioncallback) | Node-style callback called with the error, if any, and TerminateWorkflowExecutionResponse    |

**Returns:** *void*

▸ **terminateWorkflowExecution**(`request`: [*ITerminateWorkflowExecutionRequest*](../interfaces/proto.temporal.api.workflowservice.v1.iterminateworkflowexecutionrequest.md)): *Promise*<[*TerminateWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.terminateworkflowexecutionresponse.md)\>

Calls TerminateWorkflowExecution.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`request` | [*ITerminateWorkflowExecutionRequest*](../interfaces/proto.temporal.api.workflowservice.v1.iterminateworkflowexecutionrequest.md) | TerminateWorkflowExecutionRequest message or plain object   |

**Returns:** *Promise*<[*TerminateWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.terminateworkflowexecutionresponse.md)\>

Promise

___

### updateNamespace

▸ **updateNamespace**(`request`: [*IUpdateNamespaceRequest*](../interfaces/proto.temporal.api.workflowservice.v1.iupdatenamespacerequest.md), `callback`: [*UpdateNamespaceCallback*](../modules/proto.temporal.api.workflowservice.v1.workflowservice.md#updatenamespacecallback)): *void*

Calls UpdateNamespace.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`request` | [*IUpdateNamespaceRequest*](../interfaces/proto.temporal.api.workflowservice.v1.iupdatenamespacerequest.md) | UpdateNamespaceRequest message or plain object   |
`callback` | [*UpdateNamespaceCallback*](../modules/proto.temporal.api.workflowservice.v1.workflowservice.md#updatenamespacecallback) | Node-style callback called with the error, if any, and UpdateNamespaceResponse    |

**Returns:** *void*

▸ **updateNamespace**(`request`: [*IUpdateNamespaceRequest*](../interfaces/proto.temporal.api.workflowservice.v1.iupdatenamespacerequest.md)): *Promise*<[*UpdateNamespaceResponse*](proto.temporal.api.workflowservice.v1.updatenamespaceresponse.md)\>

Calls UpdateNamespace.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`request` | [*IUpdateNamespaceRequest*](../interfaces/proto.temporal.api.workflowservice.v1.iupdatenamespacerequest.md) | UpdateNamespaceRequest message or plain object   |

**Returns:** *Promise*<[*UpdateNamespaceResponse*](proto.temporal.api.workflowservice.v1.updatenamespaceresponse.md)\>

Promise

___

### create

▸ `Static`**create**(`rpcImpl`: RPCImpl, `requestDelimited?`: *boolean*, `responseDelimited?`: *boolean*): [*WorkflowService*](proto.temporal.api.workflowservice.v1.workflowservice-1.md)

Creates new WorkflowService service using the specified rpc implementation.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`rpcImpl` | RPCImpl | RPC implementation   |
`requestDelimited?` | *boolean* | - |
`responseDelimited?` | *boolean* | - |

**Returns:** [*WorkflowService*](proto.temporal.api.workflowservice.v1.workflowservice-1.md)

RPC service. Useful where requests and/or responses are streamed.
