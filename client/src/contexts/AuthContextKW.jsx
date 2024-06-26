import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    const login = (newToken, newUser) => {
        setToken(newToken);
        setUser(newUser);
    };

    return (
        <AuthContext.Provider value={{ user, token, login }}>
            {children}
        </AuthContext.Provider>
    );
};