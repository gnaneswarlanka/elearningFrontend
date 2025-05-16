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

    const BASE_URL = 'http://localhost:20001/elearning/api/instructors';

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
        <div className="container mt-5">
            <h2 className="text-center mb-4">Update Course</h2>
            <form onSubmit={handleSubmit} className="card p-4 shadow">
                <div className="mb-3">
                    <label className="form-label">Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Description:</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Content URL:</label>
                    <input
                        type="url"
                        name="contentURL"
                        value={formData.contentURL}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">Update Course</button>
            </form>
            {message && <p className="mt-3 text-center text-danger">{message}</p>}
        </div>
    );
};

export default UpdateCoursePage;
