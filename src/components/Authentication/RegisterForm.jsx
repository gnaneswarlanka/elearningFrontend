import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../InputField";

const RegisterForm = ({ onRegister }) => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        role: ""
    });

    const [error, setError] = useState(null);
    const navigate = useNavigate();

    function handleUpdate(e) {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null); // Reset error state before submission
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
                if (user.role === "ROLE_INSTRUCTOR") {
                    navigate("/instructor/questionnaire"); // Redirect to questionnaire for instructors
                } else {
                    if (onRegister) {
                        onRegister(data); // Invoke callback with response data
                    }
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                setError(error.message); // Display error message to the user
            });
    };

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <h2>Register</h2>
            {error && <p className="error-message">{error}</p>}
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

export default RegisterForm;