import sys
sys.path.append('../')

from recall_scraper.recall_finder import *

class Log:
    """Represents the current items that the user has in their pantry

    """

    def __init__(self):
        self.groceryList = {}


    def addItem(self, item):
        if item in self.groceryList:
            self.groceryList[item] += 1
        else: 
            self.groceryList[item] = 1
    
    
    def check_for_recalls(self) -> list[str]:
        """Checks the database of product recalls to see if there are any, if there are then checks if any items owned by user has been recalled

        Returns:
            list[Item]: list of items that have been recalled 
        """
        #TODO

        recalled = []



        return recalled


