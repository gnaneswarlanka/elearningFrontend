import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUserContext } from '../../context/UserContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProfilePage = () => {
    const { userId, authToken } = useUserContext();
    const [profileData, setProfileData] = useState(null);
    const [error, setError] = useState('');

    const BASE_URL = 'http://localhost:20001/elearning/api/instructors';

    useEffect(() => {
        const fetchProfile = async () => {
            if (!userId || !authToken) {
                setError('User ID or authentication token is missing. Please log in again.');
                return;
            }
            try {
                const response = await axios.get(`${BASE_URL}/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });
                setProfileData(response.data);
            } catch (err) {
                setError('Failed to fetch profile data. Please try again.');
            }
        };

        fetchProfile();
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

    if (!profileData) {
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
                                <p className="text-muted bg-light p-2 rounded">{profileData.name}</p>
                            </div>
                            <div className="mb-3">
                                <h5 className="text-dark">Email</h5>
                                <p className="text-muted bg-light p-2 rounded">{profileData.email}</p>
                            </div>
                            <div className="mb-3">
                                <h5 className="text-dark">Role</h5>
                                <p className="text-muted bg-light p-2 rounded">{profileData.role}</p>
                            </div>
                            <div className="mb-3">
                                <h5 className="text-dark">Salary</h5>
                                <p className="text-muted bg-light p-2 rounded">{profileData.salary}</p>
                            </div>
                        </div>
                        <div className="card-footer text-center bg-primary text-white">
                            <p className="mb-0">Thank you for being a valued instructor!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
