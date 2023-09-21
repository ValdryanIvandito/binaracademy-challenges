import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import '../../styles/LoginPage.css';

const EditPasswordPage = () => {
  const [hideAlert, setHideAlert] = useState(true);
  const [alertMessage, setAlertMessage] = useState('');
  const [colorMessage, setColorMessage] = useState('danger');
  const [id, setId] = useState('');

  const [payload, setPayLoad] = useState({
      newPassword: '',
      confirmNewPassword: ''
  })

  function handleChange(value) {
      console.log(value);
      setPayLoad({ ...payload, ...value })
  }

  const checkToken = async () => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    console.log(token);
    console.log(email);
    try {
      if (!token) {
        console.log('Not Authorize !');
        window.location.replace('/login');
      } else {
        const response = await Axios.post('http://localhost:3005/usergame/get',
          { email },
          {
            headers: {
              Authorization: `Basic ${token}`,
            },
          }
        );
        console.log(response.data.data);
        setId(response.data.data.id);
      }
    } catch (error) {
        console.log("Internal Server Error !");
        window.location.replace('/login');
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  const updatePasswordApi = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    try {
        const response = await Axios.post("http://localhost:3005/usergame/update/password", 
            {
                id,
                newPassword: payload.newPassword,
                confirmNewPassword: payload.confirmNewPassword
            },
            {
                headers: {
                    Authorization: `Basic ${token}`,
                },
            }
        );
        console.log(response.data.status);
        setColorMessage('success');
        setAlertMessage(response.data.status);
        setHideAlert(false);
    } catch (error) {
        setColorMessage('danger');
        setAlertMessage(error.response.data.message);
        setHideAlert(false);
    }
  }

  const redirectProfile = () => {
    window.location.replace('/profile');
  }

  return (
    <div>
      <h2>Change Password</h2>
      <div className="alert-container">
        <Alert color={colorMessage} hidden={hideAlert}>
          {alertMessage}
        </Alert>
      </div>
      <div className="login-container">
        <Form>
          <FormGroup id="formBasicEmail">
            <Label>New Password</Label>
            <Input
              type="password"
              value={payload.newPassword}
              onChange={function(event) {
                handleChange({ newPassword: event.target.value })
              }}
            />
          </FormGroup>
          <FormGroup id="formBasicPassword">
            <Label>Confirm New Password</Label>
            <Input
              type="password"
              value={payload.confirmNewPassword}
              onChange={function(event) {
                handleChange({ confirmNewPassword: event.target.value })
              }}
            />
          </FormGroup>
          <br></br>
          <Button 
            color="primary" 
            block
            onClick={updatePasswordApi}
          >
            Update Password
          </Button>
          <br></br>
          <Button 
            color="primary" 
            block
            onClick={redirectProfile}
          >
            Back
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default EditPasswordPage;