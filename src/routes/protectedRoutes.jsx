import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import API from "../api";

const ProtectedRoute = ({ allowedRoles }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await API.get("/auth/me", {withCredentials: true});
        if (res.data?.user) {
          setUser(res.data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) return <div className="text-center p-10">Checking session...</div>;

  if (!user) return <Navigate to="/login" replace />;

  if (allowedRoles && !allowedRoles.includes(user.role))
    return <Navigate to="/unauthorized" replace />;

  return <Outlet context={{ user }} />;
};

export default ProtectedRoute;


