import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signup } from "../features/auth/authSlice";
import "./Signup.css";
import backgroundImage from "../assets/work.jpg";  

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    genre: "",
  });
  const { name, email, password, genre } = formData;
  const { loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(signup({ name, email, password, genre })).unwrap();
      navigate("/my-tasks");
    } catch (err) {
       
    }
  };

  return (
    <div className="signup-container">
      <div
        className="left-section"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="left-section-overlay"></div>
      </div>
      <div className="right-section">
        <div className="form-container">
          <h2>Sign Up for TeamTask</h2>
          {error && <p className="error">{error}</p>}
          {loading && <p className="loading">Loading...</p>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={handleChange}
                required
                placeholder="Your name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={handleChange}
                required
                placeholder="••••••••"
              />
            </div>
            <div className="form-group">
              <label htmlFor="genre">Genre</label>
              <select
                name="genre"
                id="genre"
                value={genre}
                onChange={handleChange}
                required
                className="select-input"
              >
                <option value="">Select Genre</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <button type="submit" disabled={loading} className="submit-button">
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </form>
          <p className="login-link">
            Already have an account? <a href="/login">Log in</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
