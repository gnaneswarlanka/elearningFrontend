import React, { useState } from 'react';
import axios from 'axios'; // Import axios
import './AuthPage.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useUserContext } from '../../context/UserContext'; // Corrected import path
 
const API_BASE_URL = 'http://localhost:20001/authenticationservice/api/auth'; // Update this if the backend runs on a different port
 
// Reusable Input Component
const InputField = ({ label, type, name, value, onChange,required }) => {
    return (
        <div className="input-group">
            <label htmlFor={name}>{label}</label>
            <input
                type={type}
                id={name}
                name={name}
                value={value}
                required={required}
                onChange={onChange}
                placeholder={`Enter your ${label.toLowerCase()}`}
            />
        </div>
    );
};


 
// Login Form Component
const LoginForm = ({ onLogin }) => {
    const { setUserRole } = useUserContext(); // Access the context
    const { setUserName } = useUserContext(); // Access the context
    const { setUserId } = useUserContext();
    const { setAuthToken } = useUserContext(); // Access the context
    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const [setErrorMessage] = useState(null); // State for modal message
// console.log(user);
    function handleUpdate(e) {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }
 
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_BASE_URL}/login`, user);
            console.log("Success:", response.data);

            localStorage.setItem('userId', response.data.userId);
            localStorage.setItem('authToken', response.data.token);
            localStorage.setItem('userRole', response.data.role);
            localStorage.setItem('userName', response.data.name);


            setUserRole(localStorage.getItem('userRole'));
            setUserName(localStorage.getItem('userName'));
            setUserId(localStorage.getItem('userId'));
            setAuthToken(localStorage.getItem('authToken')); 
            // setAuthToken=localStorage(response.data) // Ensure authToken is set
            onLogin(response.data);
        } catch (error) {
            console.error("Error:", error);
            setErrorMessage(error.response?.data?.message || "Login Failed"); // Set modal message
        }
    };
 
    return (
        <>
            <form className="form-container" onSubmit={handleSubmit}>
                <h2>Login</h2>
                <InputField
                    label="Email"
                    type="email"
                    name="email"
                    required
                    onChange={handleUpdate}
                />
                <InputField
                    label="Password"
                    type="password"
                    name="password"
                    required
                    onChange={handleUpdate}
                />
                <button type="submit" className="form-button">Login</button>
            </form>
        </>
    );
};
 
// Register Form Component
const RegisterForm = ({ onRegister }) => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        role: "ROLE_STUDENT"
    });
    const [errorMessage, setErrorMessage] = useState(null); // State for modal message
    const navigate = useNavigate();
 
    function handleUpdate(e) {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }
 
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(user)
            const response = await axios.post(`${API_BASE_URL}/register`, user);
            console.log("Success:", response.data);
            if (user.role === "ROLE_INSTRUCTOR") {
                navigate("/instructor/questionnaire"); // Redirect to questionnaire for instructors
            } else {
                onRegister(); // Notify parent of successful registration
            }
        } catch (error) {
            console.error("Error:", error);
            setErrorMessage(error.response?.data?.message || "Failed to register"); // Set modal message
        }
    };
 
    return (
        <>
            <form className="form-container" onSubmit={handleSubmit}>
                <h2>Register</h2>
                <InputField
                    label="Username"
                    type="text"
                    name="name"
                    required
                    onChange={handleUpdate}
                />
                <InputField
                    label="Email"
                    type="email"
                    name="email"
                    required
                    onChange={handleUpdate}
                />
                <InputField
                    label="Password"
                    type="password"
                    name="password"
                    required
                    onChange={handleUpdate}
                />
                <div className="input-group">
                    <label htmlFor="role">Role</label>
                    <select
                        id="role"
                        name="role"
                        value={user.role}
                        onChange={handleUpdate}
                    >
                        <option value="ROLE_STUDENT">Student</option>
                        <option value="ROLE_INSTRUCTOR">Instructor</option>
                    </select>
                </div>
                <button type="submit" className="form-button">Register</button>
            </form>
        </>
    );
};
 
// Main App Component
const AuthPage = ({ showLogin, showRegister, onLoginSuccess, onRegisterSuccess }) => {
 
    const handleLoginSubmit = (data) => {
        onLoginSuccess(data);
    };
 
    const handleRegisterSubmit = () => {
        onRegisterSuccess();
    };
 
    return (
        <div className="auth-page">
            <div className="gif-container">
                <img src="https://www.akratech.in/wp-content/uploads/2023/11/online-clasroom-scaled.webp" alt="Loading Animation" />
            </div>
            {showLogin && (
                <div className="forms-container">
                    <LoginForm onLogin={handleLoginSubmit} />
                </div>
            )}
            {showRegister && (
                <div className="forms-container">
                    <RegisterForm onRegister={handleRegisterSubmit} />
                </div>
            )}
        </div>
    );
};
 
export default AuthPage;