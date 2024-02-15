import React from "react";
import { Link } from "react-router-dom";
export default function Nav() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-primary">
        <a className="navbar-brand" href="#">
          <img className="logo" src="vote.jpg" alt="" />
          E-Vote
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse">
          <div className="navbar-nav mx-auto justify-content-between w-100 ms-5 ">
            <Link className="nav-item nav-link text-light bg-primary" to="/">
              Home
            </Link>
            <Link
              className="nav-item nav-link text-light bg-primary"
              to="/login"
            >
              Login
            </Link>
            <Link
              className="nav-item nav-link text-light bg-primary"
              to="/signin"
            >
              SignUp
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
