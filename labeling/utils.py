from django.http.multipartparser import FILE

from base.settings import base
import math, os


class FileClass:

    def __init__(self, file_name=""):
        self.file_name = file_name
        self.path = base.MEDIA_ROOT + '/testob/' + file_name
        self.size = self.convert_size()

    def __str__(self):
        return self.file_name

    def convert_size(self):
        size_bytes = os.path.getsize(self.path)

        if size_bytes == 0:
            return "0B"

        size_name = ("B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB")
        i = int(math.floor(math.log(size_bytes, 1024)))
        p = math.pow(1024, i)
        s = round(size_bytes / p, 2)

        return "%s %s" % (s, size_name[i])
