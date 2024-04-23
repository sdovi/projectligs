import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import axios from "axios";
import { Link } from 'react-router-dom';

export default function Profile() {
    const [user, setUser] = useState(null);
    const [subs, setSubs] = useState(null);
    const navigate = useNavigate(); 

    // Извлечение токена из локального хранилища
    const token = localStorage.getItem('token');

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

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/'); 
    }

    const handleChangePassword = () => {
        navigate('/change-password'); 
    }

    useEffect(() => {
        // Проверка наличия токена перед выполнением запроса
        if (token) {
            fetchUser(token);
        }
    }, [token]); // Добавление токена в зависимости, чтобы запрос выполнялся при изменении токена

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('http://127.0.0.1:8000/user/subs/');
            setSubs(response.data);
          } catch (error) {
            console.error('Ошибка при выполнении запроса:', error);
          }
        };
    
        fetchData();
    }, []);
    const handleUnsubscribe = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/user/subs/${id}/`);
            setSubs(subs.filter(item => item.id !== id)); // Remove the unsubscribed team from state
        } catch (error) {
            console.error('Error unsubscribing:', error);
        }
    }


    return (
        <div>
            <Navbar />
            <div className="forms__sections">
                <div className="container-fluid pt-3">
                    <div className="profile__Sect">
                        <h2>Личный кабинет</h2>

                        <div className="tab">
                            <p className="tablinks ps-4 pt-4">Мои подписки:</p>
                            <div className="vsfsd ">
                            {subs && subs.map(item => (
                                    <div className='awvaw'>
                                    <p className=" nav-txt asdac ps-3">{item.title}</p>
                                    <button onClick={() => handleUnsubscribe(item.id)}>Отписаться</button>
                                    </div>
                            ))}
                            </div>
                           
                        </div>

                        <div className="personal-info">
                            <h3>Личные данные</h3>
                            <p>ваше имя: {user && user.username}</p>
                            <p>Адрес Gmail: {user && user.email}</p>
                            <button onClick={handleLogout} className='logoutButton'>Выйти с аккаунта</button>
                            <button onClick={handleChangePassword} className='Navbar__register ms-3'>Изменить пароль</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
