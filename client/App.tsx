import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AuthPage from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import QuizPage from "./pages/Quiz";
import MappingPage from "./pages/Mapping";
import CollegesPage from "./pages/Colleges";
import TimelinePage from "./pages/Timeline";
import MaterialsPage from "./pages/Materials";
import AdminLoginPage from "./pages/AdminLogin";
import AdminDashboardPage from "./pages/AdminDashboard";
import ProtectedRoute from "@/components/ProtectedRoute";
import AdminProtectedRoute from "@/components/AdminProtectedRoute";
import { useEffect } from "react";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
            <Route path="/quiz" element={<ProtectedRoute element={<QuizPage />} />} />
            <Route path="/mapping" element={<ProtectedRoute element={<MappingPage />} />} />
            <Route path="/colleges" element={<ProtectedRoute element={<CollegesPage />} />} />
            <Route path="/timeline" element={<ProtectedRoute element={<TimelinePage />} />} />
            <Route path="/materials" element={<ProtectedRoute element={<MaterialsPage />} />} />

            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin" element={<AdminProtectedRoute element={<AdminDashboardPage />} />} />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

createRoot(document.getElementById("root")!).render(<App />);