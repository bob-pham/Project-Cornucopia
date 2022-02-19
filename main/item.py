from datetime import date

class Item:

    def __init__(self, name, price, expDate):
        self.name = name
        self.price = price
        self.date = expDate

    def isExpired(self):
        d1 = date.today.strftime("%d")
        print("d1 =", d1)  

        return (self.date.day > d1)