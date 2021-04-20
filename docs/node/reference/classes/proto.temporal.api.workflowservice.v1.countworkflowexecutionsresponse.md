# Class: CountWorkflowExecutionsResponse

[workflowservice](../modules/proto.temporal.api.workflowservice.md).[v1](../modules/proto.temporal.api.workflowservice.v1.md).CountWorkflowExecutionsResponse

Represents a CountWorkflowExecutionsResponse.

## Implements

* [*ICountWorkflowExecutionsResponse*](../interfaces/proto.temporal.api.workflowservice.v1.icountworkflowexecutionsresponse.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.workflowservice.v1.countworkflowexecutionsresponse.md#constructor)

### Properties

- [count](proto.temporal.api.workflowservice.v1.countworkflowexecutionsresponse.md#count)

### Methods

- [toJSON](proto.temporal.api.workflowservice.v1.countworkflowexecutionsresponse.md#tojson)
- [create](proto.temporal.api.workflowservice.v1.countworkflowexecutionsresponse.md#create)
- [decode](proto.temporal.api.workflowservice.v1.countworkflowexecutionsresponse.md#decode)
- [decodeDelimited](proto.temporal.api.workflowservice.v1.countworkflowexecutionsresponse.md#decodedelimited)
- [encode](proto.temporal.api.workflowservice.v1.countworkflowexecutionsresponse.md#encode)
- [encodeDelimited](proto.temporal.api.workflowservice.v1.countworkflowexecutionsresponse.md#encodedelimited)
- [fromObject](proto.temporal.api.workflowservice.v1.countworkflowexecutionsresponse.md#fromobject)
- [toObject](proto.temporal.api.workflowservice.v1.countworkflowexecutionsresponse.md#toobject)
- [verify](proto.temporal.api.workflowservice.v1.countworkflowexecutionsresponse.md#verify)

## Constructors

### constructor

\+ **new CountWorkflowExecutionsResponse**(`properties?`: [*ICountWorkflowExecutionsResponse*](../interfaces/proto.temporal.api.workflowservice.v1.icountworkflowexecutionsresponse.md)): [*CountWorkflowExecutionsResponse*](proto.temporal.api.workflowservice.v1.countworkflowexecutionsresponse.md)

Constructs a new CountWorkflowExecutionsResponse.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*ICountWorkflowExecutionsResponse*](../interfaces/proto.temporal.api.workflowservice.v1.icountworkflowexecutionsresponse.md) |

**Returns:** [*CountWorkflowExecutionsResponse*](proto.temporal.api.workflowservice.v1.countworkflowexecutionsresponse.md)

## Properties

### count

• **count**: Long

CountWorkflowExecutionsResponse count.

Implementation of: [ICountWorkflowExecutionsResponse](../interfaces/proto.temporal.api.workflowservice.v1.icountworkflowexecutionsresponse.md).[count](../interfaces/proto.temporal.api.workflowservice.v1.icountworkflowexecutionsresponse.md#count)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this CountWorkflowExecutionsResponse to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*ICountWorkflowExecutionsResponse*](../interfaces/proto.temporal.api.workflowservice.v1.icountworkflowexecutionsresponse.md)): [*CountWorkflowExecutionsResponse*](proto.temporal.api.workflowservice.v1.countworkflowexecutionsresponse.md)

Creates a new CountWorkflowExecutionsResponse instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*ICountWorkflowExecutionsResponse*](../interfaces/proto.temporal.api.workflowservice.v1.icountworkflowexecutionsresponse.md) |

**Returns:** [*CountWorkflowExecutionsResponse*](proto.temporal.api.workflowservice.v1.countworkflowexecutionsresponse.md)

CountWorkflowExecutionsResponse instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*CountWorkflowExecutionsResponse*](proto.temporal.api.workflowservice.v1.countworkflowexecutionsresponse.md)

Decodes a CountWorkflowExecutionsResponse message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*CountWorkflowExecutionsResponse*](proto.temporal.api.workflowservice.v1.countworkflowexecutionsresponse.md)

CountWorkflowExecutionsResponse

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*CountWorkflowExecutionsResponse*](proto.temporal.api.workflowservice.v1.countworkflowexecutionsresponse.md)

Decodes a CountWorkflowExecutionsResponse message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*CountWorkflowExecutionsResponse*](proto.temporal.api.workflowservice.v1.countworkflowexecutionsresponse.md)

CountWorkflowExecutionsResponse

___

### encode

▸ `Static`**encode**(`message`: [*ICountWorkflowExecutionsResponse*](../interfaces/proto.temporal.api.workflowservice.v1.icountworkflowexecutionsresponse.md), `writer?`: *Writer*): *Writer*

Encodes the specified CountWorkflowExecutionsResponse message. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.countworkflowexecutionsresponse.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ICountWorkflowExecutionsResponse*](../interfaces/proto.temporal.api.workflowservice.v1.icountworkflowexecutionsresponse.md) | CountWorkflowExecutionsResponse message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*ICountWorkflowExecutionsResponse*](../interfaces/proto.temporal.api.workflowservice.v1.icountworkflowexecutionsresponse.md), `writer?`: *Writer*): *Writer*

Encodes the specified CountWorkflowExecutionsResponse message, length delimited. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.countworkflowexecutionsresponse.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ICountWorkflowExecutionsResponse*](../interfaces/proto.temporal.api.workflowservice.v1.icountworkflowexecutionsresponse.md) | CountWorkflowExecutionsResponse message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*CountWorkflowExecutionsResponse*](proto.temporal.api.workflowservice.v1.countworkflowexecutionsresponse.md)

Creates a CountWorkflowExecutionsResponse message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*CountWorkflowExecutionsResponse*](proto.temporal.api.workflowservice.v1.countworkflowexecutionsresponse.md)

CountWorkflowExecutionsResponse

___

### toObject

▸ `Static`**toObject**(`message`: [*CountWorkflowExecutionsResponse*](proto.temporal.api.workflowservice.v1.countworkflowexecutionsresponse.md), `options?`: IConversionOptions): *object*

Creates a plain object from a CountWorkflowExecutionsResponse message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*CountWorkflowExecutionsResponse*](proto.temporal.api.workflowservice.v1.countworkflowexecutionsresponse.md) | CountWorkflowExecutionsResponse   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a CountWorkflowExecutionsResponse message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
