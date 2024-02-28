from temporalio import activity

"""dacx
In the Temporal Python SDK programming model, an Activity is a function and can be used as an instance method of a class
You can use asynchronous, synchronous multithreaded, and synchronous multiprocess/other functions to define an Activity.

Below is an example of an Activity defined as a function.
dacx"""


@activity.defn
async def ssn_trace_activity(ssn) -> str:
    return "pass"


"""dacx
The `ssn_trace_activity` function passes a string and returns `pass`.

An Activity Definition can support as many other custom parameters as needed; however, all parameters must be serializable.

The default data converter supports converting multiple types including:

- `None`
- `bytes`
- `google.protobuf.message.Message` - As JSON when encoding, but has ability to decode binary proto from other languages
- Anything that can be converted to JSON including:
    - Anything that `[json.dump](https://docs.python.org/3/library/json.html#json.dump)` supports natively
    - [dataclasses](https://docs.python.org/3/library/dataclasses.html)
    - Iterables including ones JSON dump may not support by default, e.g. `set`
    - Any class with a `dict()` method and a static `parse_obj()` method, e.g. [Pydantic models](https://pydantic-docs.helpmanual.io/usage/models)
        - The default data converter is deprecated for Pydantic models and will warn if used since not all fields work. See [this sample](https://github.com/temporalio/samples-python/tree/main/pydantic_converter) for the recommended approach.
    - [IntEnum, StrEnum](https://docs.python.org/3/library/enum.html) based enumerates
    - [UUID](https://docs.python.org/3/library/uuid.html)

This notably doesn't include any `date`, `time`, or `datetime` objects as they may not work across SDKs.

Users are strongly encouraged to use a single `dataclass` for parameter and return types so fields with defaults can be easily added without breaking compatibility.
dacx"""

""" @dacx
id: backgroundcheck-boilerplate-ssntrace-activity
title: Boilerplate Activity code
label: Activity code
description: In the Temporal Python SDK programming model, an Activity is an function.
tags:
- go sdk
- code sample
- activity
lines: 1-13
@dacx """

""" @dacx
id: backgroundcheck-boilerplate-activity-details
title: Boilerplate Activity code details
label: Activity code details
description: In the Temporal Go SDK programming model, an Activity Definition is an exportable function or a `struct` method.
tags:
- go sdk
- activity
lines: 16-38
@dacx """
