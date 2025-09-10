
import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";

export default function AdminProtectedRoute({ element }: { element: ReactElement }) {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    // You can render a loading spinner here if you want
    return null;
  }

  if (!isAuthenticated || user?.role !== "ADMIN") {
    return <Navigate to="/admin/login" replace />;
  }

  return element;
}

