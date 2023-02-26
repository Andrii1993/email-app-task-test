import { Routes, Route } from "react-router-dom";
import Header from './Header/Header';
import Login from './Login/Login';
import Registration from './Registration/Registration';
import UserPage from './UserPage/UserPage';
import '../styles.scss'

const App = () => {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path='/login' element={<Login/>}/> */}
        <Route path="/sign_in" element={<Registration />} />
        <Route path="/user" element={<UserPage />} />
      </Routes>
    </div>
  );
}

export default App;