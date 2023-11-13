import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import CreateIcon from '@mui/icons-material/Create'; // Importing the pen icon
import { UserContext } from '../App';
import { toast } from 'react-toastify';

function NavigationBar() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  async function handleLogout() {
    await fetch('http://localhost:5000/logout', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(data => {
      navigate('/login');
      setUser(null);
      toast.success('Logged out successfully!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          draggable: true,
          theme: "colored",
        });
    }
    )
  };
  return (
    <AppBar position="static" style={{ backgroundColor: '#64b5f6' }}> {/* Updated the color */}
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <CreateIcon />
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1, fontWeight: 'bold' }}> {/* Made the text bold */}
          Easy Tracker
        </Typography>
        {user ? ( // Check if the user is logged in
          <>
            <Typography variant="h6" style={{ marginRight: '16px' }}>
              {user.username} {/* Display the user's username */}
            </Typography>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/register">
              Register
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default NavigationBar;

