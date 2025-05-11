import React, { useEffect, useState} from 'react';
import { getEnrolledCourses } from '../../services/enrollmentService';
import {useUserContext } from '../../context/UserContext'; // Import UserContext
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const StudentPage = () => {
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [error, setError] = useState(null);
    const { userId, authToken } = useUserContext(); // Get userId and authToken from context

    useEffect(() => {
        const fetchEnrolledCourses = async () => {
            try {
                const data = await getEnrolledCourses(userId, authToken); // Pass userId and authToken
                setEnrolledCourses(data);
            } catch (err) {
                console.error('Error fetching enrolled courses:', err);
                setError('Failed to fetch enrolled courses. Please try again later.');
            }
        };

        fetchEnrolledCourses();
    }, [userId, authToken]);

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">My Enrolled Courses</h1>
            {error && <p className="alert alert-danger">{error}</p>}
            <div className="row">
                {enrolledCourses.map((course) => (
                    <div key={course.id} className="col-md-4 mb-4">
                        <div className="card h-100 shadow-sm">
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title text-primary">{course.title}</h5>
                                <p className="card-text text-muted">{course.description}</p>
                                <p className="card-text"><strong>Instructor:</strong> {course.instructorName}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StudentPage;
