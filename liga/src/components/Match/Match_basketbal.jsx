import React, { useEffect, useState } from 'react';
import axios from 'axios';
import cheerio from 'cheerio';
import './style.css';
import { useLocation } from 'react-router-dom';

export default function Match_basketbal() {
    const location = useLocation();
    const match = location.state.match;
    const [matchInfo, setMatchInfo] = useState(null);
    const [teamLinks, setTeamLinks] = useState([]);
    console.log(matchInfo);

    // Функция для отправки названия команды на определенный URL-адрес
    // Функция для отправки данных на определенный URL-адрес
const subscribeToTeam = async (teamName) => {
    try {
        // Замените 'your-api-endpoint' на ваш реальный URL-адрес API
        const response = await axios.post('http://127.0.0.1:8000/user/subs/', { title: teamName });
        console.log(response.data); // Логируем ответ сервера
        // Дополнительные действия в случае успешного ответа, если нужно
    } catch (error) {
        console.error('Error subscribing to team:', error);
    }
};


    useEffect(() => {
        const fetchMatchInfo = async () => {
            try {
                const response = await axios.get(`https://www.liveresult.ru/${match.href}`);
                const html = response.data;
                const $ = cheerio.load(html);

                const homeTeamLogo = $('.match-data-team.team1 .logo img').attr('src');
                const homeTeamName = $('.match-data-team.team1 .name').text();
                const awayTeamLogo = $('.match-data-team.team2 .logo img').attr('src');
                const awayTeamName = $('.match-data-team.team2 .name').text();
                const score = $('.score-basketball ').text();
                const matchStatus = $('.match-status.is-finished').text();
                const matchDate = $('time.date').attr('content');

                // Извлекаем голы из текста счета
                const homeGoals = $('.score.score-basketball#score').text();
                setMatchInfo({
                    homeTeamLogo,
                    homeTeamName,
                    awayTeamLogo,
                    awayTeamName,
                    score,
                    matchStatus,
                    matchDate,
                    homeGoals,
                });

                const links = [];
                $('.match-data-team-link').each((index, element) => {
                    const href = $(element).attr('href');
                    links.push(href);
                });
                setTeamLinks(links)
            } catch (error) {
                console.error('Error fetching match info:', error);
            }
        };

        fetchMatchInfo();
    }, []);

    return (
        <div>
            <div className="match__section">
                {matchInfo && (
                    <div>
                        <div className="container-fluid">
                            <h2 className='match__name'>{matchInfo.matchDate}</h2>
                            <div className="clubs match_clubs pt-4 mt-4 mb-5">
                                <div className="club">
                                    <img src={matchInfo.homeTeamLogo} alt="{homeClub.name}" />
                                    <span>{matchInfo.homeTeamName}</span>
                                    <button className='ligainfo__subs-btn' onClick={() => subscribeToTeam(matchInfo.homeTeamName)}>подписаться</button>
                                </div>

                                <div className="score">
                                    <span className='pe-2'>{matchInfo.score}</span>
                                </div>

                                <div className="club">
                                    <img src={matchInfo.awayTeamLogo} alt="{awayClub.name}" />
                                    <span>{matchInfo.awayTeamName}</span>
                                    <button className='ligainfo__subs-btn' onClick={() => subscribeToTeam(matchInfo.awayTeamName)}>подписаться</button>
                                </div>
                            </div>
                        </div>
                        <h3 className='pb-5'>Игроки:</h3>
                        <ul>
                            {/* Здесь могут быть элементы списка */}
                        </ul>
                        <h3>Тренеры:</h3>
                        <ul>
                            {/* Здесь могут быть элементы списка */}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}
