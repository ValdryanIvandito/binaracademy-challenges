const CryptoJS = require('crypto-js');
const JWT = require('jsonwebtoken');
const { userModel } = require('../models/user-model');
const { adminModel } = require('../models/admin-model');
const { rockP1, paperP1, scissorsP1 } = require('../lib/game');

class MainController {
    static async getLandingPage(req, res) {
        res.render('index', { title: 'Landing Page' });
    };

    static async getSignUpPage(req, res) {
        let errors = [];
        res.render('sign-up', { title: 'Sign-Up Page', errors });
    };

    static async getLoginPage(req, res) {
        let errors = [];
        res.render('login', { title: 'Login Page', errors });
    };

    static async getProfilePage(req, res) {
        const token = req.cookies.token;
        const errors = [];
        if(token) {
            try {
                const tokenValue = JWT.verify(token, process.env.JWT_SECRET);
                const username = tokenValue.username;
                const sex = tokenValue.sex;
                
                const userData = await userModel.getDataUserGame(username);
                const scores = userData.scores;

                res.render('profile', { title: 'Profile Page', username, sex, scores });
            } catch(error) {
                const msg = "not authorized or season expired!";
                errors.push(msg);
                res.render('login', { title: 'Login Page', errors });
            }
        } else {
            const msg = "not authorized or season expired!";
            errors.push(msg);
            res.render('login', { title: 'Login Page', errors });
        }
    }

    static async getAdminDashboardPage(req, res) {
        let errors = [];
        const token = req.cookies.token;
      
        if(token) {
            try {
                const tokenValue = JWT.verify(token, process.env.JWT_SECRET);
                console.log('tokenValue: ',tokenValue);
                let users = await userModel.getAllDataUserGame();
                res.render('admin-dashboard', { title: 'Admin Dashboard', users, errors });
            } catch(error) {
                const msg = "not authorized or season expired!";
                errors.push(msg);
                res.render('login', { title: 'Login Page', errors });
            }
        } else {
            const msg = "not authorized or season expired!";
            errors.push(msg);
            res.render('login', { title: 'Login Page', errors });
        }
    }

    static async getRankPage(req, res) {
        const leaderboard = await userModel.getRankUserGame();
        res.render('rank', { title: 'Rank Page', leaderboard });
    };

    static async getMultiplayerGame(req, res) {
        res.render('multiplayer-game', { title: 'Multiplayer Game Page' });
    };

    static async postSignUpPage(req, res) {
        res.redirect('sign-up'); 
    };

    static async postLoginPage(req, res) {
        res.redirect('login');
    };

    static async postProfilePage(req, res) {
        try {
            
            let errors = [];
            const data = req.body;
            const inputUsername = data.username;
            const inputPassword = data.password;

            if(inputUsername === 'admin' || inputUsername === 'Admin' || inputUsername === 'ADMIN') {
                // get admin data
                let adminData = await adminModel.getDataAdminGame(inputUsername);
                const id = adminData.id;
                const username = adminData.username;
                const actualPassword = adminData.password;
                const inputPasswordCheck = CryptoJS.HmacSHA256(inputPassword, process.env.SECRET_LOGIN).toString();
                
                if(actualPassword !== inputPasswordCheck) {
                    const msg = "invalid password";
                    errors.push(msg);
                    return res.render('login', { title: 'Login Page', errors });
                } else {
                    // create a token for user authorization
                    const token = JWT.sign({ id, username }, process.env.JWT_SECRET, { expiresIn: '1d' });
                    res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 24 });
                    res.redirect('admin-dashboard');
                }
            } else {
                // get user data
                let userData = await userModel.getDataUserGame(inputUsername);
                const id = userData.id;
                const username = userData.username;
                const sex = userData.sex;
                const hobby = userData.hobby;
                const scores = userData.scores;

                console.log(`userdata ${userData.id}`);

                // validation
                if(userData !== null) {
                    const actualPassword = userData.password;
                    const inputPasswordCheck = CryptoJS.HmacSHA256(inputPassword, process.env.SECRET_LOGIN).toString();
                    
                    if(actualPassword !== inputPasswordCheck) {
                        const msg = "invalid password";
                        errors.push(msg);
                        return res.render('login', { title: 'Login Page', errors });
                    } else {
                        // create a token for user authorization
                        const token = JWT.sign({ id, username, sex, hobby, scores }, process.env.JWT_SECRET, { expiresIn: '1d' });
                        res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 24 });
                        res.redirect('profile');
                    }
                } 
            }

        } catch(error) {
            const errors = [];
            const msg = "database error cannot find data or username doesn't exist!";
            errors.push(msg);
            return res.render('login', { title: 'Login Page', errors });
        }
    }

    static async postRegisterProfile(req, res) {
        try {
            
            let errors = [];
            let scores = 0;
            let data = req.body;
            let username = data.username;
            let sex = data.sex;
            let hobby = data.hobby;
            let password = data.password;
            let confirmPassword = data.confirmPassword;

            // get user data
            let userData = await userModel.getDataUserGame(data.username);

            // username validation
            if(userData !== null || username === 'admin' || username === 'Admin' || username === 'ADMIN') {
                const msg = 'username already exist!';
                errors.push(msg);
            }

            // password validation
            if(password !== confirmPassword) {
                const msg = 'password and confim-password is not same!';
                errors.push(msg);
            }

            // redirect sign-up page
            if(errors.length > 0) {
                return res.render('sign-up', { title: 'Sign-Up Page', errors });
            }

            // encrypt password
            const encryptedPassword = CryptoJS.HmacSHA256(password, process.env.SECRET_LOGIN).toString();

            // insert new account data
            await userModel.insertDataUserGame(username, encryptedPassword, sex, hobby, scores);

            // get user data
            userData = await userModel.getDataUserGame(data.username);
            const id = userData.id;
            username = userData.username;
            sex = userData.sex;
            hobby = userData.hobby;
            scores = userData.scores;

            // create a token for user authorization
            const token = JWT.sign({ id, username, sex, hobby, scores }, process.env.JWT_SECRET, { expiresIn: '1d' });
            res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 24 });
            res.redirect('profile');

        } catch(error) {
            console.log(error);
            res.render('error', { error, message: 'Database Error' });
        }
    }

    static async postLogout(req, res) {
        res.clearCookie('token');
        res.redirect('login');
    }

    static async postChangePasswordPage(req, res) {
        let errors = [];
        const username = req.body.username;
        const token = req.cookies.token;
      
        if(token) {
            try {
                const tokenValue = JWT.verify(token, process.env.JWT_SECRET);
                console.log('tokenValue: ',tokenValue);
                res.render('change-password', { title: 'Change-Password Page', username, errors });
            } catch(error) {
                const msg = "not authorized or season expired!";
                errors.push(msg);
                res.render('login', { title: 'Login Page', errors });
            }
        } else {
            const msg = "not authorized or season expired!";
            errors.push(msg);
            res.render('login', { title: 'Login Page', errors });
        } 
    }

    static async putProfile(req, res) {
        const errors = [];
        const username = req.body.username;
        const userData = await userModel.getDataUserGame(username);
        const currentPassword = userData.password;
        const inputCurrentPassword = CryptoJS.HmacSHA256(req.body.currentPassword, process.env.SECRET_LOGIN).toString();
        const newPassword = CryptoJS.HmacSHA256(req.body.newPassword, process.env.SECRET_LOGIN).toString();

        if(inputCurrentPassword === currentPassword) {
            if(inputCurrentPassword !== newPassword) {
                await userModel.updatePasswordUserGame(username, newPassword);
                res.redirect('admin-dashboard');
            } else {
                const msg = "current-password and new-password cannot be the same!";
                errors.push(msg);
                res.render('change-password', { title: 'Change-Password Page', username, errors })
            }
        } else {
            const msg = 'invalid current-password!';
            errors.push(msg);
            res.render('change-password', { title: 'Change-Password Page', username, errors })
        }
    }

    static async deleteProfile(req, res) {
        const username = req.body.username;
        await userModel.deleteDataUserGame(username);
        res.redirect('admin-dashboard');
    }

    static async postGamePage(req, res) {
        const username = req.body.username;
        const userData = await userModel.getDataUserGame(username);
        let newScores = userData.scores;
        let result = null;
        let playerCom = null;
        let playerOne = null;

        res.render('game', { title: 'game-vscom', username, newScores, result, playerCom, playerOne });
    }

    static async submitRockVSCom(req, res) {
        const username = req.body.username;
        const value = rockP1();
        const playerOne = value.valueOne;
        const playerCom = value.valueCom;
        const result = value.result;
        const addScores = value.scores;

        const userData = await userModel.getDataUserGame(username);
        const currentScores = userData.scores;
        const newScores = currentScores + addScores;

        await userModel.updateScoresUserGame(username, newScores);
        
        res.render('game', { title: 'game-vscom', username, newScores, result, playerCom, playerOne });
    }
    
    static async submitPaperVSCom(req, res) {
        const username = req.body.username;
        const value = paperP1();
        const playerOne = value.valueOne;
        const playerCom = value.valueCom;
        const result = value.result;
        const addScores = value.scores;

        const userData = await userModel.getDataUserGame(username);
        const currentScores = userData.scores;
        const newScores = currentScores + addScores;

        await userModel.updateScoresUserGame(username, newScores);
        
        res.render('game', { title: 'game-vscom', username, newScores, result, playerCom, playerOne });
    }
    
    static async submitScissorsVSCom(req, res) {
        const username = req.body.username;
        const value = scissorsP1();
        const playerOne = value.valueOne;
        const playerCom = value.valueCom;
        const result = value.result;
        const addScores = value.scores;

        const userData = await userModel.getDataUserGame(username);
        const currentScores = userData.scores;
        const newScores = currentScores + addScores;

        await userModel.updateScoresUserGame(username, newScores);
        
        res.render('game', { title: 'game-vscom', username, newScores, result, playerCom, playerOne });
    }
};

module.exports = { MainController };