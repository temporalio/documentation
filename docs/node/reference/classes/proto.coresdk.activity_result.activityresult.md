# Class: ActivityResult

[coresdk](../modules/proto.coresdk.md).[activity_result](../modules/proto.coresdk.activity_result.md).ActivityResult

Used to report activity completion to core and to resolve the activity in a workflow activation

## Implements

* [*IActivityResult*](../interfaces/proto.coresdk.activity_result.iactivityresult.md)

## Table of contents

### Constructors

- [constructor](proto.coresdk.activity_result.activityresult.md#constructor)

### Properties

- [canceled](proto.coresdk.activity_result.activityresult.md#canceled)
- [completed](proto.coresdk.activity_result.activityresult.md#completed)
- [failed](proto.coresdk.activity_result.activityresult.md#failed)
- [status](proto.coresdk.activity_result.activityresult.md#status)

### Methods

- [toJSON](proto.coresdk.activity_result.activityresult.md#tojson)
- [create](proto.coresdk.activity_result.activityresult.md#create)
- [decode](proto.coresdk.activity_result.activityresult.md#decode)
- [decodeDelimited](proto.coresdk.activity_result.activityresult.md#decodedelimited)
- [encode](proto.coresdk.activity_result.activityresult.md#encode)
- [encodeDelimited](proto.coresdk.activity_result.activityresult.md#encodedelimited)
- [fromObject](proto.coresdk.activity_result.activityresult.md#fromobject)
- [toObject](proto.coresdk.activity_result.activityresult.md#toobject)
- [verify](proto.coresdk.activity_result.activityresult.md#verify)

## Constructors

### constructor

\+ **new ActivityResult**(`properties?`: [*IActivityResult*](../interfaces/proto.coresdk.activity_result.iactivityresult.md)): [*ActivityResult*](proto.coresdk.activity_result.activityresult.md)

Constructs a new ActivityResult.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IActivityResult*](../interfaces/proto.coresdk.activity_result.iactivityresult.md) |

**Returns:** [*ActivityResult*](proto.coresdk.activity_result.activityresult.md)

## Properties

### canceled

• `Optional` **canceled**: *null* \| [*ICancelation*](../interfaces/proto.coresdk.activity_result.icancelation.md)

ActivityResult canceled.

Implementation of: [IActivityResult](../interfaces/proto.coresdk.activity_result.iactivityresult.md).[canceled](../interfaces/proto.coresdk.activity_result.iactivityresult.md#canceled)

___

### completed

• `Optional` **completed**: *null* \| [*ISuccess*](../interfaces/proto.coresdk.activity_result.isuccess.md)

ActivityResult completed.

Implementation of: [IActivityResult](../interfaces/proto.coresdk.activity_result.iactivityresult.md).[completed](../interfaces/proto.coresdk.activity_result.iactivityresult.md#completed)

___

### failed

• `Optional` **failed**: *null* \| [*IFailure*](../interfaces/proto.coresdk.activity_result.ifailure.md)

ActivityResult failed.

Implementation of: [IActivityResult](../interfaces/proto.coresdk.activity_result.iactivityresult.md).[failed](../interfaces/proto.coresdk.activity_result.iactivityresult.md#failed)

___

### status

• `Optional` **status**: *completed* \| *failed* \| *canceled*

ActivityResult status.

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this ActivityResult to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IActivityResult*](../interfaces/proto.coresdk.activity_result.iactivityresult.md)): [*ActivityResult*](proto.coresdk.activity_result.activityresult.md)

Creates a new ActivityResult instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IActivityResult*](../interfaces/proto.coresdk.activity_result.iactivityresult.md) |

**Returns:** [*ActivityResult*](proto.coresdk.activity_result.activityresult.md)

ActivityResult instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*ActivityResult*](proto.coresdk.activity_result.activityresult.md)

Decodes an ActivityResult message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*ActivityResult*](proto.coresdk.activity_result.activityresult.md)

ActivityResult

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*ActivityResult*](proto.coresdk.activity_result.activityresult.md)

Decodes an ActivityResult message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*ActivityResult*](proto.coresdk.activity_result.activityresult.md)

ActivityResult

___

### encode

▸ `Static`**encode**(`message`: [*IActivityResult*](../interfaces/proto.coresdk.activity_result.iactivityresult.md), `writer?`: *Writer*): *Writer*

Encodes the specified ActivityResult message. Does not implicitly [verify](proto.coresdk.activity_result.activityresult.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IActivityResult*](../interfaces/proto.coresdk.activity_result.iactivityresult.md) | ActivityResult message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IActivityResult*](../interfaces/proto.coresdk.activity_result.iactivityresult.md), `writer?`: *Writer*): *Writer*

Encodes the specified ActivityResult message, length delimited. Does not implicitly [verify](proto.coresdk.activity_result.activityresult.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IActivityResult*](../interfaces/proto.coresdk.activity_result.iactivityresult.md) | ActivityResult message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*ActivityResult*](proto.coresdk.activity_result.activityresult.md)

Creates an ActivityResult message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*ActivityResult*](proto.coresdk.activity_result.activityresult.md)

ActivityResult

___

### toObject

▸ `Static`**toObject**(`message`: [*ActivityResult*](proto.coresdk.activity_result.activityresult.md), `options?`: IConversionOptions): *object*

Creates a plain object from an ActivityResult message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ActivityResult*](proto.coresdk.activity_result.activityresult.md) | ActivityResult   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies an ActivityResult message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
