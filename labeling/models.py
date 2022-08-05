from django.db import models
import os
import base.settings.base as settings


class AudioFile(models.Model):
    audio_file = models.FileField(null=True, upload_to="", blank=False)
    language = models.TextField(null=False, blank=False)
    status = models.TextField(null=False, blank=False)
    request_method = models.TextField(null=False, blank=False)
    start_time = models.DateTimeField(null=False, blank=False)
    end_time = models.DateTimeField(null=False, blank=False)

    def __str__(self):
        return self.audio_file.name

    def delete(self, *args, **kwargs):
        super(AudioFile, self).delete(*args, **kwargs)

        if self.request_method == "파일 업로드":
            os.remove(os.path.join(settings.MEDIA_ROOT, self.audio_file.path))


class STTResult(models.Model):
    result_file = models.JSONField(default=dict)
    file_id = models.ForeignKey("AudioFile", related_name="file", db_column="file_id", on_delete=models.CASCADE)

    def __str__(self):
        return self.result_file.name
