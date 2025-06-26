import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../features/auth/authSlice";
import "./Sidebar.css";

function Sidebar() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="sidebar">
      <h3 className="sidebar-title">TeamTask</h3>
      <nav className="sidebar-nav">
        <ul className="sidebar-ul">
          {user?.role === "Manager" && (
            <>
              <li className="sidebar-li">
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    isActive ? "sidebar-link active" : "sidebar-link"
                  }
                >
                  Dashboard
                </NavLink>
              </li>
              <li className="sidebar-li">
                <NavLink
                  to="/tasks"
                  className={({ isActive }) =>
                    isActive ? "sidebar-link active" : "sidebar-link"
                  }
                >
                  All Tasks
                </NavLink>
              </li>
              <li className="sidebar-li">
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    isActive ? "sidebar-link active" : "sidebar-link"
                  }
                >
                  Users
                </NavLink>
              </li>
            </>
          )}
          <li className="sidebar-li">
            <NavLink
              to="/my-tasks"
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              My Tasks
            </NavLink>
          </li>
          <li className="sidebar-li">
            <button onClick={handleLogout} className="sidebar-logout-button">
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;