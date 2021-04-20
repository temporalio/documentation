# Interface: Logger

[worker](../modules/worker.md).Logger

Implement this interface in order to customize worker logging

## Implemented by

* [*DefaultLogger*](../classes/worker.defaultlogger.md)

## Table of contents

### Methods

- [debug](worker.logger.md#debug)
- [error](worker.logger.md#error)
- [info](worker.logger.md#info)
- [warn](worker.logger.md#warn)

## Methods

### debug

▸ **debug**(`message`: *string*, `meta?`: *Record*<string, any\>): *any*

#### Parameters:

Name | Type |
:------ | :------ |
`message` | *string* |
`meta?` | *Record*<string, any\> |

**Returns:** *any*

___

### error

▸ **error**(`message`: *string*, `meta?`: *Record*<string, any\>): *any*

#### Parameters:

Name | Type |
:------ | :------ |
`message` | *string* |
`meta?` | *Record*<string, any\> |

**Returns:** *any*

___

### info

▸ **info**(`message`: *string*, `meta?`: *Record*<string, any\>): *any*

#### Parameters:

Name | Type |
:------ | :------ |
`message` | *string* |
`meta?` | *Record*<string, any\> |

**Returns:** *any*

___

### warn

▸ **warn**(`message`: *string*, `meta?`: *Record*<string, any\>): *any*

#### Parameters:

Name | Type |
:------ | :------ |
`message` | *string* |
`meta?` | *Record*<string, any\> |

**Returns:** *any*
