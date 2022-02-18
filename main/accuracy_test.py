 

from xmlrpc.client import boolean


def test_accuracy(txt_path: str, input: list[str], verbose: boolean):
    txt_list = create_txt_list(txt_path)
    
    print("-----------------------------------------------")
    print("TEST: " + txt_list[0])
    print("-----------------------------------------------")

    line_diff = check_line_diff(txt_list, input)
    print()

    diff_count = 0
    total_count = 0

    if (line_diff < 0):
        for i in range(len(input)):
            orig = txt_list[i + 1] 
            curr = input[i]
            longer = list(curr) if len(curr) > len(orig) else list(orig)
            shorter = list(curr) if len(curr) <= len(orig) else list(orig)

            for j in range(len(longer)):
                if (j > len(shorter) - 1):
                    diff_count += 1
                    if (verbose):
                        print("Difference on line " + str(i + 1) + ": " + str(j))
                else:
                    if (longer[j] != shorter[j]):
                        diff_count += 1
                        if (verbose):
                            print("Difference on line " + str(i + 1) + ": " + str(j))
                total_count += 1

        for i in range(line_diff + len(txt_list), len(txt_list)):
            if (i + 1 < len(txt_list)):
                for j in list(txt_list[i + 1]):
                    diff_count += 1
                    total_count += 1

    else:
        orig = txt_list[i + 1] 
        curr = input[i]
        longer = list(curr) if len(curr) > len(orig) else list(orig)
        shorter = list(curr) if len(curr) <= len(orig) else list(orig)

        for j in range(len(longer)):
            if (j > len(shorter) - 1):
                diff_count += 1
                if (verbose):
                    print("Difference on line " + str(i + 1) + ": " + str(j))
            else:
                if (longer[j] != shorter[j]):
                    diff_count += 1
                    if (verbose):
                        print("Difference on line " + str(i + 1) + ": " + str(j))
            total_count += 1

        for i in range(len(input) - line_diff, len(input)):
            for j in list(input[i]):
                diff_count += 1
                total_count += 1

    accuracy = 100 - (diff_count / total_count * 100)
    print("\nAccuracy Results: " + str(accuracy))

def create_txt_list(txt_path:str) -> list[str]:
    txt = open(txt_path, 'r')
    txt_list = []

    for line in txt:
        if (not line == '\n'):
            line = line.rstrip('\n')
            txt_list.append(line)

    return txt_list

def check_line_diff(original: list[str], input: list[str]) -> int:
    diff = len(input) - len(original) -1
    if (diff != 0):
        if (diff < 0):
            print("Captured Text Shorter By: " + str(abs(diff)) + " lines")
        else:
            print("Captured Text Longer By: " + str(diff) + " lines")
    return diff 


