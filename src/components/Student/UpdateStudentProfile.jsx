import React, { useState } from 'react';
import axios from 'axios';
import { useUserContext } from '../../context/UserContext';

const UpdateStudentProfile = ({ onClose, onUpdate }) => {
    const [college, setCollege] = useState('');
    const [age, setAge] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const { authToken, userId } = useUserContext();
    const API_BASE_URL = 'http://localhost:20001/elearning/api/students';

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `${API_BASE_URL}/${userId}/updateDetails`,
                { college, age },
                { headers: { Authorization: `Bearer ${authToken}` } }
            );
            console.log('Profile updated successfully:', response.data);
            setSuccess('Profile updated successfully!');
            setError(null);
            onUpdate(); // Notify parent component
        } catch (err) {
            console.error('Error updating profile:', err);
            setError('Failed to update profile. Please try again.');
            setSuccess(null);
        }
    };

    return (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Update Profile</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        {error && <p className="alert alert-danger">{error}</p>}
                        {success && <p className="alert alert-success">{success}</p>}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="college" className="form-label">College</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="college" 
                                    value={college} 
                                    onChange={(e) => setCollege(e.target.value)} 
                                    required 
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="age" className="form-label">Age</label>
                                <input 
                                    type="number" 
                                    className="form-control" 
                                    id="age" 
                                    value={age} 
                                    onChange={(e) => setAge(e.target.value)} 
                                    required 
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">Update</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateStudentProfile;
