import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext'; // Import useUserContext
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap-icons/font/bootstrap-icons.css'; // Import Bootstrap Icons CSS

function Header({ onLogout, showAuthButtons = true }) {
    const { userRole } = useUserContext(); // Get userRole from context
    const [showDropdown, setShowDropdown] = useState(false); // State for dropdown visibility

    const handleLogoutClick = () => {
        if (onLogout) {
            onLogout();
        }
    };

    const getMyCoursesPath = () => {
        if(userRole === 'ROLE_INSTRUCTOR') {
            return '/instructor'}
            else if(userRole==='ROLE_STUDENT'){
                return '/student'
            }
            else{
                return '/login'
            }
    };

    const toggleDropdown = () => {
        setShowDropdown((prevState) => !prevState); // Toggle dropdown state
    };

    const closeDropdown = () => {
        setShowDropdown(false); // Close dropdown
    };

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (!event.target.closest('.menu-button') && !event.target.closest('.dropdown-menu')) {
                closeDropdown(); // Close dropdown if clicked outside
            }
        };

        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    return (
        <header className="bg-light p-3">
            <nav className="navbar navbar-expand-lg navbar-light">
                <div className="container-fluid">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        
                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                <i className="bi bi-house-door-fill"></i> Home
                            </Link>
                        </li>
                        <li className="nav-item"><Link className="nav-link" to="/courses">Courses</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
                        <li className="nav-item"><Link className="nav-link" to={getMyCoursesPath()}>My Courses</Link></li>
                    </ul>
                    <div className="d-flex align-items-center">
                        <button onClick={toggleDropdown} className="btn btn-outline-secondary me-2 menu-button">☰</button>
                        {showDropdown && (
                            <div className="dropdown-menu show">
                                <Link className="dropdown-item" to={userRole === 'ROLE_INSTRUCTOR' ? '/instructor/profile' : '/student/profile'}>
                                    My Profile
                                </Link>
                                {userRole === 'ROLE_STUDENT' && ( // Show only for students
                                    <Link className="dropdown-item" to="/progress">My Progress</Link>
                                )}
                            </div>
                        )}
                        {showAuthButtons ? (
                            <div>
                                <Link to="/login"><button className="btn btn-primary me-2">Log in</button></Link>
                                <Link to="/register"><button className="btn btn-success">Sign up</button></Link>
                            </div>
                        ) : (
                            <button onClick={handleLogoutClick} className="btn btn-danger">Logout</button>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;
