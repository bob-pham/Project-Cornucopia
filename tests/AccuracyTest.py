import os
from numpy import diff

class AccuracyTest:
    #Accuracy test class used to test the accuracy of text reader

    def assertAccuracy(self, txt_path: str, input: list[str], accuracy: int):
        """Tests accuracy by comparing imput list of strings to the solution

        Args:
            txt_path (str): solution .txt document
            input (list[str]): list of string to be tested
            accuracy (int): integer representing a percent from 0-100 of accuracy

        Raises:
            AssertionError: raised if the test accuracy is lower than target accuracy
        """

        #Ensuring solution file exists
        self.assertFileExists(txt_path)

        #create list of strings from solution .txt
        original_list = self.create_txt_list(txt_path)
        diff_count = 0
        total_count = 0

        #int equal to the line difference
        line_diff = self.check_line_diff(original_list, input)

        if (line_diff < 0):
            #calculates the difference for each line of code for matching line numbers
            for i in range(len(input)):
                temp = self.findNumberOfDifferences(input[i], original_list[i])
                diff_count += temp[0]
                total_count += temp[1]
            
            #if there are remaining lines, each character from every line is added
            for i in range(abs(line_diff)):
                count = len(original_list[len(original_list) - i])
                diff_count += count
                total_count += count

        else:
            #calculates the difference for each line of code for matching line numbers
            for i in range(len(original_list)):
                temp = self.findNumberOfDifferences(input[i], original_list[i])
                diff_count += temp[0]
                total_count += temp[1]
            
            #if there are remaining lines, each character from every line is added
            for i in range(abs(line_diff)):
                count = len(input[len(input) - i])
                diff_count += count
                total_count += count

        #calculates score
        score = 100 - (diff_count / total_count * 100)

        if (score < accuracy):
            raise AssertionError("Accuracy Result was " + str(score) + " (expected " + str(accuracy) + ")")


    def assertFileExists(self, path: str):
        """Asserts that the path that was given is valid

        Args:
            path (str): Path to the .txt file with expected result

        Raises:
            AssertionError: thrown if the path does not lead to a file
        """
        if not os.path.lexists(path):
            raise AssertionError('File not exists in path "' + path + '".')


    def findNumberOfDifferences(self, input1: list[str], input2: list[str]) -> list[int]:
        """Goes character by character and compares them, if they are not the same it logs the difference

        Args:
            input1 (list[str]): first list of string to compare 
            input2 (list[str]): second list of string to compare

        Returns:
            list[int]: list of length 2 => list[0] == #difference, list[1] == #total_characters 
        """

        diff_count = 0
        total_count = 0

        len_diff = len(input1) - len(input2)
        shorter = []
        longer = []
        
        if (len_diff < 0):
            shorter = list(input1)
            longer = list(input2)
        else:
            shorter = list(input2)
            longer = list(input1)

        len_diff = abs(len_diff)

        for i in range(len(longer)):
            if (i > len(shorter) - 1):
                diff_count += 1
            else:
                if (longer[i] != shorter[i]):
                    is_diff = True

                    #Strings may be of differing lengths due to missing characters, searches around for similar characters
                    for x in range(len_diff):
                        if (i - x >= 0 and longer[i-x] == shorter[i]):
                            is_diff = False
                        elif (i + x < len(shorter) and longer[i] == shorter[i+x]):
                            is_diff = False
                    if (is_diff):
                        diff_count += 1
            total_count += 1

        return [diff_count, total_count]
                    

    def create_txt_list(self, txt_path:str) -> list[str]:
        """returns a list of strings that represent the solution .txt

        Args:
            txt_path (str): path to solution .txt

        Returns:
            list[str]: list of strings representing txt in solution .txt
        """
        txt = open(txt_path, 'r')
        txt_list = []

        for line in txt:
            if (not line == '\n'):
                line = line.rstrip('\n')
                txt_list.append(line)
        return txt_list


    def check_line_diff(self, original: list[str], input: list[str]) -> int:
        """returns the difference in line length

        Args:
            original (list[str]): list of string representing solution
            input (list[str]): list of string representing input

        Returns:
            int: difference num
        """
        diff = len(input) - len(original)
        return diff 