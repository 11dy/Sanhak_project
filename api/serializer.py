from rest_framework import serializers

from api.models import Audio


class AudioSerializer(serializers.ModelSerializer):

    class Meta:
        model = Audio
        fields = '__all__'
