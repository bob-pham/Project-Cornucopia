import requests

response = requests.get('https://api.fda.gov/food/enforcement.json?search=recall_initiation_date:[2022-01-01+TO+2022-02-11]&limit=20')
print(response.json())

#https://api.fda.gov/food/enforcement.json?search=recall_initiation_date:[2022-01-01+TO+2022-02-11]&limit=20

