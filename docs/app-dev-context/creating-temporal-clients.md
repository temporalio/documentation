A [Temporal Client](/temporal#temporal-client) is needed to [create Worker Entities](#run-worker-processes) and to communicate with a [Temporal Cluster](/clusters).
Communication with the Temporal Cluster includes, but is not limited to, starting Workflow Executions, sending Signals to Workflow Executions, sending Queries to Workflow Executions, and getting the result of a Workflow Execution.

A Temporal Client cannot be initialized and used inside Workflow code.
However, it is acceptable and common to use a Temporal Client inside an Activity, to communicate with the Temporal Cluster.
