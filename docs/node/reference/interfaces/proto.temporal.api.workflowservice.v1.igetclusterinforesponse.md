# Interface: IGetClusterInfoResponse

[workflowservice](../modules/proto.temporal.api.workflowservice.md).[v1](../modules/proto.temporal.api.workflowservice.v1.md).IGetClusterInfoResponse

Properties of a GetClusterInfoResponse.

## Implemented by

* [*GetClusterInfoResponse*](../classes/proto.temporal.api.workflowservice.v1.getclusterinforesponse.md)

## Table of contents

### Properties

- [clusterId](proto.temporal.api.workflowservice.v1.igetclusterinforesponse.md#clusterid)
- [clusterName](proto.temporal.api.workflowservice.v1.igetclusterinforesponse.md#clustername)
- [historyShardCount](proto.temporal.api.workflowservice.v1.igetclusterinforesponse.md#historyshardcount)
- [serverVersion](proto.temporal.api.workflowservice.v1.igetclusterinforesponse.md#serverversion)
- [supportedClients](proto.temporal.api.workflowservice.v1.igetclusterinforesponse.md#supportedclients)
- [versionInfo](proto.temporal.api.workflowservice.v1.igetclusterinforesponse.md#versioninfo)

## Properties

### clusterId

• `Optional` **clusterId**: *null* \| *string*

GetClusterInfoResponse clusterId

___

### clusterName

• `Optional` **clusterName**: *null* \| *string*

GetClusterInfoResponse clusterName

___

### historyShardCount

• `Optional` **historyShardCount**: *null* \| *number*

GetClusterInfoResponse historyShardCount

___

### serverVersion

• `Optional` **serverVersion**: *null* \| *string*

GetClusterInfoResponse serverVersion

___

### supportedClients

• `Optional` **supportedClients**: *null* \| { [k: string]: *string*;  }

GetClusterInfoResponse supportedClients

___

### versionInfo

• `Optional` **versionInfo**: *null* \| [*IVersionInfo*](proto.temporal.api.version.v1.iversioninfo.md)

GetClusterInfoResponse versionInfo
