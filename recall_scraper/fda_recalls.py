import requests

# response = requests.get('https://api.fda.gov/food/enforcement.json?search=recall_initiation_date:[2022-01-01+TO+2022-02-11]&limit=20')
# print(response)
# print(response.json())

#https://api.fda.gov/food/enforcement.json?search=recall_initiation_date:[2022-01-01+TO+2022-02-11]&limit=20

def get_food_recalls():
    response = requests.get('https://api.fda.gov/food/enforcement.json?search=recall_initiation_date:[2022-01-01+TO+2022-02-11]&limit=20')
    
    if response:
        response = response.json()
        print(response.results)
    else:
        raise Exception("Failed to get response from FDA")

get_food_recalls()