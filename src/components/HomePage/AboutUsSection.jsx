import React from 'react';

function AboutUsSection() {
  const sectionStyle = {
    background: '#f8f9fa',
    color: '#333',
    textAlign: 'center',
    padding: '50px 20px',
  };

  const headingStyle = {
    fontSize: '36px',
    fontWeight: 'bold',
    marginBottom: '20px',
  };

  const paragraphStyle = {
    fontSize: '18px',
    color: '#555',
    marginBottom: '20px',
    lineHeight: '1.6',
  };

  return (
    <section style={sectionStyle}>
      <h2 style={headingStyle}>About Trinetra</h2>
      <p style={paragraphStyle}>
        Trinetra is an innovative e-learning platform designed to empower individuals with knowledge and skills.
        Our platform offers a wide range of courses across various domains, enabling learners to achieve their
        personal and professional goals. Whether you're looking to upskill, reskill, or explore new interests,
        Trinetra provides a seamless and engaging learning experience.
      </p>
      <p style={paragraphStyle}>
        Join us today and start your journey towards a brighter future!
      </p>
    </section>
  );
}

export default AboutUsSection;