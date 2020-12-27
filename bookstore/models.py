from django.db import models

# Create your models here.
class Book(models.Model):
    isbn=models.CharField(max_length=20)
    title=models.TextField()
    author=models.TextField()
    price=models.FloatField()
    genre=models.TextField()
    ecopy=models.TextField(blank=True,null=True)
    coverpic=models.TextField(blank=True,null=True)
    isavail=models.BooleanField(default=True,blank=True)
    lended_by=models.EmailField(null=True,blank=True)
    ldate=models.DateField(null=True,blank=True)
    reserved_by=models.EmailField(null=True,blank=True)
    rdate=models.DateField(null=True,blank=True)

    def __str__(self):
        return '%s' % self.isbn