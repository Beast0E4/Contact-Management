import { Navigate, Route, Routes } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import ContactFormPage from "../pages/ContactFormPage"; // Import the new page

function MainRoutes() {
    return (
        <Routes>
            {/* --- Public Routes --- */}
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

            {/* --- Protected Routes --- */}
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />

            {/* Route for creating a new contact */}
            <Route
                path="/contacts/new"
                element={
                    <ProtectedRoute>
                        <ContactFormPage />
                    </ProtectedRoute>
                }
            />

            {/* Route for editing an existing contact */}
            <Route
                path="/contacts/edit/:id"
                element={
                    <ProtectedRoute>
                        <ContactFormPage />
                    </ProtectedRoute>
                }
            />

            {/* --- Redirects --- */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
    );
}

export default MainRoutes;