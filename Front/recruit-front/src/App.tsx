import React from "react";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Router } from "react-router";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Nav from "./Components/Nav";
import "./App.css";
import Projects from "./Pages/Projects";
import ProtectedRoute from "./Components/ProtectedRoute";

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
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
