# Class: ActivityTask

[coresdk](../modules/proto.coresdk.md).[activity_task](../modules/proto.coresdk.activity_task.md).ActivityTask

Represents an ActivityTask.

## Implements

* [*IActivityTask*](../interfaces/proto.coresdk.activity_task.iactivitytask.md)

## Table of contents

### Constructors

- [constructor](proto.coresdk.activity_task.activitytask.md#constructor)

### Properties

- [activityId](proto.coresdk.activity_task.activitytask.md#activityid)
- [cancel](proto.coresdk.activity_task.activitytask.md#cancel)
- [start](proto.coresdk.activity_task.activitytask.md#start)
- [taskToken](proto.coresdk.activity_task.activitytask.md#tasktoken)
- [variant](proto.coresdk.activity_task.activitytask.md#variant)

### Methods

- [toJSON](proto.coresdk.activity_task.activitytask.md#tojson)
- [create](proto.coresdk.activity_task.activitytask.md#create)
- [decode](proto.coresdk.activity_task.activitytask.md#decode)
- [decodeDelimited](proto.coresdk.activity_task.activitytask.md#decodedelimited)
- [encode](proto.coresdk.activity_task.activitytask.md#encode)
- [encodeDelimited](proto.coresdk.activity_task.activitytask.md#encodedelimited)
- [fromObject](proto.coresdk.activity_task.activitytask.md#fromobject)
- [toObject](proto.coresdk.activity_task.activitytask.md#toobject)
- [verify](proto.coresdk.activity_task.activitytask.md#verify)

## Constructors

### constructor

\+ **new ActivityTask**(`properties?`: [*IActivityTask*](../interfaces/proto.coresdk.activity_task.iactivitytask.md)): [*ActivityTask*](proto.coresdk.activity_task.activitytask.md)

Constructs a new ActivityTask.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IActivityTask*](../interfaces/proto.coresdk.activity_task.iactivitytask.md) |

**Returns:** [*ActivityTask*](proto.coresdk.activity_task.activitytask.md)

## Properties

### activityId

• **activityId**: *string*

ActivityTask activityId.

Implementation of: [IActivityTask](../interfaces/proto.coresdk.activity_task.iactivitytask.md).[activityId](../interfaces/proto.coresdk.activity_task.iactivitytask.md#activityid)

___

### cancel

• `Optional` **cancel**: *null* \| [*ICancel*](../interfaces/proto.coresdk.activity_task.icancel.md)

ActivityTask cancel.

Implementation of: [IActivityTask](../interfaces/proto.coresdk.activity_task.iactivitytask.md).[cancel](../interfaces/proto.coresdk.activity_task.iactivitytask.md#cancel)

___

### start

• `Optional` **start**: *null* \| [*IStart*](../interfaces/proto.coresdk.activity_task.istart.md)

ActivityTask start.

Implementation of: [IActivityTask](../interfaces/proto.coresdk.activity_task.iactivitytask.md).[start](../interfaces/proto.coresdk.activity_task.iactivitytask.md#start)

___

### taskToken

• **taskToken**: *Uint8Array*

ActivityTask taskToken.

Implementation of: [IActivityTask](../interfaces/proto.coresdk.activity_task.iactivitytask.md).[taskToken](../interfaces/proto.coresdk.activity_task.iactivitytask.md#tasktoken)

___

### variant

• `Optional` **variant**: *start* \| *cancel*

ActivityTask variant.

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this ActivityTask to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IActivityTask*](../interfaces/proto.coresdk.activity_task.iactivitytask.md)): [*ActivityTask*](proto.coresdk.activity_task.activitytask.md)

Creates a new ActivityTask instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IActivityTask*](../interfaces/proto.coresdk.activity_task.iactivitytask.md) |

**Returns:** [*ActivityTask*](proto.coresdk.activity_task.activitytask.md)

ActivityTask instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*ActivityTask*](proto.coresdk.activity_task.activitytask.md)

Decodes an ActivityTask message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*ActivityTask*](proto.coresdk.activity_task.activitytask.md)

ActivityTask

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*ActivityTask*](proto.coresdk.activity_task.activitytask.md)

Decodes an ActivityTask message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*ActivityTask*](proto.coresdk.activity_task.activitytask.md)

ActivityTask

___

### encode

▸ `Static`**encode**(`message`: [*IActivityTask*](../interfaces/proto.coresdk.activity_task.iactivitytask.md), `writer?`: *Writer*): *Writer*

Encodes the specified ActivityTask message. Does not implicitly [verify](proto.coresdk.activity_task.activitytask.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IActivityTask*](../interfaces/proto.coresdk.activity_task.iactivitytask.md) | ActivityTask message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IActivityTask*](../interfaces/proto.coresdk.activity_task.iactivitytask.md), `writer?`: *Writer*): *Writer*

Encodes the specified ActivityTask message, length delimited. Does not implicitly [verify](proto.coresdk.activity_task.activitytask.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IActivityTask*](../interfaces/proto.coresdk.activity_task.iactivitytask.md) | ActivityTask message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*ActivityTask*](proto.coresdk.activity_task.activitytask.md)

Creates an ActivityTask message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*ActivityTask*](proto.coresdk.activity_task.activitytask.md)

ActivityTask

___

### toObject

▸ `Static`**toObject**(`message`: [*ActivityTask*](proto.coresdk.activity_task.activitytask.md), `options?`: IConversionOptions): *object*

Creates a plain object from an ActivityTask message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ActivityTask*](proto.coresdk.activity_task.activitytask.md) | ActivityTask   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies an ActivityTask message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
