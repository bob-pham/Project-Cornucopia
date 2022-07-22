import sys
import heapq
sys.path.append('../')

from item import Item
from recall_scraper.recall_finder import *

class Pantry:
    """Represents the current items that the user has in their pantry

    """

    def __init__(self):
        self.groceryList = {}
        self.experiation = []

    def __init__(self, groceryList, experiation):
        self.groceryList = groceryList
        self.experiation = experiation


    def addItem(self, item: Item):
        """adds an item to pantry

        Args:
            item: the item to be inserted
        """
        if item.name in self.groceryList:
            self.groceryList[item.name] += 1
        else: 
            self.groceryList[item.name] = 1
        
        heapq.heappush(self.experiation, item)


    def removeItem(self, item: Item, num: int):
        """removes num item from pantry, assumes that there exists num items in pantry

        Args:
            item (Item): item to be removed
            num (int): number of items to be removed
        """

        self.groceryList[item.name] -= num
        to_remove = []

        #Identifies within experation list where they items are
        for x in range (len(self.experiation) - 1):
            curr = self.experiation[x]

            if curr == item.name and curr == item.company:
                num -= curr.quantity
                to_remove.append(x)
                if num <= 0:
                    break    

        #deleted from experation list
        for x in range (len(to_remove) - 1, 0, -1):
            del self.experiation[to_remove[x]]

        #restores heap invariant
        heapq.heapify(self.experiation)

        
    
    def check_for_expiration(self) -> list[Item]:
        """returns a list of expired items, can be empty            
        """
        
        expired = []

        # since its a priority queue based on how close experiation date is if the first element is not expired then none are
        for item in self.experiation:
            if (item.isExpired()):
                expired.append(item)
            else:
                return expired
        
        return expired
        

    
    def check_for_recalls(self) -> list[str]:
        """Checks the database of product recalls to see if there are any, if there are then checks if any items owned by user has been recalled

        Returns:
            list[Item]: list of items that have been recalled 
        """

        recalled = get_food_recalls_all
        to_notify = []

        for item in recalled:
            if (item in self.groceryList and self.groceryList[item] != 0):
                to_notify.append(item)


        return to_notify


