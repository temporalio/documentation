# Worked example: the customer loyalty program guide

These excerpts come from the "Build a customer loyalty program with Entity Workflows" guide (docs.temporal.io/guides/entity-pattern-loyalty-points), first as originally published and then revised by hand to follow the structural guidance. The revised excerpts here fix three problems the hand revision had, so imitate these rather than the live preview:

- The hand revision repeated the "Entity Workflows carry their current state…" paragraph twice in Step 1. Say it once.
- The hand revision dedented Workflow methods to column 0. Keep methods indented inside their class and say which class they belong to.
- The hand revision stopped adding closing transitions after Step 5. Every step gets one.

Use these excerpts to calibrate voice and granularity. Don't copy their content into other guides.

---

## 1. Opening sections

### Before

```md
**by Cecil Phillip**

Loyalty programs look simple until you're running them at scale: points have to accrue ... and never needs a cron job to stay current.

## Problem statement

Every customer in a loyalty program is their own entity. ... Doing this with a shared database means locking, retry logic across services, and cron jobs ...

## Solution

Each customer gets their own Workflow — a persistent, running process identified by their customer ID. ...

## Outcomes

After working through this guide, you'll have a loyalty system where:

- **Each customer account is independent and durable**: ...

## Background and best practices

### What is an Entity Workflow?
...
### How Entity Workflows differ from actors
...
### Why Temporal is well suited for this pattern
...
### Operational considerations
...

## Target audience
...
```

### After

```md
**by Cecil Phillip**

Customer loyalty programs can be great for your business, but they're notoriously difficult to scale. Points have to accrue correctly across every purchase, tiers have to recalculate at the right moment, redemptions have to be consistent, and all of it has to hold up across years of customer interactions. Doing this with a shared database means locking, retry logic across services, and cron jobs that periodically recalculate who qualifies for what.

A scalable solution is to give each customer their own dedicated, durable account — one that holds state, enforces business rules, responds to purchases and redemptions in real time, and never needs a cron job to stay current. In Temporal terms, each customer has a Workflow: a persistent, running process identified by their customer ID. ...

With this guide, you'll build a loyalty system where:

- **Each customer account is independent and durable:** ...

## Background

Although "Workflow" is a Temporal SDK primitive, when we talk about an "entity workflow," we're describing an architectural pattern. ... For more information about the Entity Workflow pattern, see [Entity Workflow Pattern](/design-patterns/entity-workflow).

In the loyalty points use case, each customer has their own Entity Workflow. ...

## Prerequisites
...
### Operational considerations
...
```

What changed: the problem, solution, and promise became an unheaded three-paragraph intro, with the problem paragraph absorbing the shared-database pain point. "Why Temporal is well suited" and "How Entity Workflows differ from actors" were cut in favor of the Design Patterns link. Target audience was removed. Operational considerations moved under Prerequisites.

---

## 2. Splitting a file of small classes (Step 1)

### Before

One block containing all of `models.py` with docstrings and comments, followed by a single explanatory paragraph:

```python
# models.py

from dataclasses import dataclass, field
from enum import Enum

class LoyaltyTier(str, Enum):
    """Loyalty tiers based on lifetime points earned."""
    BRONZE = "Bronze"
    ...

@dataclass
class PointsEvent:
    """A single points transaction to be processed by the entity."""
    event_id: str          # Unique identifier for idempotent processing
    points: int            # Positive for accrual, negative for redemption
    reason: str            # Human-readable description (e.g., "purchase", "signup_bonus")
    source: str = ""       # Originating service or channel
...
```

> `LoyaltyState` holds only what's needed to reconstruct the entity after a Continue-As-New transition. `processed_event_ids` enables idempotent Signal processing — ...

### After

````md
## Step 1: Define the loyalty state and data models

Entity Workflows carry their current state as their primary input, so Continue-As-New can resume with that state intact. You'll use Python `dataclass` objects because they serialize cleanly with Temporal's default JSON converter and allow new fields with defaults without breaking existing Executions.

Create a file named `models.py`. Start by importing `dataclass`, `field`, and `Enum`:

```python
# models.py
from dataclasses import dataclass, field
from enum import Enum
```

Create a class `LoyaltyTier` with four levels:

```python
class LoyaltyTier(str, Enum):
    BRONZE = "Bronze"
    SILVER = "Silver"
    GOLD = "Gold"
    PLATINUM = "Platinum"
```

Nothing fancy here; you're defining the levels of the tiers.

Next you'll need a class that defines an event, called `PointsEvent`. Keeping everything about the event in a single object makes it easier to serialize.

```python
@dataclass
class PointsEvent:
    event_id: str
    points: int
    reason: str
    source: str = ""
```

This class has four members:

- `event_id`: a string that uniquely identifies the event, so it can be processed idempotently.
- `points`: the number of points in this event. It's positive when the customer accrues points and negative when they redeem them.
- `reason`: a human-readable description of the event, such as "purchase" or "signup_bonus."
- `source`: the service or channel the event came from. It defaults to an empty string.
````

Notes on the pattern:

- The framing paragraph appears once, at the top of the step.
- Each lead-in says what's coming before the code appears.
- The inline field comments moved into the bullet list below the snippet as complete sentences.
- The step will end with a closing transition (see section 4).

---

## 3. Splitting a class into methods (Step 3)

### Before (hand revision — don't do this)

````md
With the initialization handled, it's time to add the main loop of the Entity Workflow:

```python
@workflow.run
async def run(self, state: LoyaltyState | None = None) -> LoyaltyState:
    if state is None:
        ...
```
````

The method is at column 0. Pasted after the class body, it becomes a module-level function and the Workflow has no run method.

### After

````md
Inside the `LoyaltyEntityWorkflow` class, after `__init__`, add the main loop:

```python
    @workflow.run
    async def run(self, state: LoyaltyState | None = None) -> LoyaltyState:
        if state is None:
            self._state.customer_id = workflow.info().workflow_id.replace("loyalty-", "", 1)
        ...
```

On a first start there's no incoming state, so the Workflow derives the customer ID from its own Workflow ID. ...
````

The first snippet of the class shows its decorator and `class` line together with `__init__`:

````md
```python
@workflow.defn
class LoyaltyEntityWorkflow:
    @workflow.init
    def __init__(self, state: LoyaltyState | None = None) -> None:
        ...
```
````

---

## 4. Transitions across step headings

Closing a step and opening the next:

```md
The Worker connects to the Temporal Server and begins polling. It will continue running until you stop the process. With the Worker waiting, you're set from the Temporal side, and you're ready for the Entity Workflow to take action.

## Step 5: Write client code to interact with the entity

The client code starts Entity Workflows, sends Signals, executes Updates, and runs Queries. In production this typically lives in an API server or background service, but in this guide you'll run it locally.
```

Closing the final step so it leads into Outcomes (the hand revision had none here):

```md
When `is_target_worker_deployment_version_changed()` is `False`, the Continue-As-New run stays on the same pinned build. This flag is refreshed after each Workflow Task, so upgrades are picked up on the next natural Continue-As-New boundary. Your loyalty entities can now pick up new code without patching, which means nothing stands between them and a lifetime of customer activity.

## Outcomes
```

---

## 5. Sub-steps inside a step

### Before

```md
### (Optional) Phase 8: Manage Workflow evolution with Worker Versioning
#### Step 1: Annotate the Workflow
#### Step 2: Configure the Worker
#### Step 3: Roll out changes with the CLI
```

### After

```md
## (Optional) Step 8: Manage Workflow evolution with Worker Versioning
### Annotate the Workflow
### Configure the Worker
### Roll out changes with the CLI
```

---

## 6. Related resources

Keep the Design Patterns and companion-guide links. The hand revision dropped these, which contradicts the guidance:

```md
## Related resources

- [Entity Workflow Pattern](/design-patterns/entity-workflow) — pattern catalog reference for this Workflow with Go, Java, Python, and TypeScript implementations
- [Continue-As-New Pattern](/design-patterns/continue-as-new) — common pitfalls and history-size triggers
- [Temporal Python SDK documentation](/develop/python)
- ...
- Companion guide: [Player Sessions That Survive Anything](/guides/durable-gaming-sessions) — the related Actor Workflow pattern for entities that take action
```
