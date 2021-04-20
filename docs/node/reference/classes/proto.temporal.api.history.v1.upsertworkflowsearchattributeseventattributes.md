# Class: UpsertWorkflowSearchAttributesEventAttributes

[history](../modules/proto.temporal.api.history.md).[v1](../modules/proto.temporal.api.history.v1.md).UpsertWorkflowSearchAttributesEventAttributes

Represents an UpsertWorkflowSearchAttributesEventAttributes.

## Implements

* [*IUpsertWorkflowSearchAttributesEventAttributes*](../interfaces/proto.temporal.api.history.v1.iupsertworkflowsearchattributeseventattributes.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.history.v1.upsertworkflowsearchattributeseventattributes.md#constructor)

### Properties

- [searchAttributes](proto.temporal.api.history.v1.upsertworkflowsearchattributeseventattributes.md#searchattributes)
- [workflowTaskCompletedEventId](proto.temporal.api.history.v1.upsertworkflowsearchattributeseventattributes.md#workflowtaskcompletedeventid)

### Methods

- [toJSON](proto.temporal.api.history.v1.upsertworkflowsearchattributeseventattributes.md#tojson)
- [create](proto.temporal.api.history.v1.upsertworkflowsearchattributeseventattributes.md#create)
- [decode](proto.temporal.api.history.v1.upsertworkflowsearchattributeseventattributes.md#decode)
- [decodeDelimited](proto.temporal.api.history.v1.upsertworkflowsearchattributeseventattributes.md#decodedelimited)
- [encode](proto.temporal.api.history.v1.upsertworkflowsearchattributeseventattributes.md#encode)
- [encodeDelimited](proto.temporal.api.history.v1.upsertworkflowsearchattributeseventattributes.md#encodedelimited)
- [fromObject](proto.temporal.api.history.v1.upsertworkflowsearchattributeseventattributes.md#fromobject)
- [toObject](proto.temporal.api.history.v1.upsertworkflowsearchattributeseventattributes.md#toobject)
- [verify](proto.temporal.api.history.v1.upsertworkflowsearchattributeseventattributes.md#verify)

## Constructors

### constructor

\+ **new UpsertWorkflowSearchAttributesEventAttributes**(`properties?`: [*IUpsertWorkflowSearchAttributesEventAttributes*](../interfaces/proto.temporal.api.history.v1.iupsertworkflowsearchattributeseventattributes.md)): [*UpsertWorkflowSearchAttributesEventAttributes*](proto.temporal.api.history.v1.upsertworkflowsearchattributeseventattributes.md)

Constructs a new UpsertWorkflowSearchAttributesEventAttributes.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IUpsertWorkflowSearchAttributesEventAttributes*](../interfaces/proto.temporal.api.history.v1.iupsertworkflowsearchattributeseventattributes.md) |

**Returns:** [*UpsertWorkflowSearchAttributesEventAttributes*](proto.temporal.api.history.v1.upsertworkflowsearchattributeseventattributes.md)

## Properties

### searchAttributes

• `Optional` **searchAttributes**: *null* \| [*ISearchAttributes*](../interfaces/proto.temporal.api.common.v1.isearchattributes.md)

UpsertWorkflowSearchAttributesEventAttributes searchAttributes.

Implementation of: [IUpsertWorkflowSearchAttributesEventAttributes](../interfaces/proto.temporal.api.history.v1.iupsertworkflowsearchattributeseventattributes.md).[searchAttributes](../interfaces/proto.temporal.api.history.v1.iupsertworkflowsearchattributeseventattributes.md#searchattributes)

___

### workflowTaskCompletedEventId

• **workflowTaskCompletedEventId**: Long

UpsertWorkflowSearchAttributesEventAttributes workflowTaskCompletedEventId.

Implementation of: [IUpsertWorkflowSearchAttributesEventAttributes](../interfaces/proto.temporal.api.history.v1.iupsertworkflowsearchattributeseventattributes.md).[workflowTaskCompletedEventId](../interfaces/proto.temporal.api.history.v1.iupsertworkflowsearchattributeseventattributes.md#workflowtaskcompletedeventid)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this UpsertWorkflowSearchAttributesEventAttributes to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IUpsertWorkflowSearchAttributesEventAttributes*](../interfaces/proto.temporal.api.history.v1.iupsertworkflowsearchattributeseventattributes.md)): [*UpsertWorkflowSearchAttributesEventAttributes*](proto.temporal.api.history.v1.upsertworkflowsearchattributeseventattributes.md)

Creates a new UpsertWorkflowSearchAttributesEventAttributes instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IUpsertWorkflowSearchAttributesEventAttributes*](../interfaces/proto.temporal.api.history.v1.iupsertworkflowsearchattributeseventattributes.md) |

**Returns:** [*UpsertWorkflowSearchAttributesEventAttributes*](proto.temporal.api.history.v1.upsertworkflowsearchattributeseventattributes.md)

UpsertWorkflowSearchAttributesEventAttributes instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*UpsertWorkflowSearchAttributesEventAttributes*](proto.temporal.api.history.v1.upsertworkflowsearchattributeseventattributes.md)

Decodes an UpsertWorkflowSearchAttributesEventAttributes message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*UpsertWorkflowSearchAttributesEventAttributes*](proto.temporal.api.history.v1.upsertworkflowsearchattributeseventattributes.md)

UpsertWorkflowSearchAttributesEventAttributes

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*UpsertWorkflowSearchAttributesEventAttributes*](proto.temporal.api.history.v1.upsertworkflowsearchattributeseventattributes.md)

Decodes an UpsertWorkflowSearchAttributesEventAttributes message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*UpsertWorkflowSearchAttributesEventAttributes*](proto.temporal.api.history.v1.upsertworkflowsearchattributeseventattributes.md)

UpsertWorkflowSearchAttributesEventAttributes

___

### encode

▸ `Static`**encode**(`message`: [*IUpsertWorkflowSearchAttributesEventAttributes*](../interfaces/proto.temporal.api.history.v1.iupsertworkflowsearchattributeseventattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified UpsertWorkflowSearchAttributesEventAttributes message. Does not implicitly [verify](proto.temporal.api.history.v1.upsertworkflowsearchattributeseventattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IUpsertWorkflowSearchAttributesEventAttributes*](../interfaces/proto.temporal.api.history.v1.iupsertworkflowsearchattributeseventattributes.md) | UpsertWorkflowSearchAttributesEventAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IUpsertWorkflowSearchAttributesEventAttributes*](../interfaces/proto.temporal.api.history.v1.iupsertworkflowsearchattributeseventattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified UpsertWorkflowSearchAttributesEventAttributes message, length delimited. Does not implicitly [verify](proto.temporal.api.history.v1.upsertworkflowsearchattributeseventattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IUpsertWorkflowSearchAttributesEventAttributes*](../interfaces/proto.temporal.api.history.v1.iupsertworkflowsearchattributeseventattributes.md) | UpsertWorkflowSearchAttributesEventAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*UpsertWorkflowSearchAttributesEventAttributes*](proto.temporal.api.history.v1.upsertworkflowsearchattributeseventattributes.md)

Creates an UpsertWorkflowSearchAttributesEventAttributes message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*UpsertWorkflowSearchAttributesEventAttributes*](proto.temporal.api.history.v1.upsertworkflowsearchattributeseventattributes.md)

UpsertWorkflowSearchAttributesEventAttributes

___

### toObject

▸ `Static`**toObject**(`message`: [*UpsertWorkflowSearchAttributesEventAttributes*](proto.temporal.api.history.v1.upsertworkflowsearchattributeseventattributes.md), `options?`: IConversionOptions): *object*

Creates a plain object from an UpsertWorkflowSearchAttributesEventAttributes message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*UpsertWorkflowSearchAttributesEventAttributes*](proto.temporal.api.history.v1.upsertworkflowsearchattributeseventattributes.md) | UpsertWorkflowSearchAttributesEventAttributes   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies an UpsertWorkflowSearchAttributesEventAttributes message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
