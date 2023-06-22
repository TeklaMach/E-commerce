import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { TextField, Button, Typography, Container, Box, Grid, InputAdornment, IconButton } from '@mui/material';
import Face2TwoToneIcon from '@mui/icons-material/Face2TwoTone';import { pink } from '@mui/material/colors';
import { Visibility, VisibilityOff } from '@mui/icons-material';
const Registration: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('First Name is required'),
      lastName: Yup.string().required('Last Name is required'),
      phoneNumber: Yup.string().required('Phone Number is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().required('Password is required'),
    }),
onSubmit: async (values) => {
  const user = JSON.parse(localStorage.getItem("user") || "[]");
  localStorage.setItem('user', JSON.stringify([...user,values]));
  try {
    const response = await axios.post('http://localhost:8080/register', {
      firstName: values.firstName,
      lastName: values.lastName,
      phoneNumber: values.phoneNumber,
      email: values.email,
      password: values.password,
    });

    const { token } = response.data;
const storedUsers = localStorage.getItem('users');
    let users = [];
    
    if (storedUsers) {

      users = JSON.parse(storedUsers);
    }


    const newUser = {
      firstName: values.firstName,
      lastName: values.lastName,
      phoneNumber: values.phoneNumber,
      email: values.email,
      token: token,
    };

    users.push(newUser);

   
    localStorage.setItem('users', JSON.stringify(users));

    console.log('Registration successful!');
  } catch (error) {
    console.error('Registration error:', error);
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

            <Face2TwoToneIcon  sx={{ color: pink[500], fontSize:50}}/>

          <Typography component="h1" variant="h5">
            Register
          </Typography>
        <Box sx={{ mt: 2 }}>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                  helperText={formik.touched.firstName && formik.errors.firstName}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                  helperText={formik.touched.lastName && formik.errors.lastName}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="phoneNumber"
                  name="phoneNumber"
                  label="Phone Number"
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                  error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                  helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
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
                />
              </Grid>
              <Grid item xs={12}>
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
              </Grid>
              <Grid item xs={12}>
                <Button 
              fullWidth
              sx={{ mt: 3, mb: 2 }}
              variant="outlined" 
              color="secondary" 
              type="submit">Register</Button>
              </Grid>
            </Grid>
          </form>
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Already have an account? <a href="/login">Login Here</a>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Registration;
