import React, { useState } from 'react';
import './AuthPage.css'; // Import the CSS file

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
    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    function handleUpdate(e) {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Pass user object to parent component
        fetch("http://localhost:8082/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        }).then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Login Failed");
        }).then((data) => {
            console.log("Success:", data);
            // Pass the entire user data, including the role
            onLogin(data);
        })
            .catch((error) => {
                console.error("Error:", error);
                alert(error.message);
            });


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

    function handleUpdate(e) {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:8082/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Failed to register");
            })
            .then((data) => {
                console.log("Success:", data);
                onRegister(); // Notify parent of successful registration
            })
            .catch((error) => {
                console.error("Error:", error);
                alert(error.message);
            });
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
            {!showLogin && !showRegister && (
                <div className="auth-buttons">
                    <button className="auth-button" onClick={() => { onLoginSuccess(false); }}>Login</button>
                    <button className="auth-button" onClick={() => { onRegisterSuccess(false); }}>Register</button>
                </div>
            )}
            {showLogin && (
                
                <div className="forms-container">
                    Login {showLogin}
                    <LoginForm onLogin={handleLoginSubmit} />
                    <button className="back-button" onClick={() => { onLoginSuccess(false); }}>Back</button>
                </div>
        
            )}
            {showRegister && (
                <div className="forms-container">
                    <RegisterForm onRegister={handleRegisterSubmit} />
                    <button className="back-button" onClick={() => { onRegisterSuccess(false); }}>Back</button>
                </div>
            )}
        </div>
    );
};

export default AuthPage;
