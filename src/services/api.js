import axios from 'axios';

const BASE_URL = 'http://localhost:20001/elearning/api/instructors';

export const createCourse = async (userId, courseData, authToken) => {
    return axios.post(`${BASE_URL}/${userId}/courses`, courseData, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
        },
    });
};

export const createAssessment = async (userId, courseId, assessmentData, authToken) => {
    return axios.post(`${BASE_URL}/${userId}/courses/${courseId}/assessments`, assessmentData, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
        },
    });
};
