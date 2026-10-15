from django.db import models
from django.contrib.auth.models import User

class Watcher(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='watchers')
    name = models.CharField(max_length=255)
    url = models.URLField(max_length=500)
    interval_seconds = models.IntegerField(default=60)  # Polling frequency in seconds
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    timeout_seconds = models.IntegerField(default=10)

    def __str__(self):
        return f"{self.name} ({self.url})"