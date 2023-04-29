import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../Loading/Loader";

const MeetingSchedulingRedirect = () => {
  const navigate = useNavigate();
  const { randomUrl } = useParams();

  async function getMeeting() {
    const response = await axios.get(`/meetings/url/${randomUrl}`);
    if (response.status === 200) {
      const meet = await response.data;
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
