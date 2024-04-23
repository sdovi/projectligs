import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';
import { useParams } from 'react-router-dom';

import { useContext } from 'react';
import { Context } from '../../context';

export default function Test() {
  const [clubData, setClubData] = useState(null);
  const { id } = useParams(); 
  
  const { setArray } = useContext(Context)
  const [profileWiki, setProfileWiki] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false); // Состояние для отслеживания статуса подписки
  console.log(profileWiki);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://soccer365.ru/clubs/${id}`);
        const parser = new DOMParser();
        const htmlDocument = parser.parseFromString(response.data, 'text/html');
        const clubDataElement = htmlDocument.querySelector('.block_body');
        const profileWikiElement = htmlDocument.querySelector('.profile_info_title');
        setProfileWiki(profileWikiElement.innerHTML);

        // Проверка статуса подписки в локальном хранилище
        const storedProfileWiki = localStorage.getItem('profileWiki');
        if (storedProfileWiki === profileWikiElement.innerHTML) {
          setIsSubscribed(true);
        }

        if (clubDataElement) {
          const cleanedHTML = removeElements(clubDataElement.innerHTML);
          setClubData(cleanedHTML);
        }
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleClick = () => {
    if (!isSubscribed) {
      axios.post('http://127.0.0.1:8000/user/subs/', { title: profileWiki })
        .then(response => {
          // Обработка успешного ответа от сервера
          console.log('Данные успешно отправлены:', response.data);
          setIsSubscribed(true); // Устанавливаем флаг подписки в true
        })
        .catch(error => {
          // Обработка ошибок при отправке запроса
          console.error('Ошибка при отправке данных:', error);
        });
    }
  };

  const removeElements = (html) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    tempDiv.querySelectorAll('a').forEach((link) => link.remove());
    tempDiv.querySelectorAll('.params_key').forEach((element) => {
      const text = element.textContent.trim();
      if (text === 'Главный тренер' || text === 'Соревнования' || text === 'Ссылки') {
        element.parentNode.removeChild(element);
      }
    });
    tempDiv.querySelectorAll('.img16').forEach((img) => {
      img.parentNode.removeChild(img);
    });
    return tempDiv.innerHTML;
  };

  return (
    <div className=' container-fluid'>
      {profileWiki && (
        <div>
          <button className='ligainfo__subs-btn mb-4' onClick={handleClick}>
            {isSubscribed ? 'Подписаны' : 'Добавить в подписку'} {/* Изменение текста кнопки в зависимости от статуса подписки */}
            <div dangerouslySetInnerHTML={{ __html: profileWiki }} />
          </button>
        </div>
      )}
      {clubData && (
        <div>
          <div dangerouslySetInnerHTML={{ __html: clubData }} />
        </div>
      )}
    </div>
  );
}
