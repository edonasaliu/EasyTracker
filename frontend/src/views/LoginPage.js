import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, Typography, TextField, Button, Link } from '@mui/material';
import { UserContext } from '../App';
import { toast } from 'react-toastify';

function LoginPage() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();

    // Password validation
    if (formData.password.length < 7) {
      alert('Password should be at least 7 characters long.');
      return;
    }

    setIsLoading(true)
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
        setIsLoading(false);
        navigate('/');
        toast.success('Logged in successfully!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          draggable: true,
          theme: "colored",
        });
      } else {
        console.error('Failed to fetch current user');
        setIsLoading(false);
        toast.error('Username or password is incorrect!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          draggable: true,
          theme: "colored",
        });
      }
    } catch (error) {
      setIsLoading(false);
      console.error('An error occurred:', error);
    }


    // Perform your registration logic here
    // Send formData to your API or do whatever you need

    // After successful registration, you can redirect to the login page
    // Example: history.push('/login');
  };
  return (
    <Container component="main" maxWidth="xs" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Paper elevation={3} style={{ padding: 16, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5">Login</Typography>
        <form style={{ width: '100%', marginTop: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={handleChange}
            value={formData.username}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            onChange={handleChange}
            value={formData.password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: 16 }}
            onClick={handleSubmit}
          >
            {isLoading ? 'Submitting...' : 'Sign In'}
          </Button>
          <Link href="/register" variant="body2" style={{ display: 'block', textAlign: 'center', marginTop: 16 }}>
            {"Don't have an account? Register Now"}
          </Link>
        </form>
      </Paper>
    </Container>
  );
}

export default LoginPage;
