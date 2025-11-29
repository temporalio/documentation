# Temporal Go SDK | Workflow Update feature | example app

This sample shows how to use the Workflow Update feature.

This sample contains `_dacx` files which are generated into documentation in docs.temporal.io.

`your_updatable_workflow_dacx.go` contains two Workflows.

The first Workflow shows how to handle an Update.
It contains a single count integer variable. The Update handler adds the new integer to the count and returns the new count value.

The second Workflow shows how to validate the Update and then handle it.
It also contains a single count integer variable, but the validator function rejects the new integer if it is not positive.

Note that you may need to enable Updates if you are using a Temporal Server version that is older than 1.21.
For example, when using the Temporal CLI dev server:

```
temporal server start-dev --dynamic-config-value frontend.enableUpdateWorkflowExecution=true
```

Update validator functions may not work with Server versions older than 1.21.

### How to run the sample

Run the Worker:

```
go run worker/main.go
```

Start the Workflow:

```
go run starter/main.go
```

Update the count within the Workflow:

```
go run update/main_dacx.go i
```

The `i` argument can be any integer.

Run the Workflow with the validator function in it:

```
go run validstarter/main.go
```

Update the Workflow:

```
go run validupdate/main.go i
```

The `i` argument can be any positive integer. 
Try providing a negative one to see the validator error.
