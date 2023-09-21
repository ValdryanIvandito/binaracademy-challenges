import React, { useState } from 'react';
import Axios from 'axios';
import { Form, FormGroup, Label, Input, Button, Card, Alert } from 'reactstrap';
import '../../styles/RegisterPage.css';
import avatar from '../../assets/images/avatar.jpg';

const RegisterPage = () => {
    const [hideAlert, setHideAlert] = useState(true);
    const [alertMessage, setAlertMessage] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);

    const [payload, setPayLoad] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        scores: 0
    })

    function handleChange(value) {
        setPayLoad({ ...payload, ...value })
    }
    
    const registerApi = async (event) => {
        event.preventDefault();
        try { 
            const formData = new FormData();
            formData.append("profilepic", selectedImage);
            formData.append("username", payload.username);
            formData.append("email", payload.email);
            formData.append("password", payload.password);
            formData.append("confirmPassword", payload.confirmPassword);
            formData.append("scores", payload.scores);

            await Axios.post("http://localhost:3005/usergame/upload-profile-pic", formData);
            await Axios.post("http://localhost:3005/usergame/insert", payload);

            window.location.replace('/login');
            
        } catch (error) {
            setAlertMessage(error.response.data.message);
            setHideAlert(false);     
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h1 className="registerPageTitle">Register Page</h1>
                    <Alert color="danger" hidden={hideAlert}>
                        {alertMessage}
                    </Alert>
                    <Card className='m-3 p-3' outline color="secondary">
                        <Form>
                            <FormGroup>
                                <Label for="profilepic">Profile Picture</Label>
                                <p>File Format Must be .png !</p>
                                <Input
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
                                    className="avatar"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="username">Username</Label>
                                <Input
                                    type="text"
                                    name="username"
                                    id="username"
                                    placeholder="Enter your username"
                                    value={payload.username}
                                    onChange={function(event) {
                                        handleChange({ username: event.target.value })
                                    }}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Enter your email"
                                    value={payload.email}
                                    onChange={function(event) {
                                        handleChange({ email: event.target.value })
                                    }}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="password">Password</Label>
                                <Input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Enter your password"
                                    value={payload.password}
                                    onChange={function(event) {
                                        handleChange({ password: event.target.value })
                                    }}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="confirmPassword">Confirm Password</Label>
                                <Input
                                    type="password"
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    placeholder="Confirm your password"
                                    value={payload.confirmPassword}
                                    onChange={function(event) {
                                        handleChange({ confirmPassword: event.target.value })
                                    }}
                                />
                            </FormGroup>
                            <br></br>
                            <Button 
                                color="primary" 
                                // type="submit" 
                                block
                                onClick={registerApi}
                            >
                                Register
                            </Button>
                            <p>Sudah mempunyai akun, <a href="/login">login</a> disini</p>
                        </Form>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;