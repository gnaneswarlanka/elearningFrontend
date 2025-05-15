import React, { useEffect, useState } from 'react';
import { getAllCourses } from '../services/courseService';
import { enrollInCourse, getEnrolledCourses } from '../services/enrollmentService'; // Import getEnrolledCourses
import { useUserContext } from '../context/UserContext'; // Import UserContext

const CoursesPage = () => {
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState(null);
    const { userId, authToken } = useUserContext(); // Get userId and authToken from context
    const [enrolledCourses, setEnrolledCourses] = useState(new Set()); // Track enrolled courses

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const data = await getAllCourses(authToken); // Pass authToken if needed
                setCourses(data);
            } catch (err) {
                console.error('Error fetching courses:', err);
                setError('Failed to fetch courses. Please try again later.');
            }
        };

        const fetchEnrolledCourses = async () => {
            try {
                const enrolled = await getEnrolledCourses(userId, authToken); // Fetch enrolled courses
                setEnrolledCourses(new Set(enrolled.map((course) => course.courseId))); // Update enrolledCourses
            } catch (err) {
                console.error('Error fetching enrolled courses:', err);
            }
        };

        fetchCourses();
        fetchEnrolledCourses(); // Fetch enrolled courses on component load
    }, [authToken, userId]);

    const handleEnroll = async (courseId) => {
        try {
            await enrollInCourse(userId, courseId, authToken); // Call enrollInCourse from enrollmentService
            setEnrolledCourses((prev) => new Set(prev).add(courseId)); // Add courseId to enrolledCourses
            alert('Successfully enrolled in the course!');
        } catch (err) {
            console.error('Error enrolling in course:', err);
            alert('Failed to enroll in the course. Please try again later.');
        }
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">All Courses</h1>
            {error && <p className="alert alert-danger">{error}</p>}
            <div className="row">
                {courses.map((course) => (
                    <div key={course.courseId} className="col-md-4 mb-4">
                        <div className="card h-100 shadow-sm">
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title text-primary">{course.title}</h5>
                                <p className="card-text text-muted">{course.description}</p>
                                <p className="card-text"><strong>Instructor:</strong> {course.instructorName}</p>
                                <div className="mt-auto">
                                    {/* Conditionally render button text */}
                                    <button 
                                        onClick={() => handleEnroll(course.courseId)} 
                                        className="btn btn-success" 
                                        disabled={enrolledCourses.has(course.courseId)}
                                    >
                                        {enrolledCourses.has(course.courseId) ? 'Enrolled' : 'Enroll'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CoursesPage;
