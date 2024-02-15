import React, { useEffect, useState } from "react";
import { useSharedProps } from "./UserConext.js";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
export default function AdminNav() {
  const { sharedProps } = useSharedProps();
  const [userdetails, setuserdetails] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    initialuser();
  }, []);
  async function initialuser() {
    try {
      const response = await axios.get(
        `http://localhost:8080/user/findone/${sharedProps.usercnic}`
      );
      if (response.status == 200) {
        setuserdetails(response.data);
      } else {
        alert("cannot get user details");
        navigate("/login");
      }
    } catch (error) {}
  }
  const logout=(e)=>{
    e.preventDefault()
        localStorage.removeItem("token")
        localStorage.removeItem("sharedProps")
        navigate('/')
      }
  return (
    <>
      {sharedProps.usercnic ? (
        <nav
          className="col-md-3 col-lg-2 d-md-block bg-light sidebar"
          style={{ height: "100vh", width: "30vh" }}
        >
          <div className="h-100 d-flex flex-column">
            {/* User Info Section */}
            <div className="d-flex justify-content-center align-items-center p-3">
              <img
                src={userdetails.picture}
                className="rounded-circle img-fluid"
                style={{ width: "70px", height: "70px" }}
                alt="Profile"
              />
              <span className="ms-2">{userdetails.name}</span>
            </div>
            {/* Navigation Links */}
            <ul className="nav flex-column d-flex justify-content-between">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  to={`/adminhome/${sharedProps.usercnic}`}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to={`/adminhome/${sharedProps.usercnic}/createelection`}
                >
                  Create an Election
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to={`/adminhome/${sharedProps.usercnic}/requests`}
                >
                  Requests to Approve
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to={`/adminhome/${sharedProps.usercnic}/calculateresult`}
                >
                  Result
                </Link>
              </li>
            </ul>
            {/* Logout Button */}
            <div className="mt-auto text-center mb-3">
              <Link className="btn btn-danger" onClick={logout}>
                Logout
              </Link>
            </div>
          </div>
        </nav>
      ) : (
        navigate("/login")
      )}
    </>
  );
}
