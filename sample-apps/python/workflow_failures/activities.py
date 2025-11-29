import logging

from data_obj import MoneyTransfer
from temporalio import activity


@activity.defn
async def withdraw(details: MoneyTransfer):
    # Assuming a successful withdrawal
    logging.info(f"Withdrew {details.amount} from {details.sender}'s account.")
    return details


@activity.defn
async def deposit(details: MoneyTransfer):
    logging.info(f"Deposited {details.amount} to {details.receiver}'s account.")
    # Uncomment the next line and comment the one after that to simulate a failed deposit.
    raise Exception("This deposit has failed.")
    # return details


@activity.defn
async def refund(details: MoneyTransfer):
    # Assuming a successful refund
    logging.info(f"Refunded {details.amount} to {details.sender}'s account.")
    return details
