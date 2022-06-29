---
id: testing
title: Testing PHP Workflows
sidebar_label: Testing 
---

## Testing Workflows

PHP SDK provides tools for testing workflows without running a regular Temporal server.
Instead, it uses a light-weight testing server.

### Quick start
1. Create `bootstrap.php` in `tests` folder with the following contents:
```php
declare(strict_types=1);

require __DIR__ . '/../vendor/autoload.php';

use Temporal\Testing\Environment;

$environment = Environment::create();
$environment->start();
register_shutdown_function(fn () => $environment->stop());
```

2. Add `bootstrap.php` to your `phpunit.xml`:
```xml
<phpunit xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:noNamespaceSchemaLocation="https://schema.phpunit.de/9.3/phpunit.xsd"
         bootstrap="tests/bootstrap.php"
>
</phpunit>
```

3. Add test server executable to `.gitignore`:
```gitignore
temporal-test-server
```

### How it works
For testing workflows there is no need to run a full Temporal server (with storage and UI interface).
Instead, we can use a light-weight test server.

The code in `bootstrap.php` will start/stop (and download if it doesn't exist) Temporal test
server and RoadRunner for every phpunit run. Test server runs as a regular server on 7233 port.
Thus, if you use default connection settings, there is no need to change them.

Under the hood RoadRunner is started with `rr serve` command. You can specify your own command in `bootstrap.php`:
```php
$environment->start('./rr serve -c .rr.test.yaml -w tests');
```

The snippet above will start Temporal test server and RoadRunner with `.rr.test.yaml` config and `tests` working
directory. Having a separate RoadRunner config file for tests can be useful to mock you activities. For
example, you can create a separate *worker* that registers activity implementations mocks:

```yaml
# test/.rr.test.yaml
server:
    command: "php worker.test.php"
```

And within the worker you register your workflows and mock activities:

```php
// worker.test.php 
$factory = WorkerFactory::create();

$worker = $factory->newWorker();
$worker->registerWorkflowTypes(MyWorkflow::class);
$worker->registerActivity(MyActvivityMock::class);
$factory->run();
```

You can test Workflows by running them with a WorkflowClient like this:

```php
final class SimpleWorkflowTestCase extends TestCase
{
    private WorkflowClient $workflowClient;

    protected function setUp(): void
    {
        $this->workflowClient = new WorkflowClient(
            ServiceClient::create('localhost:7233')
        );
        
        parent::setUp();
    }

    public function testWorkflowReturnsUpperCasedInput(): void
    {
        $workflow = $this->workflowClient->newWorkflowStub(SimpleWorkflow::class);
        $run = $this->workflowClient->start($workflow, 'hello');
        $this->assertSame('HELLO', $run->getResult('string'));
    }
}
```

### Time management

If we consider activities as some external code that can be mocked than unit-testing your workflows becomes
straight-forward:

1. Register activity mocks in a separate "test" worker.
2. In your test create a `WorkflowClient`.
3. Use `WorkflowClient` to run the workflow and assert the result.

The problem may occure when your workflow depends on some time changes: it waits for timeout or some other conditions.
In unit tests we don't want to waste time waiting for timeouts. Thus, by default, the test server starts with
a *"time-skipping"* option. It means that if the workflow has a timer, the server doesn't wait for it and 
continues immediately. For example, when testing such a workflow the test server will not wait for a minute:

```php
#[WorkflowInterface]
final class WaitWorkflow
{
    #[WorkflowMethod]
    public function run(string $input)
    {
        $simple = Workflow::newActivityStub(
            SimpleActivity::class,
            ActivityOptions::new()->withStartToCloseTimeout(5)
        );
        
        yield Workflow::timer('1 minute');

        return yield $simple->echo($input);
    }
}
```

The activity will be called immediately. But, there may be cases when you do need to wait. So, to change this behaviour 
you can use `TestService` class:

```php
$testService = TestService::create('localhost:7233');
$testService->lockTimeSkipping();

// ...
$testService->unlockTimeSkipping();
```

Class `TestService` communicates with a test server and provides method for "time management". Time skipping
can be switched on/off with `unlockTimeSkipping()` and `lockTimeSkipping()` method:

```php
final class WaitTestCase extends TestCase
{
    private WorkflowClient $workflowClient;

    protected function setUp(): void
    {
        $this->workflowClient = new WorkflowClient(
            ServiceClient::create('localhost:7233')
        );

        parent::setUp();
    }

    public function testSimpleAwait()
    {
        $testService = TestService::create('localhost:7233');
        $testService->lockTimeSkipping();

        $wait = $this->workflowClient->newWorkflowStub(WaitWorkflow::class);
        $run = $this->workflowClient->start($wait, 'hello');

        $testService->unlockTimeSkipping();
        $this->assertSame('HELLO', $run->getResult('string'));
    }
}
```

For convenience if you don't want to skip time in the whole `TestCase` class use `WithoutTimeSkipping`:

```php
final class WaitTestCase extends TestCase 
{
    use WithoutTimeSkipping;
    
    // ...
}
```

In case you need to emulate some "waiting" on a test server, you can use `sleep(int secods)` or `sleepUntil(int $timestamp)` methods.

Current server time can be retrieved with `getCurrentTime(): Carbon` method.





