#-*- coding: utf-8 -*-
import json
from base.settings.base import *

MODEL_PATH = '/home/apps/models/'
DATA_PATH = '/home/apps/data'
INNER_URL = 'http://10.70.201.254'
ES_LOGURL = "http://innerapi.wehago.com/logsystem/"

db_json = open(os.path.join(CONFIG_DIR, 'database_settings_ops.json')).read()
DATABASES = json.loads(db_json)