from django.shortcuts import render
from rest_framework import generics
from .models import Watcher
from .serializers import WatcherSerializer

class WatcherListCreateView(generics.ListCreateAPIView):
    queryset = Watcher.objects.all()
    serializer_class = WatcherSerializer

class WatcherDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Watcher.objects.all()
    serializer_class = WatcherSerializer
# Create your views here.
