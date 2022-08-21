import math
import os

import requests

from api.models import Result
from base.settings.base import OBJECT_STORAGE_URL, MEDIA_ROOT


class FileClass:

    def __init__(self, name=""):
        self.name = name
        self.path = MEDIA_ROOT + OBJECT_STORAGE_URL + name
        self.size = self.convert_size()

    def __str__(self):
        return self.name

    def convert_size(self):
        size_bytes = os.path.getsize(self.path)

        if size_bytes == 0:
            return "0B"

        size_name = ("B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB")
        i = int(math.floor(math.log(size_bytes, 1024)))
        p = math.pow(1024, i)
        s = round(size_bytes / p, 2)

        return "%s %s" % (s, size_name[i])


def save_json_to_model(result, audio):
    """file, 및 result json 파일을 db에 저장"""
    stt_result = Result(
        fid=audio,
        result=result
    )
    stt_result.save()

    return stt_result


def stt_api(file):
    """file -> STT 모델에 전달"""
    """result file -> JSON"""

    model_url = "https://bigdataws.wehago.com/model_api/stt/asr"
    audio = file.file

    body_context = {'audio': audio}

    response = requests.post(model_url, files=body_context)

    if response.status_code == 200:
        result_json = response.json()
        result = save_json_to_model(result_json, file)

    else:
        pass
