import { Routes, Route, Navigate } from "react-router";
import Layout from "./layouts/Layout";
import AuthLayout from "./layouts/AuthLayout";
import UserDetailLayout from "./layouts/UserLayout";
import UserLayout from "./layouts/User";
import Home from "./pages/Home";
import useTheme from "./hooks/useTheme";
//pages
import AdminList from "./pages/AdminManagement/List";
import AdminCreate from "./pages/AdminManagement/Create";
//User
import UserProfile from "./pages/UserDetail/UserProfile";
import UserStatistics from "./pages/UserDetail/UserStatistics";
import GroupManagement from "./pages/GroupManagement";
import CardManagement from "./pages/CardManagement";
import CompanyInformation from "./pages/CompanyManagement/CompanyInformation";
//user
import ProfilePage from "./pages/User/Profile";
import SocialMediaPage from "./pages/User/SocialMedia";
import CompanyPage from "./pages/User/Company";
import CatalogPage from "./pages/User/Catalog";
import Login from "./pages/Auth/Login";

import RequireAuth from "./layouts/routes/RequireAuth";
import RequireGuest from "./layouts/routes/RequireGuest";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUserInfo } from "./redux/slices/userSlice";

const App = () => {
  useTheme();

  const dispatch = useDispatch();

  useEffect(() => {
    const findIsLogin = localStorage.getItem("isLogin");
    console.log('findIsLogin', findIsLogin)
    if(findIsLogin){
      dispatch(getUserInfo());
    }
  },[dispatch]);


  return (
    <Routes>
      <Route element={<RequireAuth />}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="admin-list" element={<AdminList />} />
          <Route path="admin-create" element={<AdminCreate />} />
          <Route path="group-management" element={<GroupManagement />} />
          <Route path="card-management" element={<CardManagement />} />
          <Route path="company-information" element={<CompanyInformation />} />

          <Route path="user/:id" element={<UserDetailLayout />}>
            <Route index element={<Navigate to="profile" replace />} />
            <Route path="profile" element={<UserProfile />} />
            <Route path="statistics" element={<UserStatistics />} />
          </Route>

          <Route path="user-update/:id" element={<UserLayout />}>
            <Route index element={<Navigate to="profile" replace />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="social-media" element={<SocialMediaPage />} />
            <Route path="company" element={<CompanyPage />} />
            <Route path="catalog" element={<CatalogPage />} />
          </Route>
        </Route>
      </Route>
      <Route element={<RequireGuest />}>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
