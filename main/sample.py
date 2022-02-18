# Import required packages
import sys
import cv2
import pytesseract
from accuracy_test import *

pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

def simple():
    img = cv2.imread("images/sample.jpg")
    return pytesseract.image_to_string(img)

def recipe():
    img = cv2.imread("images/rep.jpg")
    return pytesseract.image_to_string(img)
    
def brothers():
    img = cv2.imread("images/brothers.png")
    return pytesseract.image_to_string(img)

def brotherswhite():
    img = cv2.imread("images/brotherswhite.png")
    return pytesseract.image_to_string(img)
def gorillaz():
    img = cv2.imread("images/gorillaz.png")
    return pytesseract.image_to_string(img)

def berserk():
    img = cv2.imread("images/gatsu.jpg")
    return pytesseract.image_to_string(img)

def crossgame():
    img = cv2.imread("images/crossgame.png")
    return pytesseract.image_to_string(img)

def crossgameagain():
    img = cv2.imread("images/crossgameagain.png")
    return pytesseract.image_to_string(img)

def bonclay():
    img = cv2.imread("images/bonclay.png")
    return pytesseract.image_to_string(img)

def str_to_list_str(str1: str) -> list[str]:
    strings = []
    current_string = []
    to_edit = list(str1)
    
    for i in range(len(to_edit)):
        match to_edit[i]:
            case '\n':
                if (len(current_string) > 0):
                    temp = ''.join(map(str, current_string))
                    strings.append(temp)
                current_string = []
            case '|':
                current_string.append('I')
            # case '\'':
            #     if (i + 1 < len(str1) and to_edit[i + 1] == 'm'):
            #         if (i - 1 >= 0 and (not to_edit[i-1] == "I")):
            #             current_string.append("I'")
            #         else:
            #             current_string.append('\'')
            case _:
                current_string.append(to_edit[i])
    return strings

# \$\d+(?:\.\d+)? <--- money regex

def printing():
    strings = str_to_list_str(brotherswhite())
    print(len(strings))
    for i in strings:
        print(i)

strings = str_to_list_str(brotherswhite())

with open('images/brothers_out.txt', 'w') as f:
    for line in strings:
        f.write(line)
        f.write('\n')

test_accuracy("recognized.txt", strings, True)

# printing()

