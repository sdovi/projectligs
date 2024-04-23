import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './style.css'
import { useLocation } from 'react-router-dom';

export default function Detailnews_Hokey() {

  const location = useLocation();
  const article = location.state.article;

  // const { id } = useParams();

  // const [newsDetail, setNewsDetail] = useState(null);

  // useEffect(() => {
  //   const fetchNewsDetail = async () => {
  //     try {
  //       const response = await axios.get(`https://newsapi.org/v2/everything`, {
  //         params: {
  //           q: 'Хоккей',
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
  // }, [id]);

  return (
    <div className='newsdetail'>
            <div className="container-fluid newsdetail-sect pt-5 pb-5">
                {article && (
                    <div className='news-detail'>
                        <h2>{article.title}</h2>
                        <p>{article.datetime}</p>
                        <img src={article.imageUrl} alt="news" />
                        <p>{article.subtitle}</p>
                    </div>
                )}
            </div>
        </div>
  );
}
