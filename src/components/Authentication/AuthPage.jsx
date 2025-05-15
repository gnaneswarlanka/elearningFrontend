import React, { useState } from 'react';
import axios from 'axios'; // Import axios
import './AuthPage.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useUserContext } from '../../context/UserContext'; // Corrected import path
 
const API_BASE_URL = 'http://localhost:20002/api/auth'; // Update this if the backend runs on a different port
 
// Reusable Input Component
const InputField = ({ label, type, name, value, onChange }) => {
    return (
        <div className="input-group">
            <label htmlFor={name}>{label}</label>
            <input
                type={type}
                id={name}
                name={name}
                value={value}
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
            setUserRole(response.data.role);
            setUserName(response.data.name);
            setUserId(response.data.userId);
            setAuthToken(response.data.token); // Ensure authToken is set
            onLogin(response.data);
        } catch (error) {
            console.error("Error:", error);
            alert(error.response?.data?.message || "Login Failed");
        }
    };
 
    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <h2>Login</h2>
            <InputField
                label="Email"
                type="email"
                name="email"
                onChange={handleUpdate}
            />
            <InputField
                label="Password"
                type="password"
                name="password"
                onChange={handleUpdate}
            />
            <button type="submit" className="form-button">Login</button>
        </form>
    );
};
 
// Register Form Component
const RegisterForm = ({ onRegister }) => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        role: ""
    });
 
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
            alert(error.response?.data?.message || "Failed to register");
        }
    };
 
    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <h2>Register</h2>
            <InputField
                label="Username"
                type="text"
                name="name"
                onChange={handleUpdate}
            />
            <InputField
                label="Email"
                type="email"
                name="email"
                onChange={handleUpdate}
            />
            <InputField
                label="Password"
                type="password"
                name="password"
                onChange={handleUpdate}
            />
            <InputField
                label="Role"
                type="text"
                name="role"
                onChange={handleUpdate}
            />
            <button type="submit" className="form-button">Register</button>
        </form>
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