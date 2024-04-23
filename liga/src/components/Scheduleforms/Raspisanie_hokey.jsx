import React, { useEffect, useState } from 'react';
import cheerio from 'cheerio';
import { Link } from 'react-router-dom';
import './style.css';



export default function Raspisanie_hokey() {
  const [matchData, setMatchData] = useState(null);
  console.log(matchData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://www.liveresult.ru/hockey/matches');
        const html = await response.text();
        const $ = cheerio.load(html);

        const matches = $('.live-group-data.live-group-static .live-match.is-finished');
        const matchesData = [];

        matches.each((index, element) => {
          const matchDiv = $(element);
          const time = matchDiv.find('.state time').text();
          const status = matchDiv.find('.state .status').text();
          const team1 = matchDiv.find('.teams .team1 ').text();
          const team2 = matchDiv.find('.teams .team2').text();
          const href = matchDiv.find('.teams').attr('href')
          // const score = matchDiv.find('.teams  .score ').text();

          const matchInfo = {
            time,
            status,
            team1,
            team2,
            href
            // score,
          };

          matchesData.push(matchInfo);
        });

        setMatchData(matchesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="forms__sections">
        <div className="container-fluid">
          {matchData && matchData.map((match, index) => (
            <div key={index}>
            
              <Link to={`/games/hokey/${index}`} state={{ match }}>
                <div className="forms_com-block">
                  <a className="game_link">
                    <div className="status">
                      <span className="size11">{match.time}</span>
                    </div>
                    <div className="result">
                      <div className="ht">
                        <div className="name">
                          <div className="img16">
                            <span className="span-baskets ">
                              <p>{match.team1.length > 20 ? match.team1.slice(0, 20) + '...' : match.team1}</p>
                            </span>
                          </div>
                        </div>
                        {/* <div className="gls gls-basket ms-2">{match.score}</div> */}
                      </div>
                      <div className="at pb-2">
                        <div className="name">
                          <div className="img16">
                            <span className="span-baskets">
                             <p> {match.team2.length > 20 ? match.team2.slice(0, 20) + '...' : match.team2}</p>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="stage"><p>{match.status}</p></div>
                  </a>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
