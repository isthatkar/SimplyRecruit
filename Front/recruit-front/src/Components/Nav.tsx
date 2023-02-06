import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import Button from "@mui/material/Button";
import React from "react";

const Nav = () => {
  const navigate = useNavigate();
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
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to={"/login"}>
              Login
            </Link>{" "}
          </li>
          <li className="nav-item">
            <Link
              className="nav-link active"
              aria-current="page"
              to={"/register"}
            >
              Register
            </Link>{" "}
          </li>
        </ul>
        <div className="navbar-collapse collapse w-100 order-3 dual-collapse2"></div>
        <div className="nav-item ">
          <Button>Logout</Button>{" "}
        </div>
        {/*  {token ? (
                    <ul className="navbar-nav justify-content-right">
                        <li className="nav-item mr-1">
                            <Button onClick={(e) => Logout(e)}>Logout</Button>{' '}
                        </li>
                    </ul>
                ) : (
                    ''
                )} */}
      </div>
    </nav>
  );
};

export default Nav;
