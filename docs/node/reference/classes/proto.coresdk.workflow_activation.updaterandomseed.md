# Class: UpdateRandomSeed

[coresdk](../modules/proto.coresdk.md).[workflow_activation](../modules/proto.coresdk.workflow_activation.md).UpdateRandomSeed

Update the workflow's random seed

## Implements

* [*IUpdateRandomSeed*](../interfaces/proto.coresdk.workflow_activation.iupdaterandomseed.md)

## Table of contents

### Constructors

- [constructor](proto.coresdk.workflow_activation.updaterandomseed.md#constructor)

### Properties

- [randomnessSeed](proto.coresdk.workflow_activation.updaterandomseed.md#randomnessseed)

### Methods

- [toJSON](proto.coresdk.workflow_activation.updaterandomseed.md#tojson)
- [create](proto.coresdk.workflow_activation.updaterandomseed.md#create)
- [decode](proto.coresdk.workflow_activation.updaterandomseed.md#decode)
- [decodeDelimited](proto.coresdk.workflow_activation.updaterandomseed.md#decodedelimited)
- [encode](proto.coresdk.workflow_activation.updaterandomseed.md#encode)
- [encodeDelimited](proto.coresdk.workflow_activation.updaterandomseed.md#encodedelimited)
- [fromObject](proto.coresdk.workflow_activation.updaterandomseed.md#fromobject)
- [toObject](proto.coresdk.workflow_activation.updaterandomseed.md#toobject)
- [verify](proto.coresdk.workflow_activation.updaterandomseed.md#verify)

## Constructors

### constructor

\+ **new UpdateRandomSeed**(`properties?`: [*IUpdateRandomSeed*](../interfaces/proto.coresdk.workflow_activation.iupdaterandomseed.md)): [*UpdateRandomSeed*](proto.coresdk.workflow_activation.updaterandomseed.md)

Constructs a new UpdateRandomSeed.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IUpdateRandomSeed*](../interfaces/proto.coresdk.workflow_activation.iupdaterandomseed.md) |

**Returns:** [*UpdateRandomSeed*](proto.coresdk.workflow_activation.updaterandomseed.md)

## Properties

### randomnessSeed

• **randomnessSeed**: Long

UpdateRandomSeed randomnessSeed.

Implementation of: [IUpdateRandomSeed](../interfaces/proto.coresdk.workflow_activation.iupdaterandomseed.md).[randomnessSeed](../interfaces/proto.coresdk.workflow_activation.iupdaterandomseed.md#randomnessseed)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this UpdateRandomSeed to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IUpdateRandomSeed*](../interfaces/proto.coresdk.workflow_activation.iupdaterandomseed.md)): [*UpdateRandomSeed*](proto.coresdk.workflow_activation.updaterandomseed.md)

Creates a new UpdateRandomSeed instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IUpdateRandomSeed*](../interfaces/proto.coresdk.workflow_activation.iupdaterandomseed.md) |

**Returns:** [*UpdateRandomSeed*](proto.coresdk.workflow_activation.updaterandomseed.md)

UpdateRandomSeed instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*UpdateRandomSeed*](proto.coresdk.workflow_activation.updaterandomseed.md)

Decodes an UpdateRandomSeed message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*UpdateRandomSeed*](proto.coresdk.workflow_activation.updaterandomseed.md)

UpdateRandomSeed

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*UpdateRandomSeed*](proto.coresdk.workflow_activation.updaterandomseed.md)

Decodes an UpdateRandomSeed message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*UpdateRandomSeed*](proto.coresdk.workflow_activation.updaterandomseed.md)

UpdateRandomSeed

___

### encode

▸ `Static`**encode**(`message`: [*IUpdateRandomSeed*](../interfaces/proto.coresdk.workflow_activation.iupdaterandomseed.md), `writer?`: *Writer*): *Writer*

Encodes the specified UpdateRandomSeed message. Does not implicitly [verify](proto.coresdk.workflow_activation.updaterandomseed.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IUpdateRandomSeed*](../interfaces/proto.coresdk.workflow_activation.iupdaterandomseed.md) | UpdateRandomSeed message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IUpdateRandomSeed*](../interfaces/proto.coresdk.workflow_activation.iupdaterandomseed.md), `writer?`: *Writer*): *Writer*

Encodes the specified UpdateRandomSeed message, length delimited. Does not implicitly [verify](proto.coresdk.workflow_activation.updaterandomseed.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IUpdateRandomSeed*](../interfaces/proto.coresdk.workflow_activation.iupdaterandomseed.md) | UpdateRandomSeed message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*UpdateRandomSeed*](proto.coresdk.workflow_activation.updaterandomseed.md)

Creates an UpdateRandomSeed message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*UpdateRandomSeed*](proto.coresdk.workflow_activation.updaterandomseed.md)

UpdateRandomSeed

___

### toObject

▸ `Static`**toObject**(`message`: [*UpdateRandomSeed*](proto.coresdk.workflow_activation.updaterandomseed.md), `options?`: IConversionOptions): *object*

Creates a plain object from an UpdateRandomSeed message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*UpdateRandomSeed*](proto.coresdk.workflow_activation.updaterandomseed.md) | UpdateRandomSeed   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies an UpdateRandomSeed message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
