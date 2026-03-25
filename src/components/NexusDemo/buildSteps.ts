export type BuildStep = {
  num: string;
  title: string;
  file: string;
  language: string;
  code: string;
  note: string;
};

export const buildSteps: BuildStep[] = [
  {
    num: 'Step 1 of 6',
    title: 'Define the service contract',
    file: 'IHelloService.cs',
    language: 'csharp',
    code: `[NexusService]
public interface IHelloService
{
    static readonly string EndpointName = "nexus-simple-endpoint";

    [NexusOperation]
    Task<EchoOutput> Echo(EchoInput input);

    [NexusOperation]
    Task<HelloOutput> SayHello(HelloInput input);

    public record EchoInput(string Message);
    public record EchoOutput(string Message);
    public record HelloInput(string Name, HelloLanguage Language);
    public record HelloOutput(string Message);
    public enum HelloLanguage { En, Fr, De, Es, Tr }
}`,
    note: 'This is the only file shared between Team A (caller) and Team B (handler). It defines what operations exist and their input/output shapes, nothing more. Team B\'s internal implementation stays private.',
  },
  {
    num: 'Step 2 of 6',
    title: 'Implement the sync handler',
    file: 'HelloService.cs',
    language: 'csharp',
    code: `[NexusServiceHandler(typeof(IHelloService))]
public class HelloService
{
    [NexusOperationHandler]
    public IOperationHandler<IHelloService.EchoInput, IHelloService.EchoOutput>
        Echo() =>
        OperationHandler.Sync<IHelloService.EchoInput, IHelloService.EchoOutput>(
            // Runs inline; must complete in under 10 seconds
            (ctx, input) => new(input.Message));
}`,
    note: 'A synchronous handler runs inline in the handler worker and returns a result directly. Use this for fast operations (lookups, validations, transformations). The 10-second limit is enforced by the Nexus runtime.',
  },
  {
    num: 'Step 3 of 6',
    title: 'Implement the async handler',
    file: 'HelloService.cs + HelloHandlerWorkflow.workflow.cs',
    language: 'csharp',
    code: `// HelloService.cs: add the async operation
[NexusOperationHandler]
public IOperationHandler<IHelloService.HelloInput, IHelloService.HelloOutput>
    SayHello() =>
    WorkflowRunOperationHandler.FromHandleFactory(
        (WorkflowRunOperationContext ctx, IHelloService.HelloInput input) =>
            ctx.StartWorkflowAsync(
                (HelloHandlerWorkflow wf) => wf.RunAsync(input),
                // RequestId is stable across retries; prevents duplicate workflows
                new() { Id = ctx.HandlerContext.RequestId }));

// HelloHandlerWorkflow.workflow.cs
[Workflow]
public class HelloHandlerWorkflow
{
    [WorkflowRun]
    public async Task<IHelloService.HelloOutput> RunAsync(
        IHelloService.HelloInput input) =>
        input.Language switch
        {
            IHelloService.HelloLanguage.En => new("Hello " + input.Name + " 👋"),
            IHelloService.HelloLanguage.Fr => new("Bonjour " + input.Name + " 👋"),
            IHelloService.HelloLanguage.Es => new("¡Hola! " + input.Name + " 👋"),
            _ => throw new ApplicationFailureException(
                "Unsupported: " + input.Language)
        };
}`,
    note: 'Async operations start a Temporal Workflow and return an operation token to the caller. The caller is suspended until the workflow completes, which can take seconds, hours, or days. Using RequestId as the workflow ID ensures retries never create duplicates.',
  },
  {
    num: 'Step 4 of 6',
    title: 'Register the handler worker',
    file: 'Program.cs',
    language: 'csharp',
    code: `async Task RunHandlerWorkerAsync()
{
    using var worker = new TemporalWorker(
        await ConnectClientAsync(
            "nexus-simple-handler-namespace"),
        new TemporalWorkerOptions(
            taskQueue: "nexus-simple-handler-sample")
            .AddNexusService(new HelloService())
            .AddWorkflow<HelloHandlerWorkflow>());

    await worker.ExecuteAsync(tokenSource.Token);
}`,
    note: "The handler worker runs in Team B's namespace. It registers both the Nexus service handler and the backing workflow. The task queue name must match what's configured on the Nexus Endpoint in the Temporal control plane.",
  },
  {
    num: 'Step 5 of 6',
    title: 'Write the caller workflow',
    file: 'HelloCallerWorkflow.workflow.cs',
    language: 'csharp',
    code: `[Workflow]
public class HelloCallerWorkflow
{
    [WorkflowRun]
    public async Task<string> RunAsync(
        string name, IHelloService.HelloLanguage language)
    {
        var nexus = Workflow.CreateNexusWorkflowClient<IHelloService>(
            IHelloService.EndpointName);

        var output = await nexus.ExecuteNexusOperationAsync(
            svc => svc.SayHello(new(name, language)));

        return output.Message;
    }
}`,
    note: "The caller workflow only knows the shared interface, with no knowledge of HelloHandlerWorkflow, Team B's namespace, or how the operation is implemented. The Nexus Endpoint name is the only required configuration.",
  },
  {
    num: 'Step 6 of 6',
    title: 'Run the caller worker and execute',
    file: 'Program.cs',
    language: 'csharp',
    code: `// Register the caller worker
using var worker = new TemporalWorker(
    await ConnectClientAsync("nexus-simple-caller-namespace"),
    new TemporalWorkerOptions("nexus-simple-caller-sample")
        .AddWorkflow<HelloCallerWorkflow>());

await worker.ExecuteAsync(tokenSource.Token);

// Start the caller workflow
var result = await client.ExecuteWorkflowAsync(
    (HelloCallerWorkflow wf) => wf.RunAsync(
        "Temporal", IHelloService.HelloLanguage.Es),
    new(id: "nexus-hello-id",
        taskQueue: "nexus-simple-caller-sample"));

// result == "¡Hola! Temporal 👋"`,
    note: 'Two separate namespaces. Two separate workers. Zero shared internal code, connected only by a single Nexus Endpoint and a shared interface file.',
  },
];
