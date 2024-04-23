import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

export default function Table() {
  const [tableData, setTableData] = useState([]);
  console.log(tableData);

  useEffect(() => {
    fetch('https://soccer365.ru/competitions/12/')
      .then(response => response.text())
      .then(data => {
        const tempElement = document.createElement('div');
        tempElement.innerHTML = data;

        const rows = tempElement.querySelectorAll('.comp_container #competition_table tbody tr');
        const extractedData = [];

        rows.forEach(row => {
          const cells = row.querySelectorAll('td');
          if (cells.length > 0) {
            const teamLink = cells[1].querySelector('a');
            const teamId = teamLink.getAttribute('href').split('/').filter(Boolean).pop();
            extractedData.push({
              place: cells[0].querySelector('.plc').innerText.trim(),
              team: teamLink.innerText.trim(),
              matches: cells[2].innerText.trim(),
              wins: cells[3].innerText.trim(),
              draws: cells[4].innerText.trim(),
              losses: cells[5].innerText.trim(),
              goalsFor: cells[6].innerText.trim(),
              goalsAgainst: cells[7].innerText.trim(),
              goalDifference: cells[8].innerText.trim(),
              points: cells[9].innerText.trim(),
              image: cells[1].querySelector('img').src,
              teamId: teamId
            });
          }
        });

        setTableData(extractedData);
      })
      .catch(error => console.error('Ошибка загрузки данных:', error));
  }, []);

  return (
    <div className='Table-sections'>
      <div className="container-fluid">
        <h2 className='table__footbal-text'>Футбольная лига</h2>
        <table className='table__common'>
          <thead>
            <tr className='table__tr'>
              <th>#</th>
              <th>Команда</th>
              <th>И</th>
              <th>В</th>
              <th>Н</th>
              <th>П </th>
              <th>З</th>
              <th>П</th>
              <th>+/-</th>
              <th>О</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((rowData, index) => (
              <tr key={index}>
                <td>{rowData.place}</td>
                <td>
                  <Link to={`/table/${rowData.teamId}`}>
                    <div className="img16">
                      <img loading="lazy" src={rowData.image} alt={rowData.team}/>
                      <span><p className='mb-0 ps-2'>{rowData.team}</p></span>
                    </div>
                  </Link>
                </td>
                <td>{rowData.matches}</td>
                <td>{rowData.wins}</td>
                <td>{rowData.draws}</td>
                <td>{rowData.losses}</td>
                <td>{rowData.goalsFor}</td>
                <td>{rowData.goalsAgainst}</td>
                <td>{rowData.goalDifference}</td>
                <td>{rowData.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
