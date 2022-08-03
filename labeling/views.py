import datetime

from django.shortcuts import render, redirect
from django.core.paginator import Paginator

from base.settings.base import OBJECT_STORAGE_URL, MEDIA_ROOT
from labeling.models import AudioFile

import os

from labeling.utils import FileClass


def home(request):
    page = int(request.GET.get('page', 1))
    work_list = AudioFile.objects.order_by('-start_time')
    paginator = Paginator(work_list, 5)
    page_obj = paginator.get_page(page)
    file_list = get_file_list()
    context = {'work_list': page_obj, 'file_list': file_list}
    return render(request, 'labeling/work_list.html', context)


def edit_file(request, pk):  # edit_file 가는 함수
    file = AudioFile.objects.get(pk=pk)
    url = 'labeling'+file.audio_file.url
    print(url)
    return render(request, 'labeling/edit_file.html', {'file': file, 'url': url})


def add_file(request):
    """로컬에 있는 오디오 파일을 서버에 업로드 하는 코드"""

    if request.method == 'POST':
        audio = request.FILES['audio_file']
        print(audio)
        language = request.POST['language']
        fileupload = AudioFile(
            audio_file=audio,
            language=language,
            status="작업 대기",
            request_method="파일 업로드",
            start_time=datetime.datetime.now(),
            end_time=datetime.datetime.now(),
        )

        fileupload.save()
        return redirect('/labeling/')
    else:

        return redirect('/labeling/')


def delete_file(request):
    if request.method == 'GET':
        delete_list = request.GET.getlist('checked')
        for delete_id in delete_list:
            record = AudioFile.objects.get(id=delete_id)
            record.delete()

        return redirect('/labeling/')


def search_result(request):
    """특정 파일 검색"""

    if request.method == 'POST':
        query = request.POST.get('search_text')
        work_list = AudioFile.objects.filter(audio_file__contains=query)
        context = {'work_list': work_list}
        return render(request, 'labeling/work_list.html', context)


def get_file_list():
    path = MEDIA_ROOT + OBJECT_STORAGE_URL
    file_list = os.listdir(path)

    file_class_list = []

    for file_name in file_list:
        file = FileClass(file_name)
        file_class_list.append(file)

    return file_class_list


def add_object_storage(request):
    if request.method == "GET":
        file_name = request.GET.get('file')
        language = request.GET.get('language')

        fileupload = AudioFile(
            language=language,
            status="작업 대기",
            request_method="Object Storage에서 선택",
            start_time=datetime.datetime.now(),
            end_time=datetime.datetime.now(),
        )
        fileupload.audio_file.name = 'testob/' + file_name
        fileupload.save()

        return redirect('/labeling/')
