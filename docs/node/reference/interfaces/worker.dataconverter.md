# Interface: DataConverter

[worker](../modules/worker.md).DataConverter

Used by the framework to serialize/deserialize method parameters that need to be sent over the
wire.

Implement this in order to customize worker data serialization or use the default data converter which supports `Uint8Array` and JSON serializables.

## Table of contents

### Methods

- [fromPayload](worker.dataconverter.md#frompayload)
- [fromPayloads](worker.dataconverter.md#frompayloads)
- [toPayload](worker.dataconverter.md#topayload)
- [toPayloads](worker.dataconverter.md#topayloads)

## Methods

### fromPayload

▸ **fromPayload**<T\>(`payload`: [*IPayload*](proto.coresdk.common.ipayload.md)): T

#### Type parameters:

Name |
:------ |
`T` |

#### Parameters:

Name | Type |
:------ | :------ |
`payload` | [*IPayload*](proto.coresdk.common.ipayload.md) |

**Returns:** T

___

### fromPayloads

▸ **fromPayloads**<T\>(`index`: *number*, `content?`: *null* \| [*IPayload*](proto.coresdk.common.ipayload.md)[]): T

Implements conversion of an array of values of different types. Useful for deserializing
arguments of function invocations.

**`throws`** DataConverterError if conversion of the data passed as parameter failed for any
    reason.

#### Type parameters:

Name |
:------ |
`T` |

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`index` | *number* | index of the value in the payloads   |
`content?` | *null* \| [*IPayload*](proto.coresdk.common.ipayload.md)[] | serialized value to convert to JS values.   |

**Returns:** T

converted JS value

___

### toPayload

▸ **toPayload**<T\>(`value`: T): [*IPayload*](proto.coresdk.common.ipayload.md)

#### Type parameters:

Name |
:------ |
`T` |

#### Parameters:

Name | Type |
:------ | :------ |
`value` | T |

**Returns:** [*IPayload*](proto.coresdk.common.ipayload.md)

___

### toPayloads

▸ **toPayloads**(...`values`: *any*[]): *undefined* \| [*IPayload*](proto.coresdk.common.ipayload.md)[]

Implements conversion of a list of values.

**`throws`** DataConverterError if conversion of the value passed as parameter failed for any
    reason.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`...values` | *any*[] | JS values to convert to Payloads.   |

**Returns:** *undefined* \| [*IPayload*](proto.coresdk.common.ipayload.md)[]

converted value
