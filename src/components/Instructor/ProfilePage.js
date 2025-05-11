import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUserContext } from '../../context/UserContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProfilePage = () => {
    const { userId, authToken } = useUserContext();
    const [profileData, setProfileData] = useState(null);
    const [error, setError] = useState('');

    const BASE_URL = 'http://localhost:8082/api/instructors';

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
        return <div className="alert alert-danger">{error}</div>;
    }

    if (!profileData) {
        return <div className="text-center mt-5"><div className="spinner-border" role="status"></div><p>Loading...</p></div>;
    }

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-header bg-primary text-white">
                    <h2>My Profile</h2>
                </div>
                <div className="card-body">
                    <p><strong>Name:</strong> {profileData.name}</p>
                    <p><strong>Email:</strong> {profileData.email}</p>
                    <p><strong>Role:</strong> {profileData.role}</p>
                    <p><strong>Salary:</strong> {profileData.salary}</p>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
