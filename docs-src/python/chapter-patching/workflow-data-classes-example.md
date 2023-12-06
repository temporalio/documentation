---
id: workflow-data-classes-example
title: Adapting Workflows to New Data Types
sidebar_label: Data Class Examples
description: Provides examples of how to adapt Temporal workflows to new data types using data classes.
tags:
  - guide-python-temporal
  - data-class-examples
---

Consider a background check application where, initially, only a social security number is required:

```python
@dataclass
class SsnTraceInput:
    ssn: str
```

As your application evolves, you might need to include additional data types like phone number, first name, and last name. Updating the `SsnTraceInput` data class to include these new fields is straightforward and ensures backward compatibility.

Using dataclasses for input and output parameters in Temporal Workflows helps future-proof them for a few reasons:

- Versioning support: If you add a new field to a dataclass, Temporal will automatically handle passing default values to older Workflow versions. This prevents breaking changes.
- Type safety: Dataclasses provide type safety for your parameters.
- Immutability: Dataclasses are immutable by default. This helps avoid accidental mutations of inputs and outputs within workflows.
- Serialization: Dataclasses work nicely with Temporal's use of JSON for serialization. Parameters get automatically serialized/deserialized without extra effort.
