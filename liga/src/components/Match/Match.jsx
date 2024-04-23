import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './style.css';

export default function Match() {
    const { id } = useParams(); // Получаем айди из параметров URL
    const [matchData, setMatchData] = useState(null); // Состояние для данных о матче

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Получаем данные о матче с помощью запроса к соответствующей странице
                const response = await axios.get(`https://soccer365.ru/games/${id}`);
                const html = response.data;

                // Устанавливаем полученные HTML-данные в состояние
                setMatchData(html);
            } catch (error) {
                console.error('Error fetching match data:', error);
            }
        };

        // Вызываем функцию для загрузки данных о матче
        fetchData();
    }, [id]); // Перезагружаем данные, если меняется айди

    // Если данные о матче еще загружаются, показываем загрузочное сообщение
    if (!matchData) {
        return <div className='match__loading'>Загрузка...</div>;
    }

    // Парсим HTML-данные, чтобы извлечь информацию о составе и тренерах
    const parser = new DOMParser();
    const doc = parser.parseFromString(matchData, 'text/html');
    const lineupPlayers = Array.from(doc.querySelectorAll('#tm-lineup .сomposit_player a')).map(player => ({
        name: player.textContent.trim(),
        link: player.getAttribute('href')
    }));

    // Разделяем игроков на две команды
    const leftTeamPlayers = lineupPlayers.slice(0, 11);
    const rightTeamPlayers = lineupPlayers.slice(11);

    const coaches = Array.from(doc.querySelectorAll('.lp_player a')).map(coach => ({
        name: coach.textContent.trim(),
        link: coach.getAttribute('href')
    }));

    // Получаем информацию о турнире, клубах, голах и логотипах
    const tournament = doc.querySelector('.block_header h2').textContent;
    const homeClub = {
        name: doc.querySelector('.live_game_ht a').textContent,
        id: doc.querySelector('.live_game_ht a').getAttribute('href').split('/')[2], // Получаем ID из ссылки
        logo: doc.querySelector('.live_game_tlogo img').getAttribute('src')
    };
    const awayClub = {
        name: doc.querySelector('.live_game_at a').textContent,
        id: doc.querySelector('.live_game_at a').getAttribute('href').split('/')[2], // Получаем ID из ссылки
        logo: doc.querySelector('.live_game.right .live_game_tlogo img').getAttribute('src')
    };
    const homeGoals = doc.querySelector('.live_game.left .live_game_goal span').textContent;
    const awayGoals = doc.querySelector('.live_game.right .live_game_goal span').textContent;

    // Отображаем полученные данные
    return (
        <div className="match__section">
            <div className="container-fluid">
                <h2 className='match__name'>{tournament}</h2>
                <div className="clubs match_clubs pt-4 mt-4 mb-5">
                    <div className="club">
                        <img src={homeClub.logo} alt={homeClub.name} />
                        {/* Используем Link для перехода на страницу с ID */}
                        <Link to={`/table/${homeClub.id}`}>
                            <span className='span_match-detail-fotbal'><p>{homeClub.name}</p></span>
                        </Link>
                    </div>

                    <div className="score">
                        <span className='pe-2'>{homeGoals}</span> <p>-</p> <span className='ps-2'>{awayGoals}</span>
                    </div>
                    <div className="club">
                        <img src={awayClub.logo} alt={awayClub.name} />
                        {/* Используем Link для перехода на страницу с ID */}
                        <Link to={`/table/${awayClub.id}`}>
                            <span className='span_match-detail-fotbal'><p>{awayClub.name}</p></span>
                        </Link>
                    </div>
                </div>
                <div className="footbal__teams">
                    <div className="team">
                        <h3>Состав команды:</h3>
                        <ul>
                        
                            {leftTeamPlayers.map((player, index) => (
                                <li key={index}>{player.name}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="team">
                        <h3>Состав команды:</h3>
                        <ul>
                            {rightTeamPlayers.map((player, index) => (
                                <li key={index}>{player.name}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <h3>Тренеры:</h3>
                <ul>
                    {coaches.map((coach, index) => (
                        <li key={index}>
                            <a>{coach.name}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
