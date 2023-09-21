import Link from 'next/link'
import React, { useState } from 'react';
import Axios from 'axios';
import { Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import styles from '../../styles/RegisterPage.module.css';
import avatar from '../../assets/images/avatar.jpg';
import Spinner from 'react-bootstrap/Spinner';

const RegisterPage = () => {
    const [hideAlert, setHideAlert] = useState(true);
    const [alertMessage, setAlertMessage] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [payload, setPayLoad] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    })

    function handleChange(value) {
        setPayLoad({ ...payload, ...value })
    }

    const isFormValid = () => {
        // Client-side validation to check if all fields are filled and passwords match
        return (
          payload.username &&
          payload.email &&
          payload.password &&
          payload.confirmPassword &&
          payload.password === payload.confirmPassword
        );
    };

    const registerApi = async (event) => {
        event.preventDefault();
        setLoading(true);
        if (!isFormValid()) {
            setAlertMessage('Please fill in all fields correctly!');
            setHideAlert(false);   
        }
        try { 
            const formData = new FormData();
            formData.append("profilepic", selectedImage);
            formData.append("username", payload.username);
            formData.append("email", payload.email);
            formData.append("password", payload.password);
            formData.append("confirmPassword", payload.confirmPassword);

            const responseInsert = await Axios.post(`${process.env.REACT_APP_BE_URL}/usergame/insert`, payload);
            await Axios.post(`${process.env.REACT_APP_BE_URL}/usergame/upload-profile-pic`, formData);
        
            console.log(responseInsert);
            window.location.replace('/login');
            
        } catch (error) {
            // console.log('THIS ERROR:', error);
            // setAlertMessage('Please fill in all fields correctly!');
            // setHideAlert(false);   
            console.log(error.response.data.message);
            setAlertMessage(error.response.data.message);
            setHideAlert(false);  
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={styles.HomePageImage}>
            <h1 className={styles.registerPageTitle}>Register Page</h1>
            <div className={styles.alertContainer}>
                <Alert color="danger" hidden={hideAlert}>
                    {alertMessage}
                </Alert>
            </div>
            <div className={styles.RegisterContainer}>
                <Form>
                    <FormGroup>
                        <Label className={styles.textLabel} for="profilepic">Profile Picture</Label>
                        <p className={styles.textDescription}>File Format Must be .png !</p>
                        <Input
                            className={styles.textDescription}
                            type="file"
                            accept="image/*"
                            name="profilepic"
                            id="profilepic"
                            onChange={(event) => {
                                const file = event.target.files[0];
                                setSelectedImage(file);
                            }}
                        />
                        <img
                            src={selectedImage ? URL.createObjectURL(selectedImage) : avatar}
                            alt="Avatar"
                            className={styles.textDescription}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label className={styles.textLabel} for="username">Username</Label>
                        <Input
                            className={styles.input}
                            type="text"
                            name="username"
                            id="username"
                            // placeholder="Enter your username"
                            value={payload.username}
                            onChange={(event) => handleChange({ username: event.target.value })}
                            required // Make the field required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label className={styles.textLabel} for="email">Email</Label>
                        <Input 
                            className={styles.input}
                            type="email"
                            name="email"
                            id="email"
                            // placeholder="Enter your email"
                            value={payload.email}
                            onChange={(event) => handleChange({ email: event.target.value })}
                            required // Make the field required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label className={styles.textLabel} for="password">Password</Label>
                        <Input
                            className={styles.input}
                            type="password"
                            name="password"
                            id="password"
                            // placeholder="Enter your password"
                            value={payload.password}
                            onChange={(event) => handleChange({ password: event.target.value })}
                            required // Make the field required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label className={styles.textLabel} for="confirmPassword">Confirm Password</Label>
                        <Input
                            className={styles.input}
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            // placeholder="Confirm your password"
                            value={payload.confirmPassword}
                            onChange={(event) => handleChange({ confirmPassword: event.target.value })}
                            required // Make the field required
                        />
                    </FormGroup>
                    <br></br>
                    <Button 
                        color="primary" 
                        // type="submit" 
                        block
                        style={{ width: '100%' }} // Set the button width to 100%
                        onClick={registerApi}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                               <Spinner animation="border" size="sm" className="mr-2" />
                                Processing 
                            </>
                        ) : (
                            "Register"
                        )}
                    </Button>
                    <br></br>
                    <br></br>
                    <p className={styles.textDescription}>Sudah mempunyai akun, <Link href="/login"><a className={styles.linkText}>login</a></Link> disini</p>
                </Form>
            </div>
        </div>
    );
}

export default RegisterPage;