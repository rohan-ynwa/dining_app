import datetime
import json
import requests
import urllib.parse
from umass_toolkit import dining_utils
from fastapi import FastAPI

app = FastAPI()

@app.get('/items')
def get_menu():
  query_params = {'tid': 1,
                  'date': datetime.date.today().strftime('%m/%d/%Y')}
  request_url = 'https://umassdining.com/foodpro-menu-ajax?' + \
      urllib.parse.urlencode(query_params)
  r = requests.get(request_url).json()
  ret = []
  for meal in r.keys():
    for category in r[meal].keys():
      ret.extend(dining_utils.category_html_to_dict(
          r[meal][category], meal, category))
  
  return ret
