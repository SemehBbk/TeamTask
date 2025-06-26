import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  fetchUser,
  updateUserRole,
  createUser,
  clearSelectedUser,
} from "../features/users/userSlice";
import Button from "../components/Button";
import "./Admin.css";

function Admin() {
  const { users, selectedUser, loading, error } = useSelector(
    (state) => state.users
  );
  const dispatch = useDispatch();
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    genre: "",
    role: "User",
  });

  useEffect(() => {
    dispatch(fetchUsers());
    return () => dispatch(clearSelectedUser());
  }, [dispatch]);

  const handleEditClick = (userId) => {
    dispatch(fetchUser(userId));
    setIsEditPopupOpen(true);
  };

  const handleCreateClick = () => {
    setIsCreatePopupOpen(true);
  };

  const handleCloseEditPopup = () => {
    setIsEditPopupOpen(false);
    dispatch(clearSelectedUser());
  };

  const handleCloseCreatePopup = () => {
    setIsCreatePopupOpen(false);
    setFormData({ name: "", email: "", password: "", genre: "", role: "User" });
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMakeManager = async () => {
    if (selectedUser && selectedUser.role !== "Manager") {
      try {
        await dispatch(
          updateUserRole({ userId: selectedUser._id, role: "Manager" })
        ).unwrap();
        handleCloseEditPopup();
      } catch (err) {
        
      }
    }
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createUser(formData)).unwrap();
      handleCloseCreatePopup();
    } catch (err) {
      
    }
  };

  return (
    <div className="admin-container">
      <h2 className="admin-header">User Management</h2>

      {loading && <p className="admin-loading">Loading...</p>}
      {error && <p className="admin-error">{error}</p>}
      {users.length === 0 && !loading && !error && (
        <p className="admin-no-data">No users found.</p>
      )}

      {users.length > 0 && (
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Genre</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span
                      className={`role-badge role-${user.role.toLowerCase()}`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td>{user.genre || "N/A"}</td>
                  <td>
                    <Button
                      variant="edit"
                      size="small"
                      onClick={() => handleEditClick(user._id)}
                    >
                      Edit Role
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Button className="btn-fab" onClick={handleCreateClick}>
        Créer un compte utilisateur
      </Button>

      {isEditPopupOpen && selectedUser && (
        <div className="admin-popup">
          <div className="admin-popup-content">
            <h3>Edit User</h3>
            {loading && <p className="admin-loading">Loading...</p>}
            {error && <p className="admin-error">{error}</p>}

            <div className="admin-form-group">
              <label>Name:</label>
              <input
                type="text"
                value={selectedUser.name}
                disabled
                className="admin-input"
              />
            </div>

            <div className="admin-form-group">
              <label>Email:</label>
              <input
                type="email"
                value={selectedUser.email}
                disabled
                className="admin-input"
              />
            </div>

            <div className="admin-form-group">
              <label>Role:</label>
              <input
                type="text"
                value={selectedUser.role}
                disabled
                className="admin-input"
              />
            </div>

            <div className="admin-form-group">
              <label>Genre:</label>
              <input
                type="text"
                value={selectedUser.genre || "N/A"}
                disabled
                className="admin-input"
              />
            </div>

            <div className="admin-button-group">
              {selectedUser.role !== "Manager" ? (
                <Button
                  variant="success"
                  onClick={handleMakeManager}
                  disabled={loading}
                >
                  Make Manager
                </Button>
              ) : (
                <p className="admin-warning">Cannot modify a manager's role</p>
              )}
              <Button variant="secondary" onClick={handleCloseEditPopup}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {isCreatePopupOpen && (
        <div className="admin-popup">
          <div className="admin-popup-content">
            <h3>Create User Account</h3>
            {loading && <p className="admin-loading">Loading...</p>}
            {error && <p className="admin-error">{error}</p>}

            <form onSubmit={handleCreateSubmit} className="admin-form">
              <div className="admin-form-group">
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                  className="admin-input"
                />
              </div>

              <div className="admin-form-group">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  required
                  className="admin-input"
                />
              </div>

              <div className="admin-form-group">
                <label>Password:</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleFormChange}
                  required
                  className="admin-input"
                />
              </div>

              <div className="admin-form-group">
                <label>Genre:</label>
                <select
                  name="genre"
                  value={formData.genre}
                  onChange={handleFormChange}
                  className="admin-input"
                >
                  <option value="">Select Genre</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div className="admin-form-group">
                <label>Role:</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleFormChange}
                  required
                  className="admin-input"
                >
                  <option value="User">User</option>
                  <option value="Manager">Manager</option>
                </select>
              </div>

              <div className="admin-button-group">
                <Button type="submit" variant="success" disabled={loading}>
                  Create
                </Button>
                <Button
                  type="button"
                  variant="danger"
                  onClick={handleCloseCreatePopup}
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

export default Admin;
