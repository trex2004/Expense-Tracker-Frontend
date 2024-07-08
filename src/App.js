import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage.js'
import RegisterPage from './pages/RegisterPage.js';
import LoginPage from './pages/LoginPage.js';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<ProtectedRoutes><HomePage /></ProtectedRoutes>} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </>
  );
}

export function ProtectedRoutes(props) {
  if (localStorage.getItem("user")) {
    return props.children
  } else {
    return <Navigate to='/login' />
  }
}

export default App;
