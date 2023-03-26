import json
import requests

url_post = "http://localhost:7777/people"

i = 0

with open('dataset-extra1.json') as file:
    data = json.load(file)

    for person in data:
        response = requests.post(url_post, json=person)
        print(response.json())

print("Feito!")