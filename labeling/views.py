import datetime
from django.shortcuts import render, redirect

from labeling.models import AudioFile


def home(request):
    work_list = AudioFile.objects.order_by('-start_time')
    context = {'work_list': work_list}
    return render(request, 'labeling/work_list.html', context)


def edit_file(request):  # edit_file 가는 함수
    return render(request, 'labeling/edit_file.html')


def add_file(request):
    """로컬에 있는 오디오 파일을 서버에 업로드 하는 코드"""

    if request.method == 'POST':
        audio = request.FILES["audio_file"]
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
        delete_list = request.POST.getlist('checked[]')
        for delete_id in delete_list:
            record = AudioFile.objects.get(id=delete_id)
            record.delete()

        return redirect('/labeling/')
