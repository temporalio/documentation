---
id: how-to-mock-activities-in-php
title: How to mock Activities in PHP
sidebar_label: Mock Activities
description: To mock an Activity in PHP, follow the instructions in this article.
tags:
  - developer-guide
  - sdk
  - php
---

**RoadRunner config**

To mock an Activity in PHP, use [RoadRunner Key-Value storage](https://github.com/spiral/roadrunner-kv) and add the following lines to your `tests/.rr.test.yaml` file.

```yaml
# tests/.rr.test.yaml
kv:
  test:
    driver: memory
    config:
      interval: 10
```

If you want to be able to mock Activities, use `WorkerFactory` from the `Temporal\Testing` Namespace
in your PHP Worker:

```php
// worker.test.php
use Temporal\Testing\WorkerFactory;

$factory = WorkerFactory::create();
$worker = $factory->newWorker();

$worker->registerWorkflowTypes(MyWorkflow::class);
$worker->registerActivity(MyActivity::class);
$factory->run();
```

Then, in your tests to mock an Activity, use the`ActivityMocker` class.

Assume we have the following Activity:

```php
#[ActivityInterface(prefix: "SimpleActivity.")]
interface SimpleActivityInterface
{
    #[ActivityMethod('doSomething')]
    public function doSomething(string $input): string;
```

To mock it in the test, you can do this:

```php
final class SimpleWorkflowTestCase extends TestCase
{
    private WorkflowClient $workflowClient;
    private ActivityMocker $activityMocks;

    protected function setUp(): void
    {
        $this->workflowClient = new WorkflowClient(ServiceClient::create('localhost:7233'));
        $this->activityMocks = new ActivityMocker();

        parent::setUp();
    }

    protected function tearDown(): void
    {
        $this->activityMocks->clear();
        parent::tearDown();
    }

    public function testWorkflowReturnsUpperCasedInput(): void
    {
        $this->activityMocks->expectCompletion('SimpleActivity.doSomething', 'world');
        $workflow = $this->workflowClient->newWorkflowStub(SimpleWorkflow::class);
        $run = $this->workflowClient->start($workflow, 'hello');
        $this->assertSame('world', $run->getResult('string'));
    }
}
```

In the preceding test case, we do the following:

1. Instantiate `ActivityMocker` in the `setUp()` method of the test.
2. Clear the cache after each test in `tearDown()`.
3. Mock an Activity call to return a string `world`.

To mock a failure, use the `expectFailure()` method:

```php
$this->activityMocks->expectFailure('SimpleActivity.echo', new \LogicException('something went wrong'));
```
