import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './style.css'
import { useLocation } from 'react-router-dom';

export default function Detailnews_basket() {

  const location = useLocation();
  const article = location.state.article;

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
