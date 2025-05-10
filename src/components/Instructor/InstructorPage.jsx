import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';
import axios from 'axios';
import './InstructorPage.css';

const BASE_URL = 'http://localhost:8082/api/instructors'; // Define the base URL for API requests

const InstructorPage = () => {
    const navigate = useNavigate();
    const { userId, authToken, courseId } = useUserContext(); // Retrieve userId and authToken from context
    const [showCourses, setShowCourses] = useState(false);
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log('User ID:', userId); // Log userId to the console
        console.log('Auth Token:', authToken); // Log authToken to the console

        if (!userId) {
            console.error('User ID is not defined. Ensure the context is providing the userId.');
            return;
        }

        if (showCourses) {
            console.log('Fetching courses for user ID:', userId); // Debugging log
            axios
                .get(`${BASE_URL}/${userId}/course`, { // Use BASE_URL here
                    headers: {
                        Authorization: `Bearer ${authToken}`, // Use token from context
                    },
                })
                .then(response => {
                    console.log('Courses fetched successfully:', response.data); // Debugging log
                    setCourses(response.data);
                })
                .catch(error => {
                    console.error('Error fetching courses:', error); // Debugging log
                    setError('Failed to load courses. Please try again later.');
                });
        }
    }, [showCourses, userId, authToken]); // Ensure consistent dependency array

    const handleAddCourse = () => {
        navigate('/instructor/add-course');
    };

    const handleAddAssessment = () => {
        if (courseId) {
            navigate('/instructor/add-assessment');
        } else {
            alert('Please create or select a course first.');
        }
    };

    const handleMyCoursesClick = () => {
        setShowCourses(true);
    };

    return (
        <div className="instructor-page">
            <h1 className="welcome-message">Welcome back!</h1>
            <button onClick={handleMyCoursesClick} className="my-courses-button">My Courses</button>
            {showCourses && (
                <>
                    <h1>All Courses</h1>
                    {error && <p className="error-message">{error}</p>}
                    <div className="courses-grid">
                        {courses.map((course) => (
                            <div key={course.id} className="course-card">
                                <h3>{course.title}</h3>
                                <p>{course.description}</p>
                                <p><strong>Instructor:</strong> {course.instructorName}</p>
                                <a href={course.contentURL} target="_blank" rel="noopener noreferrer">
                                    View Content
                                </a>
                            </div>
                        ))}
                    </div>
                </>
            )}
            <div className="instructor-content">
                <h2>Instructor Tools</h2>
                <button onClick={handleAddCourse} className="create-course-button">Create New Course</button>
                <button onClick={handleAddAssessment} className="manage-students-button">Create Assessment</button>
            </div>
        </div>
    );
};

export default InstructorPage;