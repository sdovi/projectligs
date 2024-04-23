import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './style.css'; // Импорт файла стилей

export default function Header() {
  const [news, setNews] = useState([]);
  const [footballNews, setFootballNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [newsPerPage] = useState(16);
  const [pageNumbers, setPageNumbers] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('https://newsapi.org/v2/everything', {
          params: {
            q: 'Футбол',
            apiKey: '81874c94b20f4fa7ac5a88f5fbfd9006',
          },
        });
        setNews(response.data.articles);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []);

  useEffect(() => {
    const fetchFootballNews = async () => {
      try {
        const response = await axios.get('http://localhost:8000/user/info/');
        setFootballNews(response.data);
      } catch (error) {
        console.error('Error fetching football news:', error);
      }
    };

    fetchFootballNews();
  }, []);

  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = news.slice(indexOfFirstNews, indexOfLastNews);

  useEffect(() => {
    const pageNumbersArray = [];
    for (let i = 1; i <= Math.ceil(news.length / newsPerPage); i++) {
      pageNumbersArray.push(i);
    }
    setPageNumbers(pageNumbersArray);
  }, [news.length, newsPerPage]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="football__page">
        <div className="container-fluid">
          <h3 className="football__top-text pt-4 pb-3">Новости Футбола</h3>
          <div className="football__blocks row">
            {footballNews.map((article, index) => (
              <div className="col-lg-3 col-md-4 col-sm-12" key={index}>
                <div className="football__card">
                  <div className="football__card-img">
                    <img className='football__card-img2' src={article.photo} alt="football-foto" />
                    <p className='football__card-txt12'>{article.title}</p>
                  </div>
                </div>
              </div>
            ))}
            {currentNews.map((article, index) => (
              <div className="col-lg-3 col-md-4 col-sm-12" key={index}>
                <Link to={`/news/detail/${index}`} className="news-link">
                  <div className="football__card">
                    <div className="football__card-img">
                      <img src={article.urlToImage} alt="foto" />
                      <p>{article.title}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <ul className="pagination justify-content-center">
            {pageNumbers.map((number, index) => (
              <li key={index} className="page-item">
                <button onClick={() => paginate(number)} className="page-link">
                  {number}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
