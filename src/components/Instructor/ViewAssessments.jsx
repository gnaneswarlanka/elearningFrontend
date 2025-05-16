import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';
import axios from 'axios';

const BASE_URL = 'http://localhost:20001/elearning/api/instructors';

const ViewAssessments = () => {
    const {userId, courseId, authToken } = useUserContext();
    const [assessments, setAssessments] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!courseId) {
            console.error('Course ID is not defined.');
            return;
        }

        axios
            .get(`${BASE_URL}/${userId}/course/${courseId}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            })
            .then(response => {
                setAssessments(response.data);
                console.log('Assessments fetched successfully:', response.data);
            })
            .catch(error => {
                console.error('Error fetching assessments:', error);
                setError('Failed to load assessments. Please try again later.');
            });
    }, [courseId, authToken,userId]);

    return (
        <div className="view-assessments container mt-5">
            <h1 className="text-center mb-4">Assessments</h1>
            {error && <p className="text-danger text-center">{error}</p>}
            <div className="list-group">

                {assessments.map((assessment) => (
                    <div key={assessment.assessmentId} className="list-group-item">
                        <h5>
                            <Link to={`/instructor/view-submissions/${assessment.assessmentId}`}>
                                Assessment-{assessment.assessmentId}
                            </Link>
                        </h5>
                        {/* <p>{assessment.description}</p> */}
                    </div>
                ))}
            </div>
            <div className="text-center mt-4">
                <button onClick={() => navigate(-1)} className="btn btn-secondary">Back</button>
            </div>
        </div>
    );
};

export default ViewAssessments;
