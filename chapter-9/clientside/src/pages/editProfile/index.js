import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Alert } from 'reactstrap';

const EditProfilePage = () => {
  const [hideAlert, setHideAlert] = useState(true);
  const [alertMessage, setAlertMessage] = useState('');
  const [colorMessage, setColorMessage] = useState('danger');
  const [id, setId] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [profilePicUrl, setProfilePicUrl] = useState(null);

  const checkToken = async () => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    console.log(token);
    console.log(email);
    try {
      if (!token) {
        console.log('Not Authorized!');
        window.location.replace('/login');
      } else {
        const response = await Axios.post(
          'http://localhost:3005/usergame/get',
          { email },
          {
            headers: {
              Authorization: `Basic ${token}`,
            },
          }
        );

        console.log(response.data.data);
        const inputUsername = response.data.data.username;
        setId(response.data.data.id);
        setUsername(response.data.data.username);
        setEmail(response.data.data.email);

        console.log('username: ', inputUsername);

        // Fetch the profile picture URL 
        const profilePicUrlResponse = await Axios.post(
          'http://localhost:3005/usergame/getProfilePicUrl',
          { inputUsername },
          {
            headers: {
              Authorization: `Basic ${token}`,
            },
          }
        );
        console.log("Profile Pic URL:", profilePicUrlResponse.data.url);
        setProfilePicUrl(profilePicUrlResponse.data.url);
      }
    } catch (error) {
      console.log('Internal Server Error!');
      window.location.replace('/login');
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add your save changes logic here
    console.log('Username:', username);
    console.log('Email:', email);
  };

  const redirectProfile = () => {
    window.location.replace('/profile');
  }

  const redirectEditPassword = () => {
    window.location.replace('/editpassword');
  }

  const editProfileApi = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    try {
        const response = await Axios.post("http://localhost:3005/usergame/update/profile",
          { 
            id,
            username,
            email
          },
          {
            headers: {
              Authorization: `Basic ${token}`,
            },
          }
        );
        console.log(response.data.newData.email);
        console.log(response.data.status);
        setColorMessage('success');
        setAlertMessage(response.data.status);
        setHideAlert(false);
        localStorage.setItem('email', response.data.newData.email);
    } catch (error) {
        setColorMessage('danger');
        setAlertMessage(error.response.data.message);
        setHideAlert(false);
    }
  }

  return (
    <Container>
      <Alert color={colorMessage} hidden={hideAlert}>
          {alertMessage}
      </Alert>
      <Row className="justify-content-center">
        <Col md={6}>
          <div className="text-center mt-4">
            <img src={profilePicUrl} alt="Avatar" className="rounded-circle" width="150" />
            <h1 style={{ alignItems: 'center' }}>User Score: 0</h1>
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
          </Form>
          <br></br>
          <div>
            <Button
                color="primary"
                onClick={editProfileApi}
            >
              Update Profile          
            </Button>
          </div>
          <br></br>
          <div>
            <Button
                color="primary"
                onClick={redirectEditPassword}
            >
              Change Password         
            </Button>
          </div>
          <br></br>
          <div>
            <Button
                color="primary"
                  onClick={redirectProfile}
            >
                Back
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default EditProfilePage;