/**
 * Workflow Definition used by the code-to-Commands, Commands-to-Events, and
 * History Replay walkthroughs. Step `lines` values are 1-based line numbers
 * into this sample, so keep them in sync when it changes.
 */
export const PIZZA_WORKFLOW_CODE = `func PizzaWorkflow(ctx workflow.Context, order Order) (OrderConfirmation, error) {

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

/** Line ranges shared by the walkthroughs, for readability in the steps files. */
export const LINES = {
  optionsAndPrice: [3, 4, 5, 6, 8, 9, 10, 11, 12],
  getDistance: [14, 15, 16, 17, 18],
  distanceCheck: [20, 21, 22],
  sleep: [24, 25],
  bill: [27, 28, 29, 30, 31],
  sendBill: [33, 34, 35, 36, 37],
  returnValue: [39],
};
