import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import Button from "@mui/material/Button";
import React from "react";
import LogoutButton from "./Auth/LogoutButton";

const Nav = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark sticky-top">
      <a className="navbar-brand mb-0 ml-1 h2" href="/">
        <WorkOutlineIcon
          width="30"
          height="30"
          className="d-inline-block align-top mx-4"
        />
        Simply Recruit
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarsExample02"
        aria-controls="navbarsExample02"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="navbar navbar-dark bg-dark" id="navbarsExample02">
        <ul className="navbar-nav mr-auto">
          {!token ? (
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to={"/login"}
              >
                Login
              </Link>{" "}
            </li>
          ) : (
            ""
          )}
        </ul>
        <div className="navbar-collapse collapse w-100 order-3 dual-collapse2"></div>

        {token ? (
          <ul className="navbar-nav justify-content-right">
            <li className="nav-item mr-1">
              <LogoutButton></LogoutButton>
            </li>
          </ul>
        ) : (
          ""
        )}
      </div>
    </nav>
  );
};

export default Nav;
