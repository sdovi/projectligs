import React, { useState } from 'react';
import './reg.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const Registers = () => {
  
  const [username, setUsername] = useState(''); // Добавляем состояние для имени пользователя
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const register = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/user/register/', { username, email, password }); // Добавляем username в запрос
      console.log(response.data);
      localStorage.setItem('token', response.data.token); // сохраняем полученный токен в localStorage
      navigate('/login'); // перенаправляем пользователя на страницу /login после регистрации
    } catch (error) {
      setError('Аккаунт с таким email уже создано'); // устанавливаем сообщение об ошибке
    }
  }
  
  
  const handleRegistration = async (event) => {
    event.preventDefault();
    setError(''); // очищаем сообщение об ошибке перед отправкой запроса
    await register();
  }

  return (
    <div className="classregist subs_sect">
      <div className="form">
        <ul className="tab-group"></ul>

        <div className="tab-content">
          <div id="signup">
            <h1 className='regs' >Регистрация</h1>

            <form onSubmit={handleRegistration}>
              <div className="field-wrap">
                <input
                  type="text"
                  placeholder='Username' // Изменяем тип поля на text и добавляем placeholder для имени пользователя
                  required
                  autoComplete="off"
                  value={username}
                  className="inputlabels"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="field-wrap">
                <input
                  type="email"
                  placeholder='Email address'
                  required
                  autoComplete="off"
                  value={email}
                  className="inputlabels"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="field-wrap">
                <input
                  type="password"
                  placeholder='Password'
                  required
                  autoComplete="off"
                  className="inputlabels"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {error && <p style={{ color: 'red' }}>{error}</p>} {/* выводим сообщение об ошибке, если оно есть */}
              
              <button type="submit" className="button button-block" >
                Зарегистироваться
              </button>
              <p className='forms__bottom-text'>У вас уже имеется аккаунт? <span className='forms__bottom-text-span'><Link to={'/login'}>Войдите в кабинет</Link></span></p>
              
            </form>
          </div>

          <div id="login"></div>
        </div>
      </div>
    </div>
  );
};

