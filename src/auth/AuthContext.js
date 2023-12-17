import React, { createContext, useContext, useReducer } from "react";

// Definir el contexto
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const reducer = (state, action) => {
        switch (action.type) {
            case "LOGIN":
                return { ...state, isAuthenticated: true, user: action.payload.user, role: action.payload.user.role };
            case "LOGOUT":
                return { ...state, isAuthenticated: false, user: null };
            default:
                return state;
        }
    };

    const initialState = {
        isAuthenticated: false,
        user: null,
        role: null,
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    const login = (user) => {
        dispatch({ type: "LOGIN", payload: { user } });
        console.log(user);
    };

    const logout = () => {
        dispatch({ type: "LOGOUT" });
    };

    return (
        <AuthContext.Provider value={{ ...state, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};


export const useAuth = () => useContext(AuthContext);
