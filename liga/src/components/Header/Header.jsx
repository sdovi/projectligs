import React, { useState, useEffect } from 'react';
import './style.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import cheerio from 'cheerio';

export default function Header() {
  const [news, setNews] = useState([]);
  const [footballNews, setFootballNews] = useState([]); // Новое состояние для футбольных новостей
  const [currentPage, setCurrentPage] = useState(1);
  const [newsPerPage] = useState(16); // Количество новостей на одной странице
  const [pageNumbers, setPageNumbers] = useState([]); // Массив номеров страниц


useEffect(() => {
  const fetchData = async () => {
      try {
          const response = await axios.get('https://www.sport-express.ru/football/reviews/');
          const $ = cheerio.load(response.data); // Загружаем HTML страницу в Cheerio
          const newsItems = [];

          $('.se-material').each((index, element) => {
              const imageUrl = $(element).find('.se-material__content-media img').attr('src');
              const rubrics = $(element).find('.se-material-preview-info__rubric').map((i, el) => $(el).text()).get();
              const datetime = $(element).find('.se-material-preview-info__datetime').text().trim();
              const title = $(element).find('.se-material__title a').text().trim();
              const subtitle = $(element).find('.se-material__subtitle').text().trim();
              const href = $(element).find('.se-material__title a').attr('href');

              newsItems.push({ imageUrl, rubrics, datetime, title, subtitle, href });
          });

          setNews(newsItems);
      } catch (error) {
          console.error('Error fetching news:', error);
      }
  };

  fetchData();
}, []);
  // Функция для получения футбольных новостей с сервера Django
  useEffect(() => {
    const fetchFootballNews = async () => {
      try {
        const response = await axios.get('http://localhost:8000/user/info/');
        setFootballNews(response.data); // Предполагаем, что данные приходят в формате массива объектов
      } catch (error) {
        console.error('Error fetching football news:', error);
      }
    };

    fetchFootballNews(); // Вызываем функцию при загрузке компонента
  }, []);

  // // Определяем индексы последней и первой новости на текущей странице
  // const indexOfLastNews = currentPage * newsPerPage;
  // const indexOfFirstNews = indexOfLastNews - newsPerPage;
  // const currentNews = news.slice(indexOfFirstNews, indexOfLastNews);

  // // Создаем массив номеров страниц для всех новостей
  // useEffect(() => {
  //   const pageNumbersArray = [];
  //   for (let i = 1; i <= Math.ceil(news.length / newsPerPage); i++) {
  //     pageNumbersArray.push(i);
  //   }
  //   setPageNumbers(pageNumbersArray);
  // }, [news.length, newsPerPage]);

  // // Функция для изменения текущей страницы
  // const paginate = (pageNumber) => setCurrentPage(pageNumber);




    
  return (
    <div>
      <div className="footbal__page">
        <div className="container-fluid">
          <h3 className="footbal__top-text pt-4 pb-3">Новости Футбола</h3>
          <div className="footbal__blocks row">
          {footballNews.map((article, index) => (
              <div className="col-lg-3 col-md-4 col-sm-12" key={index}>
                <div className="football__card">
                  <div className="football__card-img">
                 
                    <Link to={`/news/manual/footbal/${article.id}`}><img className='football__card-img2' src={article.photo} alt="football-foto" /></Link>
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
                <Link to={`/news/detail/${index}`} state={{ article }}>
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
  );
}
