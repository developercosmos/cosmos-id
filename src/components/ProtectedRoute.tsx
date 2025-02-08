import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface ProtectedRouteProps {
  element: React.ReactElement;
  allowedRoles?: string[];
}

const ProtectedRoute = ({ element, allowedRoles = [] }: ProtectedRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log("Checking authentication status...");
        const response = await fetch('/src/server/auth.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ action: 'checkAuth' }),
        });

        console.log("Auth check response status:", response.status);
        const responseText = await response.text();
        console.log("Auth check raw response:", responseText);

        let data;
        try {
          data = JSON.parse(responseText);
          console.log("Auth check parsed data:", data);
        } catch (e) {
          console.error("JSON parse error in auth check:", e);
          throw new Error(`Invalid JSON response from auth check: ${responseText}`);
        }

        if (!data.success) {
          throw new Error(data.error || 'Authentication check failed');
        }

        setIsAuthenticated(data.authenticated);
        setUserRole(data.role);
        
        console.log("Authentication state updated:", {
          isAuthenticated: data.authenticated,
          userRole: data.role
        });
      } catch (error) {
        console.error('Auth check failed:', error);
        setIsAuthenticated(false);
        setUserRole(null);
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    console.log("Authentication check in progress...");
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    console.log("User not authenticated, redirecting to login...");
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && userRole && !allowedRoles.includes(userRole)) {
    console.log("User role not authorized:", userRole);
    return <Navigate to="/" replace />;
  }

  console.log("Access granted, rendering protected content");
  return element;
};

export default ProtectedRoute;