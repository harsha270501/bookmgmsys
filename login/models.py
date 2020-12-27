from django.db import models

# Create your models here.
class User(models.Model):
    email=models.EmailField(primary_key=True)
    password=models.TextField(max_length=20)
    name=models.TextField()
    isadmin=models.BooleanField()
    offid=models.CharField(blank=True,max_length=10)

    def __str__(self):
        return '%s' % self.email