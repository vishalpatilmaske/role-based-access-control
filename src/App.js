import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Roles from "./pages/Roles";
import PageNotFound from "./pages/PageNotFound";
import AppProvider from "./AppProvider";

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="app">
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/users" element={<Users />} />
              <Route path="/roles" element={<Roles />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
