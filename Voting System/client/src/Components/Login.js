import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSharedProps } from "./UserConext.js";
export default function Login() {
  const cnic = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const { sharedProps, setSharedProps } = useSharedProps();
  const token=localStorage.getItem("token")
  const headers={
    authorization:token,
    CustomHeader:"custom-value"
  
  }
  const submithandler = async (e) => {
    e.preventDefault();
    try {
      if (cnic.current.value === "" || password.current.value === "") {
        alert("Please don't leave the essential fields empty.");
      } else {
        const response = await axios.post("http://localhost:8080/user/login", {
          cnic: cnic.current.value,
          password: password.current.value,
        },
        {headers});
  
        if (response.status === 200) {
          alert("Login verified");
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("userid", cnic.current.value);
          const updatedSharedProps = {
            ...sharedProps,
            usercnic: cnic.current.value,
          };
          setSharedProps(updatedSharedProps);
          if (response.data.type === "v") {
            navigate(`/userhome/${cnic.current.value}`);
          } else {
            navigate(`/adminhome/${cnic.current.value}`);
          }
        } else {
          alert("Wrong credentials.");
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  return (
    <>
      <section className="gradient-custom">
        <div className="container py-5">
          <div className="row justify-content-center align-items-center h-100">
            <div className="col-12 col-lg-9 col-xl-7">
              <div
                className="card shadow-2-strong card-registration"
                style={{ borderRadius: "15px" }}
              >
                <div className="card-body p-4 p-md-5">
                  <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Login Form</h3>
                  <form>
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            ref={cnic}
                          />
                          <label className="form-label">CNIC</label>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-4 pb-2">
                        <div className="form-outline">
                          <input
                            type="password"
                            className="form-control form-control-lg"
                            ref={password}
                          />
                          <label className="form-label">Password</label>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-2">
                      <input
                        className="btn btn-primary btn-lg"
                        type="submit"
                        value="Submit"
                        onClick={submithandler}
                      />
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                      <Link to="/signin">Go to SignUp Page</Link>
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                      <Link to="/">Go to Home Page</Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
