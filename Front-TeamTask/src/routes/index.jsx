import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import TaskList from "../pages/TaskList";
import Admin from "../pages/Admin";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import MyTasks from "../pages/MyTasks";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/my-tasks" element={<MyTasks />} />
      </Route>
      <Route element={<ProtectedRoute requireManager={true} />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tasks" element={<TaskList />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/admin" element={<Admin />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
