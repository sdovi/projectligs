import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import axios from 'axios';
import cheerio from 'cheerio';
import img from './img/logo.webp';
import img2 from './img/icons.png';
import './style.css';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';

const items = [
  {
    label: <Link className='nav__txt-link' to={'/raspis/basket'}><a className='navbar_raspisanie-dropdown  ' >Расписание баскетбол</a></Link>,
    key: '0',
  },
  {
    label: <Link  className='nav__txt-link' to={'/raspis/hokey'}><a className='navbar_raspisanie-dropdown'>Расписание Хоккей</a></Link>,
    key: '1',
  },
  {
    label: <Link  className='nav__txt-link' to={'/ligaforms'}><a className='navbar_raspisanie-dropdown'>Расписание Футбол</a></Link>,
    key: '2',
  },
];

const items2 = [
  {
    label: <Link className='nav__txt-link' to={'/table/basket'}><a className='navbar_raspisanie-dropdown  ' >Таблица баскетбол</a></Link>,
    key: '0',
  },
  {
    label: <Link  className='nav__txt-link' to={'/table/hokey'}><a className='navbar_raspisanie-dropdown'>Таблица Хоккей</a></Link>,
    key: '1',
  },
  {
    label: <Link  className='nav__txt-link' to={'/table'}><a className='navbar_raspisanie-dropdown'>Таблица Футбол</a></Link>,
    key: '2',
  },
];

export default function Navbar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [leagues, setLeagues] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [user, setUser] = useState(null);
  const [subs, setSubs] = useState(null);
  const [perPage] = useState(10); // Количество элементов на странице
  const [pageNumbers, setPageNumbers] = useState([]);
  const token = localStorage.getItem('token');
  const [userSubs, setUserSubs] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUser(token);
    }

    const subsFromStorage = localStorage.getItem('profileWiki');
    setSubs(subsFromStorage);
  }, []);

  useEffect(() => {
    const pageNumbersArray = [];
    for (let i = 1; i <= Math.ceil(leagues.length / perPage); i++) {
      pageNumbersArray.push(i);
    }
    setPageNumbers(pageNumbersArray);
  }, [leagues, perPage]);

  const fetchUser = async (token) => {
    try {
      const response = await axios.get('http://localhost:8000/user/profile/', {
        headers: {
          'Authorization': `Token ${token}`
        }
      });
      setUser(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    // Функция для выполнения запроса
    const fetchData = async () => {
      try {
        // Выполнение GET запроса
        const response = await axios.get('http://127.0.0.1:8000/user/subs/');

        // Установка полученных данных в состояние
        setUserSubs(response.data);
      } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
      }
    };

    // Вызов функции для получения данных
    fetchData();
  }, []);
  const handleChange = async (e) => {
    setSearchTerm(e.target.value);
    searchLeagues(e.target.value);
  };

  const searchLeagues = async (searchTerm) => {
    try {
      const response = await axios.get(`https://soccer365.ru/online/${searchTerm}`);
      const html = response.data;
      const $ = cheerio.load(html);
      const matches = $('.game_block').map((index, element) => {
        const match = {};
        match.id = $(element).find('a.game_link').attr('dt-id');
        match.name = $(element).find('a.game_link').attr('title');
        return match;
      }).get();
      const filteredMatches = matches.filter(match => match.name.toLowerCase().includes(searchTerm.toLowerCase()));
      setLeagues(filteredMatches);
      setModalIsOpen(true);
    } catch (error) {
      console.error('Ошибка при запросе к серверу:', error);
    }
  };

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage);
  };

  const indexOfLastLeague = (currentPage + 1) * perPage;
  const indexOfFirstLeague = indexOfLastLeague - perPage;
  const currentLeagues = leagues.slice(indexOfFirstLeague, indexOfLastLeague);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-bg">
        <div className="container-fluid navbar-com-block">
          <Link to={'/'} className='nav__txt-link'><img src={img} alt="" /></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
              <Link className='nav__txt-link' to={'/'}><li className="nav-item ms-5">
                <p className='nav-txt'>Новости</p>
              </li></Link>
         
              <Dropdown className='nav__txt-link'
                menu={{
                  items: items,
                }}
                trigger={['click']}
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    <li className="nav-item ms-3 nav__txt-link">
                      <p className='nav-txt nav__txt-link'>Расписание</p>
                    </li>
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>

              <Dropdown className='nav__txt-link'
                menu={{
                  items: items2, // Заменили items на items2
                }}
                trigger={['click']}
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    <li className="nav-item ms-3">
                      <p className='nav-txt'>Таблица</p>
                    </li>
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>

              <Link className='nav__txt-link' to={'/basket'}><li className="nav-item ms-3">
                <p className='nav-txt'>Баскетбол</p>
              </li></Link>

              <Link className='nav__txt-link' to={'/hokey'}><li className="nav-item ms-3">
                <p className='nav-txt'>Хоккей</p>
              </li></Link>


              <li class="nav-item dropdown nav__txt-link nav-item  ms-3 ">
          <p class="dropdown-toggle nav__txt-link nav-item2" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Подписки
          </p>
          <ul class="dropdown-menu">
          {userSubs.map(item => (
            <Link className='nav__txt-link' to={`/subs/${item.id}`}>
            <li key={item.id}><p class="dropdown-item nav-txt" >{item.title}</p></li></Link>
        ))}
          </ul>
        </li>
             
             
            </ul>
            {token ? (
              <Link to={'/profile'}>
                <button className='Navbar__register'><img src={img2} alt="" />   {user && user.username}</button>
              </Link>
            ) : (
              <Link to={'/login'}>
                <button className='Navbar__register'>Войти</button>
              </Link>
            )}
            <form className="d-flex navbar__forms-right" role="search">
              <input
                type="search"
                value={searchTerm}
                onChange={handleChange}
                placeholder="Поиск"
                className='navbar__input'
              />
              <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} className={'ReactModal__Overlay'}>
                <input
                  type="search"
                  autoFocus
                  value={searchTerm}
                  onChange={handleChange}
                  placeholder="Поиск"
                />
                <div className="row mt-5 ">
                  {currentLeagues.map((league, index) => (
                    <div className="col-lg-4 col-md-6 col-sm-12" key={index}>
                      <Link className='nav__txt-link' to={`/games/${league.id}`} onClick={() => setModalIsOpen(false)}>
                        <span>{league.name}</span>
                      </Link>
                    </div>
                  ))}
                </div>
                <ul className="pagination justify-content-center">
                  {pageNumbers.map((number, index) => (
                    <li key={index} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                      <button onClick={() => handlePageChange(number)} className="page-link">
                        {number + 1}
                      </button>
                    </li>
                  ))}
                </ul>
              </Modal>
            </form>
          </div>
        </div>
      </nav>
    </div>
  )
}
