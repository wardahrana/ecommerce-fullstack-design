// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        const storedUser = localStorage.getItem("user");

        if (token && storedUser && storedUser !== "undefined" && storedUser !== "null" && storedUser !== "") {
            try {
                const parsed = JSON.parse(storedUser);
                if (parsed && typeof parsed === "object") {
                    setUser(parsed);
                }
            } catch (err) {
                console.error("Clearing bad localStorage data:", err);
                localStorage.removeItem("authToken");
                localStorage.removeItem("user");
            }
        } else {
            localStorage.removeItem("authToken");
            localStorage.removeItem("user");
        }

        setIsLoading(false);
    }, []);

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || data.error || "Login failed");
            }

            // ✅ Backend flat object bhejta hai: { _id, name, email, role, token }
            // token alag karo, baaki sab userInfo hai
            const { token, ...userInfo } = data;

            if (!token) throw new Error("No token received from server");

            localStorage.setItem("authToken", token);
            localStorage.setItem("user", JSON.stringify(userInfo));
            setUser(userInfo);
            return data;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        setUser(null);
    };

    const signup = async (userData) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch("http://localhost:5000/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || data.error || "Signup failed");
            }

            // ✅ Same fix for signup
            const { token, ...userInfo } = data;

            if (!token) throw new Error("No token received from server");

            localStorage.setItem("authToken", token);
            localStorage.setItem("user", JSON.stringify(userInfo));
            setUser(userInfo);
            return data;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, error, login, logout, signup }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
};