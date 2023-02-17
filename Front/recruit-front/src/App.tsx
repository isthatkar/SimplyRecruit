import React from "react";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Nav from "./Components/Nav";
import "./App.css";
import Projects from "./Pages/Projects";
import ProtectedRoute from "./Components/ProtectedRoute";
import Positions from "./Pages/Positions";
import ProjectView from "./Pages/ProjectView";
import PositionView from "./Pages/PositionView";

const token = localStorage.getItem("accessToken");
const isAuth = !(token === null);
console.log(isAuth);
function App() {
  return (
    <GoogleOAuthProvider clientId="724152737023-qh4mjh84lm1r0buhsheotob3biugicgs.apps.googleusercontent.com">
      <BrowserRouter>
        <Nav></Nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/projects" element={<ProtectedRoute isAuth={isAuth} />}>
            <Route path="/projects" element={<Projects />} />
          </Route>
          <Route
            path="/projects/:projectid"
            element={<ProtectedRoute isAuth={isAuth} />}
          >
            <Route path="/projects/:projectid" element={<ProjectView />} />
          </Route>
          <Route path="/positions" element={<ProtectedRoute isAuth={isAuth} />}>
            <Route path="/positions" element={<Positions />} />
          </Route>
          <Route
            path="/positions/:positionId"
            element={<ProtectedRoute isAuth={isAuth} />}
          >
            <Route path="/positions/:positionId" element={<PositionView />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
