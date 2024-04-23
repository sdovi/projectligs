import React, { useEffect, useState } from 'react';
import axios from 'axios';
import cheerio from 'cheerio';
import './style.css'
export default function Table_basketball() {
    
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://www.liveresult.ru/hockey/USA/NHL/standings?st=0');
        const $ = cheerio.load(response.data);
        const rows = $('tbody tr');

        const data = rows.map((index, row) => {
          const cells = $(row).find('td');
          return {
            position: $(cells[0]).text().trim(),
            logo: $(cells[1]).find('img').attr('src'), // Получаем URL логотипа
            team: $(cells[2]).text().trim(),
            matches: $(cells[5]).text().trim(),
            wins_ot: $(cells[6]).text().trim(),
            losses_ot: $(cells[7]).text().trim(),
            losses: $(cells[8]).text().trim(),
            points: $(cells[9]).text().trim(),
            win_percentage: $(cells[11]).text().trim(),
            total_points: $(cells[12]).text().trim()
          };
        }).get();

        setTableData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='forms__sections'>
      <div className='Table-sections'>
        <div className="container-fluid">
          <h2 className='table__footbal-text'>Хоккейная лига</h2>
          <table className='table__common'>
            <thead>
              <tr className='table__tr'>
                <th># Команда</th>
                <th>И</th>
                <th>Вo</th>
                <th>ПO</th>
                <th>П</th>
                <th>Очки</th>
                <th>ПП</th>
                <th>О</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr key={index}>
                  <td className='img16'><p className='mb-0 pe-3'> {row.position}</p> <img className='pl-2' src={row.logo} alt="Логотип команды" />
                  <td>{row.team}</td></td>
                  
                  
                  <td>{row.matches}</td>
                  <td>{row.wins_ot}</td>
                  <td>{row.losses_ot}</td>
                  <td>{row.losses}</td>
                  <td>{row.points}</td>
                  <td>{row.win_percentage}</td>
                  <td>{row.total_points} 12</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
