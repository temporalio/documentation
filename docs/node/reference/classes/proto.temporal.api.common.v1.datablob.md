# Class: DataBlob

[common](../modules/proto.temporal.api.common.md).[v1](../modules/proto.temporal.api.common.v1.md).DataBlob

Represents a DataBlob.

## Implements

* [*IDataBlob*](../interfaces/proto.temporal.api.common.v1.idatablob.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.common.v1.datablob.md#constructor)

### Properties

- [data](proto.temporal.api.common.v1.datablob.md#data)
- [encodingType](proto.temporal.api.common.v1.datablob.md#encodingtype)

### Methods

- [toJSON](proto.temporal.api.common.v1.datablob.md#tojson)
- [create](proto.temporal.api.common.v1.datablob.md#create)
- [decode](proto.temporal.api.common.v1.datablob.md#decode)
- [decodeDelimited](proto.temporal.api.common.v1.datablob.md#decodedelimited)
- [encode](proto.temporal.api.common.v1.datablob.md#encode)
- [encodeDelimited](proto.temporal.api.common.v1.datablob.md#encodedelimited)
- [fromObject](proto.temporal.api.common.v1.datablob.md#fromobject)
- [toObject](proto.temporal.api.common.v1.datablob.md#toobject)
- [verify](proto.temporal.api.common.v1.datablob.md#verify)

## Constructors

### constructor

\+ **new DataBlob**(`properties?`: [*IDataBlob*](../interfaces/proto.temporal.api.common.v1.idatablob.md)): [*DataBlob*](proto.temporal.api.common.v1.datablob.md)

Constructs a new DataBlob.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IDataBlob*](../interfaces/proto.temporal.api.common.v1.idatablob.md) |

**Returns:** [*DataBlob*](proto.temporal.api.common.v1.datablob.md)

## Properties

### data

• **data**: *Uint8Array*

DataBlob data.

Implementation of: [IDataBlob](../interfaces/proto.temporal.api.common.v1.idatablob.md).[data](../interfaces/proto.temporal.api.common.v1.idatablob.md#data)

___

### encodingType

• **encodingType**: [*EncodingType*](../enums/proto.temporal.api.enums.v1.encodingtype.md)

DataBlob encodingType.

Implementation of: [IDataBlob](../interfaces/proto.temporal.api.common.v1.idatablob.md).[encodingType](../interfaces/proto.temporal.api.common.v1.idatablob.md#encodingtype)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this DataBlob to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IDataBlob*](../interfaces/proto.temporal.api.common.v1.idatablob.md)): [*DataBlob*](proto.temporal.api.common.v1.datablob.md)

Creates a new DataBlob instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IDataBlob*](../interfaces/proto.temporal.api.common.v1.idatablob.md) |

**Returns:** [*DataBlob*](proto.temporal.api.common.v1.datablob.md)

DataBlob instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*DataBlob*](proto.temporal.api.common.v1.datablob.md)

Decodes a DataBlob message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*DataBlob*](proto.temporal.api.common.v1.datablob.md)

DataBlob

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*DataBlob*](proto.temporal.api.common.v1.datablob.md)

Decodes a DataBlob message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*DataBlob*](proto.temporal.api.common.v1.datablob.md)

DataBlob

___

### encode

▸ `Static`**encode**(`message`: [*IDataBlob*](../interfaces/proto.temporal.api.common.v1.idatablob.md), `writer?`: *Writer*): *Writer*

Encodes the specified DataBlob message. Does not implicitly [verify](proto.temporal.api.common.v1.datablob.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IDataBlob*](../interfaces/proto.temporal.api.common.v1.idatablob.md) | DataBlob message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IDataBlob*](../interfaces/proto.temporal.api.common.v1.idatablob.md), `writer?`: *Writer*): *Writer*

Encodes the specified DataBlob message, length delimited. Does not implicitly [verify](proto.temporal.api.common.v1.datablob.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IDataBlob*](../interfaces/proto.temporal.api.common.v1.idatablob.md) | DataBlob message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*DataBlob*](proto.temporal.api.common.v1.datablob.md)

Creates a DataBlob message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*DataBlob*](proto.temporal.api.common.v1.datablob.md)

DataBlob

___

### toObject

▸ `Static`**toObject**(`message`: [*DataBlob*](proto.temporal.api.common.v1.datablob.md), `options?`: IConversionOptions): *object*

Creates a plain object from a DataBlob message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*DataBlob*](proto.temporal.api.common.v1.datablob.md) | DataBlob   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a DataBlob message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
