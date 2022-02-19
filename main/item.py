from datetime import date

class Item:

# constructor of item
# @param name - the name of the product
# @param price - the price of the product
# @param expDate - the expiration date of the product
# @type {{name : string, price : double, expDate : date} => Item}

    def __init__(self, name, price, expDate):
        self.name = name
        self.price = price
        self.date = expDate

# Checks the current date and returns true if the food has expired; expired food has an expiry date later than the current date
# @type {=> boolean}

    def isExpired(self):
        dayToday = date.today.strftime("%-d")
        monthToday = date.today.strftime("%-m")
        yearToday = date.today.strftime("%Y")

        return self.date.isEarlier(dayToday, monthToday, yearToday)