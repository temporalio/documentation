/**
 * TypeScript source samples and line maps for the Event History walkthroughs.
 * `lines` values are 1-based line numbers into the samples below, so keep them
 * in sync when the samples change.
 */

const PIZZA_WORKFLOW_CODE = `const { sendBill, getDistance } = proxyActivities<typeof activities>({
  startToCloseTimeout: '5 seconds',
});

export async function pizzaWorkflow(order: Order): Promise<string> {
  let distance: Distance | undefined = undefined;
  let totalPrice = 0;

  // compute distance
  distance = await getDistance(order.address);

  if (distance.kilometers > 25) {
    throw new ApplicationFailure('Customer too far away for delivery');
  }

  // Iterate over the items and calculate the cost of the order
  for (const pizza of order.items) {
    totalPrice += pizza.price;
  }

  // Wait 30 minutes before billing the customer
  await sleep('30 minutes');

  const bill = {
    customerID: order.customer.customerID,
    orderNumber: order.orderNumber,
    amount: totalPrice,
    description: 'Pizza',
  };

  const confirmation = await sendBill(bill);

  return confirmation;
}`;

const NON_DETERMINISM_CODE = `const { importSalesData, runDailyReport } = proxyActivities<typeof activities>({
  startToCloseTimeout: '45 minutes',
});

export async function generateDailyReport(): Promise<void> {
  await importSalesData();

  if (getRandomNumber(1, 100) >= 50) {
    await sleep('4 hours');
  }

  log.info('Preparing to run daily report', {});

  await runDailyReport();
}`;

export const TYPESCRIPT = {
  language: 'typescript',
  pizzaWorkflow: {
    code: PIZZA_WORKFLOW_CODE,
    lines: {
      signature: [5],
      firstInternal: [1, 2, 3, 6, 7],
      getDistance: [9, 10],
      distanceCheck: [12, 13, 14],
      extraInternal: [16, 17, 18, 19],
      timer: [21, 22],
      bill: [24, 25, 26, 27, 28, 29],
      sendBill: [31],
      returnValue: [33],
      commandStatements: [10, 22, 31, 33],
    },
    definitionBullets: [
      'Defines a Start-to-Close Timeout',
      'Determines the distance to the customer',
      'Fails if the customer is too far away for delivery',
      'Calculates the total price of the pizzas',
      'Sleeps for 30 minutes',
      'Populates an object with billing information',
      'Sends a bill to the customer',
    ],
    notes: {
      firstInternal:
        "The walkthrough starts here. Setting the Start-to-Close Timeout and declaring the variables are internal steps, so they don't require any interaction with the Temporal Service.",
      distanceCheck:
        'The Worker evaluates the distance returned by the Activity. If the customer lived too far away, the Workflow would throw an exception, which sends a Command asking the Temporal Service to fail the Workflow Execution. This order is going to a nearby customer, so execution continues.',
      extraInternalTitle: 'Total the price of the order',
      extraInternal:
        'Adding up the price of each pizza is another internal step, so it does not involve the Temporal Service either.',
      timer:
        'The call to sleep is another statement that involves the Temporal Service. The Worker issues a StartTimer Command that includes the duration, and this Workflow Execution pauses for 30 minutes until the Timer fires.',
      bill: "The Timer fires and execution resumes. These lines create and populate the object that holds the input for the next Activity. The object relates to an Activity, but building it doesn't involve the Temporal Service.",
      returnValue:
        'Returning from the Workflow function also results in a Command. The Worker issues CompleteWorkflowExecution to the Temporal Service, which includes the value returned from the function.',
    },
  },
  nonDeterminism: {
    code: NON_DETERMINISM_CODE,
    lines: {
      firstActivity: [6],
      firstActivityCall: [6],
      conditional: [8],
      timer: [9],
      conditionalBlock: [8, 9, 10],
      secondActivity: [14],
      crash: [12],
    },
    activities: { first: 'importSalesData', second: 'runDailyReport' },
  },
};
