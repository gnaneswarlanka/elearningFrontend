import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
 
function HeroSection() {
    return (
        <section className="text-center py-5"
            style={{
                background: 'linear-gradient(135deg, #6a11cb, #2575fc)',
                 color: '#fff'
                    }}>
            <h1 className="display-4 fw-bold mb-4 animate__animated animate__fadeInLeft"
            style={{
                background: 'linear-gradient(90deg, #ff7e5f, #feb47b)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent' }}>
                   
                <span className="font-italic">Welcome to Trinetra</span>
            </h1>
            <p className="fs-5 text-light mb-4">Explore a variety of courses and expand your knowledge</p>
            <button className="btn btn-danger btn-lg" style={{ borderRadius: '8px' }}>
                Browse Courses
            </button>
        </section>
    );
}
 
export default HeroSection;