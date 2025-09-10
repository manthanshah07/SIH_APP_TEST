
import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";

export default function ProtectedRoute({ element }: { element: ReactElement }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    // You can render a loading spinner here if you want
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return element;
}

