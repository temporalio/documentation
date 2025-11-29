from temporalio import activity

from dataclasses import dataclass


@dataclass
class YourParams:
    greeting: str
    name: str


@activity.defn
async def your_activity(input: YourParams) -> str:
    return f"{input.greeting}, {input.name}!"
