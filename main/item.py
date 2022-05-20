from datetime import date
from numpy import double

class Item:
    # TODO description of item class


    def __init__(self, name: str, price: double, expDate: date):
        """constructor of item

        Args:
            name (_type_): the name of the product
            price (_type_): the price of the product
            expDate (_type_): the expiration date of the product
        """
        self.name = name
        self.price = price
        self.date = expDate


    def isExpired(self) -> bool:
        """Checks the current date and returns true if the food has expired; expired food has an expiry date later than the current date

        Returns:
            bool: returns true if expired, false otherwise
        """
        dayToday = date.today.strftime("%-d")
        monthToday = date.today.strftime("%-m")
        yearToday = date.today.strftime("%Y")

        return self.date.isEarlier(dayToday, monthToday, yearToday)