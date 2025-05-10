import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);
    const [authToken, setAuthToken] = useState(null);
    const [courseId, setCourseId] = useState(null); // Add courseId state

    return (
        <UserContext.Provider value={{ userId, authToken, courseId, setUserId, setAuthToken, setCourseId }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => useContext(UserContext);
