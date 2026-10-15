from rest_framework import serializers
from .models import CheckResult

class CheckResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = CheckResult
        fields = [
            'id', 
            'watcher', 
            'status_code', 
            'response_time_ms', 
            'is_success', 
            'error_message', 
            'checked_at'
        ]
        read_only_fields = ['id', 'checked_at']