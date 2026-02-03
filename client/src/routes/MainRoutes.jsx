import { Navigate, Route, Routes } from "react-router-dom"
import PublicRoute from "./PublicRoute"
import ProtectedRoute from "./ProtectedRoute"
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";

function MainRoutes () {
    return (
        <Routes>
            <Route
                path="/login"
                element={
                <PublicRoute>
                    <Login />
                </PublicRoute>
                }
            />

            <Route
                path="/register"
                element={
                <PublicRoute>
                    <Register />
                </PublicRoute>
                }
            />

            <Route
                path="/dashboard"
                element={
                <ProtectedRoute>
                    <Dashboard />
                </ProtectedRoute>
                }
            />

            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
    )
}

export default MainRoutes;