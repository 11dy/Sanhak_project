from django.urls import path
from labeling.views import *

app_name = 'labeling'

urlpatterns = [
    path('', home),
    path('add_file/', add_file),
    path('edit_file/<int:pk>', edit_file),  # edit_file 경로 추가
    path('delete_file/', delete_file),
    path('search_result/', search_result),
    path('add_object_storage/', add_object_storage),
    path('test/', test)
]