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

    # Image processing
    # Reads in the image -> resizes it for speed -> converts it to black and white -> crops
    img = cv2.imread(path)
    # img = cv2.resize(img, (0, 0), fx = 0.2, fy = 0.2)
    img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    (thresh, img) = cv2.threshold(img, 127, 255, cv2.THRESH_BINARY)
   

    #get raw text from image
    read_txt = pytesseract.image_to_string(img)
    
    #filter text
    read_txt = str_to_list_str(read_txt)

    #if no text was read, raise exception
    if (not read_txt):
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
        curr = to_edit[i]
        if (curr == '\n'):
            if (len(current_string) > 0):
                temp = ''.join(map(str, current_string))
                temp = temp.split("$")
                for l in temp:
                    strings.append(l)
            current_string = []
        elif (curr == '|'):
            current_string.append('I')
        else:
            current_string.append(curr)

    strings = filter_raw_sentences(strings)

    return strings 



def filter_raw_sentences(raw_sentence: list[str]) -> list[str]:
    """goes through the list of raw sentences and removes irrelevant information
        assumes that the first sentence is irrelevant information 

    Args:
        raw_sentence (list[str]): 

    Returns:
        list[str]: filtered sentence
    """
    
    filtered_sentences = []

    for i in range(2, len(raw_sentence) - 6):
        temp = filter_sentence(raw_sentence[i])
        if (temp):
            filtered_sentences.append(temp)

    return filtered_sentences



def filter_sentence(sentence: str) -> str:
    """removes bloat from sentence that is not relevant to item logging

    Args:
        sentence (str): input sentence

    Returns:
        str: the sentence that has had the bloat removed
    """

    # removes money form sentence replacing with blank char
    sentence = re.sub('\$\d+(?:\.\d+)?', '', sentence)

    if (re.search('^-?[0-9][0-9,\.]+$', sentence)):
        return None

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
    return sentence

def testing():
    img = cv2.imread('../tests/images_test/rep.jpg')
    # img1 = cv2.resize(img, (0, 0), fx = 0.2, fy = 0.2)
    img2 = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    (thresh, img3) = cv2.threshold(img2, 127, 255, cv2.THRESH_BINARY)

    cv2.imshow('original', img);
    # cv2.imshow('rescaled', img1);
    cv2.imshow('grayscaled', img2);
    cv2.imshow('blackandwhite', img3);

    cv2.waitKey(0)
    cv2.destroyAllWindows()

testing()