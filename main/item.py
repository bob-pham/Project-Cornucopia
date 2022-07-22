from datetime import datetime, date

class Item:
    """Represents a grocery item that will be stored within the databse
    """


    def __init__(self, name: str, company:str, quantity: int, expDate):
        """constructor of item

        Args:
            name (_type_): the name of the product
            company: the name of the company that manufactures the product 
            quantity (_type_): the quantity of product in stock
            expDate (_type_): the expiration date of the product, can be null or a string of the date in y/m/d
        """
        self.name = name
        self.quantity = quantity
        self.company = company
        self.expDate = None if expDate == None else datetime.strptime(expDate, '%Y-%m-%d')
        


    def isExpired(self) -> bool:
        """Checks the current date and returns true if the food has expired; expired food has an expiry date later than the current date

        Returns:
            bool: returns true if expired, false otherwise
        """

        if (self.date == None):
            return False

        dayToday = date.today.strftime("%-d")
        monthToday = date.today.strftime("%-m")
        yearToday = date.today.strftime("%Y")

        return self.date.isEarlier(dayToday, monthToday, yearToday)