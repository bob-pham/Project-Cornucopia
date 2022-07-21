# Import required packages
import sys
sys.path.append('../')

import os
import cv2
import pytesseract
import re

# CONSTANTS

IMG_SIZE = 500

#Path to Tesseract so it can process image
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

def crop_image(image, img_x1: int, img_y1: int, img_x2: int, img_y2: int):
    """crops an image pased on parameters, returns the image cropped

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

    # Makes sure the file exists
    assertFileExists(path)

    # Image processing
    # Reads in the image -> resizes it for speed -> converts it to black and white -> crops (nvm no crop it decreases accuracy)
    img = cv2.imread(path)
    
    height = img.shape[0]
    width = img.shape[1]
    scale_factor = width if width < height else height
    scale_factor = IMG_SIZE / scale_factor 

    img1 = cv2.resize(img, (0, 0), fx = scale_factor, fy = scale_factor)
    img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    # (thresh, img) = cv2.threshold(img, 127, 255, cv2.THRESH_BINARY) <- made readings too inaccurate, but improves speed by 50%

    #get raw text from image
    read_txt = pytesseract.image_to_string(img)
    
    #filter text
    read_txt = str_to_list_str(read_txt)

    #if no text was read, raise exception
    if (not read_txt):
        raise Exception("Failed to read any text")
    return read_txt


def str_to_list_str(to_edit: str) -> list[str]:
    """Converts a single large string into a list of strings, splitting based on sentences. Case statements to filter known edge cases in read text

    Args:
        str1 (str): single large string derived from image

    Returns:
        list[str]: unfiltered list of strings representing the receipt that was read
    """

    to_edit = to_edit.upper()
    
    # gets rid of everything after TOTAL and Subtotal, since none of it will be relevant
    to_edit = to_edit.split('SUB TOTAL')
    to_edit = to_edit[0]
    to_edit = to_edit.split('SUBTOTAL')
    to_edit = to_edit[0]
    to_edit = to_edit.split('TOTAL')
    to_edit = to_edit[0]

    # gets rid of everything after credit, debit, cash, balance
    to_edit = to_edit.split('CREDIT')
    to_edit = to_edit[0]
    to_edit = to_edit.split('DEBIT')
    to_edit = to_edit[0]
    to_edit = to_edit.split('CASH')
    to_edit = to_edit[0]
    to_edit = to_edit.split('BALANCE')
    to_edit = to_edit[0]

    # gets rid of everything before a phone number
    to_edit = re.split('(\(?[1-9]\d{2}\)?)([\s|\-|])(\d{3})([\s|\-])(\d{4})', to_edit)
    to_edit = to_edit[len(to_edit) - 1] if len(to_edit) > 1 else to_edit[0]

    #gets rid of everything before a date
    to_edit = re.split('(\d{1,2})[\/|\-|\s](\d{1,2})[\/|\-|\s]((\d{4})|(\d{2}))', to_edit)
    to_edit = to_edit[len(to_edit) - 1] if len(to_edit) > 1 else to_edit[0]

    #gets rid of everything before the last time stamp
    to_edit = re.split('(\d{1,2}):(\d{2})\s?([a|A|p|P][m|M])?', to_edit)
    to_edit = to_edit[len(to_edit) - 1]

    to_edit = to_edit.split('\n')
    
    #splits elements based off of where money regex was
    # filtered = re.split('\d+[\.|,]\d{2}', to_edit)

    filtered = filter_raw_sentences(to_edit)

    return filtered 


def filter_raw_sentences(raw_sentence: list[str]) -> list[str]:
    """goes through the list of raw sentences and removes irrelevant information
        assumes that the first sentence is irrelevant information 

    Args:
        raw_sentence (list[str]): 

    Returns:
        list[str]: filtered sentence
    """
    
    filtered_sentences = []

    for i in raw_sentence:
        temp = filter_sentence(i)
        if (temp and len(temp) > 2):
            filtered_sentences.append(temp)

    return filtered_sentences



def filter_sentence(sentence: str) -> str:
    """removes bloat from sentence that is not relevant to item logging

    Args:
        sentence (str): input sentence

    Returns:
        str: the sentence that has had the bloat removed
    """

    # if sentence contains any of these words, likely is not relevant
    if (re.search('COUPON', sentence) or re.search('FEE', sentence) or re.search('SHOPPING', sentence) or re.search('TAX', sentence) or re.search('PRICE', sentence) or re.search('SAVE', sentence) or re.search("% OFF", sentence) or re.search("@", sentence)):
        return ""

    # removes any sort of PLU/Barcode #
    sentence = re.sub('(\s*)\d{4,}(\s*)', ' ', sentence)
    sentence = re.sub('\$', '', sentence)
    sentence = re.sub('\d+[\.|,]\d{2}', '', sentence)

    length = len(sentence)
    start = 0
    end = length - 1

    # determines and removes the leading and trailing spaces and blank characters
    for x in range(length):
        if (not sentence[x].isdigit() and not sentence[x].isalpha()):
            start += 1
        else:
            break

    for x in range(len(sentence) - 1, 0, -1):
        if (not sentence[x].isdigit() and not sentence[x].isalpha()):
            end -= 1
        else:
            break

    #get the substring
    sentence = sentence[start:end + 1]
    return sentence


def assertFileExists(path: str):
    """Asserts that the path that was given is valid
    Args:
        path (str): Path to the .txt file with expected result
    Raises:
        AssertionError: thrown if the path does not lead to a file
    """
    if not os.path.lexists(path):
        raise Exception('File not exists in path "' + path + '".')