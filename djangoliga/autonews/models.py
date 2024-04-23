from django.db import models

class SportExpressArticle(models.Model):
    rubrics = models.CharField(max_length=200)
    datetime = models.CharField(max_length=100)
    title = models.CharField(max_length=200)
    subtitle = models.TextField()
