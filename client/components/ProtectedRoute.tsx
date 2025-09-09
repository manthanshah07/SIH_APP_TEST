import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "@/lib/auth";

export default function ProtectedRoute({ element }: { element: ReactElement }) {
  if (!isAuthenticated()) {
    return <Navigate to="/auth" replace />;
  }
  return element;
}
