# Generated by Django 5.0.4 on 2024-04-20 10:20

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='SportExpressArticle',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rubrics', models.CharField(max_length=200)),
                ('datetime', models.CharField(max_length=100)),
                ('comments', models.IntegerField()),
                ('likes', models.IntegerField()),
                ('title', models.CharField(max_length=200)),
                ('subtitle', models.TextField()),
            ],
        ),
    ]
