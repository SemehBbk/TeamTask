import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ requireManager = false }) {
  const { user, isInitializing } = useSelector((state) => state.auth);

  if (isInitializing) {
    return <div>Loading...</div>;  
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requireManager && user.role !== "Manager") {
    return <Navigate to="/my-tasks" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
