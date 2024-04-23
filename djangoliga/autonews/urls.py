from django.urls import path
from . import views

urlpatterns = [
    path('parse/', views.parse_and_save, name='parse_and_save'),
]
