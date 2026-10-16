from django.urls import path
from .views import CheckResultListCreateView

urlpatterns = [
    path('checks/', CheckResultListCreateView.as_view(), name='check-list-create'),
]