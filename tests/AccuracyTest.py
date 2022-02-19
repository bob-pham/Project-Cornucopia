import os

from numpy import diff

class AccuracyTest:
    def assertFileExists(self, path: str):
        if not os.path.lexists(path):
            raise AssertionError('File not exists in path "' + path + '".')

    def assertAccuracy(self, txt_path: str, input: list[str], accuracy: int):
        original_list = self.create_txt_list(txt_path)
        diff_count = 0
        total_count = 0
        line_diff = self.check_line_diff(original_list, input)

        if (line_diff < 0):
            for i in range(len(input)):
                temp = self.findNumberOfDifferences(input[i], original_list[i])
                diff_count += temp[0]
                total_count += temp[1]
            
            for i in range(abs(line_diff)):
                count = len(original_list[len(original_list) - i])
                diff_count += count
                total_count += count

        else:
            for i in range(len(original_list)):
                temp = self.findNumberOfDifferences(input[i], original_list[i])
                diff_count += temp[0]
                total_count += temp[1]
            
            for i in range(abs(line_diff)):
                count = len(input[len(input) - i])
                diff_count += count
                total_count += count

        score = 100 - (diff_count / total_count * 100)

        if (score < accuracy):
            raise AssertionError("Accuracy Result was " + str(score) + " (expected " + str(accuracy) + ")")


    def findNumberOfDifferences(self, input1: list[str], input2: list[str]) -> list[int]:
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
        txt = open(txt_path, 'r')
        txt_list = []

        for line in txt:
            if (not line == '\n'):
                line = line.rstrip('\n')
                txt_list.append(line)
        return txt_list

    def check_line_diff(self, original: list[str], input: list[str]) -> int:
        diff = len(input) - len(original)
        return diff 