# urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('save_matches/', views.save_matches_view),
    path('manual/match/', views.Manualinfo.as_view()),
    path('manual/match/<int:pk>/', views.Manualinfo_get_post_path.as_view()),
    path('match/', views.MatchAPIView.as_view()),
]
