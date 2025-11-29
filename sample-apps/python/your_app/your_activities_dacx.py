from temporalio import activity
from your_dataobject_dacx import YourParams

"""dacx
You can develop an Activity Definition by using the `@activity.defn` decorator.
Register the function as an Activity with a custom name through a decorator argument, for example `@activity.defn(name="your_activity")`.

:::note

The Temporal Python SDK supports multiple ways of implementing an Activity:
- Asynchronously using [`asyncio`](https://docs.python.org/3/library/asyncio.html)
- Synchronously multithreaded using [`concurrent.futures.ThreadPoolExecutor`](https://docs.python.org/3/library/concurrent.futures.html#threadpoolexecutor)
- Synchronously multiprocess using [`concurrent.futures.ProcessPoolExecutor`](https://docs.python.org/3/library/concurrent.futures.html#processpoolexecutor) and [`multiprocessing.managers.SyncManager`](https://docs.python.org/3/library/multiprocessing.html#multiprocessing.managers.SyncManager)

Blocking the async event loop in Python would turn your asynchronous program into a synchronous program that executes serially, defeating the entire purpose of using `asyncio`.
This can also lead to potential deadlock, and unpredictable behavior that causes tasks to be unable to execute.
Debugging these issues can be difficult and time consuming, as locating the source of the blocking call might not always be immediately obvious.

Due to this, consider not make blocking calls from within an asynchronous Activity, or use an async safe library to perform
these actions.
If you must use a blocking library, consider using a synchronous Activity instead.

:::
dacx"""

"""dacx
Activity parameters are the function parameters of the function decorated with `@activity.defn`.
These can be any data type Temporal can convert, including dataclasses when properly type-annotated.
Technically this can be multiple parameters, but Temporal strongly encourages a single dataclass parameter containing all input fields.
dacx"""

"""dacx
An Activity Execution can return inputs and other Activity values.

The following example defines an Activity that takes a string as input and returns a string.
dacx"""

"""dacx
You can customize the Activity name with a custom name in the decorator argument. For example, `@activity.defn(name="your-activity")`.
If the name parameter is not specified, the Activity name defaults to the function name.
dacx"""


@activity.defn(name="your_activity")
async def your_activity(input: YourParams) -> str:
    return f"{input.greeting}, {input.name}!"


""" @dacx
id: how-to-develop-an-activity-definition-in-python
title: How to develop an Activity Definition in Python
label: Activity Definition
description: You can develop an Activity Definition by using the `@activity.defn` decorator.
tags:
 - python sdk
 - code sample
 - activity definition
lines: 1, 4-24, 44-46
@dacx """

""" @dacx
id: how-to-define-activity-parameters-in-python
title: How to do define Activity parameters in Python
label: Activity parameters
description: Activity parameters are the function parameters of the function decorated with `@activity.defn`.
tags:
 - activity execution
 - python sdk
 - code sample
lines: 1-3, 26-30, 44-46
@dacx """

""" @dacx
id: how-to-define-activity-return-values-in-python
title: How to define Activity return values in Python
label: Activity return values
description: To return a value of the Workflow, use `return` to return an object.
tags:
 - activity execution
 - python sdk
 - code sample
lines: 32-36, 44-46
@dacx """

""" @dacx
id: how-to-customize-activity-type-in-python
title: How to customize Activity Type in Python
label: Customize Activity Type
description: Customize your Activity Type.
tags:
 - activity execution
 - python sdk
 - code sample
lines: 38-41, 44-46
@dacx """
