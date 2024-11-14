import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
  isAdmin?: boolean;
}

const ProtectedRoute = ({ children, isAdmin = false }: ProtectedRouteProps) => {
  // This is a simple mock of auth state - in a real app, you'd use proper authentication
  const isAuthenticated = localStorage.getItem("isAdmin") === "true";

  if (!isAuthenticated) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;