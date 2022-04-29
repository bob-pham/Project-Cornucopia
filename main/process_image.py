# Import required packages
import sys
sys.path.append('../')

import cv2
import pytesseract
import re

#Path to Tesseract so it can process image
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

def crop_image(image, img_x1: int, img_y1: int, img_x2: int, img_y2: int):
    """crops an image pased on parameters

    Args:
        image (img): the image
        img_x1 (int): x-coordinate of top-left corner
        img_y1 (int): y-coordinate of top-left corner
        img_x2 (int): x-coordinate of bottom-right corner
        img_y2 (int): x-coordinate of bottom-right corner
    """
    return image[img_y1:img_y2, img_x1:img_x2]

def read_txt_from_image(path: str) -> list[str]:
    """Reads the text from an image, returns a list of sentences from receipt that has been filtered for relevancy 

    Args:
        path (str): path to image file

    Raises:
        Exception: throws exception if no text is read

    Returns:
        list[str]: fully optimized list of string representing text from receipt
    """

    img = cv2.imread(path)
    read_txt = pytesseract.image_to_string(img)
    read_txt = str_to_list_str(read_txt)


    if (read_txt):
        raise Exception("Failed to read any text")
    return read_txt


def str_to_list_str(str1: str) -> list[str]:
    """Converts a single large string into a list of strings, splitting based on sentences. Case statements to filter known edge cases in read text

    Args:
        str1 (str): single large string derived from image

    Returns:
        list[str]: unfiltered list of strings representing the receipt that was read
    """

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
            # The rest of these cases are to filter known edge-cases of poor text detection
            case '|':
                current_string.append('I')
            case _:
                current_string.append(to_edit[i])
    return strings 

def filter_sentence(sentence: str) -> str:
    """removes bloat from sentence that is not relevant to item logging

    Args:
        sentence (str): input sentence

    Returns:
        str: the sentence that has had the bloat removed
    """

    # removes money form sentence replacing with blank char
    sentence = re.sub('\$\d+(?:\.\d+)?', '', sentence)

    length = len(sentence)
    start = 0
    end = length - 1

    # determines and removes the leading and trailing characters
    for x in range(length):
        start = x
        if (sentence[x] != ' ' or sentence[x] != ''):
            break

    for x in range(length):
        if (sentence[length - x - 1] != ' ' or sentence[length - x - 1] != ''):
            break
        end = length - x

    #get the substring
    sentence = sentence[start:end]