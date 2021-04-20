# Interface: IRespondQueryTaskCompletedRequest

[workflowservice](../modules/proto.temporal.api.workflowservice.md).[v1](../modules/proto.temporal.api.workflowservice.v1.md).IRespondQueryTaskCompletedRequest

Properties of a RespondQueryTaskCompletedRequest.

## Implemented by

* [*RespondQueryTaskCompletedRequest*](../classes/proto.temporal.api.workflowservice.v1.respondquerytaskcompletedrequest.md)

## Table of contents

### Properties

- [completedType](proto.temporal.api.workflowservice.v1.irespondquerytaskcompletedrequest.md#completedtype)
- [errorMessage](proto.temporal.api.workflowservice.v1.irespondquerytaskcompletedrequest.md#errormessage)
- [namespace](proto.temporal.api.workflowservice.v1.irespondquerytaskcompletedrequest.md#namespace)
- [queryResult](proto.temporal.api.workflowservice.v1.irespondquerytaskcompletedrequest.md#queryresult)
- [taskToken](proto.temporal.api.workflowservice.v1.irespondquerytaskcompletedrequest.md#tasktoken)

## Properties

### completedType

• `Optional` **completedType**: *null* \| [*QueryResultType*](../enums/proto.temporal.api.enums.v1.queryresulttype.md)

RespondQueryTaskCompletedRequest completedType

___

### errorMessage

• `Optional` **errorMessage**: *null* \| *string*

RespondQueryTaskCompletedRequest errorMessage

___

### namespace

• `Optional` **namespace**: *null* \| *string*

RespondQueryTaskCompletedRequest namespace

___

### queryResult

• `Optional` **queryResult**: *null* \| [*IPayloads*](proto.temporal.api.common.v1.ipayloads.md)

RespondQueryTaskCompletedRequest queryResult

___

### taskToken

• `Optional` **taskToken**: *null* \| *Uint8Array*

RespondQueryTaskCompletedRequest taskToken
