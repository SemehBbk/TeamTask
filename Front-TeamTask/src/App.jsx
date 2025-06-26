import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import Sidebar from "./components/Sidebar";
import { initializeUser } from "./features/auth/authSlice";

function App() {
  const dispatch = useDispatch();
  const { isInitializing, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(initializeUser());
  }, [dispatch]);

  if (isInitializing) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <div style={styles.app}>
        {user && <Sidebar />}
        <div style={user ? styles.contentWithSidebar : styles.contentWithoutSidebar}>
          <AppRoutes />
        </div>
      </div>
    </BrowserRouter>
  );
}

const styles = {
  app: {
    display: "flex",
  },
  contentWithSidebar: {
    marginLeft: "200px",
    padding: "20px",
    width: "100%",
  },
  contentWithoutSidebar: {
    padding: "20px",
    width: "100%",
  },
};

export default App;