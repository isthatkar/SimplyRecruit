import axios from "axios";
import React, { useEffect, useState } from "react";

const Home = () => {
  const token = localStorage.getItem("accessToken");
  const [name, setName] = useState("");

  useEffect(() => {
    (async () => {
      const bodyParameters = {};
      const response = await axios.get("curentUser");

      setName(response.data.email);
    })();
  }, []);

  const roles = localStorage.getItem("roles");
  return (
    <div>
      {roles} {name}
    </div>
  );
};

export default Home;
