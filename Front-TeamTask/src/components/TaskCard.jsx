import "./TaskCard.css";

function TaskCard({ task }) {
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
    <div className="task-card">
      <div className="task-card-header">
        <h3 className="task-card-title">{task.title}</h3>
        <span 
          className="task-card-status"
          style={{ backgroundColor: getStatusColor(task.status) }}
        >
          {task.status}
        </span>
      </div>
      
      <div className="task-card-body">
        <p className="task-card-description">
          {task.description || "No description provided"}
        </p>
        
        <div className="task-card-footer">
          <div className="task-card-assignee">
            <span className="task-card-label">Assigned to:</span>
            <span className="task-card-assignee-name">{task.assignedTo.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;