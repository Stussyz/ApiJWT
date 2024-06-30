import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import "./App.css";
import Register from './Auth/Register';
import Login from './Auth/Login';
import Dashboard from './pages/Dashboard';
import { AuthProvider, useAuth } from './contexts/AuthContext';

const App = () => {
    const { isAuthenticated } = useAuth();
    return (
        <Router>
            <Routes>
                {/* path "/" atau root, merujuk pada "/login". begitu pula sebaliknya */}
                <Route
                    path='/'
                    element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />}
                />
                <Route
                    path='/login'
                    element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />}
                />
                {/* register: apabila sudah register maka langsung di refer ke page dashboard  */}
                <Route
                    path='/register'
                    element={!isAuthenticated ? <Register /> : <Navigate to="/dashboard" />}
                />
                {/* dashboard: apabila user belum login dan ingin masuk dashboard, maka akan me-refer kembali ke page login  */}
                <Route
                    path='/dashboard'
                    element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
                />

            </Routes>
        </Router>
    );
};

const AppWrapper = () => (
    <AuthProvider>
        <App />
    </AuthProvider>
);

export default AppWrapper;
