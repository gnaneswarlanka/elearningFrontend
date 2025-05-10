import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext'; // Corrected import path
import axios from 'axios';

const AddCoursePage = () => {
    const { userId, authToken, setCourseId } = useUserContext(); // Access setCourseId from context

    useEffect(() => {
        console.log('User ID:', userId); // Log userId to the console
        console.log('Auth Token:', authToken); // Log authToken to the console
    }, [userId, authToken]);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        contentURL: '',
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const BASE_URL = 'http://localhost:8082/api/instructors';

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userId || !authToken) {
            setMessage('User ID or authentication token is missing. Please log in again.');
            return;
        }
        try {
            const response = await axios.post(`${BASE_URL}/${userId}/courses`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authToken}`, // Use token from context
                },
            });

            if (response.status === 200) {
                setMessage('Course created successfully!');
                setCourseId(response.data.courseId); // Store courseId in context
                setFormData({ title: '', description: '', contentURL: '' });
                setTimeout(() => navigate('/instructor'), 2000); // Redirect to instructor page after success
            } else {
                setMessage('Failed to create course. Please try again.');
            }
        } catch (error) {
            setMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div>
            <h2>Add Course</h2>
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
                    <label>Content URL:</label>
                    <input
                        type="url"
                        name="contentURL"
                        value={formData.contentURL}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Add Course</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AddCoursePage;
