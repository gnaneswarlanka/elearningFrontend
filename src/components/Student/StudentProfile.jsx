import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUserContext } from '../../context/UserContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const StudentProfile = () => {
    const [studentProfile, setStudentProfile] = useState(null);
    const [error, setError] = useState(null);
    const { userId, authToken } = useUserContext();

    const API_BASE_URL = 'http://localhost:8082/api/students';

    useEffect(() => {
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

        fetchStudentProfile();
    }, [userId, authToken]);

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
                        <div className="card-header bg-primary text-white text-center py-4">
                            <h2 className="mb-0">My Profile</h2>
                        </div>
                        <div className="card-body p-4">
                            <div className="mb-3">
                                <h5 className="text-dark">Name</h5>
                                <p className="text-muted bg-light p-2 rounded">{studentProfile.name}</p>
                            </div>
                            <div className="mb-3">
                                <h5 className="text-dark">Email</h5>
                                <p className="text-muted bg-light p-2 rounded">{studentProfile.email}</p>
                            </div>
                            <div className="mb-3">
                                <h5 className="text-dark">Role</h5>
                                <p className="text-muted bg-light p-2 rounded">{studentProfile.role}</p>
                            </div>
                            <div className="mb-3">
                                <h5 className="text-dark">College</h5>
                                <p className="text-muted bg-light p-2 rounded">{studentProfile.college}</p>
                            </div>
                            <div className="mb-3">
                                <h5 className="text-dark">Age</h5>
                                <p className="text-muted bg-light p-2 rounded">{studentProfile.age}</p>
                            </div>
                        </div>
                        <div className="card-footer text-center bg-primary text-white">
                            <p className="mb-0">Keep learning and growing!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentProfile;
