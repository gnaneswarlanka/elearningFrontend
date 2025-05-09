import React from 'react';
import './StudentPage.css';

// Dummy data for courses (replace with actual data)
const studentCourses = [
    { id: 1, title: 'Introduction to React', progress: 50, thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg' }, // React Logo
    { id: 2, title: 'Advanced JavaScript', progress: 80, thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.svg' }, // JavaScript Logo
    { id: 3, title: 'Data Structures', progress: 20, thumbnail: 'https://www.geeksforgeeks.org/wp-content/uploads/20220803161342-data-structures.png' }, // Data Structures
];

const StudentPage = ({ user }) => {
    return (
        <div className="student-page">
            <h1 className="welcome-message">Welcome back, {user.name}!</h1>
            <h2 className="courses-heading">Enrolled Courses</h2>
            <div className="courses-grid">
                {studentCourses.map(course => (
                    <div key={course.id} className="course-card">
                        <img src={course.thumbnail} alt={course.title} className="course-thumbnail" />
                        <h3 className="course-title">{course.title}</h3>
                        <p className="course-progress">Progress: {course.progress}%</p>
                        <button className="resume-button">Resume Course</button>
                    </div>
                ))}
            </div>
            {/* Add Upcoming Deadlines or Announcements  */}
        </div>
    );
};

export default StudentPage;
