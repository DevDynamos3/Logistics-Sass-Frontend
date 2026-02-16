"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { api } from "@/lib/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedUser = Cookies.get("user");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        const result = await api.post("/Account/login", { email, password });
        // Assuming the API returns user object and token
        // If it only returns token, we might need a separate call or just store the token
        const userData = result.user || result;
        setUser(userData);
        Cookies.set("user", JSON.stringify(userData), { expires: 7 });
        Cookies.set("token", result.token, { expires: 7 });
        return result;
    };

    const signup = async (data) => {
        return await api.post("/Account/signup", data);
    };

    const driverSignup = async (data) => {
        return await api.post("/Account/driver-signup", data);
    };

    const logout = () => {
        setUser(null);
        Cookies.remove("user");
        Cookies.remove("token");
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, driverSignup, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
