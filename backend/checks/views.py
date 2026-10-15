from django.shortcuts import render
from rest_framework import generics
from .models import CheckResult
from .serializers import CheckResultSerializer

class CheckResultListCreateView(generics.ListCreateAPIView):
    queryset = CheckResult.objects.all().order_by('-checked_at')
    serializer_class = CheckResultSerializer
# Create your views here.
