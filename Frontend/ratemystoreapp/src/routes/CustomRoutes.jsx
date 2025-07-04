import React from "react";
import { Routes, Route } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";

import Home from "../pages/Home";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import StoreList from "../pages/user/StoreList";
import MyRatings from "../pages/user/MyRatings";
import StoreOwnerDashboard from "../pages/storeowner/StoreOwnerDashboard";
import StoreRatings from "../pages/storeowner/StoreRatings";

function CustomeRoutes() {

    return (
        <Routes>
           <Route path="/" element={<AppLayout />}>
                <Route index element={<Home />} />
                <Route path="/register" element = {<RegisterPage/>}/>
                <Route path="/login" element = {<LoginPage/>}/>

                {/* Normal User */}
                
                <Route path="user/stores" element={<StoreList />} />
                <Route path="user/ratings" element={<MyRatings />} />
                

                {/* Store Owner */}
                
                <Route path="store/dashboard" element={<StoreOwnerDashboard />} />
                <Route path="store/ratings" element={<StoreRatings />} />
        
                {/* Admin */}
                {/* <Route path="admin/dashboard" element={<AdminDashboard />} />
                <Route path="admin/users" element={<UserList />} />
                <Route path="admin/stores" element={<StoreList />} /> */}
            </Route>


        </Routes>
    );
}

export default CustomeRoutes;
