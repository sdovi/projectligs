# Generated by Django 5.0.4 on 2024-04-18 09:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('result', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='match',
            name='game_id',
            field=models.CharField(max_length=100, unique=True),
        ),
    ]
