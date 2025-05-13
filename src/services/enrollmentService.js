import axios from 'axios';

const BASE_URL = 'http://localhost:8082/api/enrollments'; // Update this if the backend endpoint is different

export const enrollInCourse = async (userId, courseId, authToken) => {
    try {
        const response = await axios.post(
            `${BASE_URL}`,
            { userId, courseId }, // Pass userId and courseId in the request body
            {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error enrolling in course:', error.response?.data || error.message || error);
        throw error;
    }
};

export const getEnrolledCourses = async (userId, authToken) => {
    const response = await axios.get(`${BASE_URL}/${userId}/enrolled-courses`, {
        headers: {
            Authorization: `Bearer ${authToken}`, // Include authToken in headers
        },
    });
    return response.data;
};
