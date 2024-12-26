from django.db import models

# Create your models here.
class Link(models.Model):
    id = models.IntegerField(primary_key=True)
    linkA = models.CharField(max_length=500)
    linkB = models.CharField(max_length=10)

class Counter(models.Model):
    id = models.IntegerField(primary_key=True)
    value = models.IntegerField()