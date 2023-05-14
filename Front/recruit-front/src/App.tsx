import React from "react";
import Home from "./Pages/HomePage";
import Login from "./Pages/LoginPage";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Nav from "./Components/Nav";
import "./App.css";
import Projects from "./Pages/ProjectsPage";
import ProtectedRoute from "./Components/ProtectedRoute";
import Positions from "./Pages/PositionsPage";
import ProjectView from "./Pages/ProjectViewPage";
import PositionView from "./Pages/PositionViewPage";
import AddPositionPage from "./Components/Positions/AddPositionForm";
import EditPositions from "./Pages/EditPositionsPage";
import UserApplications from "./Pages/UserApplicationsPage";
import PositionApplications from "./Pages/PossitionApplicationsPage";
import ApplicationView from "./Pages/ApplicationViewPage";
import AddMeeting from "./Pages/AddMeetingPage";
import MeetingView from "./Pages/MeetingView";
import MeetingSchedulingPage from "./Pages/MeetingSchedulingPage";
import UserMeetings from "./Pages/UserMeetingsPage";
import { ThemeProvider } from "@emotion/react";
import { Theme } from "./Styles/Theme";
import ProtectedRouteEmployee from "./Components/ProtectedRouteEmployee";
import CandidateApplicationView from "./Pages/CandidateApplicationView";
import MeetingSchedulingRedirect from "./Components/Meetings/MeetingSchedulinkRedirect";
import { ToastContainer } from "react-toastify";
import { GOOGLE_CLIENT_ID } from "./appConfig";

const roles = localStorage.getItem("roles");
const isEmployee = roles ? roles.includes("Employee") : false;
function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
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
