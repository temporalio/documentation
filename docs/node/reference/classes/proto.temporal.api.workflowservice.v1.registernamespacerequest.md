# Class: RegisterNamespaceRequest

[workflowservice](../modules/proto.temporal.api.workflowservice.md).[v1](../modules/proto.temporal.api.workflowservice.v1.md).RegisterNamespaceRequest

Represents a RegisterNamespaceRequest.

## Implements

* [*IRegisterNamespaceRequest*](../interfaces/proto.temporal.api.workflowservice.v1.iregisternamespacerequest.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.workflowservice.v1.registernamespacerequest.md#constructor)

### Properties

- [activeClusterName](proto.temporal.api.workflowservice.v1.registernamespacerequest.md#activeclustername)
- [clusters](proto.temporal.api.workflowservice.v1.registernamespacerequest.md#clusters)
- [data](proto.temporal.api.workflowservice.v1.registernamespacerequest.md#data)
- [description](proto.temporal.api.workflowservice.v1.registernamespacerequest.md#description)
- [historyArchivalState](proto.temporal.api.workflowservice.v1.registernamespacerequest.md#historyarchivalstate)
- [historyArchivalUri](proto.temporal.api.workflowservice.v1.registernamespacerequest.md#historyarchivaluri)
- [isGlobalNamespace](proto.temporal.api.workflowservice.v1.registernamespacerequest.md#isglobalnamespace)
- [namespace](proto.temporal.api.workflowservice.v1.registernamespacerequest.md#namespace)
- [ownerEmail](proto.temporal.api.workflowservice.v1.registernamespacerequest.md#owneremail)
- [securityToken](proto.temporal.api.workflowservice.v1.registernamespacerequest.md#securitytoken)
- [visibilityArchivalState](proto.temporal.api.workflowservice.v1.registernamespacerequest.md#visibilityarchivalstate)
- [visibilityArchivalUri](proto.temporal.api.workflowservice.v1.registernamespacerequest.md#visibilityarchivaluri)
- [workflowExecutionRetentionPeriod](proto.temporal.api.workflowservice.v1.registernamespacerequest.md#workflowexecutionretentionperiod)

### Methods

- [toJSON](proto.temporal.api.workflowservice.v1.registernamespacerequest.md#tojson)
- [create](proto.temporal.api.workflowservice.v1.registernamespacerequest.md#create)
- [decode](proto.temporal.api.workflowservice.v1.registernamespacerequest.md#decode)
- [decodeDelimited](proto.temporal.api.workflowservice.v1.registernamespacerequest.md#decodedelimited)
- [encode](proto.temporal.api.workflowservice.v1.registernamespacerequest.md#encode)
- [encodeDelimited](proto.temporal.api.workflowservice.v1.registernamespacerequest.md#encodedelimited)
- [fromObject](proto.temporal.api.workflowservice.v1.registernamespacerequest.md#fromobject)
- [toObject](proto.temporal.api.workflowservice.v1.registernamespacerequest.md#toobject)
- [verify](proto.temporal.api.workflowservice.v1.registernamespacerequest.md#verify)

## Constructors

### constructor

\+ **new RegisterNamespaceRequest**(`properties?`: [*IRegisterNamespaceRequest*](../interfaces/proto.temporal.api.workflowservice.v1.iregisternamespacerequest.md)): [*RegisterNamespaceRequest*](proto.temporal.api.workflowservice.v1.registernamespacerequest.md)

Constructs a new RegisterNamespaceRequest.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IRegisterNamespaceRequest*](../interfaces/proto.temporal.api.workflowservice.v1.iregisternamespacerequest.md) |

**Returns:** [*RegisterNamespaceRequest*](proto.temporal.api.workflowservice.v1.registernamespacerequest.md)

## Properties

### activeClusterName

• **activeClusterName**: *string*

RegisterNamespaceRequest activeClusterName.

Implementation of: [IRegisterNamespaceRequest](../interfaces/proto.temporal.api.workflowservice.v1.iregisternamespacerequest.md).[activeClusterName](../interfaces/proto.temporal.api.workflowservice.v1.iregisternamespacerequest.md#activeclustername)

___

### clusters

• **clusters**: [*IClusterReplicationConfig*](../interfaces/proto.temporal.api.replication.v1.iclusterreplicationconfig.md)[]

RegisterNamespaceRequest clusters.

Implementation of: [IRegisterNamespaceRequest](../interfaces/proto.temporal.api.workflowservice.v1.iregisternamespacerequest.md).[clusters](../interfaces/proto.temporal.api.workflowservice.v1.iregisternamespacerequest.md#clusters)

___

### data

• **data**: *object*

RegisterNamespaceRequest data.

#### Type declaration:

Implementation of: [IRegisterNamespaceRequest](../interfaces/proto.temporal.api.workflowservice.v1.iregisternamespacerequest.md).[data](../interfaces/proto.temporal.api.workflowservice.v1.iregisternamespacerequest.md#data)

___

### description

• **description**: *string*

RegisterNamespaceRequest description.

Implementation of: [IRegisterNamespaceRequest](../interfaces/proto.temporal.api.workflowservice.v1.iregisternamespacerequest.md).[description](../interfaces/proto.temporal.api.workflowservice.v1.iregisternamespacerequest.md#description)

___

### historyArchivalState

• **historyArchivalState**: [*ArchivalState*](../enums/proto.temporal.api.enums.v1.archivalstate.md)

RegisterNamespaceRequest historyArchivalState.

Implementation of: [IRegisterNamespaceRequest](../interfaces/proto.temporal.api.workflowservice.v1.iregisternamespacerequest.md).[historyArchivalState](../interfaces/proto.temporal.api.workflowservice.v1.iregisternamespacerequest.md#historyarchivalstate)

___

### historyArchivalUri

• **historyArchivalUri**: *string*

RegisterNamespaceRequest historyArchivalUri.

Implementation of: [IRegisterNamespaceRequest](../interfaces/proto.temporal.api.workflowservice.v1.iregisternamespacerequest.md).[historyArchivalUri](../interfaces/proto.temporal.api.workflowservice.v1.iregisternamespacerequest.md#historyarchivaluri)

___

### isGlobalNamespace

• **isGlobalNamespace**: *boolean*

RegisterNamespaceRequest isGlobalNamespace.

Implementation of: [IRegisterNamespaceRequest](../interfaces/proto.temporal.api.workflowservice.v1.iregisternamespacerequest.md).[isGlobalNamespace](../interfaces/proto.temporal.api.workflowservice.v1.iregisternamespacerequest.md#isglobalnamespace)

___

### namespace

• **namespace**: *string*

RegisterNamespaceRequest namespace.

Implementation of: [IRegisterNamespaceRequest](../interfaces/proto.temporal.api.workflowservice.v1.iregisternamespacerequest.md).[namespace](../interfaces/proto.temporal.api.workflowservice.v1.iregisternamespacerequest.md#namespace)

___

### ownerEmail

• **ownerEmail**: *string*

RegisterNamespaceRequest ownerEmail.

Implementation of: [IRegisterNamespaceRequest](../interfaces/proto.temporal.api.workflowservice.v1.iregisternamespacerequest.md).[ownerEmail](../interfaces/proto.temporal.api.workflowservice.v1.iregisternamespacerequest.md#owneremail)

___

### securityToken

• **securityToken**: *string*

RegisterNamespaceRequest securityToken.

Implementation of: [IRegisterNamespaceRequest](../interfaces/proto.temporal.api.workflowservice.v1.iregisternamespacerequest.md).[securityToken](../interfaces/proto.temporal.api.workflowservice.v1.iregisternamespacerequest.md#securitytoken)

___

### visibilityArchivalState

• **visibilityArchivalState**: [*ArchivalState*](../enums/proto.temporal.api.enums.v1.archivalstate.md)

RegisterNamespaceRequest visibilityArchivalState.

Implementation of: [IRegisterNamespaceRequest](../interfaces/proto.temporal.api.workflowservice.v1.iregisternamespacerequest.md).[visibilityArchivalState](../interfaces/proto.temporal.api.workflowservice.v1.iregisternamespacerequest.md#visibilityarchivalstate)

___

### visibilityArchivalUri

• **visibilityArchivalUri**: *string*

RegisterNamespaceRequest visibilityArchivalUri.

Implementation of: [IRegisterNamespaceRequest](../interfaces/proto.temporal.api.workflowservice.v1.iregisternamespacerequest.md).[visibilityArchivalUri](../interfaces/proto.temporal.api.workflowservice.v1.iregisternamespacerequest.md#visibilityarchivaluri)

___

### workflowExecutionRetentionPeriod

• `Optional` **workflowExecutionRetentionPeriod**: *null* \| [*IDuration*](../interfaces/proto.google.protobuf.iduration.md)

RegisterNamespaceRequest workflowExecutionRetentionPeriod.

Implementation of: [IRegisterNamespaceRequest](../interfaces/proto.temporal.api.workflowservice.v1.iregisternamespacerequest.md).[workflowExecutionRetentionPeriod](../interfaces/proto.temporal.api.workflowservice.v1.iregisternamespacerequest.md#workflowexecutionretentionperiod)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this RegisterNamespaceRequest to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IRegisterNamespaceRequest*](../interfaces/proto.temporal.api.workflowservice.v1.iregisternamespacerequest.md)): [*RegisterNamespaceRequest*](proto.temporal.api.workflowservice.v1.registernamespacerequest.md)

Creates a new RegisterNamespaceRequest instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IRegisterNamespaceRequest*](../interfaces/proto.temporal.api.workflowservice.v1.iregisternamespacerequest.md) |

**Returns:** [*RegisterNamespaceRequest*](proto.temporal.api.workflowservice.v1.registernamespacerequest.md)

RegisterNamespaceRequest instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*RegisterNamespaceRequest*](proto.temporal.api.workflowservice.v1.registernamespacerequest.md)

Decodes a RegisterNamespaceRequest message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*RegisterNamespaceRequest*](proto.temporal.api.workflowservice.v1.registernamespacerequest.md)

RegisterNamespaceRequest

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*RegisterNamespaceRequest*](proto.temporal.api.workflowservice.v1.registernamespacerequest.md)

Decodes a RegisterNamespaceRequest message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*RegisterNamespaceRequest*](proto.temporal.api.workflowservice.v1.registernamespacerequest.md)

RegisterNamespaceRequest

___

### encode

▸ `Static`**encode**(`message`: [*IRegisterNamespaceRequest*](../interfaces/proto.temporal.api.workflowservice.v1.iregisternamespacerequest.md), `writer?`: *Writer*): *Writer*

Encodes the specified RegisterNamespaceRequest message. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.registernamespacerequest.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IRegisterNamespaceRequest*](../interfaces/proto.temporal.api.workflowservice.v1.iregisternamespacerequest.md) | RegisterNamespaceRequest message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IRegisterNamespaceRequest*](../interfaces/proto.temporal.api.workflowservice.v1.iregisternamespacerequest.md), `writer?`: *Writer*): *Writer*

Encodes the specified RegisterNamespaceRequest message, length delimited. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.registernamespacerequest.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IRegisterNamespaceRequest*](../interfaces/proto.temporal.api.workflowservice.v1.iregisternamespacerequest.md) | RegisterNamespaceRequest message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*RegisterNamespaceRequest*](proto.temporal.api.workflowservice.v1.registernamespacerequest.md)

Creates a RegisterNamespaceRequest message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*RegisterNamespaceRequest*](proto.temporal.api.workflowservice.v1.registernamespacerequest.md)

RegisterNamespaceRequest

___

### toObject

▸ `Static`**toObject**(`message`: [*RegisterNamespaceRequest*](proto.temporal.api.workflowservice.v1.registernamespacerequest.md), `options?`: IConversionOptions): *object*

Creates a plain object from a RegisterNamespaceRequest message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*RegisterNamespaceRequest*](proto.temporal.api.workflowservice.v1.registernamespacerequest.md) | RegisterNamespaceRequest   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a RegisterNamespaceRequest message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
