from django.urls import path
from . import views

urlpatterns = [
    path('get_chatbot_response/', views.get_chatbot_response, name='get_chatbot_response'),
    path('get_mbti/', views.get_mbti, name='get_mbti'),
    path('get_yn_response/', views.get_yn_response, name='get_yn_response'),
]