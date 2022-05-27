Environment variables can be provided in the normal way for our language to our Client, Worker, and Activity code.
They can't be used normally with Workflow code, as that would be nondeterministic (if the env vars changed between Workflow replays, the code that used them would behave differently).

Most of the time, we don't need to get env vars into Workflow code, as it's sufficient to just provide them to Activities.
But if we do need to env vars into Workflow code, the two options are:

- Providing them as arguments when starting the Workflow.
- Calling a Local Activity at the beginning of the Workflow that returns env vars.

In either case, the env vars will appear in Event History, so you may want to use an [encryption Data Converter](/concepts/what-is-a-data-converter/#encryption).
