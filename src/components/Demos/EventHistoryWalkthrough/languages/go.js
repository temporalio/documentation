/**
 * Go source samples and line maps for the Event History walkthroughs.
 * `lines` values are 1-based line numbers into the samples below, so keep them
 * in sync when the samples change.
 */

const PIZZA_WORKFLOW_CODE = `func PizzaWorkflow(ctx workflow.Context, order Order) (OrderConfirmation, error) {

    options := workflow.ActivityOptions{
        StartToCloseTimeout: 5 * time.Second,
    }
    ctx = workflow.WithActivityOptions(ctx, options)

    // Total the cost of the order
    var totalPrice int
    for _, pizza := range order.Items {
        totalPrice += pizza.Price
    }

    var distance Distance
    err := workflow.ExecuteActivity(ctx, GetDistance, order.Address).Get(ctx, &distance)
    if err != nil {
        return OrderConfirmation{}, err
    }

    if order.IsDelivery && distance.Kilometers > 25 {
        return OrderConfirmation{}, errors.New("customer too far away for delivery")
    }

    // Wait 30 minutes before billing the customer
    workflow.Sleep(ctx, 30 * time.Minute)

    bill := Bill{
        CustomerId:  order.Customer.CustomerId,
        Amount:      totalPrice,
        Description: order.OrderNumber,
    }

    var confirmation OrderConfirmation
    err = workflow.ExecuteActivity(ctx, SendBill, bill).Get(ctx, &confirmation)
    if err != nil {
        return OrderConfirmation{}, err
    }

    return confirmation, nil
}`;

const NON_DETERMINISM_CODE = `func GenerateDailyReport(ctx workflow.Context) error {

    options := workflow.ActivityOptions{
        StartToCloseTimeout: 45 * time.Minute,
    }
    ctx = workflow.WithActivityOptions(ctx, options)

    // this Activity is always executed
    err := workflow.ExecuteActivity(ctx, ImportSalesData).Get(ctx, nil)
    if err != nil {
        return err
    }

    if rand.Intn(100) >= 50 {
        workflow.Sleep(ctx, 4 * time.Hour)
    }

    workflow.GetLogger(ctx).Info("Preparing to run daily report")
    err = workflow.ExecuteActivity(ctx, RunDailyReport).Get(ctx, nil)
    if err != nil {
        return err
    }

    return nil
}`;

export const GO = {
  language: 'go',
  pizzaWorkflow: {
    code: PIZZA_WORKFLOW_CODE,
    lines: {
      signature: [1],
      firstInternal: [3, 4, 5, 6, 8, 9, 10, 11, 12],
      getDistance: [14, 15, 16, 17, 18],
      distanceCheck: [20, 21, 22],
      timer: [24, 25],
      bill: [27, 28, 29, 30, 31],
      sendBill: [33, 34, 35, 36, 37],
      returnValue: [39],
      commandStatements: [15, 25, 34, 39],
    },
    definitionBullets: [
      'Defines a Start-to-Close Timeout',
      'Calculates the total price of the pizzas',
      'Determines the distance to the customer',
      'Fails if the customer is too far away for delivery',
      'Sleeps for 30 minutes',
      'Populates a struct with billing information',
      'Sends a bill to the customer',
    ],
    notes: {
      firstInternal:
        "The walkthrough starts here. Setting the Start-to-Close Timeout and adding up the price of each pizza are internal steps, so they don't require any interaction with the Temporal Service.",
      distanceCheck:
        'The Worker evaluates the distance returned by the Activity. If the customer lived too far away, the Workflow would return an error, which sends a Command asking the Temporal Service to fail the Workflow Execution. This order is going to a nearby customer, so execution continues.',
      timer:
        'The call to sleep is another statement that involves the Temporal Service. The Worker issues a StartTimer Command that includes the duration, and this Workflow Execution pauses for 30 minutes until the Timer fires.',
      bill: "The Timer fires and execution resumes. These lines create and populate the struct that holds the input for the next Activity. The struct relates to an Activity, but building it doesn't involve the Temporal Service.",
      returnValue:
        'Returning from the Workflow function also results in a Command. The Worker issues CompleteWorkflowExecution to the Temporal Service, which includes the value returned from the function.',
    },
  },
  nonDeterminism: {
    code: NON_DETERMINISM_CODE,
    lines: {
      firstActivity: [8, 9, 10, 11, 12],
      firstActivityCall: [9],
      conditional: [14],
      timer: [15],
      conditionalBlock: [14, 15, 16],
      secondActivity: [18, 19, 20, 21, 22],
      crash: [18],
    },
    activities: { first: 'ImportSalesData', second: 'RunDailyReport' },
  },
};
