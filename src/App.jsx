import { Routes, Route, Navigate } from "react-router";
import Layout from "./layouts/Layout";
import UserLayout from "./layouts/UserLayout";
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

const App = () => {
  useTheme();
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="admin-list" element={<AdminList />} />
        <Route path="admin-create" element={<AdminCreate />} />
        <Route path="group-management" element={<GroupManagement />} />
        <Route path="card-management" element={<CardManagement />} />
        <Route path="company-information" element={<CompanyInformation />} />

        <Route path="user/:id" element={<UserLayout />}>
          <Route index element={<Navigate to="profile" replace />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="statistics" element={<UserStatistics />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
