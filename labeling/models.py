from django.db import models
import os
import base.settings.base as settings
class AudioFile(models.Model):
    audio_file = models.FileField(null=True, upload_to="", blank=True)
    language = models.TextField()
    status = models.TextField()
    request_method = models.TextField()
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()

    def __str__(self):
        return self.file_name

    def delete(self, *args, **kwargs):
        super(AudioFile, self).delete(*args, **kwargs)
        os.remove(os.path.join(settings.MEDIA_ROOT, self.audio_file.path))
