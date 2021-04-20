# Class: ActivityTaskCompletedEventAttributes

[history](../modules/proto.temporal.api.history.md).[v1](../modules/proto.temporal.api.history.v1.md).ActivityTaskCompletedEventAttributes

Represents an ActivityTaskCompletedEventAttributes.

## Implements

* [*IActivityTaskCompletedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iactivitytaskcompletedeventattributes.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.history.v1.activitytaskcompletedeventattributes.md#constructor)

### Properties

- [identity](proto.temporal.api.history.v1.activitytaskcompletedeventattributes.md#identity)
- [result](proto.temporal.api.history.v1.activitytaskcompletedeventattributes.md#result)
- [scheduledEventId](proto.temporal.api.history.v1.activitytaskcompletedeventattributes.md#scheduledeventid)
- [startedEventId](proto.temporal.api.history.v1.activitytaskcompletedeventattributes.md#startedeventid)

### Methods

- [toJSON](proto.temporal.api.history.v1.activitytaskcompletedeventattributes.md#tojson)
- [create](proto.temporal.api.history.v1.activitytaskcompletedeventattributes.md#create)
- [decode](proto.temporal.api.history.v1.activitytaskcompletedeventattributes.md#decode)
- [decodeDelimited](proto.temporal.api.history.v1.activitytaskcompletedeventattributes.md#decodedelimited)
- [encode](proto.temporal.api.history.v1.activitytaskcompletedeventattributes.md#encode)
- [encodeDelimited](proto.temporal.api.history.v1.activitytaskcompletedeventattributes.md#encodedelimited)
- [fromObject](proto.temporal.api.history.v1.activitytaskcompletedeventattributes.md#fromobject)
- [toObject](proto.temporal.api.history.v1.activitytaskcompletedeventattributes.md#toobject)
- [verify](proto.temporal.api.history.v1.activitytaskcompletedeventattributes.md#verify)

## Constructors

### constructor

\+ **new ActivityTaskCompletedEventAttributes**(`properties?`: [*IActivityTaskCompletedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iactivitytaskcompletedeventattributes.md)): [*ActivityTaskCompletedEventAttributes*](proto.temporal.api.history.v1.activitytaskcompletedeventattributes.md)

Constructs a new ActivityTaskCompletedEventAttributes.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IActivityTaskCompletedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iactivitytaskcompletedeventattributes.md) |

**Returns:** [*ActivityTaskCompletedEventAttributes*](proto.temporal.api.history.v1.activitytaskcompletedeventattributes.md)

## Properties

### identity

• **identity**: *string*

ActivityTaskCompletedEventAttributes identity.

Implementation of: [IActivityTaskCompletedEventAttributes](../interfaces/proto.temporal.api.history.v1.iactivitytaskcompletedeventattributes.md).[identity](../interfaces/proto.temporal.api.history.v1.iactivitytaskcompletedeventattributes.md#identity)

___

### result

• `Optional` **result**: *null* \| [*IPayloads*](../interfaces/proto.temporal.api.common.v1.ipayloads.md)

ActivityTaskCompletedEventAttributes result.

Implementation of: [IActivityTaskCompletedEventAttributes](../interfaces/proto.temporal.api.history.v1.iactivitytaskcompletedeventattributes.md).[result](../interfaces/proto.temporal.api.history.v1.iactivitytaskcompletedeventattributes.md#result)

___

### scheduledEventId

• **scheduledEventId**: Long

ActivityTaskCompletedEventAttributes scheduledEventId.

Implementation of: [IActivityTaskCompletedEventAttributes](../interfaces/proto.temporal.api.history.v1.iactivitytaskcompletedeventattributes.md).[scheduledEventId](../interfaces/proto.temporal.api.history.v1.iactivitytaskcompletedeventattributes.md#scheduledeventid)

___

### startedEventId

• **startedEventId**: Long

ActivityTaskCompletedEventAttributes startedEventId.

Implementation of: [IActivityTaskCompletedEventAttributes](../interfaces/proto.temporal.api.history.v1.iactivitytaskcompletedeventattributes.md).[startedEventId](../interfaces/proto.temporal.api.history.v1.iactivitytaskcompletedeventattributes.md#startedeventid)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this ActivityTaskCompletedEventAttributes to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IActivityTaskCompletedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iactivitytaskcompletedeventattributes.md)): [*ActivityTaskCompletedEventAttributes*](proto.temporal.api.history.v1.activitytaskcompletedeventattributes.md)

Creates a new ActivityTaskCompletedEventAttributes instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IActivityTaskCompletedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iactivitytaskcompletedeventattributes.md) |

**Returns:** [*ActivityTaskCompletedEventAttributes*](proto.temporal.api.history.v1.activitytaskcompletedeventattributes.md)

ActivityTaskCompletedEventAttributes instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*ActivityTaskCompletedEventAttributes*](proto.temporal.api.history.v1.activitytaskcompletedeventattributes.md)

Decodes an ActivityTaskCompletedEventAttributes message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*ActivityTaskCompletedEventAttributes*](proto.temporal.api.history.v1.activitytaskcompletedeventattributes.md)

ActivityTaskCompletedEventAttributes

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*ActivityTaskCompletedEventAttributes*](proto.temporal.api.history.v1.activitytaskcompletedeventattributes.md)

Decodes an ActivityTaskCompletedEventAttributes message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*ActivityTaskCompletedEventAttributes*](proto.temporal.api.history.v1.activitytaskcompletedeventattributes.md)

ActivityTaskCompletedEventAttributes

___

### encode

▸ `Static`**encode**(`message`: [*IActivityTaskCompletedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iactivitytaskcompletedeventattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified ActivityTaskCompletedEventAttributes message. Does not implicitly [verify](proto.temporal.api.history.v1.activitytaskcompletedeventattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IActivityTaskCompletedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iactivitytaskcompletedeventattributes.md) | ActivityTaskCompletedEventAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IActivityTaskCompletedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iactivitytaskcompletedeventattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified ActivityTaskCompletedEventAttributes message, length delimited. Does not implicitly [verify](proto.temporal.api.history.v1.activitytaskcompletedeventattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IActivityTaskCompletedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iactivitytaskcompletedeventattributes.md) | ActivityTaskCompletedEventAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*ActivityTaskCompletedEventAttributes*](proto.temporal.api.history.v1.activitytaskcompletedeventattributes.md)

Creates an ActivityTaskCompletedEventAttributes message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*ActivityTaskCompletedEventAttributes*](proto.temporal.api.history.v1.activitytaskcompletedeventattributes.md)

ActivityTaskCompletedEventAttributes

___

### toObject

▸ `Static`**toObject**(`message`: [*ActivityTaskCompletedEventAttributes*](proto.temporal.api.history.v1.activitytaskcompletedeventattributes.md), `options?`: IConversionOptions): *object*

Creates a plain object from an ActivityTaskCompletedEventAttributes message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ActivityTaskCompletedEventAttributes*](proto.temporal.api.history.v1.activitytaskcompletedeventattributes.md) | ActivityTaskCompletedEventAttributes   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies an ActivityTaskCompletedEventAttributes message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
