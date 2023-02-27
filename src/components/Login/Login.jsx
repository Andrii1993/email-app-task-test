// import React, { useState } from "react";
// import { Button } from "@mui/material";
// import "./style.scss";
// import { Link, useNavigate } from "react-router-dom";
// import axios from 'axios'
// import { BASIC_API } from "../../config/API";
// import { ENDPOINT_API } from "../../config/API";

// const Login = () => {
//   const navigate = useNavigate()

//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [setToken] = useState('');
//   const [setData] = useState(null);
//   const [message, setMessage] = useState('');

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!username || !password) {
//       setMessage('Будь ласка, заповніть усі поля!');
//       return;
//     }

//     const credentials = `${username}:${password}`;
//     const encodedCredentials = btoa(credentials);
//     const headers = { Authorization: `Basic ${encodedCredentials}` };

//     try {
//       const response = await axios.post(
//         `${BASIC_API}api/login`,
//         {},
//         { headers }
//       );
//       console.log(response.data);
//       setToken(response.data.token);
//       const dataResponse = await axios.get(
//         `${ENDPOINT_API}wagger/users/`,
//         { headers }
//       );
//       console.log(dataResponse.data);
//       setData(dataResponse.data);
//       setMessage('Користувач успішно!');
//       navigate('/user');
//     } catch (error) {
//       console.error(error);
//       setMessage('Сталася помилка!');
//     }
//   };
//   return (
//     <>
//       <div className="form__title">
//         <form className="form__container" onSubmit={handleSubmit}>
//           <h2>Увійдіть у систему</h2>
//           <label>
//             <p>Ім'я користувача:</p>
//             <input
//               type="text"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               className="registration__section-input"
//             />
//           </label>
//           <br />
//           <label>
//             <p>Пароль:</p>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="registration__section-input"
//             />
//           </label>
//           <br />
//           <div className="from__btn">
//             <Button type="submit" variant="contained">
//               Увійти
//             </Button>
//             <p className="error__message">{message}</p>
//           </div>
//           <div className="form__register">
//             <span>У вас немає акаунту? </span>
//             <Link to="/sign_in">Зареєструватись</Link>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// };

// export default Login;

import React, { useState } from "react";
import { Button } from "@mui/material";
import "./style.scss";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();

    if (!username || !password) {
      setMessage('Будь ласка, заповніть усі поля!');
      return;
    }

    const credentials = `${username}:${password}`;
    const encodedCredentials = btoa(credentials);

    // Set Authorization header with Basic Auth credentials
    const headers = { Authorization: `Basic ${encodedCredentials}` };

    // Perform dummy request to check if credentials are valid
    fetch('https://jsonplaceholder.typicode.com/todos/1', {
      headers,
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Сталася помилка!');
        }
        return response.json();
      })
      .then(data => {
        // Save user data in localstorage
        localStorage.setItem('user', JSON.stringify({
          username,
          password,
          token: encodedCredentials,
        }));

        setMessage('Користувач успішно!');
        navigate('/user');
      })
      .catch(error => {
        console.error(error);
        setMessage('Сталася помилка!');
      });
  };

  return (
    <>
      <div className="form__title">
        <form className="form__container" onSubmit={handleLogin}>
          <h2>Увійдіть у систему</h2>
          <label>
            <p>Ім'я користувача:</p>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="registration__section-input"
            />
          </label>
          <br />
          <label>
            <p>Пароль:</p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="registration__section-input"
            />
          </label>
          <br />
          <div className="from__btn">
            <Button type="submit" variant="contained">
              Увійти
            </Button>
            <p className="error__message">{message}</p>
          </div>
          <div className="form__register">
            <span>У вас немає акаунту? </span>
            <Link to="/sign_in">Зареєструватись</Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
