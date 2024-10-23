import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
    const isAuthenticated = useAuth() as unknown as boolean;
  
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
  
    return element;
  };

function useAuth() {
  throw new Error("Function not implemented.");
}
  