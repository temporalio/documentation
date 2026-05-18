import asyncio

from temporalio import workflow

"""dacx
To upsert custom Search Attributes, use the [`upsert_search_attributes()`](https://python.temporal.io/temporalio.workflow.html#upsert_search_attributes) method.

The keys are added to or replace the existing Search Attributes, similar to [`dict.update()`](https://docs.python.org/3/library/stdtypes.html#dict.update).
dacx"""

"""dacx
To remove a Search Attribute, use the [`upsert_search_attributes()`](https://python.temporal.io/temporalio.workflow.html#upsert_search_attributes) function with an empty list as its value.
dacx"""


@workflow.defn
class GreetingWorkflow:
    @workflow.run
    async def run(self) -> None:
        # Wait a couple seconds, then alter the keyword search attribute
        await asyncio.sleep(2)
        workflow.upsert_search_attributes({"CustomKeywordField": ["new-value"]})
        await asyncio.sleep(2)
        workflow.upsert_search_attributes({"CustomKeywordField": []})


""" @dacx
id: how-to-upsert-custom-search-attributes-to-a-workflow-executions-during-execution-in-python
title: How to upsert custom Search Attributes
label: Upsert custom Search Attributes
description: To upsert custom Search Attributes, use the upsert_search_attributes() method.
tags:
 - python
 - search attribute
 - python sdk
 - code sample
lines: 5-9, 22
@dacx """


""" @dacx
id: how-to-remove-search-attributes-from-a-workflow-in-python
title: How to remove Search Attributes in Python
label: Remove Search Attributes
description: To remove a Search Attribute, use `upsert_search_attributes()` with an empty list as its value.
tags:
 - search attribute
 - python sdk
 - code sample
lines: 11-13, 24
@dacx """
