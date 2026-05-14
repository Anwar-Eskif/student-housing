import { AuthContext } from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { getUserDetails } from "../services/api";
import { useMemo, useState } from "react";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    // 1. We keep the token in state so React knows when it changes (like on login)
    const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
    
    // 2. React Query will auto-refetch when `token` state changes
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["userDetails", token],
        queryFn: getUserDetails,
        enabled: !!token,
        retry: false,
    });

    const login = (newToken: string) => {
        localStorage.setItem("token", newToken);
        setToken(newToken);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
    };

    const value = useMemo(
        () => ({
            user: data?.user ?? null,
            name: data?.user?.name ?? "",
            role: data?.user?.role ?? "",
            isLoading,
            error,
            logout,
            login,
            refetchUser: refetch,
        }),
        [data, isLoading, error, refetch]
    );

    return (
        <AuthContext.Provider
            value={value}
        >
            {children}
        </AuthContext.Provider>
    );
};