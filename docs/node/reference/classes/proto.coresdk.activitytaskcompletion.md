# Class: ActivityTaskCompletion

[proto](../modules/proto.md).[coresdk](../modules/proto.coresdk.md).ActivityTaskCompletion

Represents an ActivityTaskCompletion.

## Implements

* [*IActivityTaskCompletion*](../interfaces/proto.coresdk.iactivitytaskcompletion.md)

## Table of contents

### Constructors

- [constructor](proto.coresdk.activitytaskcompletion.md#constructor)

### Properties

- [result](proto.coresdk.activitytaskcompletion.md#result)
- [taskToken](proto.coresdk.activitytaskcompletion.md#tasktoken)

### Methods

- [toJSON](proto.coresdk.activitytaskcompletion.md#tojson)
- [create](proto.coresdk.activitytaskcompletion.md#create)
- [decode](proto.coresdk.activitytaskcompletion.md#decode)
- [decodeDelimited](proto.coresdk.activitytaskcompletion.md#decodedelimited)
- [encode](proto.coresdk.activitytaskcompletion.md#encode)
- [encodeDelimited](proto.coresdk.activitytaskcompletion.md#encodedelimited)
- [fromObject](proto.coresdk.activitytaskcompletion.md#fromobject)
- [toObject](proto.coresdk.activitytaskcompletion.md#toobject)
- [verify](proto.coresdk.activitytaskcompletion.md#verify)

## Constructors

### constructor

\+ **new ActivityTaskCompletion**(`properties?`: [*IActivityTaskCompletion*](../interfaces/proto.coresdk.iactivitytaskcompletion.md)): [*ActivityTaskCompletion*](proto.coresdk.activitytaskcompletion.md)

Constructs a new ActivityTaskCompletion.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IActivityTaskCompletion*](../interfaces/proto.coresdk.iactivitytaskcompletion.md) |

**Returns:** [*ActivityTaskCompletion*](proto.coresdk.activitytaskcompletion.md)

## Properties

### result

• `Optional` **result**: *null* \| [*IActivityResult*](../interfaces/proto.coresdk.activity_result.iactivityresult.md)

ActivityTaskCompletion result.

Implementation of: [IActivityTaskCompletion](../interfaces/proto.coresdk.iactivitytaskcompletion.md).[result](../interfaces/proto.coresdk.iactivitytaskcompletion.md#result)

___

### taskToken

• **taskToken**: *Uint8Array*

ActivityTaskCompletion taskToken.

Implementation of: [IActivityTaskCompletion](../interfaces/proto.coresdk.iactivitytaskcompletion.md).[taskToken](../interfaces/proto.coresdk.iactivitytaskcompletion.md#tasktoken)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this ActivityTaskCompletion to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IActivityTaskCompletion*](../interfaces/proto.coresdk.iactivitytaskcompletion.md)): [*ActivityTaskCompletion*](proto.coresdk.activitytaskcompletion.md)

Creates a new ActivityTaskCompletion instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IActivityTaskCompletion*](../interfaces/proto.coresdk.iactivitytaskcompletion.md) |

**Returns:** [*ActivityTaskCompletion*](proto.coresdk.activitytaskcompletion.md)

ActivityTaskCompletion instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*ActivityTaskCompletion*](proto.coresdk.activitytaskcompletion.md)

Decodes an ActivityTaskCompletion message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*ActivityTaskCompletion*](proto.coresdk.activitytaskcompletion.md)

ActivityTaskCompletion

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*ActivityTaskCompletion*](proto.coresdk.activitytaskcompletion.md)

Decodes an ActivityTaskCompletion message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*ActivityTaskCompletion*](proto.coresdk.activitytaskcompletion.md)

ActivityTaskCompletion

___

### encode

▸ `Static`**encode**(`message`: [*IActivityTaskCompletion*](../interfaces/proto.coresdk.iactivitytaskcompletion.md), `writer?`: *Writer*): *Writer*

Encodes the specified ActivityTaskCompletion message. Does not implicitly [verify](proto.coresdk.activitytaskcompletion.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IActivityTaskCompletion*](../interfaces/proto.coresdk.iactivitytaskcompletion.md) | ActivityTaskCompletion message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IActivityTaskCompletion*](../interfaces/proto.coresdk.iactivitytaskcompletion.md), `writer?`: *Writer*): *Writer*

Encodes the specified ActivityTaskCompletion message, length delimited. Does not implicitly [verify](proto.coresdk.activitytaskcompletion.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IActivityTaskCompletion*](../interfaces/proto.coresdk.iactivitytaskcompletion.md) | ActivityTaskCompletion message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*ActivityTaskCompletion*](proto.coresdk.activitytaskcompletion.md)

Creates an ActivityTaskCompletion message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*ActivityTaskCompletion*](proto.coresdk.activitytaskcompletion.md)

ActivityTaskCompletion

___

### toObject

▸ `Static`**toObject**(`message`: [*ActivityTaskCompletion*](proto.coresdk.activitytaskcompletion.md), `options?`: IConversionOptions): *object*

Creates a plain object from an ActivityTaskCompletion message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ActivityTaskCompletion*](proto.coresdk.activitytaskcompletion.md) | ActivityTaskCompletion   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies an ActivityTaskCompletion message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
