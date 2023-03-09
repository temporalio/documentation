# Temporal Cloud Namespace Naming Considerations

March, 9 2023

This document provides general guidance for organizing namespaces across use cases, services, applications or domains. Temporal Cloud provides namespace–as-a-service and as such the namespace is the end point. Customers should consider not only a namespace naming convention but also how to group or isolate workloads using the namespace as a boundary.

## Constraints and Limitations

Before considering an appropriate namespace configuration customers should be aware of the constraints:

- Each Temporal account has a default limit of 10 namespaces. This can be increased via a support ticket.
- Cross-namespace communications between workflows is not supported today (future feature). Today a workaround exists, involving using the SDK client from within an activity.
- Each namespace has a rate limit (throttling). The default rate limit is 200 APS (actions per second) but can be increased via a support ticket.
- Namespace has an SLA of 99.9%.
- Namespace (for now) are single-region only.
- Namespace is a security isolation boundary. Access to Temporal by application workers is permitted at the namespace level. Isolating applications or environments (development, test, staging, production) should take this into consideration.
- Namespace is an endpoint and requires mTLS authorization to access from the client, requiring CA certificates.
- WorkflowID uniqueness is per namespace.
- Task Queue names are unique per namespace.
- Closed workflow retention is per namespace.
- RBAC permissions are implemented at namespace level.

## General Guidance

Namespace configuration requires some consideration. Below are some general guidelines to consider.

- Namespaces are usually defined per use case. A use case can encompass a broad range of workflow types, and a nearly unlimited scale of concurrent workflow executions.
- Namespaces can be split along additional boundaries such as service, application, domain or even sub-domain.
- Environments such as production and development usually have requirements for isolation. It is recommended that each environment has its own namespace.
- Namespaces should be used to reduce blast radius for mission critical applications.
- Workflows that need to communicate with one another (for now) should be in the same namespace.
- Careful consideration should be taken when sharing namespaces across team or domain boundaries.

## Examples

Below are some ideas about how to organize namespaces.

### Example 1: Namespace per Use Case/Environment

A namespace per use case/environment is recommended for simple configurations where multiple services, team or domain boundaries don't exist.

Sample naming convention:

<pre>
&lt;user case>_&lt;environment>
</pre>

### Example 2: Namespace per Use Case/Service/Environment

A namespace per use case/service/environment is recommended when multiple services that are part of same use case, communicate externally to Temporal via API (HTTP/gRPC).

Sample naming convention:

<pre>
&lt;user case>_&lt;service>_&lt;environment>
</pre>

### Example 3: Namespace per Use Case/Domain/Environment

A namespace per use case/domain/environment is recommended when multiple services that are part of the same use case need to communicate with one another, via signals or starting of child workflows. It is very important however, in this case, to be mindful about workflowId uniqueness by prefixing workflowId with a service specific string. If multiple teams are involved the domain could also represent a team boundary.

Sample naming convention:

<pre>
&lt;user case>_&lt;domain>_&lt;environment>
</pre>

Sample workflowId convention:

<pre>
&lt;service string>_&lt;workflowId>
</pre>
