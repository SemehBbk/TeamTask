import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../features/auth/authSlice";
import "./Login.css";
import backgroundImage from "../assets/work.jpg";  

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const { loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(login({ email, password })).unwrap();
      const result = await dispatch(login({ email, password })).unwrap();
      navigate(result.user.role === "Manager" ? "/dashboard" : "/my-tasks");
    } catch (err) {
       
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div
          className="left-section"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className="left-section-overlay"></div>
        </div>
        <div className="right-section">
          <div className="form-container">
            <h2>Login to TeamTask</h2>
            {error && <p className="error">{error}</p>}
            {loading && <p className="loading">Loading...</p>}
            <form onSubmit={handleSubmit}>
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
              <button
                type="submit"
                disabled={loading}
                className="submit-button"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
            <p className="signup-link">
              Don't have an account? <a href="/signup">Sign up</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
