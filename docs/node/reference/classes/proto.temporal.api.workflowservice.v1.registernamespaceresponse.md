# Class: RegisterNamespaceResponse

[workflowservice](../modules/proto.temporal.api.workflowservice.md).[v1](../modules/proto.temporal.api.workflowservice.v1.md).RegisterNamespaceResponse

Represents a RegisterNamespaceResponse.

## Implements

* [*IRegisterNamespaceResponse*](../interfaces/proto.temporal.api.workflowservice.v1.iregisternamespaceresponse.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.workflowservice.v1.registernamespaceresponse.md#constructor)

### Methods

- [toJSON](proto.temporal.api.workflowservice.v1.registernamespaceresponse.md#tojson)
- [create](proto.temporal.api.workflowservice.v1.registernamespaceresponse.md#create)
- [decode](proto.temporal.api.workflowservice.v1.registernamespaceresponse.md#decode)
- [decodeDelimited](proto.temporal.api.workflowservice.v1.registernamespaceresponse.md#decodedelimited)
- [encode](proto.temporal.api.workflowservice.v1.registernamespaceresponse.md#encode)
- [encodeDelimited](proto.temporal.api.workflowservice.v1.registernamespaceresponse.md#encodedelimited)
- [fromObject](proto.temporal.api.workflowservice.v1.registernamespaceresponse.md#fromobject)
- [toObject](proto.temporal.api.workflowservice.v1.registernamespaceresponse.md#toobject)
- [verify](proto.temporal.api.workflowservice.v1.registernamespaceresponse.md#verify)

## Constructors

### constructor

\+ **new RegisterNamespaceResponse**(`properties?`: [*IRegisterNamespaceResponse*](../interfaces/proto.temporal.api.workflowservice.v1.iregisternamespaceresponse.md)): [*RegisterNamespaceResponse*](proto.temporal.api.workflowservice.v1.registernamespaceresponse.md)

Constructs a new RegisterNamespaceResponse.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IRegisterNamespaceResponse*](../interfaces/proto.temporal.api.workflowservice.v1.iregisternamespaceresponse.md) |

**Returns:** [*RegisterNamespaceResponse*](proto.temporal.api.workflowservice.v1.registernamespaceresponse.md)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this RegisterNamespaceResponse to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IRegisterNamespaceResponse*](../interfaces/proto.temporal.api.workflowservice.v1.iregisternamespaceresponse.md)): [*RegisterNamespaceResponse*](proto.temporal.api.workflowservice.v1.registernamespaceresponse.md)

Creates a new RegisterNamespaceResponse instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IRegisterNamespaceResponse*](../interfaces/proto.temporal.api.workflowservice.v1.iregisternamespaceresponse.md) |

**Returns:** [*RegisterNamespaceResponse*](proto.temporal.api.workflowservice.v1.registernamespaceresponse.md)

RegisterNamespaceResponse instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*RegisterNamespaceResponse*](proto.temporal.api.workflowservice.v1.registernamespaceresponse.md)

Decodes a RegisterNamespaceResponse message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*RegisterNamespaceResponse*](proto.temporal.api.workflowservice.v1.registernamespaceresponse.md)

RegisterNamespaceResponse

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*RegisterNamespaceResponse*](proto.temporal.api.workflowservice.v1.registernamespaceresponse.md)

Decodes a RegisterNamespaceResponse message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*RegisterNamespaceResponse*](proto.temporal.api.workflowservice.v1.registernamespaceresponse.md)

RegisterNamespaceResponse

___

### encode

▸ `Static`**encode**(`message`: [*IRegisterNamespaceResponse*](../interfaces/proto.temporal.api.workflowservice.v1.iregisternamespaceresponse.md), `writer?`: *Writer*): *Writer*

Encodes the specified RegisterNamespaceResponse message. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.registernamespaceresponse.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IRegisterNamespaceResponse*](../interfaces/proto.temporal.api.workflowservice.v1.iregisternamespaceresponse.md) | RegisterNamespaceResponse message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IRegisterNamespaceResponse*](../interfaces/proto.temporal.api.workflowservice.v1.iregisternamespaceresponse.md), `writer?`: *Writer*): *Writer*

Encodes the specified RegisterNamespaceResponse message, length delimited. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.registernamespaceresponse.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IRegisterNamespaceResponse*](../interfaces/proto.temporal.api.workflowservice.v1.iregisternamespaceresponse.md) | RegisterNamespaceResponse message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*RegisterNamespaceResponse*](proto.temporal.api.workflowservice.v1.registernamespaceresponse.md)

Creates a RegisterNamespaceResponse message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*RegisterNamespaceResponse*](proto.temporal.api.workflowservice.v1.registernamespaceresponse.md)

RegisterNamespaceResponse

___

### toObject

▸ `Static`**toObject**(`message`: [*RegisterNamespaceResponse*](proto.temporal.api.workflowservice.v1.registernamespaceresponse.md), `options?`: IConversionOptions): *object*

Creates a plain object from a RegisterNamespaceResponse message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*RegisterNamespaceResponse*](proto.temporal.api.workflowservice.v1.registernamespaceresponse.md) | RegisterNamespaceResponse   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a RegisterNamespaceResponse message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
