import requests
from datetime import datetime, timedelta
import json

recalled_items = []

class RecalledItem:

        def __init__(self, name, company, date, reason):
            self.name = name
            self.company = company
            self.date = date
            self.reason = reason

def get_food_recalls_all():
    current_date = datetime.now()
    week_before = current_date - timedelta(days = 7)
    FDA_link = 'https://api.fda.gov/food/enforcement.json?search=recall_initiation_date:[' + str(week_before.year) + '-' + str(week_before.month) + '-' + str(week_before.day) + '+TO+' + str(current_date.year) + '-' + str(current_date.month) + '-' + str(current_date.day) + ']&limit=5'

    get_food_recalls_FDA(FDA_link)

def get_food_recalls_FDA(link: str):
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
                print(name)
                print(company)
                print(date)
                print(reason)
                recalled_items.append(item)


def filter_recall_for_name(unfilered: str) -> str:
    return ""

get_food_recalls_all()