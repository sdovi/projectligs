from bs4 import BeautifulSoup
import requests
from django.http import JsonResponse
from .models import SportExpressArticle

def save_to_model(title, subtitle, datetime, rubrics):
    SportExpressArticle.objects.create(
        title=title,
        subtitle=subtitle,
        datetime=datetime,
        rubrics=', '.join(rubrics)
    )

def parse_and_save(request):
    url = 'https://www.sport-express.ru/hockey/reviews/'
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')

    articles = soup.find_all('div', class_='se-material')

    for article in articles:
        title = article.find('div', class_='se-material__title').get_text(strip=True)
        subtitle = article.find('div', class_='se-material__subtitle').get_text(strip=True)
        datetime = article.find('span', class_='se-material-preview-info__datetime').get_text(strip=True)
        rubrics = [rubric.get_text(strip=True) for rubric in article.find_all('a', class_='se-material-preview-info__rubric')]

        save_to_model(title, subtitle, datetime, rubrics)

    return JsonResponse({"message": "Данные успешно загружены и сохранены в базе данных Django."})
