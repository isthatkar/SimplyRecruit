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
import AddPositionPage from "./Components/Positions/AddPositionPage";
import EditPositions from "./Pages/EditPositions";
import UserApplications from "./Pages/UserApplications";
import PositionApplications from "./Pages/PossitionApplications";
import ApplicationView from "./Pages/ApplicationView";
import AddMeeting from "./Pages/AddMeeting";
import MeetingView from "./Pages/MeetingView";
import MeetingSchedulingPage from "./Pages/MeetingSchedulingPage";
import UserMeetings from "./Pages/UserMeetings";

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
            path="/projects/:projectid/addPosition"
            element={<ProtectedRoute isAuth={isAuth} />}
          >
            <Route
              path="/projects/:projectid/addPosition"
              element={<AddPositionPage />}
            />
          </Route>
          <Route
            path="/positions/:positionId"
            element={<ProtectedRoute isAuth={isAuth} />}
          >
            <Route path="/positions/:positionId" element={<PositionView />} />
          </Route>
          <Route
            path="/editPosition/:positionId"
            element={<ProtectedRoute isAuth={isAuth} />}
          >
            <Route
              path="/editPosition/:positionId"
              element={<EditPositions />}
            />
          </Route>
          <Route
            path="/userApplications"
            element={<ProtectedRoute isAuth={isAuth} />}
          >
            <Route path="/userApplications" element={<UserApplications />} />
          </Route>
          <Route
            path="/positions/:positionId/applications"
            element={<ProtectedRoute isAuth={isAuth} />}
          >
            <Route
              path="/positions/:positionId/applications"
              element={<PositionApplications />}
            />
          </Route>
          <Route
            path="/application/:applicationId"
            element={<ProtectedRoute isAuth={isAuth} />}
          >
            <Route
              path="/application/:applicationId"
              element={<ApplicationView />}
            />
          </Route>
          <Route
            path="/application/:applicationId/addMeeting"
            element={<ProtectedRoute isAuth={isAuth} />}
          >
            <Route
              path="/application/:applicationId/addMeeting"
              element={<AddMeeting />}
            />
          </Route>
          <Route
            path="/meetings/:meetingId"
            element={<ProtectedRoute isAuth={isAuth} />}
          >
            <Route path="/meetings/:meetingId" element={<MeetingView />} />
          </Route>
          <Route
            path="/meetings/:meetingId/schedule"
            element={<ProtectedRoute isAuth={isAuth} />}
          >
            <Route
              path="/meetings/:meetingId/schedule"
              element={<MeetingSchedulingPage />}
            />
          </Route>
          <Route
            path="/userMeetings"
            element={<ProtectedRoute isAuth={isAuth} />}
          >
            <Route path="/userMeetings" element={<UserMeetings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
