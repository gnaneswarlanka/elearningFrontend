import React, { useEffect, useState } from "react"; // Removed useNavigate from here
import { useNavigate } from "react-router-dom"; // Correctly imported useNavigate
import { useUserContext } from "../../context/UserContext";
import axios from "axios";

function MyProgress() {
    const { userId, authToken } = useUserContext();
    const [courses, setCourses] = useState([]);
    const [progress, setProgress] = useState({});
    const [courseloaded, setCourseloaded] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`http://localhost:20001/elearning/api/students/${userId}/enrolled-courses`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            })
            .then((response) => {
                setCourses(response.data);
                setCourseloaded(true);
                console.log(response.data);
            })
            .catch((error) => {
                console.error("Error fetching enrolled courses:", error);
            });
    }, [userId, authToken]);

    useEffect(() => {
        if (courseloaded) {
            const fetchProgress = async () => {
                const progressData = {};
                for (const course of courses) {
                    try {
                        const response = await axios.get(
                            `http://localhost:20001/elearning/api/students/${userId}/course/${course.courseId}/progess`,
                            {
                                headers: {
                                    Authorization: `Bearer ${authToken}`,
                                },
                            }
                        );
                        progressData[course.courseId] = response.data;
                    } catch (error) {
                        console.error(`Error fetching progress for course ${course.courseId}:`, error);
                    }
                }
                console.log("Progress data:", progressData);
                setProgress(progressData);
            };
            fetchProgress();
        }
    }, [courseloaded, courses, userId, authToken]);

    const navigateToCourse = (courseId) => {
        navigate(`/course/${courseId}`);
    };

    return (
        <>
            <div className="container mt-4">
                {courses.length > 0 ? (
                    <div className="row">
                        {courses.map((course) => (
                            <div key={course.courseId} className="col-md-12 mb-3">
                                <div className="card">
                                    <div className="card-body d-flex align-items-center">
                                        <h5
                                            className="card-title flex-grow-1"
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => navigateToCourse(course.courseId)} // Navigate on click
                                        >
                                            {course.title}
                                        </h5>
                                        <div className="w-50">
                                            <div className="progress">
                                                <div
                                                    className="progress-bar"
                                                    role="progressbar"
                                                    style={{ width: `${progress[course.courseId] || 0}%` }}
                                                    aria-valuenow={progress[course.courseId] || 0}
                                                    aria-valuemin="0"
                                                    aria-valuemax="100"
                                                >
                                                    {progress[course.courseId] || 0}%
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="alert alert-info text-center" role="alert">
                        No courses enrolled yet.
                    </div>
                )}
            </div>
        </>
    );
}

export default MyProgress;
