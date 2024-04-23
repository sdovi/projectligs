import requests

url = 'http://localhost:8000/save_matches/'

# Пример данных о матчах для отправки
matches_data = [
    {'stage': '1/4 финала', 'title': 'Аталанта - Ливерпуль', 'id': 'gm2057742', 'time': '23:59', 'img': 'https://example.com/image.png', 'home_goals': '1', 'away_goals': '2'},
    # Добавьте данные о других матчах по аналогии
]

# Отправка POST запроса с данными о матчах
response = requests.post(url, json=matches_data)

# Вывод ответа сервера
print(response.json())
