import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';
import axios from 'axios';

const UpdateCoursePage = () => {
    const { userId, authToken, courseId } = useUserContext();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        contentURL: '', // Added contentURL
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
            setMessage('Instructor ID, course ID, or authentication token is missing. Please log in again.');
            return;
        }
        try {
            const response = await axios.put(
                `${BASE_URL}/${userId}/courses/${courseId}`,
                formData, // Includes contentURL
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );

            if (response.status === 202) {
                setMessage('Course updated successfully!');
                setTimeout(() => navigate(`/instructor`), 2000);
            } else {
                setMessage('Failed to update course. Please try again.');
            }
        } catch (error) {
            setMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div>
            <h2>Update Course</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Content URL:</label> {/* Added contentURL field */}
                    <input
                        type="url"
                        name="contentURL"
                        value={formData.contentURL}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Update Course</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default UpdateCoursePage;
