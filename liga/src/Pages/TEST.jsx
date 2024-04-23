import React, { useState, useEffect } from 'react';
import axios from 'axios';
import cheerio from 'cheerio';

export default function TEST() {
    
    const [news, setNews] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = 'https://www.sport-express.ru/football/england/reviews/andrey-arshavin-poker-v-vorota-liverpulya-material-the-athletic-o-matche-2009-goda-chto-skazal-arshavin-2203668/';
                const response = await axios.get(url);
                const $ = cheerio.load(response.data);
                
                // Извлекаем описание из первого <p>
                const description1 = $('div.w610_text.vrez').next('p').text().trim();
                
                // Находим все теги <p>, следующие за нужным div
                let description = '';
                $('div.se-banner').nextAll('p').each((index, element) => {
                    description += $(element).text().trim() + ' ';
                });

                // Объединяем оба описания в одну строку
                const fullDescription = `${description1} ${description}`;

                setNews(fullDescription);
            } catch (error) {
                console.error('Ошибка при загрузке данных:', error);
            }
        };

        fetchData();
    }, []);

    const handleExpand = () => {
        setIsExpanded(true);
    };

    const handleCollapse = () => {
        setIsExpanded(false);
    };

    return (
        <div>
            <h1>News</h1>
            <p>{isExpanded ? news : news.slice(0, 800)}</p>
            {news.length > 60 && !isExpanded && <button onClick={handleExpand}>Развернуть</button>}
            {isExpanded && <button onClick={handleCollapse}>Скрыть</button>}
        </div>
    );
}
