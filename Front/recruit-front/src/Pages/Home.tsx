import React from "react";

const Home = () => {
  const token = localStorage.getItem("accessToken");
  const roles = localStorage.getItem("roles");
  const isEmployee = roles ? roles.includes("Employee") : false;
  return <div>{roles}</div>;
};

export default Home;
