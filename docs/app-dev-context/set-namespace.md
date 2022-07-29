[Namespaces](/concepts/what-is-a-namespace) are a logical unit of isolation within the Temporal Platform.

To set a custom Namespace with the Client options in your Temporal Client, you must register your custom Namespace with the Temporal Cluster before setting it in the Temporal Client.

To register a Namespace, use:
`tctl --namespace your-custom-namespace namespace register`.

For more information, see [tctl namespace reference](/tctl/namespace/register).
