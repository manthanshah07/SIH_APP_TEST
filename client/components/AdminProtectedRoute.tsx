import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { isAdminAuthenticated } from "@/lib/auth";

export default function AdminProtectedRoute({ element }: { element: ReactElement }) {
  if (!isAdminAuthenticated()) {
    return <Navigate to="/admin/login" replace />;
  }
  return element;
}
