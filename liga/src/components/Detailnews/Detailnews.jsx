



import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import cheerio from 'cheerio';
import './style.css'

export default function Detailnews() {
  

  const location = useLocation();
  const article = location.state.article;
  const [news, setNews] = useState('');

  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
      const fetchData = async () => {
          try {
              const url = `${article.href}`;
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
    <div className='newsdetail'>
            <div className="container-fluid newsdetail-sect pt-5 pb-5">
                {article && (
                    <div className='news-detail'>
                        <h2>{article.title}</h2>
                        <p>{article.datetime}</p>
                        <img src={article.imageUrl} alt="news" />
                        <p className='news-detail-p'>{isExpanded ? news : news.slice(0, 800)}</p>
            {news.length > 60 && !isExpanded && <button className='detail-news_btn' onClick={handleExpand}>Развернуть</button>}
            {isExpanded && <button className='detail-news_btn' onClick={handleCollapse}>Скрыть</button>}
                    </div>
                )}
            </div>
        </div>
  );
}
