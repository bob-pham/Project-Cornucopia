import os
from numpy import diff

class AccuracyAssertion:
    #Accuracy test class used to test the accuracy of text reader

    def assertAccuracy(self, test_name: str, txt_path: str, input: list[str], accuracy: int):
        """Tests accuracy by comparing imput list of strings to the solution

        Args:
            test_name (str): used to generate output file 
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

        #generates output file
        out_file = self.generate_output_file(test_name ,input)
    
        diff_count = 0
        total_count = 0

        #int equal to the line difference
        line_diff = self.check_line_diff(original_list, input)

        if (line_diff < 0):
            #calculates the difference for each line of code for matching line numbers
            for i in range(len(input)):
                temp = self.findNumberOfDifferences(input[i], original_list[i], i, out_file)
                diff_count += temp[0]
                total_count += temp[1]
            
            #if there are remaining lines, each character from every line is added
            output_file = open(out_file, 'w')
            for i in range(abs(line_diff)):
                count = len(original_list[len(original_list) - i])
                diff_count += count
                total_count += count
                output_file.write("Line " + str(i) + " missing")
            output_file.close()

        else:
            #calculates the difference for each line of code for matching line numbers
            for i in range(len(original_list)):
                temp = self.findNumberOfDifferences(input[i], original_list[i])
                diff_count += temp[0]
                total_count += temp[1]
            
            #if there are remaining lines, each character from every line is added
            output_file = open(out_file, 'w')
            for i in range(abs(line_diff)):
                count = len(original_list[len(original_list) - i])
                diff_count += count
                total_count += count
                output_file.write("Line " + str(i) + " missing")
            output_file.close()

        #calculates score
        score = 100 - (diff_count / total_count * 100)

        if (score < accuracy):
            raise self.failureException("Accuracy Result was " + str(score) + " (expected " + str(accuracy) + ")")


    def assertFileExists(self, path: str):
        """Asserts that the path that was given is valid

        Args:
            path (str): Path to the .txt file with expected result

        Raises:
            AssertionError: thrown if the path does not lead to a file
        """
        if not os.path.lexists(path):
            raise self.failureException('File not exists in path "' + path + '".')


    def findNumberOfDifferences(self, input1: list[str], input2: list[str], line_number: int, output_path: str) -> list[int]:
        """Goes character by character and compares them, if they are not the same it logs the difference

        Args:
            input1 (list[str]): first list of string to compare 
            input2 (list[str]): second list of string to compare
            line_number (int): current line number
            output_path (str): path to output file
        Returns:
            list[int]: list of length 2 => list[0] == #difference, list[1] == #total_characters 
        """

        diff_count = 0
        total_count = 0

        output_file = open(output_path, 'w')
        output_file.write("Differences:\n")

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
                output_file.write("Difference on line " + str(line_number) + " : " + str(i))
                output_file.write('\n')

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
                        output_file.write("Difference on line " + str(line_number) + " : " + str(i))
                        output_file.write('\n')
            total_count += 1

        output_file.close()
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


    def generate_output_file(self, name: str, string: list[str]) -> str:
        """generates an output .txt file that represents the input list of string. adds additional padding at the bottom to add differences
           closes the file when done

        Args:
            path (str): String that represents the NAME of the output file. DO NOT ADD .TXT (name should ideally be unique for each test)
            string (list[str]): input list of string to be written

        Returns:
            str: path to output file
        """

        path_front = r"tests\output_txt\\"
        path_back = r".txt"
        path_full = path_front + name + path_back
        
        with open(path_full , 'w') as f:
            for line in string:
                f.write(line)
                f.write('\n') 

            f.write('\n')
            f.write('\n')
            f.write('\n')
            f.close()

        return path_full