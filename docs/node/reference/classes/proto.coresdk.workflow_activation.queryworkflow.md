# Class: QueryWorkflow

[coresdk](../modules/proto.coresdk.md).[workflow_activation](../modules/proto.coresdk.workflow_activation.md).QueryWorkflow

Query a workflow

## Implements

* [*IQueryWorkflow*](../interfaces/proto.coresdk.workflow_activation.iqueryworkflow.md)

## Table of contents

### Constructors

- [constructor](proto.coresdk.workflow_activation.queryworkflow.md#constructor)

### Properties

- [arguments](proto.coresdk.workflow_activation.queryworkflow.md#arguments)
- [queryType](proto.coresdk.workflow_activation.queryworkflow.md#querytype)

### Methods

- [toJSON](proto.coresdk.workflow_activation.queryworkflow.md#tojson)
- [create](proto.coresdk.workflow_activation.queryworkflow.md#create)
- [decode](proto.coresdk.workflow_activation.queryworkflow.md#decode)
- [decodeDelimited](proto.coresdk.workflow_activation.queryworkflow.md#decodedelimited)
- [encode](proto.coresdk.workflow_activation.queryworkflow.md#encode)
- [encodeDelimited](proto.coresdk.workflow_activation.queryworkflow.md#encodedelimited)
- [fromObject](proto.coresdk.workflow_activation.queryworkflow.md#fromobject)
- [toObject](proto.coresdk.workflow_activation.queryworkflow.md#toobject)
- [verify](proto.coresdk.workflow_activation.queryworkflow.md#verify)

## Constructors

### constructor

\+ **new QueryWorkflow**(`properties?`: [*IQueryWorkflow*](../interfaces/proto.coresdk.workflow_activation.iqueryworkflow.md)): [*QueryWorkflow*](proto.coresdk.workflow_activation.queryworkflow.md)

Constructs a new QueryWorkflow.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IQueryWorkflow*](../interfaces/proto.coresdk.workflow_activation.iqueryworkflow.md) |

**Returns:** [*QueryWorkflow*](proto.coresdk.workflow_activation.queryworkflow.md)

## Properties

### arguments

• **arguments**: [*IPayload*](../interfaces/proto.coresdk.common.ipayload.md)[]

QueryWorkflow arguments.

Implementation of: [IQueryWorkflow](../interfaces/proto.coresdk.workflow_activation.iqueryworkflow.md).[arguments](../interfaces/proto.coresdk.workflow_activation.iqueryworkflow.md#arguments)

___

### queryType

• **queryType**: *string*

QueryWorkflow queryType.

Implementation of: [IQueryWorkflow](../interfaces/proto.coresdk.workflow_activation.iqueryworkflow.md).[queryType](../interfaces/proto.coresdk.workflow_activation.iqueryworkflow.md#querytype)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this QueryWorkflow to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IQueryWorkflow*](../interfaces/proto.coresdk.workflow_activation.iqueryworkflow.md)): [*QueryWorkflow*](proto.coresdk.workflow_activation.queryworkflow.md)

Creates a new QueryWorkflow instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IQueryWorkflow*](../interfaces/proto.coresdk.workflow_activation.iqueryworkflow.md) |

**Returns:** [*QueryWorkflow*](proto.coresdk.workflow_activation.queryworkflow.md)

QueryWorkflow instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*QueryWorkflow*](proto.coresdk.workflow_activation.queryworkflow.md)

Decodes a QueryWorkflow message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*QueryWorkflow*](proto.coresdk.workflow_activation.queryworkflow.md)

QueryWorkflow

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*QueryWorkflow*](proto.coresdk.workflow_activation.queryworkflow.md)

Decodes a QueryWorkflow message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*QueryWorkflow*](proto.coresdk.workflow_activation.queryworkflow.md)

QueryWorkflow

___

### encode

▸ `Static`**encode**(`message`: [*IQueryWorkflow*](../interfaces/proto.coresdk.workflow_activation.iqueryworkflow.md), `writer?`: *Writer*): *Writer*

Encodes the specified QueryWorkflow message. Does not implicitly [verify](proto.coresdk.workflow_activation.queryworkflow.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IQueryWorkflow*](../interfaces/proto.coresdk.workflow_activation.iqueryworkflow.md) | QueryWorkflow message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IQueryWorkflow*](../interfaces/proto.coresdk.workflow_activation.iqueryworkflow.md), `writer?`: *Writer*): *Writer*

Encodes the specified QueryWorkflow message, length delimited. Does not implicitly [verify](proto.coresdk.workflow_activation.queryworkflow.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IQueryWorkflow*](../interfaces/proto.coresdk.workflow_activation.iqueryworkflow.md) | QueryWorkflow message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*QueryWorkflow*](proto.coresdk.workflow_activation.queryworkflow.md)

Creates a QueryWorkflow message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*QueryWorkflow*](proto.coresdk.workflow_activation.queryworkflow.md)

QueryWorkflow

___

### toObject

▸ `Static`**toObject**(`message`: [*QueryWorkflow*](proto.coresdk.workflow_activation.queryworkflow.md), `options?`: IConversionOptions): *object*

Creates a plain object from a QueryWorkflow message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*QueryWorkflow*](proto.coresdk.workflow_activation.queryworkflow.md) | QueryWorkflow   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a QueryWorkflow message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
