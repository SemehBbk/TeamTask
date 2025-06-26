import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMyTasks,
  editTask,
  deleteTask,
} from "../features/tasks/taskSlice";
import MyTaskCard from "../components/MyTaskCard";
import "./MyTasks.css";

function MyTasks() {
  const { tasks, loading, error } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [formData, setFormData] = useState({ status: "" });
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchMyTasks());
  }, [dispatch]);

  const handleEditClick = (task) => {
    setSelectedTask(task);
    setFormData({ status: task.status });
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedTask(null);
    setFormData({ status: "" });
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (selectedTask) {
      try {
        await dispatch(
          editTask({ taskId: selectedTask._id, status: formData.status })
        ).unwrap();
        handleClosePopup();
      } catch (err) {
         
      }
    }
  };

  const handleDeleteClick = (taskId) => {
    setTaskToDelete(taskId);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (taskToDelete) {
      try {
        await dispatch(deleteTask(taskToDelete)).unwrap();
        setIsConfirmOpen(false);
        setTaskToDelete(null);
      } catch (err) {
         
      }
    }
  };

  const handleCancelDelete = () => {
    setIsConfirmOpen(false);
    setTaskToDelete(null);
  };

  return (
    <div className="mytasks-container">
      <h2 className="mytasks-header">My Tasks</h2>
      
      {loading && <p className="mytasks-loading">Loading tasks...</p>}
      {error && <p className="mytasks-error">{error}</p>}
      
      {tasks.length === 0 && !loading && !error && (
        <p className="mytasks-no-tasks">No tasks assigned to you.</p>
      )}
      
      {tasks.length > 0 && (
        <div className="mytasks-cards-container">
          {tasks.map((task) => (
            <MyTaskCard 
              key={task._id} 
              task={task} 
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
            />
          ))}
        </div>
      )}

      {isPopupOpen && selectedTask && (
        <div className="mytasks-popup">
          <div className="mytasks-popup-content">
            <h3 className="mytasks-popup-title">Edit Task</h3>
            {loading && <p className="mytasks-loading">Loading...</p>}
            {error && <p className="mytasks-error">{error}</p>}
            
            <form onSubmit={handleEditSubmit} className="mytasks-form">
              <div className="mytasks-form-group">
                <label className="mytasks-form-label">Title:</label>
                <input
                  type="text"
                  value={selectedTask.title}
                  disabled
                  className="mytasks-input mytasks-input-disabled"
                />
              </div>
              
              <div className="mytasks-form-group">
                <label className="mytasks-form-label">Description:</label>
                <textarea
                  value={selectedTask.description || "No description"}
                  disabled
                  className="mytasks-textarea mytasks-textarea-disabled"
                />
              </div>
              
              <div className="mytasks-form-group">
                <label className="mytasks-form-label">Status:</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleFormChange}
                  required
                  className="mytasks-select"
                >
                  <option value="à faire">À faire</option>
                  <option value="en cours">En cours</option>
                  <option value="terminée">Terminé</option>
                </select>
              </div>
              
              <div className="mytasks-button-group">
                <button
                  type="submit"
                  className="mytasks-btn mytasks-btn-success"
                  disabled={loading}
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={handleClosePopup}
                  className="mytasks-btn mytasks-btn-danger"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isConfirmOpen && (
        <div className="mytasks-popup">
          <div className="mytasks-popup-content">
            <h3 className="mytasks-popup-title">Confirm Delete</h3>
            <p className="mytasks-confirm-text">Are you sure you want to delete this task?</p>
            <div className="mytasks-button-group">
              <button
                className="mytasks-btn mytasks-btn-danger"
                onClick={handleConfirmDelete}
                disabled={loading}
              >
                Yes, Delete
              </button>
              <button 
                className="mytasks-btn mytasks-btn-secondary" 
                onClick={handleCancelDelete}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyTasks;