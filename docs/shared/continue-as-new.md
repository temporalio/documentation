Temporal stores the execution history of all Workflows.
There is a maximum limit of this execution history and even tho the Temporal
Server emits warnings while your workflow are approaching this limit, you should make sure
your workflows don't reach it.

Workflows that periodically execute a number of Activities, for a long time, have the potential
of running into this execution history size limit.

One way of dealing with this issue is to use "Continue-as-new". This feature allows you
to complete the current Workflow execution and start a new one.
This new execution has the same Workflow Id, but a different Run Id, and as such will
get its own execution history.

If your Workflow are running periodically using a Cron definition, the "Continue-as-new"
feature is used internally by Temporal. In this case, each Workflow execution as defined by the Cron definition
will have its own Run Id and execution history.
