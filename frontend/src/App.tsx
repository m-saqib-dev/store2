import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { checkSession } from './api/auth';
// import Home from './Home';
import Login from './pages/auth/login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await checkSession();
        setIsLoggedIn(response.data.isLoggedIn); 
      } catch (error) {
        console.error("Error checking session:", error);
        // Handle error, e.g., display an error message or redirect to login
      }
    };

    checkLoginStatus();
  }, []);

  const PrivateRoute = ({ children }:any) => {
    return isLoggedIn ? children : <Navigate to="/login" state={{ from: location }} replace />;
  };

  return (
    <Routes>
      <Route path="/" element={<PrivateRoute><h1>Home</h1></PrivateRoute>} />
      <Route path="/login" element={<Login />} />
      {/* Other routes */}
    </Routes>
  );
}

export default App;