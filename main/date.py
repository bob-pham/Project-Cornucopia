from operator import truediv
from pickle import FALSE, TRUE


class Date:

    def __init__(self, day, month, year):
        self.day = day
        self.month = month
        self.year = year

    def isEarlier(self, dayToday, monthToday, yearToday):
        if (self.year < yearToday):
            return TRUE
        elif (self.year > yearToday):
            return FALSE
        elif (self.month < monthToday):
            return TRUE
        elif (self.month > monthToday):
            return FALSE
        elif (self.day < dayToday):
            return TRUE
        else:
            return FALSE