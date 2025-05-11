import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userRole, setUserRole] = useState(null); 
    const [userName, setUserName] = useState(null); 
    const [userId, setUserId] = useState(null);
    const [authToken, setAuthToken] = useState(null);
    const [courseId, setCourseId] = useState(null); // Add courseId state

    // Add a debugging log to confirm when courseId is updated
    useEffect(() => {
        console.log('Updated Course ID in context:', courseId); // Debugging log
    }, [courseId]);

    return (
        <UserContext.Provider value={{ userRole,userName,userId, authToken, courseId,setUserRole,setUserName, setUserId, setAuthToken, setCourseId }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => useContext(UserContext);
