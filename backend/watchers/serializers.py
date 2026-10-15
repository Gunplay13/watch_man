from rest_framework import serializers
from .models import Watcher

class WatcherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Watcher
        fields = [
            'id', 
            'user', 
            'name', 
            'url', 
            'interval_seconds', 
            'timeout_seconds', 
            'is_active', 
            'created_at'
        ]
        read_only_fields = ['id', 'user', 'created_at']