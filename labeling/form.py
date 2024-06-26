from django.forms import ModelForm

from labeling.models import AudioFile


class AudioFileForm(ModelForm):
    class Meta:
        model = AudioFile
        fields = ['file_name', 'audio_file', 'language']