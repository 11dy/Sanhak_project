import datetime
import json
import os

from django.http import HttpResponse
from rest_framework import viewsets, generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

from api.models import Audio
from api.serializer import AudioSerializer
from api.utils import FileClass
from base.settings.base import OBJECT_STORAGE_URL, MEDIA_ROOT


class AudioListSerializer(generics.ListCreateAPIView):
    queryset = Audio.objects.all()
    serializer_class = AudioSerializer


@api_view(['GET'])
def obj_detect_api(request, pk):
    audio = Audio.objects.get(pk=pk)
    serializer = AudioSerializer(audio)
    return Response(serializer.data)


def local_file_upload(request):
    if request.method == 'POST':
        audio = request.FILES['file']
        language = request.POST['langauge']
        upload_file = Audio(
            file=audio,
            language=language,
            status="작업 대기",
            request_method="파일 업로드",
            start_time=datetime.datetime.now(),
            end_time=datetime.datetime.now(),
        )
        upload_file.set_name()
        upload_file.save()
        return HttpResponse(json.dumps({"status": "Success"}))


def object_list(request):
    if request.method == 'GET':
        path = MEDIA_ROOT + OBJECT_STORAGE_URL
        file_list = os.listdir(path)
        file_class_list = []

        for file_name in file_list:
            file = FileClass(file_name)
            file_class_list.append(file)

        list = []

        for file in file_class_list:
            temp = {'name': file.name, 'size': file.size}
            list.append(temp)

        return HttpResponse(json.dumps(list))


def object_file_upload(request):
    if request.method == "POST":
        name = request.POST['file']
        language = request.POST['language']
        upload_file = Audio(
            language=language,
            status="작업 대기",
            request_method="Object Storage에서 선택",
            start_time=datetime.datetime.now(),
            end_time=datetime.datetime.now(),
        )
        upload_file.file.name = 'testob/' + name
        upload_file.set_name(name)
        upload_file.save()

        return HttpResponse(json.dumps({"status": "Success"}))
