---
id: what-is-a-list-filter
title: What is a List Filter?
description: A List Filter is the SQL-like string that is provided as the parameter to an Advanced Visibility List API.
tags:
  - explanation
  - filtered-lists
---

import RelatedReadList, {RelatedReadContainer, RelatedReadItem} from '../components/RelatedReadList.js'

<!-- prettier-ignore -->
import * as WhatIsAdvancedVisibility from './what-is-advanced-visibility.md'
import * as WhatIsASearchAttribute from './what-is-a-search-attribute.md'

<!--TODO
import * as HowToListFilterInWebUI from './how-to-use-a-list-filter-in-the-temporal-web-ui.md'
-->

A List Filter is the SQL-like string that is provided as the parameter to an <preview page={WhatIsAdvancedVisibility}>Advanced Visibility</preview> List API.

The following is an example List Filter:

```sql
WorkflowType = "main.YourWorkflowDefinition" and ExecutionStatus != "Running" and (StartTime > "2021-06-07T16:46:34.236-08:00" or CloseTime > "2021-06-07T16:46:34-08:00") order by StartTime desc
```

A List Filter contains Search Attribute keys, Search Attribute values, and Operators.

<RelatedReadContainer>
  <RelatedReadItem page={WhatIsASearchAttribute} />
</RelatedReadContainer>

- The following operators are supported in List Filters:

  - **AND, OR, ()**
  - **=, !=, >, >=, <, <=**
  - **IN**
  - **BETWEEN ... AND**
  - **ORDER BY**

- A List Filter only applies to a single Namespace.

- The range on a List Filter timestamp (StartTime, CloseTime, ExecutionTime) cannot be larger than 9223372036854775807 (maxInt64 - 1001)

- List Filters using a time range will have a 1ms resolution on Elasticsearch 6 and 1ns resolution on Elasticsearch 7.

- List Filter Search Attribute key names are case sensitive.

- An Advanced List Filter API may take longer if it is retrieving a large number of Workflow Executions (10M+).

- A `ListWorkflow` API supports pagination.
  Use the page token in the next call to the retrieve next page, continue until the page token is `null`/`nil`.

- To paginate through a large number of Workflow Executions without skipping or duplicating them, use the `ScanWorkflow` API.

- To efficiently count the number of Workflow Executions, use the `CountWorkflow` API.

<!--TODO
<RelatedReadContainer>
  <RelatedReadItem page={HowToListFilterInWebUI} />
</RelatedReadContainer>
-->
