import "./MyTaskCard.css";

function MyTaskCard({ task, onEdit, onDelete }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "à faire":
        return "#ff9800";
      case "en cours":
        return "#2196f3";
      case "terminée":
        return "#4caf50";
      default:
        return "#757575";
    }
  };

  return (
    <div className="mytask-card">
      <div className="mytask-card-header">
        <h3 className="mytask-card-title">{task.title}</h3>
        <span 
          className="mytask-card-status"
          style={{ backgroundColor: getStatusColor(task.status) }}
        >
          {task.status}
        </span>
      </div>
      
      <div className="mytask-card-body">
        <p className="mytask-card-description">
          {task.description || "No description provided"}
        </p>
        
        <div className="mytask-card-actions">
          <button 
            className="mytask-btn mytask-btn-edit"
            onClick={() => onEdit(task)}
          >
            Edit
          </button>
          <button 
            className="mytask-btn mytask-btn-delete"
            onClick={() => onDelete(task._id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default MyTaskCard;