import uuid
from main.pantry import *
from main.item import Item

class User:
    """Represents a user in the system
    """


    def __init__(self, name):
        """Constructor of a (new) User, only requires name, generates uuid and a blank log
        """
        self.name = name
        self.id = uuid.uuid4()
        self.pantry = Pantry()


    def __init__(self, name, idd, pantry):
        """Constructor for an existing user where all parameters already exist
        """
        self.name = name
        self.idd = idd
        self.pantry = pantry  