from urllib import response
import requests
from datetime import datetime, timedelta
import json

DAYS_BEFORE = 7

recalled_items = []

class RecalledItem:

        def __init__(self, name, company, date, reason):
            self.name = name
            self.company = company
            self.date = date
            self.reason = reason


def get_food_recalls_all():
    """ gets food recalls from the FDA and Canadian government APIs
    """
    current_date = datetime.now()
    week_before = current_date - timedelta(days = DAYS_BEFORE)
    FDA_link = 'https://api.fda.gov/food/enforcement.json?search=recall_initiation_date:[' + str(week_before.year) + '-' + str(week_before.month) + '-' + str(week_before.day) + '+TO+' + str(current_date.year) + '-' + str(current_date.month) + '-' + str(current_date.day) + ']&limit=5'

    get_food_recalls_FDA(FDA_link)
    get_food_recalls_canadian()



def get_food_recalls_FDA(link: str):
    """gets the latest 5 recalls from the FDA database, 5 is usually more than enough for a week of recalls

    Args:
        link (str): generated string for the API call
    """
    response = requests.get(link)

    if response:
        response = response.json()
        recalls = response['results']

        if (len(recalls) > 0):
            for recall in recalls:
                name = filter_recall_for_name(recall['product_description'])
                company = recall['recalling_firm']
                date = datetime.strptime(recall['recall_initiation_date'], '%Y%m%d')
                reason = recall['reason_for_recall']
                item = RecalledItem(name, company, date, reason)
                recalled_items.append(item)


def get_food_recalls_canadian(curr_date: datetime):
    """checks food recalls from the Canadian government API

    Args:
        curr_date = the current date as a date object
    """
    response = requests.get('https://healthycanadians.gc.ca/recall-alert-rappel-avis/api/recent/en')
    recalls = response['FOOD']

    for recall in recalls:
        date_published = datetime.utcfromtimestamp(recall['date_published']).strftime('%Y-%m-%d %H:%M:%S')
        
        if (curr_date - date_published <= DAYS_BEFORE):
            title = recall['title']
            name = filter_recall_for_name(title)
            company = filter_recall_for_company(title)
            reason = filter_recall_for_reason(title)
            item = RecalledItem(name, company, date_published, reason)
            recalled_items.append(item)
        else:
            break
            

def filter_recall_for_name(unfiltered: str) -> str:
    return unfiltered

def filter_recall_for_company(unfiltered: str) -> str:
    return unfiltered

def filter_recall_for_reason(unfiltered: str) -> str:
    return unfiltered

get_food_recalls_all()