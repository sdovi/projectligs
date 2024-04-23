import React from 'react'
import './style.css'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Manual_Footbal_News() {
    const { id } = useParams();
    const [newsDetail, setNewsDetail] = useState(null);
  console.log(newsDetail);

  useEffect(() => {
    const fetchFootballNews = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/user/info/${id}`);
        setNewsDetail(response.data); // Предполагаем, что данные приходят в формате массива объектов
      } catch (error) {
        console.error('Error fetching football news:', error);
      }
    };

    fetchFootballNews(); // Вызываем функцию при загрузке компонента
  }, []);
  
    return (
      <div className='newsdetail'>
       <div className="container-fluid newsdetail-sect pt-5 pb-5">
       {newsDetail && (
          <div className='news-detail'>
            <h2>{newsDetail.title}</h2>
            <h3 className='pt-2'>{newsDetail.data}</h3>
            <img className='pt-2' src={newsDetail.photo} alt="news" />
            <p>{newsDetail.description}</p>
          </div>
        )}
       </div>
      </div>
    );
}
