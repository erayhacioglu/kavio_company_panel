import { Routes, Route, Navigate } from "react-router";
import { Suspense, lazy } from "react";

import PageLoader from "../components/PageLoader";

import ProtectedRoute from "./guards/ProtectedRoute";
import GuestRoute from "./guards/GuestRoute";
import RoleRoute from "./guards/RoleRoute";

import Layout from "../layouts/Layout";
import AuthLayout from "../layouts/AuthLayout";

const Home = lazy(() => import("../pages/Home"));
const AdminList = lazy(() => import("../pages/AdminManagement/List"));
const AdminCreate = lazy(() => import("../pages/AdminManagement/Create"));
const GroupManagement = lazy(() => import("../pages/GroupManagement"));
const CardManagement = lazy(() => import("../pages/CardManagement"));
const CompanyInformation = lazy(() =>
  import("../pages/CompanyManagement/CompanyInformation")
);
const Analize = lazy(() =>
  import("../pages/Analize")
);

const UserDetailLayout = lazy(() => import("../layouts/UserLayout"));
const UserLayout = lazy(() => import("../layouts/User"));
const SettingsLayout = lazy(() => import("../layouts/SettingsLayout"));

const UserProfile = lazy(() => import("../pages/UserDetail/UserProfile"));
const UserStatistics = lazy(() => import("../pages/UserDetail/UserStatistics"));
const UserActivity = lazy(() => import("../pages/UserDetail/UserActivity"));

const ProfilePage = lazy(() => import("../pages/User/Profile"));
const SocialMediaPage = lazy(() => import("../pages/User/SocialMedia"));
const CompanyPage = lazy(() => import("../pages/User/Company"));
const CatalogPage = lazy(() => import("../pages/User/Catalog"));

const PermissionsPage = lazy(() => import("../pages/Settings/Permissions"))

const Login = lazy(() => import("../pages/Auth/Login"));
const NotFound = lazy(() => import("../pages/ErrorPages/NotFound"));
const Forbidden = lazy(() => import("../pages/ErrorPages/Forbidden"));

export default function AppRouter() {
  return (
    <Suspense fallback={<PageLoader letters="KAVİO" loadingText="Yükleniyor..." speed={100} step={10} />}>
      <Routes>
        {/* GUEST */}
        <Route element={<GuestRoute />}>
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
          </Route>
        </Route>

        {/* PROTECTED */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />

            {/* Genel protected sayfalar */}
            <Route path="group-management" element={<GroupManagement />} />
            <Route path="card-management" element={<CardManagement />} />
            <Route path="admin-list" element={<AdminList />} />
            <Route path="admin-create" element={<AdminCreate />} />
            <Route
              path="company-information"
              element={<CompanyInformation />}
            />
            <Route
              path="analize"
              element={<Analize />}
            />

            {/* User detail */}
            <Route path="user/:id" element={<UserDetailLayout />}>
              <Route index element={<Navigate to="profile" replace />} />
              <Route path="profile" element={<UserProfile />} />
              <Route path="statistics" element={<UserStatistics />} />
              <Route path="activity" element={<UserActivity />} />
            </Route>

            {/* Settings */}
            <Route path="settings" element={<SettingsLayout />}>
              <Route index element={<Navigate to="permissions" replace />} />
              <Route path="permissions" element={<PermissionsPage />} />
            </Route>

            {/* User update */}
            <Route path="user-update/:id" element={<UserLayout />}>
              <Route index element={<Navigate to="profile" replace />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="social-media" element={<SocialMediaPage />} />
              <Route path="company" element={<CompanyPage />} />
              <Route path="catalog" element={<CatalogPage />} />
            </Route>

            <Route path="forbidden" element={<Forbidden />} />
          </Route>
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
