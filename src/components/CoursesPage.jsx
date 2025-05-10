import React, { useEffect, useState } from 'react';
import { getAllCourses } from '../services/courseService';
// import './CoursesPage.css'; // Add styles if needed

const CoursesPage = () => {
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const data = await getAllCourses(); // Calls the service to fetch courses
                setCourses(data); // Updates the state with the fetched courses
            } catch (err) {
                console.error('Error fetching courses:', err); // Log the error for debugging
                setError('Failed to fetch courses. Please try again later.');
            }
        };

        fetchCourses();
    }, []);

    return (
        <div className="courses-page">
            <h1>All Courses</h1>
            {error && <p className="error-message">{error}</p>}
            <div className="courses-grid">
                {courses.map((course) => (
                    <div key={course.id} className="course-card">
                        <h3>{course.title}</h3>
                        <p>{course.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CoursesPage;
