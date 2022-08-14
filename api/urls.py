from django.urls import path

from api.views import AudioListSerializer

app_name = 'api'

urlpatterns = [
    path('', AudioListSerializer.as_view()),

]
