import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { TextField, Button, Typography, Container, Box, Link, IconButton, InputAdornment } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Face3OutlinedIcon from '@mui/icons-material/Face3Outlined';
import { pink } from '@mui/material/colors';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Login: React.FC = () => {
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post('http://localhost:8080/login', {
          email: values.email,
          password: values.password,
        });

        console.log('Login successful!');
        localStorage.setItem('token', response.data.token);

        navigate('/user');
      } catch (error) {
        console.error('Login error:', error);
        setLoginError('Invalid email or password');
      }
    },
  });
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Face3OutlinedIcon sx={{ color: pink[500], fontSize: 50 }} />
        <Box sx={{ mt: 2 }}>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              required
              fullWidth
              variant="outlined"
              sx={{ mb: 2 }} 
            />
            <TextField
              id="password"
              name="password"
              label="Password"
              value={formik.values.password}
              type={showPassword ? 'text' : 'password'}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              required
              fullWidth
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {loginError && (
              <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                {loginError}
              </Typography>
            )}
            <Button fullWidth sx={{ mt: 3, mb: 2 }} variant="outlined" color="secondary" type="submit">
              Sign In
            </Button>
          </form>
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Don't have an account?{' '}
            <Link href="/registration" underline="none">
              Register Here
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
