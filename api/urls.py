from django.urls import path

from api.views import AudioListSerializer, local_file_upload, object_list, object_file_upload, delete_file, get_result,\
    save_result

app_name = 'api'

urlpatterns = [
    path('', AudioListSerializer.as_view()),
    path('local_file_upload', local_file_upload),
    path('obejct_list', object_list),
    path('object_file_upload', object_file_upload),
    path('delete_file', delete_file),
    path('get_result/<int:pk>', get_result),
    path('save_result', save_result)
]
