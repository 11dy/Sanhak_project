import datetime

from django.db.models import Q
from django.shortcuts import render, redirect
from django.core.paginator import Paginator
from labeling.models import AudioFile


def home(request):
    page = int(request.GET.get('page', 1))
    print('test')
    work_list = AudioFile.objects.order_by('-start_time')
    paginator = Paginator(work_list, 5)
    print("test2")
    page_obj = paginator.get_page(page)
    # context = {'work_list': work_list}
    context = {'work_list': page_obj}
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




