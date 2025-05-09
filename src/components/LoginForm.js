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
                // type="email"
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

export default LoginForm;