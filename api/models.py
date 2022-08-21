from django.db import models
import os
import base.settings.base as settings


class Audio(models.Model):
    name = models.TextField(null=False, blank=False)
    file = models.FileField(null=True, upload_to="", blank=False)
    language = models.TextField(null=False, blank=False)
    status = models.TextField(null=False, blank=False)
    request_method = models.TextField(null=False, blank=False)
    start_time = models.DateTimeField(null=False, blank=False)
    end_time = models.DateTimeField(null=False, blank=False)

    def __str__(self):
        return self.name

    def delete(self, *args, **kwargs):
        super(Audio, self).delete(*args, **kwargs)

        if self.request_method == "파일 업로드":
            os.remove(os.path.join(settings.MEDIA_ROOT, self.file.path))

    def set_name(self, file_name=""):

        if file_name == "":
            self.name = self.file.name
        else:
            self.name = file_name


class Result(models.Model):
    result = models.JSONField(default=dict)
    fid = models.ForeignKey("Audio", related_name="file_id", db_column="file_id", on_delete=models.CASCADE)

    def __str__(self):
        return self.result.name

