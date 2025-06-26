import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function PublicRoute() {
  const { user, isInitializing } = useSelector((state) => state.auth);

  if (isInitializing) {
    return <div>Loading...</div>;
  }

  if (user) {
    return (
      <Navigate
        to={user.role === "Manager" ? "/dashboard" : "/my-tasks"}
        replace
      />
    );
  }

  return <Outlet />;
}

export default PublicRoute;
