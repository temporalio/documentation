from dataclasses import dataclass

"""dacx
Workflow parameters are the method parameters of the singular method decorated with `@workflow.run`.
These can be any data type Temporal can convert, including [`dataclasses`](https://docs.python.org/3/library/dataclasses.html) when properly type-annotated.
Technically this can be multiple parameters, but Temporal strongly encourages a single `dataclass` parameter containing all input fields.
dacx"""


@dataclass
class YourParams:
    greeting: str
    name: str


""" @dacx
id: how-to-define-workflow-parameters-in-python
title: How to define Workflow parameters
label: Define Workflow parameters
description: Define Workflow parameters.
tags:
 - workflow parameters
 - python sdk
 - code sample
lines: 1, 3-7, 10-13
@dacx """
