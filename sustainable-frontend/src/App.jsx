import { Routes, Route } from "react-router-dom";

import DashboardPage from "./pages/DashboardPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
  return (
    <Routes>

      <Route
        path="/"
        element={<Login />}
      />

      <Route
        path="/signup"
        element={<Signup />}
      />

      
      <Route
      path="/dashboard"
      element={
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  }
/>

    </Routes>
  );
}

export default App;