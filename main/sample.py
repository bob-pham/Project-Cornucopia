# Import required packages
import sys
sys.path.append('../')

import cv2
import pytesseract


# something going wrong with tesseract so commenting this out for now
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

#example on how to call tesseract with opencv
def read_txt(path: str):
    img = cv2.imread(path)
    return pytesseract.image_to_string(img) #returns a big long string of all the text

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
            case _:
                current_string.append(to_edit[i])
    return strings

# \$\d+(?:\.\d+)? <--- money regex
