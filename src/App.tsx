import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";

// Layout Components
import DashboardLayout from "@/components/layout/DashboardLayout";

// Pages
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import DataManagement from "@/pages/DataManagement";
import CreateRecord from "@/pages/CreateRecord";
import EditRecord from "@/pages/EditRecord";
import UserProfile from "@/pages/UserProfile";
import Analytics from "@/pages/Analytics";
import Settings from "@/pages/Settings";

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading, getCurrentUser } = useAuthStore();

  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          
          {/* Protected Routes with Dashboard Layout */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Dashboard />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/data"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <DataManagement />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/data/create"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <CreateRecord />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/data/edit/:id"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <EditRecord />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <UserProfile />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/analytics"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Analytics />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Settings />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          
          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
      
      {/* Toast notifications */}
      <Toaster position="top-right" richColors />
    </>
  );
}
