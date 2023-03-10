import { CircularProgress } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../Loading/Loader";

const MeetingSchedulingRedirect = () => {
  const navigate = useNavigate();
  const { randomUrl } = useParams();
  const [meetId, setMeetId] = useState(null);

  async function getMeeting() {
    console.log(randomUrl);
    const response = await axios.get(`/meetings/url/${randomUrl}`);
    if (response.status === 200) {
      const meet = await response.data;
      console.log(meet);

      navigate(`/meetings/${meet.id}/schedule`);
    }
  }

  useEffect(() => {
    getMeeting();
  });

  return (
    <div>
      <Loader />
    </div>
  );
};

export default MeetingSchedulingRedirect;