# Class: QueryResult

[coresdk](../modules/proto.coresdk.md).[workflow_commands](../modules/proto.coresdk.workflow_commands.md).QueryResult

Represents a QueryResult.

## Implements

* [*IQueryResult*](../interfaces/proto.coresdk.workflow_commands.iqueryresult.md)

## Table of contents

### Constructors

- [constructor](proto.coresdk.workflow_commands.queryresult.md#constructor)

### Properties

- [failedWithMessage](proto.coresdk.workflow_commands.queryresult.md#failedwithmessage)
- [succeeded](proto.coresdk.workflow_commands.queryresult.md#succeeded)
- [variant](proto.coresdk.workflow_commands.queryresult.md#variant)

### Methods

- [toJSON](proto.coresdk.workflow_commands.queryresult.md#tojson)
- [create](proto.coresdk.workflow_commands.queryresult.md#create)
- [decode](proto.coresdk.workflow_commands.queryresult.md#decode)
- [decodeDelimited](proto.coresdk.workflow_commands.queryresult.md#decodedelimited)
- [encode](proto.coresdk.workflow_commands.queryresult.md#encode)
- [encodeDelimited](proto.coresdk.workflow_commands.queryresult.md#encodedelimited)
- [fromObject](proto.coresdk.workflow_commands.queryresult.md#fromobject)
- [toObject](proto.coresdk.workflow_commands.queryresult.md#toobject)
- [verify](proto.coresdk.workflow_commands.queryresult.md#verify)

## Constructors

### constructor

\+ **new QueryResult**(`properties?`: [*IQueryResult*](../interfaces/proto.coresdk.workflow_commands.iqueryresult.md)): [*QueryResult*](proto.coresdk.workflow_commands.queryresult.md)

Constructs a new QueryResult.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IQueryResult*](../interfaces/proto.coresdk.workflow_commands.iqueryresult.md) |

**Returns:** [*QueryResult*](proto.coresdk.workflow_commands.queryresult.md)

## Properties

### failedWithMessage

• **failedWithMessage**: *string*

QueryResult failedWithMessage.

Implementation of: [IQueryResult](../interfaces/proto.coresdk.workflow_commands.iqueryresult.md).[failedWithMessage](../interfaces/proto.coresdk.workflow_commands.iqueryresult.md#failedwithmessage)

___

### succeeded

• `Optional` **succeeded**: *null* \| [*IQuerySuccess*](../interfaces/proto.coresdk.workflow_commands.iquerysuccess.md)

QueryResult succeeded.

Implementation of: [IQueryResult](../interfaces/proto.coresdk.workflow_commands.iqueryresult.md).[succeeded](../interfaces/proto.coresdk.workflow_commands.iqueryresult.md#succeeded)

___

### variant

• `Optional` **variant**: *succeeded* \| *failedWithMessage*

QueryResult variant.

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this QueryResult to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IQueryResult*](../interfaces/proto.coresdk.workflow_commands.iqueryresult.md)): [*QueryResult*](proto.coresdk.workflow_commands.queryresult.md)

Creates a new QueryResult instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IQueryResult*](../interfaces/proto.coresdk.workflow_commands.iqueryresult.md) |

**Returns:** [*QueryResult*](proto.coresdk.workflow_commands.queryresult.md)

QueryResult instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*QueryResult*](proto.coresdk.workflow_commands.queryresult.md)

Decodes a QueryResult message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*QueryResult*](proto.coresdk.workflow_commands.queryresult.md)

QueryResult

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*QueryResult*](proto.coresdk.workflow_commands.queryresult.md)

Decodes a QueryResult message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*QueryResult*](proto.coresdk.workflow_commands.queryresult.md)

QueryResult

___

### encode

▸ `Static`**encode**(`message`: [*IQueryResult*](../interfaces/proto.coresdk.workflow_commands.iqueryresult.md), `writer?`: *Writer*): *Writer*

Encodes the specified QueryResult message. Does not implicitly [verify](proto.coresdk.workflow_commands.queryresult.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IQueryResult*](../interfaces/proto.coresdk.workflow_commands.iqueryresult.md) | QueryResult message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IQueryResult*](../interfaces/proto.coresdk.workflow_commands.iqueryresult.md), `writer?`: *Writer*): *Writer*

Encodes the specified QueryResult message, length delimited. Does not implicitly [verify](proto.coresdk.workflow_commands.queryresult.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IQueryResult*](../interfaces/proto.coresdk.workflow_commands.iqueryresult.md) | QueryResult message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*QueryResult*](proto.coresdk.workflow_commands.queryresult.md)

Creates a QueryResult message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*QueryResult*](proto.coresdk.workflow_commands.queryresult.md)

QueryResult

___

### toObject

▸ `Static`**toObject**(`message`: [*QueryResult*](proto.coresdk.workflow_commands.queryresult.md), `options?`: IConversionOptions): *object*

Creates a plain object from a QueryResult message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*QueryResult*](proto.coresdk.workflow_commands.queryresult.md) | QueryResult   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a QueryResult message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
