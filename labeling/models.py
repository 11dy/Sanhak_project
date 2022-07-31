from django.db import models


class AudioFile(models.Model):
    file_name = models.TextField()
    audio_file = models.FileField(null=True, upload_to="./labeling", blank=True)
    language = models.TextField()
    status = models.TextField()
    request_method = models.TextField()
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()

    def __str__(self):
        return self.file_name
