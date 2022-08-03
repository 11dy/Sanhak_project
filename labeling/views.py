import datetime

from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
from django.db import models
from django.shortcuts import render, redirect
from django.core.paginator import Paginator

import base.settings.base
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


def edit_file(request):  # edit_file 가는 함수
    return render(request, 'labeling/edit_file.html')


def add_file(request):
    """로컬에 있는 오디오 파일을 서버에 업로드 하는 코드"""

    if request.method == 'POST':
        audio = request.FILES["audio_file"]
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
    if request.method == 'POST':
        delete_list = request.POST.getlist('checked')
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

    path = base.settings.base.MEDIA_ROOT + '/testob/'
    file_list = os.listdir(path)

    file_class_list = []

    for file_name in file_list:
        file = FileClass(file_name)
        file_class_list.append(file)

    return file_class_list


def add_object_storage(request):
    from django.core.files import File

    file = request.GET.get('file')
    language = request.GET.get('langauge')

    file = FileClass(file)
    new_file = File(open(file.path), file.file_name)

    print(new_file)
    fileupload = AudioFile(
        audio_file=new_file,
        language=language,
        status="작업 대기",
        request_method="오브젝트 스토리지",
        start_time=datetime.datetime.now(),
        end_time=datetime.datetime.now(),
    )

    fileupload.save()

    return redirect('/labeling/')