# Interface: IRegisterNamespaceRequest

[workflowservice](../modules/proto.temporal.api.workflowservice.md).[v1](../modules/proto.temporal.api.workflowservice.v1.md).IRegisterNamespaceRequest

Properties of a RegisterNamespaceRequest.

## Implemented by

* [*RegisterNamespaceRequest*](../classes/proto.temporal.api.workflowservice.v1.registernamespacerequest.md)

## Table of contents

### Properties

- [activeClusterName](proto.temporal.api.workflowservice.v1.iregisternamespacerequest.md#activeclustername)
- [clusters](proto.temporal.api.workflowservice.v1.iregisternamespacerequest.md#clusters)
- [data](proto.temporal.api.workflowservice.v1.iregisternamespacerequest.md#data)
- [description](proto.temporal.api.workflowservice.v1.iregisternamespacerequest.md#description)
- [historyArchivalState](proto.temporal.api.workflowservice.v1.iregisternamespacerequest.md#historyarchivalstate)
- [historyArchivalUri](proto.temporal.api.workflowservice.v1.iregisternamespacerequest.md#historyarchivaluri)
- [isGlobalNamespace](proto.temporal.api.workflowservice.v1.iregisternamespacerequest.md#isglobalnamespace)
- [namespace](proto.temporal.api.workflowservice.v1.iregisternamespacerequest.md#namespace)
- [ownerEmail](proto.temporal.api.workflowservice.v1.iregisternamespacerequest.md#owneremail)
- [securityToken](proto.temporal.api.workflowservice.v1.iregisternamespacerequest.md#securitytoken)
- [visibilityArchivalState](proto.temporal.api.workflowservice.v1.iregisternamespacerequest.md#visibilityarchivalstate)
- [visibilityArchivalUri](proto.temporal.api.workflowservice.v1.iregisternamespacerequest.md#visibilityarchivaluri)
- [workflowExecutionRetentionPeriod](proto.temporal.api.workflowservice.v1.iregisternamespacerequest.md#workflowexecutionretentionperiod)

## Properties

### activeClusterName

• `Optional` **activeClusterName**: *null* \| *string*

RegisterNamespaceRequest activeClusterName

___

### clusters

• `Optional` **clusters**: *null* \| [*IClusterReplicationConfig*](proto.temporal.api.replication.v1.iclusterreplicationconfig.md)[]

RegisterNamespaceRequest clusters

___

### data

• `Optional` **data**: *null* \| { [k: string]: *string*;  }

RegisterNamespaceRequest data

___

### description

• `Optional` **description**: *null* \| *string*

RegisterNamespaceRequest description

___

### historyArchivalState

• `Optional` **historyArchivalState**: *null* \| [*ArchivalState*](../enums/proto.temporal.api.enums.v1.archivalstate.md)

RegisterNamespaceRequest historyArchivalState

___

### historyArchivalUri

• `Optional` **historyArchivalUri**: *null* \| *string*

RegisterNamespaceRequest historyArchivalUri

___

### isGlobalNamespace

• `Optional` **isGlobalNamespace**: *null* \| *boolean*

RegisterNamespaceRequest isGlobalNamespace

___

### namespace

• `Optional` **namespace**: *null* \| *string*

RegisterNamespaceRequest namespace

___

### ownerEmail

• `Optional` **ownerEmail**: *null* \| *string*

RegisterNamespaceRequest ownerEmail

___

### securityToken

• `Optional` **securityToken**: *null* \| *string*

RegisterNamespaceRequest securityToken

___

### visibilityArchivalState

• `Optional` **visibilityArchivalState**: *null* \| [*ArchivalState*](../enums/proto.temporal.api.enums.v1.archivalstate.md)

RegisterNamespaceRequest visibilityArchivalState

___

### visibilityArchivalUri

• `Optional` **visibilityArchivalUri**: *null* \| *string*

RegisterNamespaceRequest visibilityArchivalUri

___

### workflowExecutionRetentionPeriod

• `Optional` **workflowExecutionRetentionPeriod**: *null* \| [*IDuration*](proto.google.protobuf.iduration.md)

RegisterNamespaceRequest workflowExecutionRetentionPeriod
