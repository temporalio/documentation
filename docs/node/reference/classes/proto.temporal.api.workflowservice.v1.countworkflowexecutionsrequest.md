# Class: CountWorkflowExecutionsRequest

[workflowservice](../modules/proto.temporal.api.workflowservice.md).[v1](../modules/proto.temporal.api.workflowservice.v1.md).CountWorkflowExecutionsRequest

Represents a CountWorkflowExecutionsRequest.

## Implements

* [*ICountWorkflowExecutionsRequest*](../interfaces/proto.temporal.api.workflowservice.v1.icountworkflowexecutionsrequest.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.workflowservice.v1.countworkflowexecutionsrequest.md#constructor)

### Properties

- [namespace](proto.temporal.api.workflowservice.v1.countworkflowexecutionsrequest.md#namespace)
- [query](proto.temporal.api.workflowservice.v1.countworkflowexecutionsrequest.md#query)

### Methods

- [toJSON](proto.temporal.api.workflowservice.v1.countworkflowexecutionsrequest.md#tojson)
- [create](proto.temporal.api.workflowservice.v1.countworkflowexecutionsrequest.md#create)
- [decode](proto.temporal.api.workflowservice.v1.countworkflowexecutionsrequest.md#decode)
- [decodeDelimited](proto.temporal.api.workflowservice.v1.countworkflowexecutionsrequest.md#decodedelimited)
- [encode](proto.temporal.api.workflowservice.v1.countworkflowexecutionsrequest.md#encode)
- [encodeDelimited](proto.temporal.api.workflowservice.v1.countworkflowexecutionsrequest.md#encodedelimited)
- [fromObject](proto.temporal.api.workflowservice.v1.countworkflowexecutionsrequest.md#fromobject)
- [toObject](proto.temporal.api.workflowservice.v1.countworkflowexecutionsrequest.md#toobject)
- [verify](proto.temporal.api.workflowservice.v1.countworkflowexecutionsrequest.md#verify)

## Constructors

### constructor

\+ **new CountWorkflowExecutionsRequest**(`properties?`: [*ICountWorkflowExecutionsRequest*](../interfaces/proto.temporal.api.workflowservice.v1.icountworkflowexecutionsrequest.md)): [*CountWorkflowExecutionsRequest*](proto.temporal.api.workflowservice.v1.countworkflowexecutionsrequest.md)

Constructs a new CountWorkflowExecutionsRequest.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*ICountWorkflowExecutionsRequest*](../interfaces/proto.temporal.api.workflowservice.v1.icountworkflowexecutionsrequest.md) |

**Returns:** [*CountWorkflowExecutionsRequest*](proto.temporal.api.workflowservice.v1.countworkflowexecutionsrequest.md)

## Properties

### namespace

• **namespace**: *string*

CountWorkflowExecutionsRequest namespace.

Implementation of: [ICountWorkflowExecutionsRequest](../interfaces/proto.temporal.api.workflowservice.v1.icountworkflowexecutionsrequest.md).[namespace](../interfaces/proto.temporal.api.workflowservice.v1.icountworkflowexecutionsrequest.md#namespace)

___

### query

• **query**: *string*

CountWorkflowExecutionsRequest query.

Implementation of: [ICountWorkflowExecutionsRequest](../interfaces/proto.temporal.api.workflowservice.v1.icountworkflowexecutionsrequest.md).[query](../interfaces/proto.temporal.api.workflowservice.v1.icountworkflowexecutionsrequest.md#query)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this CountWorkflowExecutionsRequest to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*ICountWorkflowExecutionsRequest*](../interfaces/proto.temporal.api.workflowservice.v1.icountworkflowexecutionsrequest.md)): [*CountWorkflowExecutionsRequest*](proto.temporal.api.workflowservice.v1.countworkflowexecutionsrequest.md)

Creates a new CountWorkflowExecutionsRequest instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*ICountWorkflowExecutionsRequest*](../interfaces/proto.temporal.api.workflowservice.v1.icountworkflowexecutionsrequest.md) |

**Returns:** [*CountWorkflowExecutionsRequest*](proto.temporal.api.workflowservice.v1.countworkflowexecutionsrequest.md)

CountWorkflowExecutionsRequest instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*CountWorkflowExecutionsRequest*](proto.temporal.api.workflowservice.v1.countworkflowexecutionsrequest.md)

Decodes a CountWorkflowExecutionsRequest message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*CountWorkflowExecutionsRequest*](proto.temporal.api.workflowservice.v1.countworkflowexecutionsrequest.md)

CountWorkflowExecutionsRequest

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*CountWorkflowExecutionsRequest*](proto.temporal.api.workflowservice.v1.countworkflowexecutionsrequest.md)

Decodes a CountWorkflowExecutionsRequest message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*CountWorkflowExecutionsRequest*](proto.temporal.api.workflowservice.v1.countworkflowexecutionsrequest.md)

CountWorkflowExecutionsRequest

___

### encode

▸ `Static`**encode**(`message`: [*ICountWorkflowExecutionsRequest*](../interfaces/proto.temporal.api.workflowservice.v1.icountworkflowexecutionsrequest.md), `writer?`: *Writer*): *Writer*

Encodes the specified CountWorkflowExecutionsRequest message. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.countworkflowexecutionsrequest.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ICountWorkflowExecutionsRequest*](../interfaces/proto.temporal.api.workflowservice.v1.icountworkflowexecutionsrequest.md) | CountWorkflowExecutionsRequest message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*ICountWorkflowExecutionsRequest*](../interfaces/proto.temporal.api.workflowservice.v1.icountworkflowexecutionsrequest.md), `writer?`: *Writer*): *Writer*

Encodes the specified CountWorkflowExecutionsRequest message, length delimited. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.countworkflowexecutionsrequest.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ICountWorkflowExecutionsRequest*](../interfaces/proto.temporal.api.workflowservice.v1.icountworkflowexecutionsrequest.md) | CountWorkflowExecutionsRequest message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*CountWorkflowExecutionsRequest*](proto.temporal.api.workflowservice.v1.countworkflowexecutionsrequest.md)

Creates a CountWorkflowExecutionsRequest message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*CountWorkflowExecutionsRequest*](proto.temporal.api.workflowservice.v1.countworkflowexecutionsrequest.md)

CountWorkflowExecutionsRequest

___

### toObject

▸ `Static`**toObject**(`message`: [*CountWorkflowExecutionsRequest*](proto.temporal.api.workflowservice.v1.countworkflowexecutionsrequest.md), `options?`: IConversionOptions): *object*

Creates a plain object from a CountWorkflowExecutionsRequest message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*CountWorkflowExecutionsRequest*](proto.temporal.api.workflowservice.v1.countworkflowexecutionsrequest.md) | CountWorkflowExecutionsRequest   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a CountWorkflowExecutionsRequest message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
