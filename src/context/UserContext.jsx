import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);
    const [authToken, setAuthToken] = useState(null); // Add authToken state

    return (
        <UserContext.Provider value={{ userId, setUserId, authToken, setAuthToken }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => useContext(UserContext);
