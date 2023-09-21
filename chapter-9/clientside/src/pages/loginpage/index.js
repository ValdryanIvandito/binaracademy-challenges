import React, { useState } from 'react';
import Axios from 'axios';
import { Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import '../../styles/LoginPage.css';

const LoginPage = () => {
  const [hideAlert, setHideAlert] = useState(true);
  const [alertMessage, setAlertMessage] = useState('');

  const [payload, setPayLoad] = useState({
      email: '',
      password: '',
  })

  function handleChange(value) {
      console.log(value);
      setPayLoad({ ...payload, ...value })
  }

  const loginApi = async (event) => { 
    event.preventDefault();
    try {
      const response = await Axios.post("http://localhost:3005/login", {
        email: payload.email,
        password: payload.password,
      });
      localStorage.setItem('token', response.data.token); //to get data use command => localStorage.getItem('token')
      localStorage.setItem('email', response.data.email); //to get data use command => localStorage.getItem('email')
      window.location.replace('/profile');
    } catch (error) {
        setAlertMessage(error.response.data.message);
        setHideAlert(false);
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <div className="alert-container">
        <Alert color="danger" hidden={hideAlert}>
          {alertMessage}
        </Alert>
      </div>
      <div className="login-container">
        <Form>
          <FormGroup id="formBasicEmail">
            <Label>Email</Label>
            <Input
              type="email"
              value={payload.email}
              onChange={function(event) {
                handleChange({ email: event.target.value })
              }}
            />
          </FormGroup>
          <FormGroup id="formBasicPassword">
            <Label>Password</Label>
            <Input
              type="password"
              value={payload.password}
              onChange={function(event) {
                handleChange({ password: event.target.value })
              }}
            />
          </FormGroup>
          <br></br>
          <Button 
            color="primary" 
            block
            onClick={loginApi}
          >
            Login
          </Button>
        </Form>
        <p>Belum mempunyai akun? <a href="/register">daftar</a> disini</p>
      </div>
    </div>
  );
};

export default LoginPage;