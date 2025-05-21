import React, { useState } from 'react';
import axios from 'axios'; // Import axios
import './AuthPage.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useUserContext } from '../../context/UserContext'; // Corrected import path
import { Modal, Button } from 'react-bootstrap'; // Import Bootstrap Modal

const API_BASE_URL = 'http://localhost:20001/authenticationservice/api/auth'; // Update this if the backend runs on a different port

// Reusable Input Component
const InputField = ({ label, type, name, value, onChange, required, min, max }) => {
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
                minLength={min}
                maxLength={max}
                placeholder={`Enter your ${label.toLowerCase()}`}
            />
        </div>
    );
};

// Login Form Component
const LoginForm = ({ onLogin }) => {
    const { setUserRole, setUserName, setUserId, setAuthToken } = useUserContext();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({ email: "", password: "" });
    const [errorMessage, setErrorMessage] = useState(null); // State for modal message
    const [showModal, setShowModal] = useState(false); // State to toggle modal visibility

    function handleUpdate(e) {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(`${API_BASE_URL}/login`, user);
            localStorage.setItem('userId', response.data.userId);
            localStorage.setItem('authToken', response.data.token);
            localStorage.setItem('userRole', response.data.role);
            localStorage.setItem('userName', response.data.name);

            setUserRole(localStorage.getItem('userRole'));
            setUserName(localStorage.getItem('userName'));
            setUserId(localStorage.getItem('userId'));
            setAuthToken(localStorage.getItem('authToken'));
            onLogin(response.data);
        } catch (error) {
            console.error("Error:", error);
            if (error.response?.status === 400) {
                setErrorMessage("Invalid credentials");
                setShowModal(true); // Show modal with error message
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {loading ? (
                <h1>Please wait</h1>
            ) : (
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
            )}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>{errorMessage}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
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
    const [errorMessage, setErrorMessage] = useState(null); // State for modal message
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false); // State to toggle modal visibility
    const navigate = useNavigate();

    function handleUpdate(e) {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            console.log(user);
            const response = await axios.post(`${API_BASE_URL}/register`, user);
            console.log("Success:", response.data);
            if (user.role === "ROLE_INSTRUCTOR") {
                navigate("/instructor/questionnaire"); // Redirect to questionnaire for instructors
            } else {
                onRegister(); // Notify parent of successful registration
            }
        } catch (error) {
            console.error("Error:", error.response);
            if (error.response?.status === 400) {
                setErrorMessage("User already exists");
                setShowModal(true); // Show modal with error message
            } else {
                console.error("Error:", error);
                setErrorMessage(error.response?.data?.message || "Failed to register"); // Set modal message
                setShowModal(true); // Show modal with error message
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {loading ? (
                <h1>Please wait</h1>
            ) : (
                <form className="form-container" onSubmit={handleSubmit}>
                    <h2>Register</h2>
                    <InputField
                        label="Username"
                        type="text"
                        name="name"
                        required
                        min="5"
                        max="50"
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
                            <option value="" disabled>Select your role</option>
                            <option value="ROLE_STUDENT">Student</option>
                            <option value="ROLE_INSTRUCTOR">Instructor</option>
                        </select>
                    </div>
                    <button type="submit" className="form-button">Register</button>
                </form>
            )}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>{errorMessage}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
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