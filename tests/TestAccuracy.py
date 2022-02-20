import unittest
import sys
sys.path.append('../')

from tests.AccuracyAssertion import AccuracyAssertion
from main.sample import *

class TestAccuracy(unittest.TestCase, AccuracyAssertion):
    """Class for building unit tests for text recognition accurracy

    Args:
        unittest (_type_): _description_
        AccuracyAssertion (_type_): _description_
    """


    def test_that_testing_works(self):
        txt_input = r"tests\images_test\rep.jpg"
        txt_solution = r"tests\solutions_txt\rep_solution.txt"
        txt_raw = read_txt(txt_input) #something is breaking horribly here TODO
        input_list = str_to_list_str(txt_raw)

        self.assertAccuracy("receipt_test", txt_solution, input_list, 50)
    