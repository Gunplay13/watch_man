from django.urls import path
from .views import WatcherListCreateView, WatcherDetailView

urlpatterns = [
    path('watchers/', WatcherListCreateView.as_view(), name='watcher-list'),
    path('watchers/<int:pk>/', WatcherDetailView.as_view(), name='watcher-detail'),
]