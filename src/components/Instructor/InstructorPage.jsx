// src/components/InstructorPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './InstructorPage.css'; // Import your CSS file for styling

// Dummy data for courses (replace with actual data)
const instructorCourses = [
    { id: 4, title: 'Create React App', progress: 60, thumbnail: 'https://via.placeholder.com/150' },
    { id: 5, title: 'Advanced State Management', progress: 90, thumbnail: 'https://via.placeholder.com/150' },
    { id: 6, title: 'Build APIs with Node', progress: 30, thumbnail: 'https://via.placeholder.com/150' },
];

const InstructorPage = ({ user }) => {
    return (
        <div className="instructor-page">
            <h1 className="welcome-message">Welcome back, {user.name}!</h1>
            <h2 className="courses-heading">Your Courses</h2>
            <div className="courses-grid">
                {instructorCourses.map(course => (
                    <div key={course.id} className="course-card">
                        <img src={course.thumbnail} alt={course.title} className="course-thumbnail" />
                        <h3 className="course-title">{course.title}</h3>
                        <p className="course-progress">Progress: {course.progress}%</p>
                        <button className="view-button">View Course</button>
                    </div>
                ))}
            </div>
            {/* Add Instructor-specific content */}
            <div className="instructor-content">
                <h2>Instructor Tools</h2>
                <Link to="/instructor/add-course">
                    <button className="create-course-button">Create New Course</button>
                </Link>
                <button className="manage-students-button">Manage Students</button>
            </div>
        </div>
    );
};

export default InstructorPage;