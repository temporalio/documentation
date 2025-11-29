from dataclasses import dataclass


@dataclass
class MoneyTransfer:
    sender: str
    receiver: str
    amount: int
    reference_id: str
