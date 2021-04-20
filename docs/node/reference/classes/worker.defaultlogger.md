# Class: DefaultLogger

[worker](../modules/worker.md).DefaultLogger

Default worker logger - uses a default log function to log messages to `console.error`.
See constructor arguments for customization.

## Implements

* [*Logger*](../interfaces/worker.logger.md)

## Table of contents

### Constructors

- [constructor](worker.defaultlogger.md#constructor)

### Properties

- [level](worker.defaultlogger.md#level)

### Methods

- [debug](worker.defaultlogger.md#debug)
- [error](worker.defaultlogger.md#error)
- [info](worker.defaultlogger.md#info)
- [log](worker.defaultlogger.md#log)
- [warn](worker.defaultlogger.md#warn)

## Constructors

### constructor

\+ **new DefaultLogger**(`level?`: [*LogLevel*](../modules/worker.md#loglevel), `logFunction?`: (`level`: [*LogLevel*](../modules/worker.md#loglevel), `message`: *string*, `meta?`: *Record*<string, any\>) => *void*): [*DefaultLogger*](worker.defaultlogger.md)

#### Parameters:

Name | Type |
:------ | :------ |
`level?` | [*LogLevel*](../modules/worker.md#loglevel) |
`logFunction?` | (`level`: [*LogLevel*](../modules/worker.md#loglevel), `message`: *string*, `meta?`: *Record*<string, any\>) => *void* |

**Returns:** [*DefaultLogger*](worker.defaultlogger.md)

## Properties

### level

• `Readonly` **level**: [*LogLevel*](../modules/worker.md#loglevel)

## Methods

### debug

▸ **debug**(`message`: *string*, `meta?`: *Record*<string, any\>): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`message` | *string* |
`meta?` | *Record*<string, any\> |

**Returns:** *void*

Implementation of: [Logger](../interfaces/worker.logger.md)

___

### error

▸ **error**(`message`: *string*, `meta?`: *Record*<string, any\>): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`message` | *string* |
`meta?` | *Record*<string, any\> |

**Returns:** *void*

Implementation of: [Logger](../interfaces/worker.logger.md)

___

### info

▸ **info**(`message`: *string*, `meta?`: *Record*<string, any\>): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`message` | *string* |
`meta?` | *Record*<string, any\> |

**Returns:** *void*

Implementation of: [Logger](../interfaces/worker.logger.md)

___

### log

▸ **log**(`level`: [*LogLevel*](../modules/worker.md#loglevel), `message`: *string*, `meta?`: *Record*<string, any\>): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`level` | [*LogLevel*](../modules/worker.md#loglevel) |
`message` | *string* |
`meta?` | *Record*<string, any\> |

**Returns:** *void*

___

### warn

▸ **warn**(`message`: *string*, `meta?`: *Record*<string, any\>): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`message` | *string* |
`meta?` | *Record*<string, any\> |

**Returns:** *void*

Implementation of: [Logger](../interfaces/worker.logger.md)
