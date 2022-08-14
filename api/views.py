from rest_framework import viewsets, generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

from api.models import Audio
from api.serializer import AudioSerializer


class AudioListSerializer(generics.ListCreateAPIView):
    queryset = Audio.objects.all()
    serializer_class = AudioSerializer


@api_view(['GET'])
def obj_detect_api(request, pk):
    audio = Audio.objects.get(pk=pk)
    serializer = AudioSerializer(audio)
    return Response(serializer.data)
