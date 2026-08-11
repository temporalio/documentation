/**
 * Java source samples and line maps for the Event History walkthroughs.
 * `lines` values are 1-based line numbers into the samples below, so keep them
 * in sync when the samples change.
 */

const PIZZA_WORKFLOW_CODE = `public class PizzaWorkflowImpl implements PizzaWorkflow {

    ActivityOptions options = ActivityOptions.newBuilder()
        .setStartToCloseTimeout(Duration.ofSeconds(5))
        .build();

    private final PizzaActivities activities =
        Workflow.newActivityStub(PizzaActivities.class, options);

    @Override
    public String pizzaWorkflow(Order order) {

        // Iterate over the items and calculate the cost of the order
        int totalPrice = 0;
        for (Pizza pizza : order.getItems()) {
            totalPrice += pizza.getPrice();
        }

        int distance = activities.getDistance(order.getAddress());

        if (order.isDelivery() && distance > 25) {
            String message = "Customer lives outside the service area";
            throw ApplicationFailure.newFailure(message,
                OutOfServiceAreaException.class.getName());
        }

        // Wait for 30 minutes before billing the customer
        Workflow.sleep(Duration.ofMinutes(30));

        Bill bill = new Bill();
        bill.setCustomerId(order.getCustomer().getCustomerId());
        bill.setAmount(totalPrice);
        bill.setDescription(order.getOrderNumber());

        String confirmation = activities.sendBill(bill);

        return confirmation;
    }
}`;

const NON_DETERMINISM_CODE = `public class GenerateDailyReportImpl implements GenerateDailyReport {

    ActivityOptions options = ActivityOptions.newBuilder()
        .setStartToCloseTimeout(Duration.ofMinutes(45))
        .build();

    private final ReportActivities activities =
        Workflow.newActivityStub(ReportActivities.class, options);

    @Override
    public void generateDailyReport() {

        String salesData = activities.importSalesData();

        Random random = new Random();
        if (random.nextInt(101) >= 50) {
            // Sleep for 4 hours
            Workflow.sleep(Duration.ofHours(4));
        }

        Workflow.getLogger(this.getClass()).info("Preparing to run daily report");
        DailyReport report = activities.runDailyReport(salesData);
    }
}`;

export const JAVA = {
  language: 'java',
  pizzaWorkflow: {
    code: PIZZA_WORKFLOW_CODE,
    lines: {
      signature: [1, 10, 11],
      firstInternal: [3, 4, 5, 13, 14, 15, 16, 17],
      getDistance: [19],
      distanceCheck: [21, 22, 23, 24, 25],
      timer: [27, 28],
      bill: [30, 31, 32, 33],
      sendBill: [35],
      returnValue: [37],
      commandStatements: [19, 28, 35, 37],
    },
    definitionBullets: [
      'Defines a Start-to-Close Timeout',
      'Calculates the total price of the pizzas',
      'Determines the distance to the customer',
      'Fails if the customer is too far away for delivery',
      'Sleeps for 30 minutes',
      'Populates a class with billing information',
      'Sends a bill to the customer',
    ],
    notes: {
      firstInternal:
        "The walkthrough starts here. Setting the Start-to-Close Timeout and adding up the price of each pizza are internal steps, so they don't require any interaction with the Temporal Service.",
      distanceCheck:
        'The Worker evaluates the distance returned by the Activity. If the customer lived too far away, the Workflow would throw an exception, which sends a Command asking the Temporal Service to fail the Workflow Execution. This order is going to a nearby customer, so execution continues.',
      timer:
        'The call to sleep is another statement that involves the Temporal Service. The Worker issues a StartTimer Command that includes the duration, and this Workflow Execution pauses for 30 minutes until the Timer fires.',
      bill: "The Timer fires and execution resumes. These lines create and populate the object that holds the input for the next Activity. The object relates to an Activity, but building it doesn't involve the Temporal Service.",
      returnValue:
        'Returning from the Workflow method also results in a Command. The Worker issues CompleteWorkflowExecution to the Temporal Service, which includes the value returned from the method.',
    },
  },
  nonDeterminism: {
    code: NON_DETERMINISM_CODE,
    lines: {
      firstActivity: [13],
      firstActivityCall: [13],
      conditional: [15, 16],
      timer: [18],
      conditionalBlock: [15, 16, 17, 18, 19],
      secondActivity: [22],
      crash: [21],
    },
    activities: { first: 'importSalesData', second: 'runDailyReport' },
  },
};
