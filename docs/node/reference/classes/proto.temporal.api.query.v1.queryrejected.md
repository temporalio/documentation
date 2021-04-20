# Class: QueryRejected

[query](../modules/proto.temporal.api.query.md).[v1](../modules/proto.temporal.api.query.v1.md).QueryRejected

Represents a QueryRejected.

## Implements

* [*IQueryRejected*](../interfaces/proto.temporal.api.query.v1.iqueryrejected.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.query.v1.queryrejected.md#constructor)

### Properties

- [status](proto.temporal.api.query.v1.queryrejected.md#status)

### Methods

- [toJSON](proto.temporal.api.query.v1.queryrejected.md#tojson)
- [create](proto.temporal.api.query.v1.queryrejected.md#create)
- [decode](proto.temporal.api.query.v1.queryrejected.md#decode)
- [decodeDelimited](proto.temporal.api.query.v1.queryrejected.md#decodedelimited)
- [encode](proto.temporal.api.query.v1.queryrejected.md#encode)
- [encodeDelimited](proto.temporal.api.query.v1.queryrejected.md#encodedelimited)
- [fromObject](proto.temporal.api.query.v1.queryrejected.md#fromobject)
- [toObject](proto.temporal.api.query.v1.queryrejected.md#toobject)
- [verify](proto.temporal.api.query.v1.queryrejected.md#verify)

## Constructors

### constructor

\+ **new QueryRejected**(`properties?`: [*IQueryRejected*](../interfaces/proto.temporal.api.query.v1.iqueryrejected.md)): [*QueryRejected*](proto.temporal.api.query.v1.queryrejected.md)

Constructs a new QueryRejected.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IQueryRejected*](../interfaces/proto.temporal.api.query.v1.iqueryrejected.md) |

**Returns:** [*QueryRejected*](proto.temporal.api.query.v1.queryrejected.md)

## Properties

### status

• **status**: [*WorkflowExecutionStatus*](../enums/proto.temporal.api.enums.v1.workflowexecutionstatus.md)

QueryRejected status.

Implementation of: [IQueryRejected](../interfaces/proto.temporal.api.query.v1.iqueryrejected.md).[status](../interfaces/proto.temporal.api.query.v1.iqueryrejected.md#status)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this QueryRejected to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IQueryRejected*](../interfaces/proto.temporal.api.query.v1.iqueryrejected.md)): [*QueryRejected*](proto.temporal.api.query.v1.queryrejected.md)

Creates a new QueryRejected instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IQueryRejected*](../interfaces/proto.temporal.api.query.v1.iqueryrejected.md) |

**Returns:** [*QueryRejected*](proto.temporal.api.query.v1.queryrejected.md)

QueryRejected instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*QueryRejected*](proto.temporal.api.query.v1.queryrejected.md)

Decodes a QueryRejected message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*QueryRejected*](proto.temporal.api.query.v1.queryrejected.md)

QueryRejected

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*QueryRejected*](proto.temporal.api.query.v1.queryrejected.md)

Decodes a QueryRejected message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*QueryRejected*](proto.temporal.api.query.v1.queryrejected.md)

QueryRejected

___

### encode

▸ `Static`**encode**(`message`: [*IQueryRejected*](../interfaces/proto.temporal.api.query.v1.iqueryrejected.md), `writer?`: *Writer*): *Writer*

Encodes the specified QueryRejected message. Does not implicitly [verify](proto.temporal.api.query.v1.queryrejected.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IQueryRejected*](../interfaces/proto.temporal.api.query.v1.iqueryrejected.md) | QueryRejected message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IQueryRejected*](../interfaces/proto.temporal.api.query.v1.iqueryrejected.md), `writer?`: *Writer*): *Writer*

Encodes the specified QueryRejected message, length delimited. Does not implicitly [verify](proto.temporal.api.query.v1.queryrejected.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IQueryRejected*](../interfaces/proto.temporal.api.query.v1.iqueryrejected.md) | QueryRejected message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*QueryRejected*](proto.temporal.api.query.v1.queryrejected.md)

Creates a QueryRejected message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*QueryRejected*](proto.temporal.api.query.v1.queryrejected.md)

QueryRejected

___

### toObject

▸ `Static`**toObject**(`message`: [*QueryRejected*](proto.temporal.api.query.v1.queryrejected.md), `options?`: IConversionOptions): *object*

Creates a plain object from a QueryRejected message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*QueryRejected*](proto.temporal.api.query.v1.queryrejected.md) | QueryRejected   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a QueryRejected message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
