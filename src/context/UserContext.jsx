import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userRole, setUserRole] = useState(null); 
    const [userName, setUserName] = useState(null); 
    const [userId, setUserId] = useState(null);
    const [authToken, setAuthToken] = useState(null);
    const [courseId, setCourseId] = useState(null); // Add courseId state
    const [numberOfAssessments, setNumberOfAssessments] = useState(0); // New state for assessments

    // Add a debugging log to confirm when courseId is updated
    useEffect(() => {
        console.log('Updated Course ID in context:', courseId); // Debugging log
        const storedUserId = localStorage.getItem('userId');
        const storedAuthToken = localStorage.getItem('authToken');
        const storedUserRole = localStorage.getItem('userRole');
        const storedUserName = localStorage.getItem('userName');

        if (storedUserId && storedAuthToken) {
            setUserId(storedUserId);
            setAuthToken(storedAuthToken);
            setUserRole(storedUserRole);
            setUserName(storedUserName);
        }
    }, [courseId]);

    return (
        <UserContext.Provider value={{ userRole,userName,userId, authToken, courseId,numberOfAssessments, setNumberOfAssessments,setUserRole,setUserName, setUserId, setAuthToken, setCourseId }}>
            {children}
        </UserContext.Provider>
        // Context.Provider: This is a component that makes the context data available to its
        //  descendant components. It accepts a value prop, which is the data you want to share. 
        // Any components within the <Context.Provider> can access this value.
    );
};

export const useUserContext = () => useContext(UserContext);
