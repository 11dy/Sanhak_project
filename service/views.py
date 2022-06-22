from django.http import HttpResponse
from django.shortcuts import render
from rest_framework.decorators import api_view

from library.common import return_response, get_request_data
from middleware.share_data import ShareData
from service.models import Work


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
    work_list = Work.objects.order_by('-start_time')
    context = {'work_list': work_list}
    return render(request, 'service/work_list.html', context)
