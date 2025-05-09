import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useSession = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            try {
                const parsedUser = JSON.parse(savedUser);
                setIsLoggedIn(true);
                setUser(parsedUser);
                navigate(parsedUser.role === 'ROLE_STUDENT' ? '/student' : '/instructor');
            } catch (error) {
                console.error("Error parsing user data from localStorage:", error);
                localStorage.removeItem('user');
                navigate('/');
            }
        }
    }, [navigate]);

    useEffect(() => {
        if (isLoggedIn && user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [isLoggedIn, user, navigate]); // Added navigate as a dependency

    return { isLoggedIn, user, setIsLoggedIn, setUser };
};

export default useSession;
