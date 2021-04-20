# Class: GetClusterInfoResponse

[workflowservice](../modules/proto.temporal.api.workflowservice.md).[v1](../modules/proto.temporal.api.workflowservice.v1.md).GetClusterInfoResponse

Represents a GetClusterInfoResponse.

## Implements

* [*IGetClusterInfoResponse*](../interfaces/proto.temporal.api.workflowservice.v1.igetclusterinforesponse.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.workflowservice.v1.getclusterinforesponse.md#constructor)

### Properties

- [clusterId](proto.temporal.api.workflowservice.v1.getclusterinforesponse.md#clusterid)
- [clusterName](proto.temporal.api.workflowservice.v1.getclusterinforesponse.md#clustername)
- [historyShardCount](proto.temporal.api.workflowservice.v1.getclusterinforesponse.md#historyshardcount)
- [serverVersion](proto.temporal.api.workflowservice.v1.getclusterinforesponse.md#serverversion)
- [supportedClients](proto.temporal.api.workflowservice.v1.getclusterinforesponse.md#supportedclients)
- [versionInfo](proto.temporal.api.workflowservice.v1.getclusterinforesponse.md#versioninfo)

### Methods

- [toJSON](proto.temporal.api.workflowservice.v1.getclusterinforesponse.md#tojson)
- [create](proto.temporal.api.workflowservice.v1.getclusterinforesponse.md#create)
- [decode](proto.temporal.api.workflowservice.v1.getclusterinforesponse.md#decode)
- [decodeDelimited](proto.temporal.api.workflowservice.v1.getclusterinforesponse.md#decodedelimited)
- [encode](proto.temporal.api.workflowservice.v1.getclusterinforesponse.md#encode)
- [encodeDelimited](proto.temporal.api.workflowservice.v1.getclusterinforesponse.md#encodedelimited)
- [fromObject](proto.temporal.api.workflowservice.v1.getclusterinforesponse.md#fromobject)
- [toObject](proto.temporal.api.workflowservice.v1.getclusterinforesponse.md#toobject)
- [verify](proto.temporal.api.workflowservice.v1.getclusterinforesponse.md#verify)

## Constructors

### constructor

\+ **new GetClusterInfoResponse**(`properties?`: [*IGetClusterInfoResponse*](../interfaces/proto.temporal.api.workflowservice.v1.igetclusterinforesponse.md)): [*GetClusterInfoResponse*](proto.temporal.api.workflowservice.v1.getclusterinforesponse.md)

Constructs a new GetClusterInfoResponse.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IGetClusterInfoResponse*](../interfaces/proto.temporal.api.workflowservice.v1.igetclusterinforesponse.md) |

**Returns:** [*GetClusterInfoResponse*](proto.temporal.api.workflowservice.v1.getclusterinforesponse.md)

## Properties

### clusterId

• **clusterId**: *string*

GetClusterInfoResponse clusterId.

Implementation of: [IGetClusterInfoResponse](../interfaces/proto.temporal.api.workflowservice.v1.igetclusterinforesponse.md).[clusterId](../interfaces/proto.temporal.api.workflowservice.v1.igetclusterinforesponse.md#clusterid)

___

### clusterName

• **clusterName**: *string*

GetClusterInfoResponse clusterName.

Implementation of: [IGetClusterInfoResponse](../interfaces/proto.temporal.api.workflowservice.v1.igetclusterinforesponse.md).[clusterName](../interfaces/proto.temporal.api.workflowservice.v1.igetclusterinforesponse.md#clustername)

___

### historyShardCount

• **historyShardCount**: *number*

GetClusterInfoResponse historyShardCount.

Implementation of: [IGetClusterInfoResponse](../interfaces/proto.temporal.api.workflowservice.v1.igetclusterinforesponse.md).[historyShardCount](../interfaces/proto.temporal.api.workflowservice.v1.igetclusterinforesponse.md#historyshardcount)

___

### serverVersion

• **serverVersion**: *string*

GetClusterInfoResponse serverVersion.

Implementation of: [IGetClusterInfoResponse](../interfaces/proto.temporal.api.workflowservice.v1.igetclusterinforesponse.md).[serverVersion](../interfaces/proto.temporal.api.workflowservice.v1.igetclusterinforesponse.md#serverversion)

___

### supportedClients

• **supportedClients**: *object*

GetClusterInfoResponse supportedClients.

#### Type declaration:

Implementation of: [IGetClusterInfoResponse](../interfaces/proto.temporal.api.workflowservice.v1.igetclusterinforesponse.md).[supportedClients](../interfaces/proto.temporal.api.workflowservice.v1.igetclusterinforesponse.md#supportedclients)

___

### versionInfo

• `Optional` **versionInfo**: *null* \| [*IVersionInfo*](../interfaces/proto.temporal.api.version.v1.iversioninfo.md)

GetClusterInfoResponse versionInfo.

Implementation of: [IGetClusterInfoResponse](../interfaces/proto.temporal.api.workflowservice.v1.igetclusterinforesponse.md).[versionInfo](../interfaces/proto.temporal.api.workflowservice.v1.igetclusterinforesponse.md#versioninfo)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this GetClusterInfoResponse to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IGetClusterInfoResponse*](../interfaces/proto.temporal.api.workflowservice.v1.igetclusterinforesponse.md)): [*GetClusterInfoResponse*](proto.temporal.api.workflowservice.v1.getclusterinforesponse.md)

Creates a new GetClusterInfoResponse instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IGetClusterInfoResponse*](../interfaces/proto.temporal.api.workflowservice.v1.igetclusterinforesponse.md) |

**Returns:** [*GetClusterInfoResponse*](proto.temporal.api.workflowservice.v1.getclusterinforesponse.md)

GetClusterInfoResponse instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*GetClusterInfoResponse*](proto.temporal.api.workflowservice.v1.getclusterinforesponse.md)

Decodes a GetClusterInfoResponse message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*GetClusterInfoResponse*](proto.temporal.api.workflowservice.v1.getclusterinforesponse.md)

GetClusterInfoResponse

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*GetClusterInfoResponse*](proto.temporal.api.workflowservice.v1.getclusterinforesponse.md)

Decodes a GetClusterInfoResponse message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*GetClusterInfoResponse*](proto.temporal.api.workflowservice.v1.getclusterinforesponse.md)

GetClusterInfoResponse

___

### encode

▸ `Static`**encode**(`message`: [*IGetClusterInfoResponse*](../interfaces/proto.temporal.api.workflowservice.v1.igetclusterinforesponse.md), `writer?`: *Writer*): *Writer*

Encodes the specified GetClusterInfoResponse message. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.getclusterinforesponse.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IGetClusterInfoResponse*](../interfaces/proto.temporal.api.workflowservice.v1.igetclusterinforesponse.md) | GetClusterInfoResponse message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IGetClusterInfoResponse*](../interfaces/proto.temporal.api.workflowservice.v1.igetclusterinforesponse.md), `writer?`: *Writer*): *Writer*

Encodes the specified GetClusterInfoResponse message, length delimited. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.getclusterinforesponse.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IGetClusterInfoResponse*](../interfaces/proto.temporal.api.workflowservice.v1.igetclusterinforesponse.md) | GetClusterInfoResponse message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*GetClusterInfoResponse*](proto.temporal.api.workflowservice.v1.getclusterinforesponse.md)

Creates a GetClusterInfoResponse message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*GetClusterInfoResponse*](proto.temporal.api.workflowservice.v1.getclusterinforesponse.md)

GetClusterInfoResponse

___

### toObject

▸ `Static`**toObject**(`message`: [*GetClusterInfoResponse*](proto.temporal.api.workflowservice.v1.getclusterinforesponse.md), `options?`: IConversionOptions): *object*

Creates a plain object from a GetClusterInfoResponse message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*GetClusterInfoResponse*](proto.temporal.api.workflowservice.v1.getclusterinforesponse.md) | GetClusterInfoResponse   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a GetClusterInfoResponse message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
