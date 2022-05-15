import unittest
import sys
sys.path.append('../')

from tests.AccuracyAssertion import AccuracyAssertion
from main.process_image import *

class TestAccuracy(unittest.TestCase, AccuracyAssertion):
    """Class for building unit tests for text recognition accurracy

    Args:
        unittest (_type_): _description_
        AccuracyAssertion (_type_): _description_
    """


    def test_that_testing_works(self):
        """
        tests that it prints 
        """
        txt_input = r"../tests/images_test/rep.jpg"
        txt_solution = r"solutions_txt/rep_solution.txt"
        input_list = read_txt_from_image(txt_input) 
        self.assertAccuracy("receipt_test", txt_solution, input_list, 0)


    def test_perfect_receipt(self):
        """
        The absolutely perfect receipt input, cannot get any more clear
        """
        txt_input = r"../tests/images_test/rep.jpg"
        txt_solution = r"solutions_txt/rep_solution.txt"
        input_list = read_txt_from_image(txt_input) 
        self.assertAccuracy("receipt_perfect_test", txt_solution, input_list, 90)


    def test_detailed_receipt(self):
        """
        Real picture of a receipt, lots of random numbers and unnecessary text, but only includes the receipt, slight angle
        """
        txt_input = r"../tests/images_test/Detailed-Grocery-Payment-Receipt-Samples.jpg"
        txt_solution = r"solutions_txt/walmart.txt"
        input_list = read_txt_from_image(txt_input)
        self.assertAccuracy("receipt_walmart_detailed", txt_solution, input_list, 45)


    def test_real_receipt(self):
        """
        real picture, already mostly back and white, lots of coupons, savings and receipts but not much actual purchases
        """
        txt_input = r"../tests/images_test/safeway.jpg"
        txt_solution = r"solutions_txt/safeway.txt"
        input_list = read_txt_from_image(txt_input)
        self.assertAccuracy("receipt_safeway", txt_solution, input_list, 50)


    def test_large_file_simple(self):
        """
        large file, some color, simple readable text
        """
        txt_input = r"../tests/images_test/traderjoes.jpg"
        txt_solution = r"solutions_txt/traderjoes.txt"
        input_list = read_txt_from_image(txt_input)
        self.assertAccuracy("traderjoes", txt_solution, input_list, 65)

    
    def test_large_complicated(self):
        """
        hardest test, colored, huge file, lots of text, crumpled
        """
        txt_input = r"../tests/images_test/target.jpeg"
        txt_solution = r"solutions_txt/target.txt"
        input_list = read_txt_from_image(txt_input)
        self.assertAccuracy("target", txt_solution, input_list, 48)

    def test_large_complicated_two(self):
        """
        also very hard
        """
        txt_input = r"../tests/images_test/svefoods.jpg"
        txt_solution = r"solutions_txt/svefoods.txt"
        input_list = read_txt_from_image(txt_input)
        self.assertAccuracy("save on foods", txt_solution, input_list, 15)

unittest.main()