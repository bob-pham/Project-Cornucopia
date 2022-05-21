import uuid
from main.log import *

class User:
    """Represents a user in the system
    """


    def __init__(self, name):
        """Constructor of a (new) User, only requires name
        """
        self.name = name
        self.id = uuid.uuid4()
        self.log = Log()


    def __init__(self, name, idd, log):
        """Constructor for an existing user where all parameters already exist
        """
        self.name = name
        self.idd = idd
        self.log = log  