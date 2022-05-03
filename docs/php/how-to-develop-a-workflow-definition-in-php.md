In PHP, a Workflow is a class method. Classes must implement interfaces that are annotated with `#[WorkflowInterface]`. The method that is the Workflow must be annotated with `#[WorkflowMethod]`.

```php
use Temporal\Workflow\WorkflowInterface;
use Temporal\Workflow\WorkflowMethod;

#[WorkflowInterface]
interface FileProcessingWorkflow
{
    #[WorkflowMethod]
    public function processFile(Argument $args);

}
```
