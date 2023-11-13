import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './views/HomePage';
import TaskPage from './views/TaskPage';
import LoginPage from './views/LoginPage';
import RegisterPage from './views/RegisterPage'; // Import RegisterPage
import CssBaseline from '@mui/material/CssBaseline';
import NavigationBar from './components/NavigationBar';

export const UserContext = React.createContext(null);
function App() {
  const [user, setUser] = useState(null)
  async function getCurrentUser() {
      try {
        const response = await fetch('http://localhost:5000/get-current-user', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else {
          console.error('Failed to fetch current user');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    }
  useEffect(() => {
    getCurrentUser();
  }, []);
  return (
    <Router>
      <UserContext.Provider value={{ user: user, setUser: setUser }}>
        <CssBaseline />
        <NavigationBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/list/:id" element={<TaskPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} /> {/* Add this route */}
        </Routes>
      </UserContext.Provider>
        <ToastContainer />
    </Router>
  );
}

export default App;

