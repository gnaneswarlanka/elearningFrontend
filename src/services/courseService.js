import axios from 'axios';

// Update the BASE_URL if the endpoint is different
const BASE_URL = 'http://localhost:8082/api/courses/'; // Example: Updated endpoint

export const getAllCourses = async (authToken) => {
    try {
        console.log('Making API request to:', BASE_URL); // Debugging log
        const response = await axios.get(BASE_URL, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });
        console.log('API Response:', response.data); // Debugging log
        return response.data;
    } catch (error) {
        console.error('API Error:', error.response?.data || error.message || error); // Log detailed error
        throw error; // Re-throw the error to be handled by the caller
    }
};
