import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const BASE_URL = 'http://localhost:20001/elearning/api/instructors'; // Define the base URL for API requests

const InstructorPage = ({user}) => {
    const navigate = useNavigate();
    console.log("this is logged by me ",user)
    const { userName,userId, authToken, setCourseId } = useUserContext(); // Retrieve userId, authToken, and setCourseId from context
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

    const handleDeleteCourse = async (courseId) => {
        try {
            const response = await axios.delete(`${BASE_URL}/${userId}/courses/${courseId}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });

            if (response.status === 200) {
                setCourses(courses.filter(course => course.courseId !== courseId));
                alert('Course deleted successfully!');
            } else {
                alert('Failed to delete course. Please try again.');
            }
        } catch (error) {
            alert('An error occurred while deleting the course. Please try again.');
        }
    };

    const handleAddCourse = () => {
        navigate('/instructor/add-course');
    };

 const handleMyCoursesClick = () => {
        setShowCourses(true);
    }; 

    return (
        <div className="instructor-page container mt-5">
            <h1 className="welcome-message text-center mb-4">Welcome back {userName}!</h1>
            <div className="d-flex justify-content-center mb-4">
                <button onClick={() => navigate('/instructor/profile')} className="btn btn-primary me-2">My Profile</button>
                <button onClick={handleMyCoursesClick} className="btn btn-secondary">My Courses</button>
            </div>
            {showCourses && (
                <>
                    <h1 className="text-center mb-4">All Courses</h1>
                    {error && <p className="error-message text-danger text-center">{error}</p>}
                    <div className="row">
                        {courses.map((course) => (

                            <div key={course.courseId} className="col-md-4 mb-4">
                                <div className="card h-100">
                                    <div className="card-body">
                                        <h3 className="card-title">{course.title}</h3>
                                        <p className="card-text">{course.description}</p>
                                        <p className="card-text"><strong>Instructor: </strong>{course.instructorName}</p>
                                        <a href={course.contentURL} target="_blank" rel="noopener noreferrer" className="btn btn-link">
                                            View Content 
                                        </a>
                                        <div className="d-flex justify-content-between mt-3">
                                            <button 
                                                onClick={() => {
                                                    setCourseId(course.courseId); // Ensure course.id is passed correctly
                                                    navigate('/instructor/add-assessment');
                                                }} 
                                                className="btn btn-success btn-sm"
                                            >
                                                Create Assessment
                                            </button>
                                            <button onClick={() => {
                                                setCourseId(course.courseId); 
                                                navigate(`/instructor/updateCourse`);
                                            }} className="btn btn-warning btn-sm">
                                                Update</button>
                                            <button 
                                                onClick={() => handleDeleteCourse(course.courseId)} 
                                                className="btn btn-danger btn-sm"
                                            >
                                                Delete
                                            </button>
                                            <button 
                                                onClick={() => {
                                                    setCourseId(course.courseId);
                                                    navigate(`/instructor/view-assessments`);
                                                }} 
                                                className="btn btn-info btn-sm"
                                            >
                                                View Assessments
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
            <div className="instructor-content text-center mt-5">
                <h2>Instructor Tools</h2>
                <button onClick={handleAddCourse} className="btn btn-primary mt-3">Create New Course</button>
              
            </div>
        </div>
    );
};

export default InstructorPage;