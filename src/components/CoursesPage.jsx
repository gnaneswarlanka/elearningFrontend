import React, { useEffect, useState } from 'react';
import { getAllCourses } from '../services/courseService';
import { enrollInCourse } from '../services/enrollmentService'; // Import enrollInCourse
import { useUserContext } from '../context/UserContext'; // Import UserContext

const CoursesPage = () => {
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState(null);
    const { userId, authToken } = useUserContext(); // Get userId and authToken from context

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

        fetchCourses();
    }, [authToken]);

    const handleEnroll = async (courseId) => {
        try {
            await enrollInCourse(userId, courseId, authToken); // Call enrollInCourse from enrollmentService
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
                                    <a href={course.contentURL} target="_blank" rel="noopener noreferrer" className="btn btn-primary me-2">
                                        View Content
                                    </a>
                                    <button onClick={() => handleEnroll(course.courseId)} className="btn btn-success">
                                        Enroll
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
