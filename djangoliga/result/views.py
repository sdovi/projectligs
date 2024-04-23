# views.py
from django.http import JsonResponse
import requests
from bs4 import BeautifulSoup
from .models import Match, ManualMatch
from rest_framework import generics
from .serializers import MatchSerializer, ManualSerializers

class MatchAPIView(generics.ListCreateAPIView):
    queryset = Match.objects.all()
    serializer_class = MatchSerializer


class Manualinfo(generics.ListCreateAPIView):
    queryset = ManualMatch.objects.all()
    serializer_class = ManualSerializers

class Manualinfo_get_post_path(generics.RetrieveUpdateDestroyAPIView):
    queryset = ManualMatch.objects.all()
    serializer_class = ManualSerializers



def save_matches_view(request):
    url = "https://soccer365.ru/online/"
    response = requests.get(url)

    if response.status_code == 200:
        html_content = response.content
        soup = BeautifulSoup(html_content, "html.parser")

        # Находим все блоки с классом "game_block"
        game_blocks = soup.find_all("div", class_="game_block")

        matches_data = []
        for block in game_blocks:
            match_data = {}

            # Извлекаем информацию о матчах
            match_data['stage'] = block.find('div', class_='stage').text.strip()
            match_data['title'] = block.find('a', class_='game_link').get('title')
            match_data['id'] = block.get('id')
            match_data['time'] = block.find('span', class_='size11').text.strip()
            match_data['img'] = block.find('div', class_='img16').find('img').get('src')
            goals = block.find_all('div', class_='gls')
            match_data['home_goals'] = goals[0].text.strip() if goals else None
            match_data['away_goals'] = goals[1].text.strip() if len(goals) > 1 else None

            matches_data.append(match_data)

            # Сохраняем данные о матче в базе данных Django API
            save_match_data(match_data)

            # Выводим данные о матче в консоль для проверки
            print("Stage:", match_data['stage'])
            print("Title:", match_data['title'])
            print("ID:", match_data['id'])
            print("Time:", match_data['time'])
            print("Image URL:", match_data['img'])
            print("Home Goals:", match_data['home_goals'])
            print("Away Goals:", match_data['away_goals'])
            print("-------------------")

        return JsonResponse({'success': True, 'matches': matches_data})
    else:
        return JsonResponse({'error': 'Failed to retrieve data from the website.'}, status=500)


def save_match_data(match_data):
    # Создаем или обновляем объект Match
    match_obj, created = Match.objects.update_or_create(
        game_id=match_data['id'],
        defaults={
            'stage': match_data['stage'],
            'match_title': match_data['title'],
            'time': match_data['time'],
            'image_url': match_data['img'],
            'home_goals': match_data['home_goals'],
            'away_goals': match_data['away_goals']
        }
    )

    # Сохраняем изменения
    match_obj.save()
