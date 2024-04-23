import React, { useState, useEffect } from 'react';
import './style.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import cheerio from 'cheerio';

export default function Hokey() {
    
    const [currentPage, setCurrentPage] = useState(1);
    const [newsPerPage] = useState(16); // Количество новостей на одной странице
    const [pageNumbers, setPageNumbers] = useState([]); // Массив номеров страниц
    const [basketNews, setBasketNews] = useState([]);
    const [news, setNews] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://www.sport-express.ru/hockey/reviews/');
                const $ = cheerio.load(response.data); // Загружаем HTML страницу в Cheerio
                const newsItems = [];

                $('.se-material').each((index, element) => {
                    const imageUrl = $(element).find('.se-material__content-media img').attr('src');
                    const rubrics = $(element).find('.se-material-preview-info__rubric').map((i, el) => $(el).text()).get();
                    const datetime = $(element).find('.se-material-preview-info__datetime').text().trim();
                    const title = $(element).find('.se-material__title a').text().trim();
                    const subtitle = $(element).find('.se-material__subtitle').text().trim();

                    newsItems.push({ imageUrl, rubrics, datetime, title, subtitle });
                });

                setNews(newsItems);
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        };

        fetchData();
    }, []);


   
    useEffect(() => {
      const fetchBasketNews = async () => {
        try {
          const response = await axios.get('http://localhost:8000/user/hokey/info/'); // Предполагаем, что эндпоинт для баскетбольных новостей находится по этому URL
          setBasketNews(response.data); // Предполагаем, что данные приходят в формате массива объектов
        } catch (error) {
          console.error('Error fetching basketball news:', error);
        }
      };
  
      fetchBasketNews();
    }, []);
  
  
  
    const indexOfLastNews = currentPage * newsPerPage;
    const indexOfFirstNews = indexOfLastNews - newsPerPage;
    const currentNews = news.slice(indexOfFirstNews, indexOfLastNews);
    const currentBasketNews = basketNews.slice(indexOfFirstNews, indexOfLastNews);
  
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
      
    <div className="footbal__page basket__page">
      <div className="container-fluid">
        <h3 className="footbal__top-text pt-4 pb-3">Новости Хоккей</h3>
        <div className="footbal__blocks row">
        
        {currentBasketNews.map((article, index) => (
                <div className="col-lg-3 col-md-4 col-sm-12" key={index}>
                  <div className="basket__card">
                    <div className="basket__card-img">
                    <Link to={`/news/manual/hokey/${article.id}`}><img className='football__card-img2' src={article.photo} alt="foto" /></Link>
                      
                      <p className='football__card-txt12'>
                        {article.title.length > 55
                          ? article.title.slice(0, 55) + '...'
                          : article.title}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {news.map((article, index) => (
    <div className="col-lg-3 col-md-4 col-sm-12" key={index}>
        <div className="footbal__card">
            <div className="footbal__card-img">
                <Link to={`/news/detail/hokey/${index}`} state={{ article }}>
                    <img src={article.imageUrl} alt="foto" />
                </Link>
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
        {/* <ul className="pagination justify-content-center">
          {pageNumbers.map((number, index) => (
            <li key={index} className="page-item">
              <button onClick={() => paginate(number)} className="page-link">
                {number}
              </button>
            </li>
          ))}
        </ul> */}
      </div>
    </div>
    </div>
  )
}