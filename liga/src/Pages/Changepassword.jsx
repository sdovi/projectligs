import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

export default function ChangePassword() {
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleChangePassword = async (event) => {
        event.preventDefault(); // Предотвращаем стандартное поведение отправки формы
        setError('');
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post(
                'http://localhost:8000/user/change_password/',
                { current_password: password, new_password: newPassword, confirm_new_password: confirmNewPassword },
                {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                }
            );
            alert('Пароль успешно изменен.');
            navigate('/profile');
        } catch (error) {
            setError('Не удалось изменить пароль. Пожалуйста, попробуйте еще раз.');
            console.error(error);
        }
    };
    


    return (
        <div>
            <Navbar />
            <div className="forms__sections">
            <div className='change-password-container'>
                <h2>Изменить пароль</h2>
                <form className='change-password-form' onSubmit={handleChangePassword}>
                    <div className='form-group'>
                        <label>Текущий пароль:</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div className='form-group'>
                        <label>Новый пароль:</label>
                        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                    </div>
                    <div className='form-group'>
                        <label>Подтвердите новый пароль:</label>
                        <input type="password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} required />
                    </div>
                    <button type="submit" className='change-password-button'>Изменить пароль</button>
                    {error && <p className='error-message'>{error}</p>}
                </form>
            </div>
            </div>
            <Footer />
        </div>
    );
}
