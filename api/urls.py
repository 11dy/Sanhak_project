from django.urls import path

from api.views import AudioListSerializer, local_file_upload, object_list, object_file_upload

app_name = 'api'

urlpatterns = [
    path('', AudioListSerializer.as_view()),
    path('local_file_upload', local_file_upload),
    path('obejct_list', object_list),
    path('object_file_upload', object_file_upload),
]
