# Interface: INamespaceConfig

[namespace](../modules/proto.temporal.api.namespace.md).[v1](../modules/proto.temporal.api.namespace.v1.md).INamespaceConfig

Properties of a NamespaceConfig.

## Implemented by

* [*NamespaceConfig*](../classes/proto.temporal.api.namespace.v1.namespaceconfig.md)

## Table of contents

### Properties

- [badBinaries](proto.temporal.api.namespace.v1.inamespaceconfig.md#badbinaries)
- [historyArchivalState](proto.temporal.api.namespace.v1.inamespaceconfig.md#historyarchivalstate)
- [historyArchivalUri](proto.temporal.api.namespace.v1.inamespaceconfig.md#historyarchivaluri)
- [visibilityArchivalState](proto.temporal.api.namespace.v1.inamespaceconfig.md#visibilityarchivalstate)
- [visibilityArchivalUri](proto.temporal.api.namespace.v1.inamespaceconfig.md#visibilityarchivaluri)
- [workflowExecutionRetentionTtl](proto.temporal.api.namespace.v1.inamespaceconfig.md#workflowexecutionretentionttl)

## Properties

### badBinaries

• `Optional` **badBinaries**: *null* \| [*IBadBinaries*](proto.temporal.api.namespace.v1.ibadbinaries.md)

NamespaceConfig badBinaries

___

### historyArchivalState

• `Optional` **historyArchivalState**: *null* \| [*ArchivalState*](../enums/proto.temporal.api.enums.v1.archivalstate.md)

NamespaceConfig historyArchivalState

___

### historyArchivalUri

• `Optional` **historyArchivalUri**: *null* \| *string*

NamespaceConfig historyArchivalUri

___

### visibilityArchivalState

• `Optional` **visibilityArchivalState**: *null* \| [*ArchivalState*](../enums/proto.temporal.api.enums.v1.archivalstate.md)

NamespaceConfig visibilityArchivalState

___

### visibilityArchivalUri

• `Optional` **visibilityArchivalUri**: *null* \| *string*

NamespaceConfig visibilityArchivalUri

___

### workflowExecutionRetentionTtl

• `Optional` **workflowExecutionRetentionTtl**: *null* \| [*IDuration*](proto.google.protobuf.iduration.md)

NamespaceConfig workflowExecutionRetentionTtl
