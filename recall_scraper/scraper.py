from http.client import ImproperConnectionState
from bs4 import BeautifulSoup
import requests
import re

def fda_scrape_page_table(website: str) -> list[str]:
    """ returns a list that has the product names of all recalled products. Since it is not guarenteed that item number and UPC are on receipt, they are not included. 
        the reason that count starts at 3 and modulo 4 because there are 4 fields per recall entry, and the 2nd one contains the product name
        not all include tables

    Args:
        website (str): The link to the fda.gov recall page

    Returns:
        list[str]: a list of strings that contains the names of all product recalls
    """
    site = requests.get(website).text
    site_data = BeautifulSoup(site, 'lxml')
    unfiltered_recalls = site_data.find_all('td')
    recalls = []
    count = 3

    for unfrec in unfiltered_recalls:
        if (count % 4 == 0):
            recalls.append(unfrec.text)
        
        count += 1
        
    for recall in recalls:
        print(recall)

    return recalls


def fda_scrape_page_single(website: str) -> str:
    site = requests.get(website)
    site_data = BeautifulSoup(site.content, 'html.parser')
    unfiltered_recalls = site_data.find_all('td')
    found = False

    print(unfiltered_recalls)

    for recall in unfiltered_recalls:
        print(recall.text)

    #     # print(text)
    #     if (found and re.search("[Name:]+", text)):
    #         recalls = re.split("[: ]", text)
    #         # print(recalls)
    #         # return recalls[1]
    #     elif (found and re.search("[Name of product:]+", text)):
    #         recalls = re.split("[: ]", text)
    #         # print(recalls)
    #         # return recalls[1]
    #     elif (not found and re.search("[Company Announcement]+", text)):
            # print(text)
            # found = True
    
    return "fuck"



print(fda_scrape_page_single('https://www.fda.gov/safety/recalls-market-withdrawals-safety-alerts'))
