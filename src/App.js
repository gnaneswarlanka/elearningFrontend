import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import FeaturedCoursesSection from './components/FeaturedCoursesSection';
import AboutUsSection from './components/AboutUsSection';
import AuthPage from './components/AuthPage';
import StudentPage from './components/StudentPage';
import InstructorPage from './components/InstructorPage';
import './App.css';
import Footer from './components/Footer';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const [routeRendered, setRouteRendered] = useState(false);

    const handleLogin = (userData) => {
        setIsLoggedIn(true);
        setUser(userData);
        navigate(userData.role === 'ROLE_STUDENT' ? '/student' : '/instructor');
    };

    const handleRegister = () => {
        navigate('/login');
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUser(null);
        navigate('/');
    };
    useEffect(() => {
        console.log("App - Route Rendered:", routeRendered);
    }, [routeRendered]);

    
    return (
        <div className="app">
            <Header onLogout={handleLogout} showAuthButtons={!isLoggedIn} />
            <Routes>
                <Route path="/" element={!isLoggedIn ? (
                    <>
                        <HeroSection />
                        <FeaturedCoursesSection />
                        <AboutUsSection />
                        <Footer/>
                    </>
                ) : (
                    <></>
                )} />
                <Route path="/login" element={<AuthPage showLogin={true} showRegister={false} onLoginSuccess={handleLogin} onRegisterSuccess={handleRegister} />} />
                <Route path="/register" element={<AuthPage showLogin={false} showRegister={true} onLoginSuccess={handleLogin} onRegisterSuccess={handleRegister} />} />
                <Route path="/student" element={isLoggedIn && user?.role === 'ROLE_STUDENT' ? <StudentPage user={user} /> : <div>Unauthorized</div>} />
                <Route path="/instructor" element={isLoggedIn && user?.role === 'ROLE_INSTRUCTOR' ? <InstructorPage user={user} /> : <div>Unauthorized</div>} />
            </Routes>
        </div>
    );
}

function RootApp() {
    return (
      <Router>
        <App />
      </Router>
    )
}

export default RootApp;
