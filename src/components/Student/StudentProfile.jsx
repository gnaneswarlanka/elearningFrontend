import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUserContext } from '../../context/UserContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import UpdateStudentProfile from './UpdateStudentProfile'; // Import the UpdateStudentProfile component

const StudentProfile = () => {
    const [studentProfile, setStudentProfile] = useState(null);
    const [error, setError] = useState(null);
    const { userId, authToken } = useUserContext();
    const [showUpdateProfile, setShowUpdateProfile] = useState(false); // State to toggle profile update modal

    const API_BASE_URL = 'http://localhost:20001/elearning/api/students';

    const fetchStudentProfile = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/${userId}`, {
                headers: { Authorization: `Bearer ${authToken}` },
            });
            setStudentProfile(response.data);
        } catch (err) {
            console.error('Error fetching student profile:', err);
            setError('Failed to fetch student profile. Please try again later.');
        }
    };

    useEffect(() => {
        fetchStudentProfile();
    });

    const handleProfileUpdate = () => {
        fetchStudentProfile(); // Refresh profile data after update
        setShowUpdateProfile(false); // Close the update modal
    };

    if (error) {
        return (
            <div className="container mt-5">
                <div className="alert alert-danger text-center" role="alert">
                    {error}
                </div>
            </div>
        );
    }

    if (!studentProfile) {
        return (
            <div className="container mt-5 text-center">
                <div className="spinner-border text-primary" role="status"></div>
                <p className="mt-3">Loading...</p>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-lg-6 col-md-8">
                    <div className="card shadow-lg border-0">
                        <div className="card-header bg-primary text-white text-center py-3">
                            <h3 className="mb-0">My Profile</h3>
                        </div>
                        <div className="card-body p-4">
                            <div className="text-center mb-4">
                                <div 
                                    className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center mx-auto" 
                                    style={{ width: '120px', height: '120px', fontSize: '40px' }}
                                >
                                    <i className="bi bi-person-circle"></i>
                                </div>
                            </div>
                            <table className="table table-borderless">
                                <tbody>
                                    <tr>
                                        <th className="text-dark text-end" style={{ width: '40%' }}>Name:</th>
                                        <td className="text-muted bg-light p-2 rounded">{studentProfile.name}</td>
                                    </tr>
                                    <tr>
                                        <th className="text-dark text-end">Email:</th>
                                        <td className="text-muted bg-light p-2 rounded">{studentProfile.email}</td>
                                    </tr>
                                    <tr>
                                        <th className="text-dark text-end">Role:</th>
                                        <td className="text-muted bg-light p-2 rounded">{studentProfile.role}</td>
                                    </tr>
                                    <tr>
                                        <th className="text-dark text-end">College:</th>
                                        <td className="text-muted bg-light p-2 rounded">{studentProfile.college}</td>
                                    </tr>
                                    <tr>
                                        <th className="text-dark text-end">Age:</th>
                                        <td className="text-muted bg-light p-2 rounded">{studentProfile.age}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="text-center mt-4">
                                <button 
                                    className="btn btn-info" 
                                    onClick={() => setShowUpdateProfile(true)}
                                >
                                    Update My Profile
                                </button>
                            </div>
                        </div>
                        <div className="card-footer text-center bg-primary text-white py-2">
                            <small>Keep learning and growing!</small>
                        </div>
                    </div>
                </div>
            </div>
            {showUpdateProfile && (
                <UpdateStudentProfile 
                    onClose={() => setShowUpdateProfile(false)} 
                    onUpdate={handleProfileUpdate}
                />
            )}
        </div>
    );
};

export default StudentProfile;
