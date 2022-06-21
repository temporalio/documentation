Signal-With-Start is used from the Client.
It takes a Workflow Id, Workflow arguments, a Signal name, and Signal arguments.

If there's a Workflow running with the given Workflow Id, it will be signaled. If there isn't, a new Workflow will be started and immediately signaled.
