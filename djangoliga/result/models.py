from django.db import models

class Match(models.Model):
    stage = models.CharField(max_length=100)
    match_title = models.CharField(max_length=255)
    game_id = models.CharField(max_length=100, unique=True)
    time = models.CharField(max_length=50)
    home_logo_url = models.URLField()
    away_logo_url = models.URLField()
    home_goals = models.CharField(max_length=10)
    away_goals = models.CharField(max_length=10)

    def __str__(self):
        return self.match_title


class ManualMatch(models.Model):
    title = models.CharField("название турнира",max_length=255)
    time = models.CharField('время начинание матча',max_length=50)
    one_name_command = models.CharField("название 1 команды (слева находяйщися)",max_length=255)
    one_logo_command = models.URLField("логотип 1 команды")
    two_name_command = models.CharField("название 2 команды (справа находяйщися)",max_length=255)
    two_logo_command = models.URLField("логотип 2 команды")
    home_goals = models.CharField("гол 1 команды", max_length=10, default='-')
    away_goals = models.CharField("гол 2 команды", max_length=10, default='-')
    stage = models.CharField('Номер турнира', max_length=100)

    def __str__(self):
        return self.title

