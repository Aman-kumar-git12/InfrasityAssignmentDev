import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loader from "./Loader";

const ProtectedRoute = ({ children }) => {
  const { user, loading, sessionError } = useAuth();
  if (loading) return <Loader />;
  if (user) return children;

  return <Navigate to="/login" replace state={{ alert: sessionError }} />;
};

export default ProtectedRoute;
