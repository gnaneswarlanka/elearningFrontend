import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUserContext } from '../../context/UserContext'; // Import UserContext
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const StudentProfile = () => {
    const [studentProfile, setStudentProfile] = useState(null);
    const [error, setError] = useState(null);
    const { userId, authToken } = useUserContext(); // Get userId and authToken from context

    const API_BASE_URL = 'http://localhost:8082/api/students'; // Define base URL

    useEffect(() => {
        const fetchStudentProfile = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/${userId}`, { // Use base URL
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
        return <p className="alert alert-danger text-center">{error}</p>; // Added Bootstrap alert and text-center classes
    }

    if (!studentProfile) {
        return <p className="text-center mt-4">Loading...</p>; // Added Bootstrap text-center and margin-top classes
    }

    return (
        <div className="container mt-4">
            <h1 className="card-header bg-primary text-white">My Profile</h1>
            <div className="card shadow-sm"> {/* Added Bootstrap shadow-sm class */}
                <div className="card-body">
                    <h5 className="card-title"><strong>Name:</strong>{studentProfile.name}</h5> {/* Added text-primary class */}
                    <p className="card-text"><strong>Email:</strong> {studentProfile.email}</p>
                    <p className="card-text"><strong>Role:</strong> {studentProfile.role}</p>
                    <p className="card-text"><strong>College:</strong> {studentProfile.college}</p>
                    <p className="card-text"><strong>Age:</strong> {studentProfile.age}</p>
                </div>
            </div>
        </div>
    );
};

export default StudentProfile;
