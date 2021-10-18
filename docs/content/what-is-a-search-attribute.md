---
id: what-is-a-search-attribute
title: What is a Search Attribute
description: A Search Attribute is an indexed key used in List Filters to filter lists of Workflow Executions that are tagged with the Search Attributes.
tags:
  - explanation
  - filtered-lists
---

import RelatedReadList, {RelatedReadContainer, RelatedReadItem} from '../components/RelatedReadList.js'

<!-- prettier-ignore -->
import * as WhatIsAListFilter from './what-is-a-list-filter.md'
import * as WhatIsATemporalCronJob from './what-is-a-temporal-cron-job.md'

<!--TODO
import * as HowToViewSearchAttribtuesUsingTCTL from './how-to-view-search-attributes-of-a-cluster-using-tctl.md'
import * as HowToAddCustomSearchAttribute from "../content/how-to-add-a-custom-search-attribute-to-a-cluster-using-tctl.md"
-->

A Search Attribute is an indexed key used in a <preview page={WhatIsAListFilter}>List Filter</preview> to filter a list of Workflow Executions that have the Search Attribute as a piece of meta data.

:::note

If a Tempora Cluster does not have Elasticsearch integrated, but a Workflow Execution is spawned and tagged with Search Attributes there will not be any errors.
You just will not be able to use Advanced Visibility List APIs and List Filters to find and list the Workflow Exeuction.

:::

<!--Link to What is Continue-As-New-->

When using Continue-As-New or a <preview page={WhatIsATemporalCronJob}>Temporal Cron Job</preview>, Search Attributes are carried over to the new Run by default.

### Default Search Attributes

A Temporal Cluster that is integrated with Elasticsearch has a set of default Search Attributes already available.
These Search Attributes are created when the initial index is created.

| NAME                  | TYPE     |
| --------------------- | -------- |
| BatcherNamespace      | Keyword  |
| BatcherUser           | Keyword  |
| BinaryChecksums       | Keyword  |
| CloseTime             | Datetime |
| ExecutionDuration     | Int      |
| ExecutionStatus       | Keyword  |
| ExecutionTime         | Datetime |
| HistoryLength         | Int      |
| RunId                 | Keyword  |
| StartTime             | Datetime |
| StateTransitionCount  | Int      |
| TaskQueue             | Keyword  |
| TemporalChangeVersion | Keyword  |
| WorkflowId            | Keyword  |
| WorkflowType          | Keyword  |

- All default Search Attributes are reserved and read-only (you can not create a custom one with the same name, or alter the existing one).

- ExecutionStatus values correspond to Workflow Execution Statuses: Running, Completed, Failed, Canceled, Terminated, ContinuedAsNew, TimedOut.

- StartTime, CloseTime and ExecutionTime are stored as dates, but are supported by queries using both EpochTime in nanoseconds and a string in [RFC3339Nano format](https://pkg.go.dev/time#pkg-constants) (ex. "2006-01-02T15:04:05.999999999Z07:00").

- ExecutionDuration is stored in nanoseconds, but supported by queries using integers in nanoseconds, [Golang duration format](https://pkg.go.dev/time#ParseDuration), and "hh:mm:ss" format.

- CloseTime, HistoryLength, StateTransitionCount, ExecutionDuration are only present in with a Closed Workflow Execution.

- ExecutionTime can be different from StartTime for retry/cron use-cases.

### Custom Search Attributes

<!--TODO
<preview page={HowToAddCustomSearchAttribute}>registered using `tctl`</preview>
-->

Custom Search Attribute keys must be registered using `tctl`.
Registering a Search Attribute key makes it available to use with Workflow Executions within that Cluster.

There is no hard limit on the number of attributes you can add.
However, we recommend enforcing the following limits:

- Number of keys: 100 per Workflow
- Size of value: 2kb per value
- Total size of key and values: 40kb per Workflow

:::note

Due to Elasticsearch limitations, you can only add new Search Attributes.
It is not possible to rename or remove Search Attribute keys from the index schema.

:::

Search Attributes must be one of the following types:

- String
- Keyword
- Int
- Double
- Bool
- Datetime

The [temporalio/auto-setup Docker](https://hub.docker.com/r/temporalio/auto-setup) image uses a pre-defined set of custom Search Attributes that are handy for testing.
Their types indicated in their name:

- CustomKeywordField
- CustomIntField
- CustomDoubleField
- CustomBoolField
- CustomDatetimeField
- CustomStringField

Note:

- **Double** is backed up by `scaled_float` Elasticsearch type with scale factor 10000 (4 decimal digits).
- **Datetime** is backed up by `date` type with milliseconds precision in Elasticsearch 6 and `date_nanos` type with nanoseconds precision in Elasticsearch 7.
- **Int** is 64-bits integer (`long` Elasticsearch type).
- **Keyword** and **String** types are concepts taken from Elasticsearch. Each word in a **String** is considered a searchable keyword.
  For a UUID, that can be problematic as Elasticsearch will index each portion of the UUID separately.
  To have the whole string considered as a searchable keyword, use the **Keyword** type.
  For example, if the key `ProductId` has the value of `2dd29ab7-2dd8-4668-83e0-89cae261cfb1`:
  - As a **Keyword** it would only be matched by `ProductId = "2dd29ab7-2dd8-4668-83e0-89cae261cfb1`.
  - As a **String** it would be matched by `ProductId = 2dd8`, which could cause unwanted matches.
- The **String** type cannot be used in the "Order By" clause.

<!--TODO
<RelatedReadContainer>
  <RelatedReadItem page={HowToViewSearchAttribtuesUsingTCTL} />
</RelatedReadContainer>
-->

### Search Attributes as Workflow Execution metadata

To actually have results from the use of a <preview page={WhatIsAListFilter}>List Filter</preview>, Search Attributes must be added to a Workflow Execution as metadata.
How to do this entirely depends on the method by which you spawn the Workflow Execution:

- [How to set Search Attributes as Workflow Execution metadata in Go](/docs/content/how-to-set-startworkflowoptions-in-go/#searchattributes)
