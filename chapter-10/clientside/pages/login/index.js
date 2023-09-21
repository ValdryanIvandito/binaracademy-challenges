import Link from 'next/link';
import React, { useState } from 'react';
import Axios from 'axios';
import { Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import styles from '../../styles/LoginPage.module.css';
import { setLoggedIn } from '../../redux/action';
import { connect } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';


const LoginPage = ({ setLoggedIn }) => {
  const [hideAlert, setHideAlert] = useState(true);
  const [alertMessage, setAlertMessage] = useState('');
  const [loading, setLoading] = useState(false); 
  const [payload, setPayLoad] = useState({
    email: '',
    password: '',
  });

  function handleChange(value) {
    console.log(value);
    setPayLoad({ ...payload, ...value });
  }

  const loginApi = async (event) => {
    event.preventDefault();
    setLoading(true); 
    try {
      const response = await Axios.post("http://localhost:3005/login", {
        email: payload.email,
        password: payload.password,
      });
      console.log(response.data.email);
      console.log(response.data.token);
      localStorage.setItem('token', response.data.token); //to get data use command => localStorage.getItem('token')
      localStorage.setItem('email', response.data.email); //to get data use command => localStorage.getItem('email')
      setLoggedIn(true, { email: response.data.email });
      window.location.replace('/gamelist');
    } catch (error) {
      setAlertMessage(error.response.data.message);
      setHideAlert(false);
    } finally {
      setLoading(false);
    }
  };

 
  return (
    <div className={styles.HomePageImage}>
      <h2 className={styles.textH2}>LOGIN</h2>
      <div className={styles.alertContainer}>
        <Alert color="danger" hidden={hideAlert}>
          {alertMessage}
        </Alert>
      </div>
      <div className={styles.loginContainer}>
        <Form>
          <FormGroup id="formBasicEmail">
            <Label className={styles.textLabel}>Email</Label>
            <Input
              className={styles.input}
              type="email"
              value={payload.email}
              onChange={(event) => handleChange({ email: event.target.value })}
            />
          </FormGroup>
          <FormGroup id="formBasicPassword">
            <Label className={styles.textLabel}>Password</Label>
            <Input
              className={styles.input}
              type="password"
              value={payload.password}
              onChange={(event) => handleChange({ password: event.target.value })}
            />
          </FormGroup>
          <br></br>
          <Button 
            color="primary" 
            onClick={loginApi}
            style={{ width: '100%' }}
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner animation="border" size="sm" className="mr-2" />
                Processing
              </>
            ) : (
              "Login"
            )}
          </Button>
        </Form>
        <br></br>
        <p className={styles.textDescription}>Belum mempunyai akun? <Link href="/register"><a className={styles.linkText}>daftar</a></Link> disini</p>
      </div>
    </div>
  );
};


const mapDispatchToProps = {
  setLoggedIn,
};


export default connect(null, mapDispatchToProps)(LoginPage);