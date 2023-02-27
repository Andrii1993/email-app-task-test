// // import { useState, useEffect } from 'react';
// // import { Navigate } from 'react-router-dom'
// // import axios from 'axios';
// // import './style.scss'
// // import SendMessage from './SendMessage';
// // import EmailTable from './EmailTable';
// // import { Button } from '@mui/material';
// // import { ENDPOINT_API } from '../../config/API';

// // const UserPage = () => {
// //     //logout
// //     const [setIsAuthenticated] = useState(false);
// //     const [setIsClicked] = useState(false);
// //     const [isLoggedOut, setIsLoggedOut] = useState(false);
// //     //інфо про user
// //     const [userData, setUserData] = useState(null);
// //     const [errorMessage, setErrorMessage] = useState('');
// //     useEffect(() => {
// //         const accessToken = localStorage.getItem('accessToken'); // отримати токен з localStorage
// //         if (!accessToken) {
// //             setErrorMessage('Access token is not available.'); // обробити відсутність токена
// //             return;
// //         }        
    
// //         axios.get(`${ENDPOINT_API}users/current/`, {
// //           headers: {
// //             Authorization: `Bearer ${accessToken}`
// //           }
// //         })
// //         .then(response => {
// //           setUserData(response.data);
// //         })
// //         .catch(error => {
// //           console.error(error);
// //         });
// //       }, []);

// //     const handleLogin = () => {
// //         setIsAuthenticated(true);
// //     };

// //     const handleLogout = () => {
// //         setIsAuthenticated(false);
// //         setIsClicked(false);
// //         localStorage.removeItem("userData");
// //         setIsLoggedOut(true);
// //     };
// //     // Переадресація на сторінку логіна
// //     if (isLoggedOut) {
// //         return <Navigate to="/" />;
// //     }
// //         return (
// //           <div>
// //             {/* {errorMessage && <p className="user_name">{errorMessage}</p>} */}
// //             {userData && (
// //               <p className="user_name" onSubmit={handleLogin}>
// //                 {userData.name}
// //               </p>
// //             )}
// //             <div className="btn_logout">
// //               <Button variant="contained" onClick={handleLogout}>
// //                 Вийти
// //               </Button>
// //             </div>
// //             <SendMessage />
// //             <EmailTable />
// //           </div>
// //         );
// // }

// // export default UserPage;

// import { useState, useEffect } from 'react';
// import { Navigate } from 'react-router-dom';
// import axios from 'axios';
// import './style.scss';
// import SendMessage from './SendMessage';
// import EmailTable from './EmailTable';
// import { Button } from '@mui/material';
// import { ENDPOINT_API } from '../../config/API';

// const UserPage = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isClicked, setIsClicked] = useState(false);
//   const [isLoggedOut, setIsLoggedOut] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');

//   useEffect(() => {
//     const accessToken = localStorage.getItem('accessToken');
//     if (!accessToken) {
//       setErrorMessage('Access token is not available.');
//       return;
//     }

//     axios
//       .get(`${ENDPOINT_API}users/current/`, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       })
//       .then(response => {
//         localStorage.setItem('user_name', response.data.name);
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   }, []);

//   const handleLogin = () => {
//     setIsAuthenticated(true);
//   };

//   const handleLogout = () => {
//     setIsAuthenticated(false);
//     setIsClicked(false);
//     localStorage.removeItem('userData');
//     localStorage.removeItem('user_name');
//     setIsLoggedOut(true);
//   };

//   if (isLoggedOut) {
//     return <Navigate to="/" />;
//   }

//   return (
//     <div>
//       {/* {errorMessage && <p className="user_name">{errorMessage}</p>} */}
//       {localStorage.getItem('username') && (
//         <p className="username" onSubmit={handleLogin}>
//           {localStorage.getItem('username')}
//         </p>
//       )}
//       <div className="btn_logout">
//         <Button variant="contained" onClick={handleLogout}>
//           Вийти
//         </Button>
//       </div>
//       <SendMessage />
//       <EmailTable />
//     </div>
//   );
// };

// export default UserPage;
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom'
import axios from 'axios';
import './style.scss'
import SendMessage from './SendMessage';
import EmailTable from './EmailTable';
import { Button } from '@mui/material';
import { ENDPOINT_API } from '../../config/API';

const UserPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [userName, setUserName] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      setErrorMessage('Access token is not available.');
      return;
    }        
    
    axios.get(`${ENDPOINT_API}users/current/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    .then(response => {
      setUserName(response.data);
    })
    .catch(error => {
      console.error(error);
    });
  }, []);

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
      {errorMessage && <p className="user_name">{errorMessage}</p>}
      {userName && (
        <p className="user_name" onSubmit={handleLogin}>
          {userName.name}
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
