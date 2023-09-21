import React from "react";
import { Routes, Route } from "react-router-dom";

// pages
import HomePage from "../pages/homepage";
import RegisterPage from "../pages/registerpage";
import EditPage from "../pages/editpage";
import PlayerListPage from "../pages/playerlistpage";

function Router() {
    return (
        <Routes>
            <Route path="/" Component={ HomePage } />
            <Route path="/register" Component={ RegisterPage } />
            <Route path="/edit" Component={ EditPage } />
            <Route path="/list" Component={ PlayerListPage } />
        </Routes>
    )
}

export default Router;