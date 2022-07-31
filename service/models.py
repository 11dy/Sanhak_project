from django.db import models


class Work(models.Model):
    file_name = models.TextField()
    status = models.TextField()
    request_method = models.TextField()
    result_path = models.TextField()
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()

    def __str__(self):
        return self.file_name


class AudioFile(models.Model):
    file_name = models.TextField()
    audio_file = models.FileField(null=True, upload_to="", blank=True)
    language = models.TextField()
    status = models.TextField()
    request_method = models.TextField()
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()

    def __str__(self):
        return self.file_name
