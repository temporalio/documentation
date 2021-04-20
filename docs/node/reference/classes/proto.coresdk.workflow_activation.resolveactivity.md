# Class: ResolveActivity

[coresdk](../modules/proto.coresdk.md).[workflow_activation](../modules/proto.coresdk.workflow_activation.md).ResolveActivity

Notify a workflow that an activity has been resolved

## Implements

* [*IResolveActivity*](../interfaces/proto.coresdk.workflow_activation.iresolveactivity.md)

## Table of contents

### Constructors

- [constructor](proto.coresdk.workflow_activation.resolveactivity.md#constructor)

### Properties

- [activityId](proto.coresdk.workflow_activation.resolveactivity.md#activityid)
- [result](proto.coresdk.workflow_activation.resolveactivity.md#result)

### Methods

- [toJSON](proto.coresdk.workflow_activation.resolveactivity.md#tojson)
- [create](proto.coresdk.workflow_activation.resolveactivity.md#create)
- [decode](proto.coresdk.workflow_activation.resolveactivity.md#decode)
- [decodeDelimited](proto.coresdk.workflow_activation.resolveactivity.md#decodedelimited)
- [encode](proto.coresdk.workflow_activation.resolveactivity.md#encode)
- [encodeDelimited](proto.coresdk.workflow_activation.resolveactivity.md#encodedelimited)
- [fromObject](proto.coresdk.workflow_activation.resolveactivity.md#fromobject)
- [toObject](proto.coresdk.workflow_activation.resolveactivity.md#toobject)
- [verify](proto.coresdk.workflow_activation.resolveactivity.md#verify)

## Constructors

### constructor

\+ **new ResolveActivity**(`properties?`: [*IResolveActivity*](../interfaces/proto.coresdk.workflow_activation.iresolveactivity.md)): [*ResolveActivity*](proto.coresdk.workflow_activation.resolveactivity.md)

Constructs a new ResolveActivity.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IResolveActivity*](../interfaces/proto.coresdk.workflow_activation.iresolveactivity.md) |

**Returns:** [*ResolveActivity*](proto.coresdk.workflow_activation.resolveactivity.md)

## Properties

### activityId

• **activityId**: *string*

ResolveActivity activityId.

Implementation of: [IResolveActivity](../interfaces/proto.coresdk.workflow_activation.iresolveactivity.md).[activityId](../interfaces/proto.coresdk.workflow_activation.iresolveactivity.md#activityid)

___

### result

• `Optional` **result**: *null* \| [*IActivityResult*](../interfaces/proto.coresdk.activity_result.iactivityresult.md)

ResolveActivity result.

Implementation of: [IResolveActivity](../interfaces/proto.coresdk.workflow_activation.iresolveactivity.md).[result](../interfaces/proto.coresdk.workflow_activation.iresolveactivity.md#result)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this ResolveActivity to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IResolveActivity*](../interfaces/proto.coresdk.workflow_activation.iresolveactivity.md)): [*ResolveActivity*](proto.coresdk.workflow_activation.resolveactivity.md)

Creates a new ResolveActivity instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IResolveActivity*](../interfaces/proto.coresdk.workflow_activation.iresolveactivity.md) |

**Returns:** [*ResolveActivity*](proto.coresdk.workflow_activation.resolveactivity.md)

ResolveActivity instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*ResolveActivity*](proto.coresdk.workflow_activation.resolveactivity.md)

Decodes a ResolveActivity message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*ResolveActivity*](proto.coresdk.workflow_activation.resolveactivity.md)

ResolveActivity

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*ResolveActivity*](proto.coresdk.workflow_activation.resolveactivity.md)

Decodes a ResolveActivity message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*ResolveActivity*](proto.coresdk.workflow_activation.resolveactivity.md)

ResolveActivity

___

### encode

▸ `Static`**encode**(`message`: [*IResolveActivity*](../interfaces/proto.coresdk.workflow_activation.iresolveactivity.md), `writer?`: *Writer*): *Writer*

Encodes the specified ResolveActivity message. Does not implicitly [verify](proto.coresdk.workflow_activation.resolveactivity.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IResolveActivity*](../interfaces/proto.coresdk.workflow_activation.iresolveactivity.md) | ResolveActivity message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IResolveActivity*](../interfaces/proto.coresdk.workflow_activation.iresolveactivity.md), `writer?`: *Writer*): *Writer*

Encodes the specified ResolveActivity message, length delimited. Does not implicitly [verify](proto.coresdk.workflow_activation.resolveactivity.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IResolveActivity*](../interfaces/proto.coresdk.workflow_activation.iresolveactivity.md) | ResolveActivity message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*ResolveActivity*](proto.coresdk.workflow_activation.resolveactivity.md)

Creates a ResolveActivity message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*ResolveActivity*](proto.coresdk.workflow_activation.resolveactivity.md)

ResolveActivity

___

### toObject

▸ `Static`**toObject**(`message`: [*ResolveActivity*](proto.coresdk.workflow_activation.resolveactivity.md), `options?`: IConversionOptions): *object*

Creates a plain object from a ResolveActivity message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ResolveActivity*](proto.coresdk.workflow_activation.resolveactivity.md) | ResolveActivity   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a ResolveActivity message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
