[Namespaces](/concepts/what-is-a-namespace) are a logical unit of isolation within the Temporal Platform.

Set a Namespace with the Client options in your Temporal Client.
Note that you must register your custom Namespace with the Temporal Cluster before setting it in the Temporal Client.
To register a Namespace, use `tctl --namespace your-namespace namespace register`.
See [tctl namespace reference](/tctl/namespace/register) for details.

If no other Namespace is specified, the Temporal Cluster uses the Namespace "default" for all Temporal SDKs and tctl.
