import React, { useState } from 'react';

function HeroSection() {
    const heroStyle = {
        background: 'linear-gradient(135deg, #6a11cb, #2575fc)',
        color: '#fff',
        textAlign: 'center',
        padding: '60px 20px',
    };

    const headingStyle = {
        fontSize: '48px',
        fontWeight: 'bold',
        marginBottom: '20px',
        background: 'linear-gradient(90deg, #ff7e5f, #feb47b)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    };

    const paragraphStyle = {
        fontSize: '20px',
        color: '#f0f0f0',
        marginBottom: '30px',
    };

    const buttonStyle = {
        padding: '12px 25px',
        fontSize: '18px',
        color: '#fff',
        backgroundColor: '#ff6f61',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease, transform 0.2s ease',
    };

    const buttonHoverStyle = {
        backgroundColor: '#e65c50',
        transform: 'scale(1.05)',
    };

    return (
        <section style={heroStyle}>
            <h1 style={headingStyle}>
                Welcome to <span className="font-italic">Trinetra</span>
            </h1>
            <p style={paragraphStyle}>Explore a variety of courses and expand your knowledge</p>
            <button
                style={buttonStyle}
                onMouseOver={(e) => Object.assign(e.target.style, buttonHoverStyle)}
                onMouseOut={(e) => Object.assign(e.target.style, buttonStyle)}
            >
                Browse Courses
            </button>
        </section>
    );

}

export default HeroSection;