from django.db import models

class Task(models.Model):
    title = models.CharField(max_length=100)
    completed = models.BooleanField(default=False, blank=True, null=True)


    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = 'Tasks'



