import React, { useState, useEffect } from 'react';
import axios from 'axios';
import cheerio from 'cheerio';
import './style.css';
import { Link } from 'react-router-dom';

export default function Scheduleforms() {
  const [gameData, setGameData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage] = useState(25); // Количество игр на странице

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://soccer365.ru/online/');
        const html = response.data;
        const $ = cheerio.load(html);

        // Выбираем все элементы с классом game_block
        const games = $('.game_block');

        // Создаем массив для хранения данных
        const gamesData = [];

        // Проходим по каждому элементу и извлекаем нужные данные
        games.each((index, element) => {
          const game = $(element);

          // Извлекаем данные из элемента и создаем объект
          const gameInfo = {
            id: game.find('.game_link').attr('dt-id'),
            time: game.find('.status ').text(),
            homeTeam: game.find('.ht .name span').text(),
            homeTeamLogo: game.find('.ht .img16 img').attr('src'),
            awayTeam: game.find('.at .name span').text(),
            awayTeamLogo: game.find('.at .img16 img').attr('src'),
            stage: game.find('.stage').text(),
            homeGoals: game.find('.ht .gls').text(),
            awayGoals: game.find('.at .gls').text(),
          };

          // Добавляем объект в массив
          gamesData.push(gameInfo);
        });

        // Обновляем состояние с данными
        setGameData(gamesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Вызываем функцию для загрузки данных при монтировании компонента
    fetchData();
  }, []);

  

  // Индекс последней игры на текущей странице
  const indexOfLastGame = currentPage * gamesPerPage;
  // Индекс первой игры на текущей странице
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  // Список игр на текущей странице
  const currentGames = gameData.slice(indexOfFirstGame, indexOfLastGame);
  console.log(currentGames);

  // Функция для переключения страниц
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="forms__sections">
        <div className="container-fluid pb-5 pt-4">
          {/* Мапим массив с данными и выводим информацию для текущей страницы */}
          {currentGames.map((game) => (
            <Link to={`/games/${game.id}`} >
              
            <div key={game.id} className="forms_com-block pb-1">
              <a className="game_link" title={`${game.homeTeam} - ${game.awayTeam}`}>
                <div className="status"><span className="size11">{game.time} </span></div>
                <div className="result">
                  <div className="ht">
                    <div className="name">
                      <div cl
                      assName="img16">
                        <span className='span-baskets'>
                        {game.homeTeam.length > 16
                        ? game.homeTeam.slice(0, 16) + '...'
                        : game.homeTeam}
                        </span>
                        <img className='ms-2 basketball-img16' loading="lazy" src={game.homeTeamLogo} alt={game.homeTeam} />
                      </div>
                    </div>
                    <div className="gls gls-basket gls-basket-p ms-2"><p>{game.homeGoals}</p></div>
                  </div>
                  <div className="at">
                    <div className="name">
                      <div className="img16">
                        <img className='me-2 basketball-img16' loading="lazy" src={game.awayTeamLogo} alt={game.awayTeam} />
                        <span className='span-baskets'>
                        
                      <p>  {game.awayTeam.length > 16
                        ? game.awayTeam.slice(0, 16) + '...'
                        : game.awayTeam}</p>
                        </span>
                      </div>
                    </div>
                    <div className="gls gls-basket me-2"><p>{game.awayGoals}</p></div>
                  </div>
                </div>
                <div className="stage">{game.stage}</div>
              </a>
            </div>
            </Link>
          ))}
        </div>
        {/* Пагинация */}
        <div className="forms__pagination pb-5">
          <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Превыдущий</button>
          <button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastGame >= gameData.length}>Следующий</button>
        </div>
      </div>
    </div>
  );
}
