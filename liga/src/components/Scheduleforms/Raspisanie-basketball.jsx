import React, { useEffect, useState } from 'react';
import cheerio from 'cheerio';
import { Link } from 'react-router-dom';
import './style.css'

export default function Raspisanie_basketball() {
    
    const [data, setData] = useState([]);
  
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://www.liveresult.ru/basketball/matches');
            const html = await response.text();
            const $ = cheerio.load(html);
      
            const parsedData = [];
      
            $('.live-match').each((index, element) => {
                const matchDiv = $(element);
                const team1Name = matchDiv.find('.team1 .players').text().trim();
                const team2Name = matchDiv.find('.team2 .players').text().trim();
                const team1Score = matchDiv.find('.team1 .team-score').text().trim();
                const team2Score = matchDiv.find('.team2 .team-score').text().trim();
                const quarters = [];
                matchDiv.find('.quarter').each((index, element) => {
                    quarters.push($(element).text().trim());
                });
                const matchTime = matchDiv.find('.time').text().trim();
                const matchStatus = matchDiv.find('.status').text().trim();
                const team1Logo = matchDiv.find('.team1 .team-icon').attr('src');
                const team2Logo = matchDiv.find('.team2 .team-icon').attr('src');
                // Получаем значение атрибута href
                const href = matchDiv.find('.basketball-teams').attr('href');
      
                // Сохраняем данные в массив
                parsedData.push({
                    team1: {
                        name: team1Name,
                        score: team1Score,
                        logo: team1Logo
                    },
                    team2: {
                        name: team2Name,
                        score: team2Score,
                        logo: team2Logo
                    },
                    
                    href,
                    quarters: quarters,
                    time: matchTime,
                    status: matchStatus
                });
            });
      
            // Устанавливаем состояние данных
            setData(parsedData);
        };
      
        fetchData();
    }, []);
    return (
        <div>
        <div className="forms__sections">
            <div className="container-fluid raspisanie__sections-container pb-5">
            {data.map((match, index) => (
            
            <Link to={`/games/basket/${index}`} state={{ match }} >
              
            <div key={index} className="forms_com-block mb-1">
          
              <div className="game_link" >
                <div className="status"><span className="size11">{match.time} </span></div>
                <div className="result">
                  <div className="ht">
                    <div className="name">
                      <div cl
                      assName="img16">
                        <span className='span-baskets'> 
                        {match.team1.name.length > 16
                        ? match.team1.name.slice(0, 16) + '...'
                        : match.team1.name} </span>
                        <img className='ms-2 basketball-img16' loading="lazy" src={match.team1.logo} alt={match.team1.name} />
                      </div>
                    </div>
                    <div className="gls gls-basket gls-basket-p  ms-2"><p>{match.team1.score}</p></div>
                  </div>
                  <div className="at ">
                    <div className="name">
                      <div className="img16">
                        <img className='me-2 basketball-img16' loading="lazy" src={match.team2.logo} alt={match.team2.name} />
                        <span className='span-baskets'>
                        <p>{match.team2.name.length > 16
                        ? match.team2.name.slice(0, 16) + '...'
                        : match.team2.name}</p>
                        </span>
                      </div>
                    </div>
                    <div className="gls gls-basket me-2"><p>{match.team2.score}</p></div>
                  </div>
                </div>
                <div className="stage"><p>{match.status}</p></div>
              </div>
            </div>
            </Link>
          ))}
            </div>
        </div>
        
          
        </div>
    );
}
