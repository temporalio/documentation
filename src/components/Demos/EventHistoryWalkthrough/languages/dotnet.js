/**
 * .NET source samples and line maps for the Event History walkthroughs.
 * `lines` values are 1-based line numbers into the samples below, so keep them
 * in sync when the samples change.
 */

const PIZZA_WORKFLOW_CODE = `[Workflow]
public class PizzaWorkflow
{
    [WorkflowRun]
    public async Task<OrderConfirmation> RunAsync(PizzaOrder order)
    {
        // Activity Options omitted for brevity
        var totalPrice = order.Items.Sum(pizza => pizza.Price);

        var distance = await Workflow.ExecuteActivityAsync(
            (Activities act) => act.GetDistanceAsync(order.Address),
            options);

        if (order.IsDelivery && distance.Kilometers > 25)
        {
            throw new ApplicationFailureException("Customer too far away for delivery");
        }

        await Workflow.DelayAsync(TimeSpan.FromMinutes(30));

        var bill = new Bill(
            CustomerId: order.Customer.CustomerId,
            OrderNumber: order.OrderNumber,
            Description: "Pizza",
            Amount: totalPrice);

        var confirmation = await Workflow.ExecuteActivityAsync(
            (Activities act) => act.SendBillAsync(bill),
            options);

        return confirmation;
    }
}`;

const NON_DETERMINISM_CODE = `[Workflow]
public class GenerateDailyReport
{
    private static readonly Random random = new Random();

    [WorkflowRun]
    public async Task<string> RunAsync()
    {
        // Activity Options and logger declaration omitted for brevity
        var salesData = await Workflow.ExecuteActivityAsync(
            (Activities act) => act.ImportSalesDataAsync(),
            options);

        if (random.Next(100) >= 50)
        {
            await Workflow.DelayAsync(TimeSpan.FromHours(4));
        }

        Logger.LogInformation("Preparing to run daily report");

        return await Workflow.ExecuteActivityAsync(
            (Activities act) => act.RunDailyReportAsync(),
            options);
    }
}`;

export const DOTNET = {
  language: 'csharp',
  pizzaWorkflow: {
    code: PIZZA_WORKFLOW_CODE,
    lines: {
      signature: [1, 2, 4, 5],
      firstInternal: [7, 8],
      getDistance: [10, 11, 12],
      distanceCheck: [14, 15, 16, 17],
      timer: [19],
      bill: [21, 22, 23, 24, 25],
      sendBill: [27, 28, 29],
      returnValue: [31],
      commandStatements: [10, 19, 27, 31],
    },
    definitionBullets: [
      'Calculates the total price of the pizzas',
      'Determines the distance to the customer',
      'Fails if the customer is too far away for delivery',
      'Sleeps for 30 minutes',
      'Populates a record with billing information',
      'Sends a bill to the customer',
    ],
    notes: {
      firstInternal:
        "The walkthrough starts here. Calculating the total price of the pizzas is an internal step, so it doesn't require any interaction with the Temporal Service.",
      distanceCheck:
        'The Worker evaluates the distance returned by the Activity. If the customer lived too far away, the Workflow would throw an exception, which sends a Command asking the Temporal Service to fail the Workflow Execution. This order is going to a nearby customer, so execution continues.',
      timer:
        'The call to delay execution is another statement that involves the Temporal Service. The Worker issues a StartTimer Command that includes the duration, and this Workflow Execution pauses for 30 minutes until the Timer fires.',
      bill: "The Timer fires and execution resumes. These lines create and populate the record that holds the input for the next Activity. The record relates to an Activity, but building it doesn't involve the Temporal Service.",
      returnValue:
        'Returning from the Workflow method also results in a Command. The Worker issues CompleteWorkflowExecution to the Temporal Service, which includes the value returned from the method.',
    },
  },
  nonDeterminism: {
    code: NON_DETERMINISM_CODE,
    lines: {
      firstActivity: [9, 10, 11, 12],
      firstActivityCall: [10, 11, 12],
      conditional: [14],
      timer: [16],
      conditionalBlock: [14, 15, 16, 17],
      secondActivity: [21, 22, 23],
      crash: [19],
    },
    activities: { first: 'ImportSalesData', second: 'RunDailyReport' },
  },
};
