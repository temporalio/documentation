# Class: UpsertWorkflowSearchAttributesCommandAttributes

[command](../modules/proto.temporal.api.command.md).[v1](../modules/proto.temporal.api.command.v1.md).UpsertWorkflowSearchAttributesCommandAttributes

Represents an UpsertWorkflowSearchAttributesCommandAttributes.

## Implements

* [*IUpsertWorkflowSearchAttributesCommandAttributes*](../interfaces/proto.temporal.api.command.v1.iupsertworkflowsearchattributescommandattributes.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.command.v1.upsertworkflowsearchattributescommandattributes.md#constructor)

### Properties

- [searchAttributes](proto.temporal.api.command.v1.upsertworkflowsearchattributescommandattributes.md#searchattributes)

### Methods

- [toJSON](proto.temporal.api.command.v1.upsertworkflowsearchattributescommandattributes.md#tojson)
- [create](proto.temporal.api.command.v1.upsertworkflowsearchattributescommandattributes.md#create)
- [decode](proto.temporal.api.command.v1.upsertworkflowsearchattributescommandattributes.md#decode)
- [decodeDelimited](proto.temporal.api.command.v1.upsertworkflowsearchattributescommandattributes.md#decodedelimited)
- [encode](proto.temporal.api.command.v1.upsertworkflowsearchattributescommandattributes.md#encode)
- [encodeDelimited](proto.temporal.api.command.v1.upsertworkflowsearchattributescommandattributes.md#encodedelimited)
- [fromObject](proto.temporal.api.command.v1.upsertworkflowsearchattributescommandattributes.md#fromobject)
- [toObject](proto.temporal.api.command.v1.upsertworkflowsearchattributescommandattributes.md#toobject)
- [verify](proto.temporal.api.command.v1.upsertworkflowsearchattributescommandattributes.md#verify)

## Constructors

### constructor

\+ **new UpsertWorkflowSearchAttributesCommandAttributes**(`properties?`: [*IUpsertWorkflowSearchAttributesCommandAttributes*](../interfaces/proto.temporal.api.command.v1.iupsertworkflowsearchattributescommandattributes.md)): [*UpsertWorkflowSearchAttributesCommandAttributes*](proto.temporal.api.command.v1.upsertworkflowsearchattributescommandattributes.md)

Constructs a new UpsertWorkflowSearchAttributesCommandAttributes.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IUpsertWorkflowSearchAttributesCommandAttributes*](../interfaces/proto.temporal.api.command.v1.iupsertworkflowsearchattributescommandattributes.md) |

**Returns:** [*UpsertWorkflowSearchAttributesCommandAttributes*](proto.temporal.api.command.v1.upsertworkflowsearchattributescommandattributes.md)

## Properties

### searchAttributes

• `Optional` **searchAttributes**: *null* \| [*ISearchAttributes*](../interfaces/proto.temporal.api.common.v1.isearchattributes.md)

UpsertWorkflowSearchAttributesCommandAttributes searchAttributes.

Implementation of: [IUpsertWorkflowSearchAttributesCommandAttributes](../interfaces/proto.temporal.api.command.v1.iupsertworkflowsearchattributescommandattributes.md).[searchAttributes](../interfaces/proto.temporal.api.command.v1.iupsertworkflowsearchattributescommandattributes.md#searchattributes)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this UpsertWorkflowSearchAttributesCommandAttributes to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IUpsertWorkflowSearchAttributesCommandAttributes*](../interfaces/proto.temporal.api.command.v1.iupsertworkflowsearchattributescommandattributes.md)): [*UpsertWorkflowSearchAttributesCommandAttributes*](proto.temporal.api.command.v1.upsertworkflowsearchattributescommandattributes.md)

Creates a new UpsertWorkflowSearchAttributesCommandAttributes instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IUpsertWorkflowSearchAttributesCommandAttributes*](../interfaces/proto.temporal.api.command.v1.iupsertworkflowsearchattributescommandattributes.md) |

**Returns:** [*UpsertWorkflowSearchAttributesCommandAttributes*](proto.temporal.api.command.v1.upsertworkflowsearchattributescommandattributes.md)

UpsertWorkflowSearchAttributesCommandAttributes instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*UpsertWorkflowSearchAttributesCommandAttributes*](proto.temporal.api.command.v1.upsertworkflowsearchattributescommandattributes.md)

Decodes an UpsertWorkflowSearchAttributesCommandAttributes message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*UpsertWorkflowSearchAttributesCommandAttributes*](proto.temporal.api.command.v1.upsertworkflowsearchattributescommandattributes.md)

UpsertWorkflowSearchAttributesCommandAttributes

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*UpsertWorkflowSearchAttributesCommandAttributes*](proto.temporal.api.command.v1.upsertworkflowsearchattributescommandattributes.md)

Decodes an UpsertWorkflowSearchAttributesCommandAttributes message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*UpsertWorkflowSearchAttributesCommandAttributes*](proto.temporal.api.command.v1.upsertworkflowsearchattributescommandattributes.md)

UpsertWorkflowSearchAttributesCommandAttributes

___

### encode

▸ `Static`**encode**(`message`: [*IUpsertWorkflowSearchAttributesCommandAttributes*](../interfaces/proto.temporal.api.command.v1.iupsertworkflowsearchattributescommandattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified UpsertWorkflowSearchAttributesCommandAttributes message. Does not implicitly [verify](proto.temporal.api.command.v1.upsertworkflowsearchattributescommandattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IUpsertWorkflowSearchAttributesCommandAttributes*](../interfaces/proto.temporal.api.command.v1.iupsertworkflowsearchattributescommandattributes.md) | UpsertWorkflowSearchAttributesCommandAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IUpsertWorkflowSearchAttributesCommandAttributes*](../interfaces/proto.temporal.api.command.v1.iupsertworkflowsearchattributescommandattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified UpsertWorkflowSearchAttributesCommandAttributes message, length delimited. Does not implicitly [verify](proto.temporal.api.command.v1.upsertworkflowsearchattributescommandattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IUpsertWorkflowSearchAttributesCommandAttributes*](../interfaces/proto.temporal.api.command.v1.iupsertworkflowsearchattributescommandattributes.md) | UpsertWorkflowSearchAttributesCommandAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*UpsertWorkflowSearchAttributesCommandAttributes*](proto.temporal.api.command.v1.upsertworkflowsearchattributescommandattributes.md)

Creates an UpsertWorkflowSearchAttributesCommandAttributes message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*UpsertWorkflowSearchAttributesCommandAttributes*](proto.temporal.api.command.v1.upsertworkflowsearchattributescommandattributes.md)

UpsertWorkflowSearchAttributesCommandAttributes

___

### toObject

▸ `Static`**toObject**(`message`: [*UpsertWorkflowSearchAttributesCommandAttributes*](proto.temporal.api.command.v1.upsertworkflowsearchattributescommandattributes.md), `options?`: IConversionOptions): *object*

Creates a plain object from an UpsertWorkflowSearchAttributesCommandAttributes message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*UpsertWorkflowSearchAttributesCommandAttributes*](proto.temporal.api.command.v1.upsertworkflowsearchattributescommandattributes.md) | UpsertWorkflowSearchAttributesCommandAttributes   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies an UpsertWorkflowSearchAttributesCommandAttributes message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
