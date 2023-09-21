import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Container, Row, Col, Button } from 'react-bootstrap';
import avatar from '../../assets/images/avatar.jpg';

const ProfilePage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [scores, setScores] = useState('');
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
        setUsername(response.data.data.username);
        setEmail(response.data.data.email);
        setScores(response.data.data.scores);

        console.log('username: ', inputUsername);

        // Fetch the profile picture URL 
        // const profilePicUrl = await getProfilePicUrl(username); // Pass the response object to the function
        
        const profilePicUrl = await Axios.post(
          'http://localhost:3005/usergame/getProfilePicUrl',
          { inputUsername },
          {
            headers: {
              Authorization: `Basic ${token}`,
            },
          }
        );
        console.log("Profile Pic URL:", profilePicUrl.data.url);
        setProfilePicUrl(profilePicUrl);
      }
    } catch (error) {
      console.log('Internal Server Error!');
      window.location.replace('/login');
    }
  };

  // const getProfilePicUrl = async (username) => {
  //   try {
  //     const token = localStorage.getItem('token');
  //     const email = localStorage.getItem('email');
  //     console.log(token);
  //     console.log(email);
  //     const response = await Axios.post(
  //       'http://localhost:3005/usergame/getProfilePicUrl',
  //       { username },
  //       {
  //         headers: {
  //           Authorization: `Basic ${token}`,
  //         },
  //       }
  //     );
  //     console.log(response.data.url);
  //     return response.data.url;
  //   } catch (error) {
  //     console.error('Error fetching profile picture URL:', error);
  //     return null;
  //   }
  // };

  useEffect(() => {
    checkToken();
  }, []);

  const redirectEditProfile = () => {
    window.location.replace('/editProfile');
  };

  const redirectGameList = () => {
    window.location.replace('/gamelist');
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <div className="text-center mt-4">
            {/* Use the profilePicUrl if available, otherwise use default avatar */}
            {profilePicUrl ? (
              <img
                src={profilePicUrl}
                alt="Avatar"
                className="rounded-circle"
                width="150"
              />
            ) : (
              <img
                src={avatar}
                alt="Default Avatar"
                className="rounded-circle"
                width="150"
              />
            )}
            <h1 style={{ alignItems: 'center' }}>User Score: {scores}</h1>
          </div>
          <div className="mt-4">
            <p>
              <strong>Username:</strong> {username}
            </p>
            <p>
              <strong>Email:</strong> {email}
            </p>
          </div>
          <div>
            <Button color="primary" onClick={redirectEditProfile}>
              Edit Profile
            </Button>
          </div>
          <br />
          <div>
            <Button color="primary" onClick={redirectGameList}>
              Game List
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
