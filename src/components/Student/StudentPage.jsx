import React, { useEffect, useState } from 'react';
import { getEnrolledCourses } from '../../services/enrollmentService';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const StudentPage = () => {
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [visibleOptions, setVisibleOptions] = useState({}); // State to track visibility per course
    const [error, setError] = useState(null);
    const { userId, authToken } = useUserContext();
    const { setCourseId } = useUserContext();
    let navigate = useNavigate();

    useEffect(() => {
        const fetchEnrolledCourses = async () => {
            try {
                const data = await getEnrolledCourses(userId, authToken);
                setEnrolledCourses(data);
            } catch (err) {
                console.error('Error fetching enrolled courses:', err);
                setError('Failed to fetch enrolled courses. Please try again later.');
            }
        };

        fetchEnrolledCourses();
    }, [userId, authToken]);

    const toggleOptions = (courseId) => {
        setVisibleOptions((prevState) => ({
            ...prevState,
            [courseId]: !prevState[courseId],
        }));
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">My Enrolled Courses</h1>
            {error && <p className="alert alert-danger">{error}</p>}
            <div className="row">
                {enrolledCourses.map((course) => (
                    <div key={course.courseId} className="col-md-4 mb-4">
                        <div className="card h-100 shadow-sm">
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title text-primary">{course.title}</h5>
                                <p className="card-text text-muted">{course.description}</p>
                                <p className="card-text"><strong>Instructor:</strong> {course.instructorName}</p>
                                <button
                                    className="btn btn-info"
                                    onClick={() => toggleOptions(course.courseId)}
                                >
                                    View Course Options
                                </button>
                                <br/>
                                {visibleOptions[course.courseId] && (
                                    <div className="mt-auto d-flex justify-content-between">
                                        <a
                                            href={course.contentURL}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn btn-primary"
                                        >
                                            View Content
                                        </a>
                                        <button
                                            className="btn btn-secondary"
                                            onClick={() => {
                                                setCourseId(course.courseId);
                                                navigate("/student/course/assessments");
                                            }}
                                        >
                                            Assessment
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StudentPage;
