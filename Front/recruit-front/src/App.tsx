import React from "react";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
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
import { ThemeProvider } from "@emotion/react";
import { Theme } from "./Styles/Theme";
import ProtectedRouteEmployee from "./Components/ProtectedRouteEmployee";
import CandidateApplicationView from "./Components/Applications/CandidateApplicationView";
import MeetingSchedulingRedirect from "./Components/Meetings/MeetingSchedulinkRedirect";
import { ToastContainer } from "react-toastify";

const roles = localStorage.getItem("roles");
const isEmployee = roles ? roles.includes("Employee") : false;
function App() {
  return (
    <GoogleOAuthProvider clientId="724152737023-qh4mjh84lm1r0buhsheotob3biugicgs.apps.googleusercontent.com">
      <ThemeProvider theme={Theme}>
        <ToastContainer></ToastContainer>
        <BrowserRouter>
          <Nav></Nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/projects"
              element={<ProtectedRouteEmployee isEmployee={isEmployee} />}
            >
              <Route path="/projects" element={<Projects />} />
            </Route>
            <Route
              path="/projects/:projectid"
              element={<ProtectedRouteEmployee isEmployee={isEmployee} />}
            >
              <Route path="/projects/:projectid" element={<ProjectView />} />
            </Route>
            <Route path="/positions" element={<ProtectedRoute />}>
              <Route path="/positions" element={<Positions />} />
            </Route>
            <Route
              path="/projects/:projectid/addPosition"
              element={<ProtectedRouteEmployee isEmployee={isEmployee} />}
            >
              <Route
                path="/projects/:projectid/addPosition"
                element={<AddPositionPage />}
              />
            </Route>
            <Route path="/positions/:positionId" element={<ProtectedRoute />}>
              <Route path="/positions/:positionId" element={<PositionView />} />
            </Route>
            <Route
              path="/editPosition/:positionId"
              element={<ProtectedRouteEmployee isEmployee={isEmployee} />}
            >
              <Route
                path="/editPosition/:positionId"
                element={<EditPositions />}
              />
            </Route>
            <Route path="/userApplications" element={<ProtectedRoute />}>
              <Route path="/userApplications" element={<UserApplications />} />
            </Route>
            <Route
              path="/positions/:positionId/applications"
              element={<ProtectedRouteEmployee isEmployee={isEmployee} />}
            >
              <Route
                path="/positions/:positionId/applications"
                element={<PositionApplications />}
              />
            </Route>
            <Route
              path="/application/:applicationId"
              element={<ProtectedRouteEmployee isEmployee={isEmployee} />}
            >
              <Route
                path="/application/:applicationId"
                element={<ApplicationView />}
              />
            </Route>
            <Route
              path="/application/:applicationId/addMeeting"
              element={<ProtectedRouteEmployee isEmployee={isEmployee} />}
            >
              <Route
                path="/application/:applicationId/addMeeting"
                element={<AddMeeting />}
              />
            </Route>
            <Route path="/meetings/:meetingId" element={<ProtectedRoute />}>
              <Route path="/meetings/:meetingId" element={<MeetingView />} />
            </Route>
            <Route
              path="/meetings/:meetingId/schedule"
              element={<ProtectedRoute />}
            >
              <Route
                path="/meetings/:meetingId/schedule"
                element={<MeetingSchedulingPage />}
              />
            </Route>
            <Route path="/userMeetings" element={<ProtectedRoute />}>
              <Route path="/userMeetings" element={<UserMeetings />} />
            </Route>
            <Route
              path="/activeShedule/:randomUrl"
              element={<ProtectedRoute />}
            >
              <Route
                path="/activeShedule/:randomUrl"
                element={<MeetingSchedulingRedirect />}
              />
            </Route>
            <Route
              path="/candidateApplication/:applicationId"
              element={<ProtectedRoute />}
            >
              <Route
                path="/candidateApplication/:applicationId"
                element={<CandidateApplicationView />}
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
