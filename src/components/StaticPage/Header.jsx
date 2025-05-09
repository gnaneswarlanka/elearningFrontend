import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header({ onLogout, showAuthButtons = true }) {
    const navigate = useNavigate();

    const handleLoginClick = (e) => {
      alert('handle login')
        e.preventDefault(); // Prevent default link behavior, though Link should handle this.
        navigate('/login');
    };

    const handleRegisterClick = (e) => {
        e.preventDefault();  // Prevent default link behavior, though Link should handle this.
        navigate('/register');
    };

    const handleLogoutClick = () => {
        if (onLogout) {
            onLogout();
            navigate('/'); // Navigate to home page after logout
        }
    };

    return (
        <header>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/courses">Courses</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/my-courses">My Courses</Link></li>
                </ul>
                {showAuthButtons ? (
                    <div>
                        <button onClick={handleLoginClick}>Log in</button>
                        <button onClick={handleRegisterClick}>Sign up</button>
                    </div>
                ) : (
                    <button onClick={handleLogoutClick}>Logout</button>
                )}
            </nav>
        </header>
    );
}

export default Header;
