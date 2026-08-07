/**
 * Python source samples and line maps for the Event History walkthroughs.
 * `lines` values are 1-based line numbers into the samples below, so keep them
 * in sync when the samples change.
 */

const PIZZA_WORKFLOW_CODE = `@workflow.defn
class PizzaOrderWorkflow:
    @workflow.run
    async def order_pizza(self, order: PizzaOrder) -> OrderConfirmation:
        total_price = sum(pizza.price for pizza in order.items)

        distance = await workflow.execute_activity_method(
            PizzaOrderActivities.get_distance,
            order.address,
            start_to_close_timeout=timedelta(seconds=5),
        )

        if order.is_delivery and distance.kilometers > 25:
            error_message = "customer lives outside the service area"
            raise ApplicationError(error_message)

        # Wait 30 minutes before billing the customer
        await asyncio.sleep(timedelta(minutes=30).total_seconds())

        bill = Bill(
            customer_id=order.customer.customer_id,
            order_number=order.order_number,
            description="Pizza order",
            amount=total_price,
        )

        confirmation = await workflow.execute_activity_method(
            PizzaOrderActivities.send_bill,
            bill,
            start_to_close_timeout=timedelta(seconds=5),
        )

        return confirmation`;

const NON_DETERMINISM_CODE = `@workflow.defn
class GenerateDailyReport:
    @workflow.run
    async def run(self) -> str:
        sales_data = await workflow.execute_activity_method(
            ReportActivities.import_sales_data,
            start_to_close_timeout=timedelta(minutes=45),
        )

        if non_deterministic_number_generator(100) >= 50:
            # sleep for 4 hours
            await asyncio.sleep(timedelta(hours=4).total_seconds())

        workflow.logger.info("Preparing to run daily report")

        return await workflow.execute_activity_method(
            ReportActivities.run_daily_report,
            sales_data,
            start_to_close_timeout=timedelta(minutes=45),
        )`;

export const PYTHON = {
  language: 'python',
  pizzaWorkflow: {
    code: PIZZA_WORKFLOW_CODE,
    lines: {
      signature: [1, 2, 3, 4],
      firstInternal: [5],
      getDistance: [7, 8, 9, 10, 11],
      distanceCheck: [13, 14, 15],
      timer: [17, 18],
      bill: [20, 21, 22, 23, 24, 25],
      sendBill: [27, 28, 29, 30, 31],
      returnValue: [33],
      commandStatements: [7, 18, 27, 33],
    },
    definitionBullets: [
      'Calculates the total price of the pizzas',
      'Determines the distance to the customer',
      'Fails if the customer is too far away for delivery',
      'Sleeps for 30 minutes',
      'Populates a data structure with billing information',
      'Sends a bill to the customer',
    ],
    notes: {
      firstInternal:
        "The walkthrough starts here. Calculating the total price of the pizzas is an internal step, so it doesn't require any interaction with the Temporal Service.",
      distanceCheck:
        'The Worker evaluates the distance returned by the Activity. If the customer lived too far away, the Workflow would raise an exception, which sends a Command asking the Temporal Service to fail the Workflow Execution. This order is going to a nearby customer, so execution continues.',
      timer:
        'The call to sleep is another statement that involves the Temporal Service. The Worker issues a StartTimer Command that includes the duration, and this Workflow Execution pauses for 30 minutes until the Timer fires.',
      bill: "The Timer fires and execution resumes. These lines create and populate the data structure that holds the input for the next Activity. The structure relates to an Activity, but building it doesn't involve the Temporal Service.",
      returnValue:
        'Returning from the Workflow method also results in a Command. The Worker issues CompleteWorkflowExecution to the Temporal Service, which includes the value returned from the method.',
    },
  },
  nonDeterminism: {
    code: NON_DETERMINISM_CODE,
    lines: {
      firstActivity: [5, 6, 7, 8],
      firstActivityCall: [5, 6, 7, 8],
      conditional: [10],
      timer: [12],
      conditionalBlock: [10, 11, 12],
      secondActivity: [16, 17, 18, 19, 20],
      crash: [14],
    },
    activities: { first: 'import_sales_data', second: 'run_daily_report' },
  },
};
