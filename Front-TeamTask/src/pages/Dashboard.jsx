import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTasks } from "../features/tasks/taskSlice";
import { fetchUsers } from "../features/users/userSlice";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const {
    allTasks,
    loading: tasksLoading,
    error: tasksError,
  } = useSelector((state) => state.tasks);
  const {
    users,
    loading: usersLoading,
    error: usersError,
  } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAllTasks());
    dispatch(fetchUsers());
  }, [dispatch]);

  const taskStats = {
    toDo: allTasks.filter((task) => task.status === "à faire").length,
    inProgress: allTasks.filter((task) => task.status === "en cours").length,
    done: allTasks.filter((task) => task.status === "terminée").length,
  };

  const userStats = {
    totalUsers: users.length,
    managers: users.filter((user) => user.role === "Manager").length,
  };

  const handleViewTasks = () => navigate("/tasks");
  const handleManageUsers = () => navigate("/admin");

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-header">Manager Dashboard</h2>

      {(tasksLoading || usersLoading) && (
        <p className="dashboard-loading">Loading dashboard data...</p>
      )}

      {(tasksError || usersError) && (
        <p className="dashboard-error">{tasksError || usersError}</p>
      )}

      <div className="dashboard-stats-container">
        <div className="dashboard-stat-card">
          <h3>Task Statistics</h3>
          <div className="dashboard-stat-item">
            <span className="dashboard-stat-label">À faire</span>
            <span className="dashboard-stat-value">{taskStats.toDo}</span>
          </div>
          <div className="dashboard-stat-item">
            <span className="dashboard-stat-label">En cours</span>
            <span className="dashboard-stat-value">{taskStats.inProgress}</span>
          </div>
          <div className="dashboard-stat-item">
            <span className="dashboard-stat-label">Terminé</span>
            <span className="dashboard-stat-value">{taskStats.done}</span>
          </div>
        </div>

        <div className="dashboard-stat-card">
          <h3>User Statistics</h3>
          <div className="dashboard-stat-item">
            <span className="dashboard-stat-label">Total Users</span>
            <span className="dashboard-stat-value">{userStats.totalUsers}</span>
          </div>
          <div className="dashboard-stat-item">
            <span className="dashboard-stat-label">Managers</span>
            <span className="dashboard-stat-value">{userStats.managers}</span>
          </div>
        </div>
      </div>

      <div className="dashboard-actions-container">
        <button className="dashboard-action-button" onClick={handleViewTasks}>
          Manage Tasks
        </button>
        <button className="dashboard-action-button" onClick={handleManageUsers}>
          Manage Users
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
