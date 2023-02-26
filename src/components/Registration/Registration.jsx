import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import '../Login/style.scss';
import './style.scss';
import axios from 'axios';
import { BASIC_API } from "../../config/API";

const Registration = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const history = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!username || !password || !email) {
      setMessage('Будь ласка, заповніть всі поля');
      return;
    }

    try {
      const response = await axios.post(
        `${BASIC_API}api/register`,
        {
          username,
          password,
          email,
        }
      );
      console.log(response.data);
      setMessage('Користувач успішно створений!');
      history('/user');
    } catch (error) {
      console.error(error);
      setMessage('Сталася помилка при створенні користувача!');
    }
  };
  return (
    <>
      <div className='form__container'>
        <h2 className='form__title'>Реєстрація</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <p htmlFor='username'>Ім&apos;я користувача:</p>
            <input
              type='text'
              id='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className='registration__section-input'
            />
          </div>
          <div>
            <p htmlFor='password'>Пароль:</p>
            <input
              type='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='registration__section-input'
            />
          </div>
          <div>
            <p htmlFor='email'>Email:</p>
            <input
              type='email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='registration__section-input'
            />
          </div>
          <div className='from__btn'>
            <Button type='submit' variant='contained'>
              Реєстрація
            </Button>
            <p className='error__message'>{message}</p>
          </div>
        </form>
        <div className='form__link'>
          <span>Уже маєте акаунт? </span>
          <Link to='/'>Увійти</Link>
        </div>
      </div>
    </>
  );
};

export default Registration;
