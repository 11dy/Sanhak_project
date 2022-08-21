import datetime
import json
import os

from django.http import HttpResponse
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response

from api.models import Audio, Result
from api.serializer import AudioSerializer
from api.utils import FileClass, stt_api
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
        stt_api(upload_file)
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
        stt_api(upload_file)

        return HttpResponse(json.dumps({"status": "Success"}))


def delete_file(request):
    if request.method == 'POST':
        delete_list = request.POST.getlist('delete_ids')
        for delete_id in delete_list:
            record = Audio.objects.get(id=delete_id)
            record.delete()

        return HttpResponse(json.dumps({"status": "Success"}))


def get_result(request, pk):
    file = Audio.objects.get(pk=pk)
    result = Result.objects.get(id=file.id)
    data = []
    info = {"contentType": 0, "fileName": file.name, "fileSize": file.file.size, "mediaUrl": file.file.url}
    data.append({"info": info})
    stt_response = {"message": "Succeeded", "result": "SUCCEEDED", "segments": result.result}
    data.append({"SttResponse": stt_response})
    return HttpResponse(json.dumps(data))


def test(request):
    re = Result.objects.all()

    for r in re:
        print(r.fid)
        print(r.result)
        print(r.id)
