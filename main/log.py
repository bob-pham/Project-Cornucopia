class Log:

    def __init__(self):
        self.groceryList = {}

    def addItem(self, item):
        if item in self.groceryList:
            self.groceryList[item] = self.groceryList.get(item) + 1
        else: 
            self.groceryList[item] = 1
    
    


