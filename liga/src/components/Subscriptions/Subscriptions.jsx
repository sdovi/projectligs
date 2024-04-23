import React, { useEffect, useState } from 'react';
import './style.css'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
export default function Subscriptions() {
    
    const { id } = useParams();


    const [news, setNews] = useState([]);
    const [userSubs, setUserSubs] = useState('');
    console.log(userSubs);


    
  useEffect(() => {
    // Функция для выполнения запроса
    const fetchData = async () => {
      try {
        // Выполнение GET запроса
        const response = await axios.get(`http://127.0.0.1:8000/user/subs/${id}/`);

        // Установка полученных данных в состояние
        setUserSubs(response.data);
      } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
      }
    };

    // Вызов функции для получения данных
    fetchData();
  }, []);
  useEffect(() => {
    const fetchNews = async () => {
        try {
            const response = await axios.get('https://newsapi.org/v2/everything', {
                params: {
                    q: userSubs.title,
                    apiKey: '81874c94b20f4fa7ac5a88f5fbfd9006',
                },
            });
            setNews(response.data.articles);
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    };

    if (userSubs && userSubs.title) {
        fetchNews();
    }
}, [userSubs]);  
    return (
        <div className='subs_sect'>
            <div className="container-fluid">
                <div className="subs__txt news-detail">
                    <h2>Новости клуба {userSubs.title}:</h2>
                       <div className="row">
                       {news.map((article, index) => (
                        <div className="col-lg-3 col-md-4 col-sm-12" key={article.id}>
                <div className="footbal__card">
                  <div className="footbal__card-img subs_div">
                  
                  <Link  to={`/news/detail/subs/${index}`} state={ { article } }><img src={article.urlToImage} alt="foto" /></Link>
                    
                    <p>
                      {article.title.length > 55
                        ? article.title.slice(0, 55) + '...'
                        : article.title}
                    </p>
                  </div>
                </div>
              </div>
                        ))}
                       </div>
                </div>
            </div>
        </div>
    );
}
