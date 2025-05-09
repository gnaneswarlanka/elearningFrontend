import React from 'react';
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
export default InputField;