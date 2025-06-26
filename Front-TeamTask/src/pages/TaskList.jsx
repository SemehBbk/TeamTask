import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTasks, createTask } from "../features/tasks/taskSlice";
import { fetchUsers } from "../features/users/userSlice";
import TaskCard from "../components/TaskCard";
import Button from "../components/Button";
import "./TaskList.css";

function TaskList() {
  const { allTasks, loading, error } = useSelector((state) => state.tasks);
  const {
    users,
    loading: usersLoading,
    error: usersError,
  } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "à faire",
    userSelected: "",
  });
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    dispatch(fetchAllTasks());
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleOpenPopup = () => setIsPopupOpen(true);
  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setFormData({
      title: "",
      description: "",
      status: "à faire",
      userSelected: "",
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createTask(formData)).unwrap();
      handleClosePopup();
    } catch (err) {}
  };

  const nonManagerUsers = users.filter((user) => user.role === "User");

  const filteredTasks =
    statusFilter === "all"
      ? allTasks
      : allTasks.filter((task) => task.status === statusFilter);

  return (
    <div className="tasklist-container">
      <h2 className="tasklist-header">All Tasks</h2>

      <div className="tasklist-filter-container">
        <label className="tasklist-filter-label">Filter by Status:</label>
        <select
          value={statusFilter}
          onChange={handleFilterChange}
          className="tasklist-filter-select"
        >
          <option value="all">All</option>
          <option value="à faire">À faire</option>
          <option value="en cours">En cours</option>
          <option value="terminée">Terminée</option>
        </select>
      </div>

      {loading && <p className="tasklist-loading">Loading tasks...</p>}
      {error && <p className="tasklist-error">{error}</p>}

      {filteredTasks.length === 0 && !loading && !error && (
        <p className="tasklist-no-tasks">No tasks found.</p>
      )}

      {filteredTasks.length > 0 && (
        <div className="tasklist-cards-container">
          {filteredTasks.map((task) => (
            <TaskCard key={task._id} task={task} />
          ))}
        </div>
      )}

      <Button onClick={handleOpenPopup} className="btn-fab">
        Créer une tâche
      </Button>

      {isPopupOpen && (
        <div className="tasklist-popup">
          <div className="tasklist-popup-content">
            <h3 className="tasklist-popup-title">Create New Task</h3>
            {usersLoading && (
              <p className="tasklist-loading">Loading users...</p>
            )}
            {usersError && <p className="tasklist-error">{usersError}</p>}

            <form onSubmit={handleSubmit} className="tasklist-form">
              <div className="tasklist-form-group">
                <label className="tasklist-form-label">Title:</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="tasklist-input"
                />
              </div>

              <div className="tasklist-form-group">
                <label className="tasklist-form-label">Description:</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="tasklist-textarea"
                />
              </div>

              <div className="tasklist-form-group">
                <label className="tasklist-form-label">Status:</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                  className="tasklist-select"
                >
                  <option value="à faire">À faire</option>
                  <option value="en cours">En cours</option>
                  <option value="terminée">Terminé</option>
                </select>
              </div>

              <div className="tasklist-form-group">
                <label className="tasklist-form-label">Assign to:</label>
                <label className="tasklist-form-sublabel">
                  (si la tâche est pour vous, ne sélectionnez aucun utilisateur)
                </label>
                <select
                  name="userSelected"
                  value={formData.userSelected}
                  onChange={handleChange}
                  className="tasklist-select"
                >
                  <option value="">Select User</option>
                  {nonManagerUsers.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="tasklist-button-group">
                <Button type="submit" variant="success" disabled={loading}>
                  Create
                </Button>
                <Button
                  type="button"
                  onClick={handleClosePopup}
                  variant="danger"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskList;
