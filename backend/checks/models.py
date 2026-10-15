from django.db import models
from watchers.models import Watcher

class CheckResult(models.Model):
    watcher = models.ForeignKey(Watcher, on_delete=models.CASCADE, related_name='results')
    status_code = models.IntegerField(null=True, blank=True)
    response_time_ms = models.FloatField(null=True, blank=True)
    is_success = models.BooleanField(default=False)
    error_message = models.TextField(null=True, blank=True)
    checked_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        status = "SUCCESS" if self.is_success else "FAILED"
        return f"{self.watcher.name} - {status} ({self.status_code})"