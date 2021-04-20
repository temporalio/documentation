# Class: QuerySuccess

[coresdk](../modules/proto.coresdk.md).[workflow_commands](../modules/proto.coresdk.workflow_commands.md).QuerySuccess

Represents a QuerySuccess.

## Implements

* [*IQuerySuccess*](../interfaces/proto.coresdk.workflow_commands.iquerysuccess.md)

## Table of contents

### Constructors

- [constructor](proto.coresdk.workflow_commands.querysuccess.md#constructor)

### Properties

- [response](proto.coresdk.workflow_commands.querysuccess.md#response)

### Methods

- [toJSON](proto.coresdk.workflow_commands.querysuccess.md#tojson)
- [create](proto.coresdk.workflow_commands.querysuccess.md#create)
- [decode](proto.coresdk.workflow_commands.querysuccess.md#decode)
- [decodeDelimited](proto.coresdk.workflow_commands.querysuccess.md#decodedelimited)
- [encode](proto.coresdk.workflow_commands.querysuccess.md#encode)
- [encodeDelimited](proto.coresdk.workflow_commands.querysuccess.md#encodedelimited)
- [fromObject](proto.coresdk.workflow_commands.querysuccess.md#fromobject)
- [toObject](proto.coresdk.workflow_commands.querysuccess.md#toobject)
- [verify](proto.coresdk.workflow_commands.querysuccess.md#verify)

## Constructors

### constructor

\+ **new QuerySuccess**(`properties?`: [*IQuerySuccess*](../interfaces/proto.coresdk.workflow_commands.iquerysuccess.md)): [*QuerySuccess*](proto.coresdk.workflow_commands.querysuccess.md)

Constructs a new QuerySuccess.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IQuerySuccess*](../interfaces/proto.coresdk.workflow_commands.iquerysuccess.md) |

**Returns:** [*QuerySuccess*](proto.coresdk.workflow_commands.querysuccess.md)

## Properties

### response

• `Optional` **response**: *null* \| [*IPayload*](../interfaces/proto.coresdk.common.ipayload.md)

QuerySuccess response.

Implementation of: [IQuerySuccess](../interfaces/proto.coresdk.workflow_commands.iquerysuccess.md).[response](../interfaces/proto.coresdk.workflow_commands.iquerysuccess.md#response)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this QuerySuccess to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IQuerySuccess*](../interfaces/proto.coresdk.workflow_commands.iquerysuccess.md)): [*QuerySuccess*](proto.coresdk.workflow_commands.querysuccess.md)

Creates a new QuerySuccess instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IQuerySuccess*](../interfaces/proto.coresdk.workflow_commands.iquerysuccess.md) |

**Returns:** [*QuerySuccess*](proto.coresdk.workflow_commands.querysuccess.md)

QuerySuccess instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*QuerySuccess*](proto.coresdk.workflow_commands.querysuccess.md)

Decodes a QuerySuccess message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*QuerySuccess*](proto.coresdk.workflow_commands.querysuccess.md)

QuerySuccess

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*QuerySuccess*](proto.coresdk.workflow_commands.querysuccess.md)

Decodes a QuerySuccess message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*QuerySuccess*](proto.coresdk.workflow_commands.querysuccess.md)

QuerySuccess

___

### encode

▸ `Static`**encode**(`message`: [*IQuerySuccess*](../interfaces/proto.coresdk.workflow_commands.iquerysuccess.md), `writer?`: *Writer*): *Writer*

Encodes the specified QuerySuccess message. Does not implicitly [verify](proto.coresdk.workflow_commands.querysuccess.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IQuerySuccess*](../interfaces/proto.coresdk.workflow_commands.iquerysuccess.md) | QuerySuccess message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IQuerySuccess*](../interfaces/proto.coresdk.workflow_commands.iquerysuccess.md), `writer?`: *Writer*): *Writer*

Encodes the specified QuerySuccess message, length delimited. Does not implicitly [verify](proto.coresdk.workflow_commands.querysuccess.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IQuerySuccess*](../interfaces/proto.coresdk.workflow_commands.iquerysuccess.md) | QuerySuccess message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*QuerySuccess*](proto.coresdk.workflow_commands.querysuccess.md)

Creates a QuerySuccess message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*QuerySuccess*](proto.coresdk.workflow_commands.querysuccess.md)

QuerySuccess

___

### toObject

▸ `Static`**toObject**(`message`: [*QuerySuccess*](proto.coresdk.workflow_commands.querysuccess.md), `options?`: IConversionOptions): *object*

Creates a plain object from a QuerySuccess message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*QuerySuccess*](proto.coresdk.workflow_commands.querysuccess.md) | QuerySuccess   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a QuerySuccess message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
