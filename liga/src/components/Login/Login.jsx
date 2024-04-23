import React, { useState } from 'react';
import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Login = () => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const login = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/user/login/', { email: loginEmail, password: loginPassword });
      console.log(response.data);
      localStorage.setItem('token', response.data.token);
      navigate('/profile'); // перенаправляем пользователя на главную страницу после входа
    } catch (error) {
      navigate('/');
      // setError('Не правильный логин или пароль'); // устанавливаем сообщение об ошибке
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // очищаем сообщение об ошибке перед отправкой запроса
    await login();
  };

  console.log(loginEmail);
  console.log(loginPassword);
  return (
    <div className="classregist mt-0 subs_sect">
      <div className="form">
        <ul className="tab-group"></ul>

        <div className="tab-content">
          <div id="signup">
            <h1 className='loginh1'>Вход в аккаунт</h1>

            <form onSubmit={handleLogin}>
              <div className="field-wrap">
                <input
                  value={loginEmail}
                  type="email"
                  placeholder='Email address'
                  required
                  autoComplete="off"
                  className="inputlabels"
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
              </div>

              <div className="field-wrap">
                <input
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  type="password"
                  placeholder='Password'
                  required
                  autoComplete="off"
                  className="inputlabels"
                />
              </div>

              {error && <p style={{ color: 'red' }}>{error}</p>} {/* выводим сообщение об ошибке, если оно есть */}
              
              <p className='forms__bottom-text pt-0'>У вас нет аккаунта? <span className='forms__bottom-text-span'>
              <Link to='/reg' className='Links'><h5 className='pb-3'>Создайте его здесь</h5></Link></span></p>
              

              <button type="submit" className="button button-block" >
                Вход
              </button>
            </form>
          </div>

          <div id="login"></div>
        </div>
      </div>
    </div>
  );
};
