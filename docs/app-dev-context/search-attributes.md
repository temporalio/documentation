The typical method of retrieving a Workflow Execution is by its Workflow Id.
However, sometimes we want to be able to retrieve one or more Executions based on other properties.
For example, we may need to get all Executions of a certain type that have failed within a certain time range so we can start new ones with the same arguments.
We can do this type of query with [Search Attributes](/concepts/what-is-a-search-attribute/).

- [**Default** Search Attributes](/concepts/what-is-a-search-attribute/#default-search-attributes) like `WorkflowType`, `StartTime`, and `ExecutionStatus` are automatically added to Workflow Executions.
- **Custom** Search Attributes can contain our own domain-specific data (like `customerId` or `numItems`).
  A few [generic Custom Search Attributes](/concepts/what-is-a-search-attribute/#custom-search-attributes) like `CustomKeywordField` and `CustomIntField` are created by default in Temporal's [Docker Compose](/clusters/quick-install/#docker-compose).

The steps to using Search Attributes are:

- Create a new Search Attribute in your Cluster [using `tctl`](/tctl/how-to-add-a-custom-search-attribute-to-a-cluster-using-tctl/).
- Set the value of the Search Attribute for a Workflow Execution:
  - On the Client by including it as an option when starting the Execution
  - In the Worklow by calling `UpsertSearchAttributes`
- Read the value of the Search Attribute:
  - On the Client by calling `DescribeWorkflow`
  - In the Workflow by looking at `WorkflowInfo`
- Query Workflow Executions by the Search Attribute using a [List Filter](/concepts/what-is-a-list-filter/):
  - [In the UI](/web-ui/how-to-use-a-list-filter-in-the-temporal-web-ui)
  - [In `tctl`](/tctl/workflow/list/#--query)
  - In code by calling `ListWorkflowExecutions`
