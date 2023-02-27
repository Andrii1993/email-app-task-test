import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom'
import axios from 'axios';
import './style.scss'
import SendMessage from './SendMessage';
import EmailTable from './EmailTable';
import { Button } from '@mui/material';
// import { ENDPOINT_API } from '../../config/API';
import { BASIC_API } from '../../config/API';

const UserPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [username, setUserName] = useState();
  const [email, setEmail] = useState()
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const credentials = `${username}:${email}`;
    const encodedCredentials = btoa(credentials);
    const accessToken = localStorage.getItem('isAuthenticated');
    if (!accessToken) {
      console.log(accessToken)
      // setErrorMessage('Access token is not available');
      return;
    }        
    
    axios.get(`${BASIC_API}users/current/`, {
      headers: {
        Authorization: `Bearer ${encodedCredentials}`,
        'Content-Type': 'application/json',
      }
    })
    .then(response => {
      setUserName(response.data);
      setEmail(response.data)
    })
    .catch(error => {
      console.error(error);
    });
  }, [username, email]);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.clear(); // очищення localStorage
    setIsAuthenticated(false);
    setIsLoggedOut(true);
  };

  if (isLoggedOut) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      {/* {errorMessage && <p className="user_name">{errorMessage}</p>} */}
      {username && (
        <p className="user_name" onSubmit={handleLogin}>
          {username}, {email}
        </p>
      )}
      <div className="btn_logout">
        <Button variant="contained" onClick={handleLogout}>
          Вийти
        </Button>
      </div>
      <SendMessage />
      <EmailTable />
    </div>
  );
}

export default UserPage;
