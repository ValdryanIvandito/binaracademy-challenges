import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button, Card } from 'reactstrap';
import '../../styles/EditPage.css';

const EditPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleEdit = (e) => {
        e.preventDefault();
        // Logic Register Process
    };

    return (
        <div class="container">
            <div class="row">
                <div class="col-md-6 offset-md-3">
                    <h1 class="editPageTitle">Edit Page</h1>
                    <Card className='m-3 p-3' outline color="secondary">
                        <Form onSubmit={handleEdit}>
                            <FormGroup>
                                <Label for="username">Username</Label>
                                <Input
                                    type="text"
                                    name="username"
                                    id="username"
                                    placeholder="Enter your username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="currentPassword">Current Password</Label>
                                <Input
                                    type="password"
                                    name="currentPassword"
                                    id="currentPassword"
                                    placeholder="Enter your current password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="newPassword">New Password</Label>
                                <Input
                                    type="password"
                                    name="newPassword"
                                    id="newPassword"
                                    placeholder="Confirm your new password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </FormGroup>
                            <br></br>
                            <Button color="primary" type="submit" block>Change Profile</Button>
                        </Form>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default EditPage;