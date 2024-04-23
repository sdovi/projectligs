import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './style.css'
import { useLocation } from 'react-router-dom';

export default function Subsdetailnews() {
  const location = useLocation();
  const match = location.state.article;
  console.log(match);

  // const { id } = useParams();

  // const [newsDetail, setNewsDetail] = useState(null);
  // const [storedProfileWiki, setStoredProfileWiki] = useState('');

  // const [userSubs, setUserSubs] = useState([]);
  // console.log(userSubs);



  
  // useEffect(() => {
  //   // Функция для выполнения запроса
  //   const fetchData = async () => {
  //     try {
  //       // Выполнение GET запроса
  //       const response = await axios.get(`http://127.0.0.1:8000/user/subs/${match.id}/`);

  //       // Установка полученных данных в состояние
  //       setUserSubs(response.data);
  //     } catch (error) {
  //       console.error('Ошибка при выполнении запроса:', error);
  //     }
  //   };

  //   // Вызов функции для получения данных
  //   fetchData();
  // }, []);


  // useEffect(() => {
  //   const fetchNewsDetail = async () => {
  //     try {
  //       const response = await axios.get(`https://newsapi.org/v2/everything`, {
  //         params: {
  //           q: "ливерпуль",
  //           apiKey: '81874c94b20f4fa7ac5a88f5fbfd9006',
  //         },
  //       });
  //       const newsItem = response.data.articles[id];
  //       setNewsDetail(newsItem);
  //     } catch (error) {
  //       console.error('Error fetching news detail:', error);
  //     }
  //   };

  //   fetchNewsDetail();
  // }, [userSubs]);

  return (
    <div className='newsdetail'>
     <div className="container-fluid newsdetail-sect pt-5 pb-5">
     {match && (
        <div className='news-detail'>
          <h2>{match.title}</h2>
          <h3 className='pt-2'>{match.publishedAt}</h3>
          <img className='pt-2' src={match.urlToImage} alt="news" />
          <p>{match.description}</p>
        </div>
      )}
     </div>
    </div>
  );
}
