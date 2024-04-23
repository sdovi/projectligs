from django.db import models

# Create your models here.

class Info(models.Model):
    title = models.CharField("Название новостей  ", max_length=50)
    description = models.TextField("Описание")
    photo = models.CharField("Ссылка на фото", max_length=1000)
    data = models.DateTimeField("Дата создания", auto_now_add=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "новость футбол"
        verbose_name_plural = "новости футбол"

class Info_basket(models.Model):
    title = models.CharField("Название новостей  ", max_length=50)
    description = models.TextField("Описание")
    photo = models.CharField("Ссылка на фото", max_length=1000)
    data = models.DateTimeField("Дата создания", auto_now_add=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "новость баскетбол"
        verbose_name_plural = "новости баскетбол"



class Info_hokey(models.Model):
    title = models.CharField("Название новостей  ", max_length=50)
    description = models.TextField("Описание")
    photo = models.CharField("Ссылка на фото", max_length=1000)
    data = models.DateTimeField("Дата создания", auto_now_add=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "новость Хокей"
        verbose_name_plural = "новости Хокей"


class Subs_info(models.Model):
    title = models.CharField("Название команды  ", max_length=50)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "подписки юзеров"
        verbose_name_plural = "подписки юзеров"
