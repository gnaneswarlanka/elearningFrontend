import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext'; // Corrected import path
import axios from 'axios';

const AddCoursePage = () => {
    const { userId, authToken } = useUserContext(); // Access setCourseId from context

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

    const BASE_URL = 'http://localhost:20001/elearning/api/instructors';

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

            if (response.status === 201) {
                setMessage('Course created successfully!');
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
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-lg-6 col-md-8">
                    <div className="card shadow-lg">
                        <div className="card-header bg-primary text-white text-center">
                            <h2>Add Course</h2>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Title:</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        required
                                        className="form-control"
                                        placeholder="Enter course title"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Description:</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        required
                                        className="form-control"
                                        placeholder="Enter course description"
                                        rows="4"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Content URL:</label>
                                    <input
                                        type="url"
                                        name="contentURL"
                                        value={formData.contentURL}
                                        onChange={handleChange}
                                        required
                                        className="form-control"
                                        placeholder="Enter content URL"
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-100">Add Course</button>
                            </form>
                            {message && (
                                <div className="alert mt-3 text-center" role="alert">
                                    {message}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddCoursePage;
