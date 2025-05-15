import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useUserContext } from '../../context/UserContext';

const BASE_URL = 'http://localhost:20003/api/instructors';

const ViewSubmissions = () => {
    const { assessmentId } = useParams();
    const { userId,authToken } = useUserContext();
    const [submissions, setSubmissions] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`${BASE_URL}/${userId}/assessment/${assessmentId}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            })
            .then(response => {
                setSubmissions(response.data);
                console.log('Submissions fetched successfully:', response.data);
            })
            .catch(error => {
                console.error('Error fetching submissions:', error);
                setError('Failed to load submissions. Please try again later.');
            });
    }, [assessmentId, authToken,userId]);

    return (
        <div className="view-submissions container mt-5">
            <h1 className="text-center mb-4">Submissions for Assessment-{assessmentId}</h1>
            {error && <p className="text-danger text-center">{error}</p>}
            <ul className="list-group">
                {submissions.map((submission) => (
                    <li key={submission.submissionId} className="list-group-item">
                        <Link 
                            to={`/evaluate/${submission.submissionId}`} 
                            state={{ assessmentId }} 
                            className="text-decoration-none"
                        >
                            User ID: {submission.studentId}
                        </Link>
                    </li>
                ))}
            </ul>
            <div className="text-center mt-4">
                <button onClick={() => navigate(-1)} className="btn btn-secondary">Back</button>
            </div>
        </div>
    );
};

export default ViewSubmissions;
