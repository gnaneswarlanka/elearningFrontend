import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/StaticPage/Header';
import HeroSection from './components/HomePage/HeroSection';
import FeaturedCoursesSection from './components/HomePage/FeaturedCoursesSection';
import AboutUsSection from './components/HomePage/AboutUsSection';
import AuthPage from './components/Authentication/AuthPage';
import StudentPage from './components/Student/StudentPage';
import InstructorPage from './components/Instructor/InstructorPage';
import './App.css';
import Footer from './components/StaticPage/Footer';
import CoursesPage from './components/CoursesPage';
import AddCoursePage from './components/Instructor/AddCoursePage'; // Import the Add Course component
import AddAssessmentPage from './components/Instructor/AddAssessmentPage'; // Import AddAssessmentPage
import { UserProvider } from './context/UserContext'; // Corrected import path
import UpdateCoursePage from './components/Instructor/UpdateCoursePage'; // Import UpdateCoursePage
import ProfilePage from './components/Instructor/ProfilePage'; // Import ProfilePage
import StudentProfile from './components/Student/StudentProfile';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

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

    return (
        <UserProvider> {/* Wrap the app with UserProvider */}
            <div className="app">
                <Header onLogout={handleLogout} showAuthButtons={!isLoggedIn} />
                <Routes>
                    <Route path="/" element={!isLoggedIn ? (
                        <>
                            <HeroSection />
                            <FeaturedCoursesSection />
                            <AboutUsSection />
                            <Footer />
                        </>
                    ) : (
                        <></>
                    )} />
                    <Route path="/login" element={<AuthPage showLogin={true} showRegister={false} onLoginSuccess={handleLogin} onRegisterSuccess={handleRegister} />} />
                    <Route path="/register" element={<AuthPage showLogin={false} showRegister={true} onLoginSuccess={handleLogin} onRegisterSuccess={handleRegister} />} />
                    <Route path="/student" element={isLoggedIn && user?.role === 'ROLE_STUDENT' ? <StudentPage user={user} /> : <div>Unauthorized</div>} />
                    <Route path="/instructor" element={isLoggedIn && user?.role === 'ROLE_INSTRUCTOR' ? <InstructorPage user={user} /> : <div>Unauthorized</div>} />
                    <Route path="/courses" element={<CoursesPage />} />
                    <Route path="/instructor/add-course" element={isLoggedIn && user?.role === 'ROLE_INSTRUCTOR' ? <AddCoursePage user={user} /> : <div>Unauthorized</div>} /> {/* Add this route */}
                    <Route path="/instructor/add-assessment" element={isLoggedIn && user?.role === 'ROLE_INSTRUCTOR' ? <AddAssessmentPage /> : <div>Unauthorized</div>} /> {/* Add this route */}
                    <Route path="/instructor/updateCourse" element={isLoggedIn && user?.role === 'ROLE_INSTRUCTOR' ? <UpdateCoursePage /> : <div>Unauthorized</div>} /> {/* Add this route */}
                    <Route path="/instructor/profile" element={isLoggedIn && user?.role === 'ROLE_INSTRUCTOR' ? <ProfilePage /> : <div>Unauthorized</div>} /> {/* Add this route */}
                    <Route path="/student/profile" element={isLoggedIn && user?.role === 'ROLE_STUDENT' ? <StudentProfile /> : <div>Unauthorized</div>} />
                </Routes>
            </div>
        </UserProvider>
    );
}

function RootApp() {
    return (
        <Router>
            <App />
        </Router>
    );
}

export default RootApp;
