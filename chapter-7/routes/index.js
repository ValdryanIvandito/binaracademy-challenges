const methodOverride = require('method-override');
var express = require('express');
var router = express.Router();

const { MainController } = require('../controllers/main-controller');

router.use(express.static('public'));

// setup method override
router.use(methodOverride('_method'));

/* GET Landing Page. */
router.get('/', MainController.getLandingPage);

/* GET Sign-Up Page. */
router.get('/sign-up', MainController.getSignUpPage);

/* GET Login Page. */
router.get('/login', MainController.getLoginPage);

/* GET Profile Page. */
router.get('/profile', MainController.getProfilePage);

/* GET Admin-Dashboard Page. */
router.get('/admin-dashboard', MainController.getAdminDashboardPage);

/* GET Rank Page */
router.get('/rank', MainController.getRankPage);

/* GET Multiplayer Game Page */
router.get('/game-vsplayer', MainController.getMultiplayerGame);

/* POST Sign-Up Page. */
router.post('/sign-up', MainController.postSignUpPage);

/* POST Login Page. */
router.post('/login', MainController.postLoginPage);

/* POST Profile Page. */
router.post('/profile', MainController.postProfilePage);

router.post('/profile-register', MainController.postRegisterProfile);

router.post('/logout', MainController.postLogout);

/* POST Change-Password Page */
router.post('/change-password', MainController.postChangePasswordPage);

// put
router.put('/profile-edit', MainController.putProfile);

// delete
router.delete('/profile-delete', MainController.deleteProfile);


router.post('/game-vscom', MainController.postGamePage);

router.post('/submit-rock', MainController.submitRockVSCom);

router.post('/submit-paper', MainController.submitPaperVSCom);

router.post('/submit-scissors', MainController.submitScissorsVSCom);

module.exports = router;