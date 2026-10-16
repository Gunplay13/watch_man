from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from .models import Watcher
from .serializers import WatcherSerializer

class WatcherListCreateView(generics.ListCreateAPIView):
    queryset = Watcher.objects.all()
    serializer_class = WatcherSerializer
    permission_classes = [IsAuthenticated]
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user if self.request.user.is_authenticated else None)
        

class WatcherDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Watcher.objects.all()
    serializer_class = WatcherSerializer
    permission_classes = [IsAuthenticated]
# Create your views here.


