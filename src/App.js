import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
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
import AddCoursePage from './components/Instructor/AddCoursePage';
import AddAssessmentPage from './components/Instructor/AddAssessmentPage';
import { UserProvider } from './context/UserContext';
import UpdateCoursePage from './components/Instructor/UpdateCoursePage';
import ProfilePage from './components/Instructor/ProfilePage';
import StudentProfile from './components/Student/StudentProfile';

import AssessmentList from './components/Student/AssessmentList'; // Import AssessmentList
import ViewScore from './components/Student/ViewScore'; // Import ViewScore

import InstructorQuestionnaire from './components/Instructor/InstructorQuestionnaire';
import ViewAssessments from './components/Instructor/ViewAssessments';
import ViewSubmissions from './components/Instructor/ViewSubmissions';
import Evaluate from './components/Instructor/Evaluate';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const handleLogin = (userData) => {
        console.log('User logged in:', userData); // Debugging log
        setIsLoggedIn(true);
        setUser(userData);
        navigate(userData.role === 'ROLE_STUDENT' ? '/student' : '/instructor');
    };

    const handleRegister = () => {
        navigate('/login');
    };

    const handleLogout = () => {
        console.log('User logged out'); // Debugging log
        setIsLoggedIn(false);
        setUser(null);
        navigate('/');
        window.location.reload(); // Refresh the page
    };

    return (
        <UserProvider>
            <div className="app">
                <Header onLogout={handleLogout} showAuthButtons={!isLoggedIn} />
                <Routes>

                    
                    <Route path="/student/course/assessments" element={isLoggedIn && user?.role === 'ROLE_STUDENT' ? <AssessmentList/>: <Navigate to="/login"/>} /> 
                    <Route path="/*" element={<PageNotFound/>} />
                    <Route
                        path="/"
                        element={
                            <>
                                <HeroSection />
                                <FeaturedCoursesSection />
                               < AboutUsSection/>
                                <Footer />
                            </>
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <AuthPage
                                showLogin={true}
                                showRegister={false}
                                onLoginSuccess={handleLogin}
                                onRegisterSuccess={handleRegister}
                            />
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            <AuthPage
                                showLogin={false}
                                showRegister={true}
                                onLoginSuccess={handleLogin}
                                onRegisterSuccess={handleRegister}
                            />
                        }
                    />
                    <Route
                        path="/student"
                        element={
                            isLoggedIn && user?.role === 'ROLE_STUDENT' ? (
                                <StudentPage user={user} />
                            ) : (
                                <Navigate to="/login"/>
                            )
                        }
                    />
                    <Route
                        path="/instructor"
                        element={
                            isLoggedIn && user?.role === 'ROLE_INSTRUCTOR' ? (
                                <InstructorPage user={user} />
                            ) : (
                                <Navigate to="/login"/>
                            )
                        }
                    />
                    <Route path="/courses" element={<CoursesPage />} />
                    <Route
                        path="/instructor/add-course"
                        element={
                            isLoggedIn && user?.role === 'ROLE_INSTRUCTOR' ? (
                                <AddCoursePage user={user} />
                            ) : (
                                <Navigate to="/login"/>
                            )
                        }
                    />
                    <Route
                        path="/instructor/add-assessment"
                        element={
                            isLoggedIn && user?.role === 'ROLE_INSTRUCTOR' ? (
                                <AddAssessmentPage />
                            ) : (
                                <Navigate to="/login"/>
                            )
                        }
                    />
                    <Route
                        path="/instructor/updateCourse"
                        element={
                            isLoggedIn && user?.role === 'ROLE_INSTRUCTOR' ? (
                                <UpdateCoursePage />
                            ) : (
                                <Navigate to="/login"/>
                            )
                        }
                    />
                    <Route
                        path="/instructor/profile"
                        element={
                            isLoggedIn && user?.role === 'ROLE_INSTRUCTOR' ? (
                                <ProfilePage />
                            ) : (
                                <Navigate to="/login"/>
                            )
                        }
                    />
                    <Route
                        path="/student/profile"
                        element={
                            isLoggedIn && user?.role === 'ROLE_STUDENT' ? (
                                <StudentProfile />
                            ) : (
                                <Navigate to="/login"/>
                            )
                        }
                    />
                    <Route
                        path="/instructor/questionnaire"
                        element={<InstructorQuestionnaire />}
                    />
                    <Route path="/instructor/view-assessments" element={<ViewAssessments />} />
                    <Route path="/instructor/view-submissions/:assessmentId" element={<ViewSubmissions />} />
                    <Route path="/evaluate/:submissionId" element={<Evaluate />} />
                    <Route path="/view-score/:submissionId" element={<ViewScore />} />
                    <Route
                        path="/about"
                        element={<AboutUsSection />}
                    />
                </Routes>
            </div>
        </UserProvider>
    );
}

function PageNotFound(){
    return (
        <div>
            <h1>Page Not Found</h1>
        </div>
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
