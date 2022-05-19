import requests
import json

# response = requests.get('https://api.fda.gov/food/enforcement.json?search=recall_initiation_date:[2022-01-01+TO+2022-02-11]&limit=20')
# print(response)
# print(response.json())

#https://api.fda.gov/food/enforcement.json?search=recall_initiation_date:[2022-01-01+TO+2022-02-11]&limit=20

recalled_items = []

class RecalledItem:

        def __init__(self, name, company, date, reason):
            self.name = name
            self.company = company
            self.date = date
            self.reason = reason


def get_food_recalls_FDA():
    response = requests.get('https://api.fda.gov/food/enforcement.json?search=recall_initiation_date:[2022-03-01+TO+2022-05-18]&limit=5')
    
    if response:
        response = response.json()
        recalls = response['results']

        if (len(recalls) > 0):
            for recall in recalls:
                name = filter_recall_for_name(recall['product_description'])
                company = recall['recalling_firm']
                date = recall['recall_initiation_date']
                reason = recall['reason_for_recall']
                item = RecalledItem(name, company, date, reason)
                recalled_items.append(item)


def filter_recall_for_name(unfilered: str) -> str:
    return ""

get_food_recalls_FDA()