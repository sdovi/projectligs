# Generated by Django 5.0.4 on 2024-04-19 15:20

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('result', '0004_manualmatch'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='manualmatch',
            name='game_id',
        ),
    ]
