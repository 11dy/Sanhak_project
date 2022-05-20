#-*- coding: utf-8 -*-
import json
from base.settings.base import *

MODEL_PATH = '/home/apps/models/'
DATA_PATH = '/home/apps/data'
INNER_URL = 'http://dev.innerapi.wehago.com'
ES_LOGURL = "http://dev.innerapi.wehago.com/logsystem/"

db_json = open(os.path.join(CONFIG_DIR, 'database_settings_dev.json')).read()
DATABASES = json.loads(db_json)

