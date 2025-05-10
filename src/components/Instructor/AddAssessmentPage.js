import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';
import axios from 'axios';

const AddAssessmentPage = () => {
    const { userId, authToken, courseId } = useUserContext(); // Access courseId from context
    const navigate = useNavigate();

    useEffect(() => {
        console.log('User ID:', userId);
        console.log('Auth Token:', authToken);
        console.log('Course ID:', courseId); // Log courseId to the console
    }, [userId, authToken, courseId]);

    const [formData, setFormData] = useState({
        type: '',
        maxScore: '',
    });
    const [message, setMessage] = useState('');

    const BASE_URL = 'http://localhost:8082/api/instructors';

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userId || !authToken || !courseId) {
            setMessage('User ID, course ID, or authentication token is missing. Please log in again.');
            return;
        }
        try {
            const response = await axios.post(
                `${BASE_URL}/${userId}/courses/${courseId}/assessments`,
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );

            if (response.status === 200) {
                setMessage('Assessment created successfully!');
                setFormData({ type: '', maxScore: '' });
                setTimeout(() => navigate(`/courses/${courseId}`), 2000);
            } else {
                setMessage('Failed to create assessment. Please try again.');
            }
        } catch (error) {
            setMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div>
            <h2>Add Assessment</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Type:</label>
                    <input
                        type="text"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Max Score:</label>
                    <input
                        type="number"
                        name="maxScore"
                        value={formData.maxScore}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Add Assessment</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AddAssessmentPage;
