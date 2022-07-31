import datetime

from django.shortcuts import render, redirect
from rest_framework.decorators import api_view

from library.common import return_response, get_request_data
from middleware.share_data import ShareData
from service.models import AudioFile


def run(func, data):
    """
    각 변수를 실행하고 해당 값을 리턴합니다.
    :param func:
    :param data:
    :return:
    """
    if func is not None:
        return_data = func(data)
    else:
        return_data = None

    return return_response(status_code=200, message="Success", data=return_data)


@api_view(['POST', 'GET'])
def alive_check(request):
    print(ShareData.get_current_request().GET)
    return run(None, None)


@api_view(['GET'])
def add(request):
    data = get_request_data(request)
    return run(_add, data)


def _add(data):
    return int(data['num1']) + int(data['num2'])


def home(request):
    work_list = AudioFile.objects.order_by('-start_time')
    context = {'work_list': work_list}
    return render(request, 'service/work_list.html', context)


def edit_file(request):  # edit_file 가는 함수
    return render(request, 'service/edit_file.html')


def add_file(request):
    """로컬에 있는 오디오 파일을 서버에 업로드 하는 코드"""

    if request.method == 'POST':
        title = request.POST['title']
        audio = request.FILES["audio_file"]
        language = request.POST['language']
        fileupload = AudioFile(
            file_name=title,
            audio_file=audio,
            language=language,
            status="작업 대기",
            request_method="파일 업로드",
            start_time=datetime.datetime.now(),
            end_time=datetime.datetime.now(),
        )

        fileupload.save()
        return redirect('/service/')
    else:

        return redirect('/service/')
