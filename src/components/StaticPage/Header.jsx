import React from 'react';
import { Link } from 'react-router-dom';

function Header({ onLogout, showAuthButtons = true }) {
    const handleLogoutClick = () => {
        if (onLogout) {
            onLogout();
        }
    };

    return (
        <header>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li> {/* Use Link for navigation */}
                    <li><Link to="/courses">Courses</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/my-courses">My Courses</Link></li>
                </ul>
                {showAuthButtons ? (
                    <div>
                        <Link to="/login"><button>Log in</button></Link>
                        <Link to="/register"><button>Sign up</button></Link>
                    </div>
                ) : (
                    <button onClick={handleLogoutClick}>Logout</button>
                )}
            </nav>
        </header>
    );
}

export default Header;
