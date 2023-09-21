import React from "react";
import { Routes, Route } from "react-router-dom";


// pages
import HomePage from "../pages/homepage";
import RegisterPage from "../pages/registerpage";
import LoginPage from '../pages/loginpage';
import ProfilePage from "../pages/profile";
import EditProfilePage from "../pages/editProfile";
import EditPasswordPage from "../pages/editPassword";
import GameList from "../pages/gameList"
import Rps from "../pages/gameRPS"
import CoinFlipGame from "../pages/gameCoin"
import Dices from "../pages/gameDice"
import NotFound from "../pages/NotFound";

function Router() {
    return (
        <Routes>
            <Route path="/" Component={ HomePage } />
            <Route path="/home" Component={ HomePage } />
            <Route path="/register" Component={ RegisterPage } />
            <Route path="/login" Component={ LoginPage } />
            <Route path="/profile" Component={ ProfilePage } />
            <Route path="/editprofile" Component={ EditProfilePage } />
            <Route path="/editpassword" Component={ EditPasswordPage } />
            <Route path="/gamelist" Component={ GameList } />
            <Route path="/gamerps" Component={ Rps } />
            <Route path="/gamecoin" Component={ CoinFlipGame } />
            <Route path="/gamedice" Component={ Dices } />
            <Route path='*'Component={NotFound}/>
        </Routes>
    )
}

export default Router;