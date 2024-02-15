import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
export default function Signup() {
  const cnic = useRef();
  const name = useRef();
  const email = useRef();
  const password = useRef();
  const constituencyid = useRef();
  const imageInputRef = useRef();
  const navigate = useNavigate();
  const [constituencies, setconstituencies] = useState([]);
  useEffect(() => {
    getconstituencies();
  }, []);
  async function getconstituencies() {
    try {
      const response = await axios.get(
        "http://localhost:8080/constituency/getallconstituency"
      );
      if (response.status == 200) {
        setconstituencies(response.data);
      } else {
        alert("cannot get constituency details");
      }
    } catch (error) {}
  }
  const token = localStorage.getItem("token");
  const submithandler = async (e) => {
    e.preventDefault();
    try {
      if (
        cnic.current.value === "" ||
        name.current.value === "" ||
        password.current.value === ""
      ) {
        alert("Please don't leave the essential fields empty");
      } else {
        const formData = new FormData();
        formData.append("cnic", cnic.current.value);
        formData.append("name", name.current.value);
        formData.append("email", email.current.value);
        formData.append("password", password.current.value);
        formData.append("constituencyid", constituencyid.current.value);
        formData.append("type", "v");
        formData.append("image", imageInputRef.current.files[0]); // Add the selected image file

        const response = await axios.post(
          "http://localhost:8080/user/signup",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              authorization: token,
              CustomHeader: "custom-value", // Set the correct content type for file uploads
            },
          }
        );

        if (response.status === 200) {
          alert("You are successfully registered as a voter");
          navigate("/login");
        } else if(response.status==201) {
          alert("Please enter a unique CNIC");
        }
        else{
          alert("erro in cloundinary server")
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
                  <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">
                    Registration Form
                  </h3>
                  <form>
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            ref={name}
                          />
                          <label className="form-label" htmlFor="firstName">
                            Name
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            ref={cnic}
                          />
                          <label className="form-label" htmlFor="lastName">
                            CNIC
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-4 pb-2">
                        <div className="form-outline">
                          <input
                            type="email"
                            className="form-control form-control-lg"
                            ref={email}
                          />
                          <label className="form-label" htmlFor="emailAddress">
                            Email
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4 pb-2">
                        <div className="form-outline">
                          <input
                            type="password"
                            className="form-control form-control-lg"
                            ref={password}
                          />
                          <label className="form-label" htmlFor="phoneNumber">
                            Password
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-12">
                        <select
                          className="select form-control-lg"
                          ref={constituencyid}
                        >
                          <option value="1" disabled>
                            Choose Your Constituency
                          </option>
                          {constituencies.map((constituency) => (
                            <option value={constituency.id}>
                              {constituency.name}
                            </option>
                          ))}
                        </select>
                        <label className="form-label select-label">
                          Choose Your Constituency
                        </label>
                      </div>
                    </div>

                    <div className="row">
                      <div className="mt-4 pt-2 d-flex d-flex justify-content-center">
                        <input
                          className="btn btn-primary btn-lg"
                          type="file"
                          accept="image/*"
                          ref={imageInputRef}
                          style={{ display: "none" }}
                          onChange={(e) => {
                            const fileNameElement =
                              document.getElementById("selectedFileName");
                            fileNameElement.textContent =
                              e.target.files[0].name;
                          }}
                        />

                        <button
                          className="btn btn-primary btn-lg"
                          type="button"
                          onClick={() => imageInputRef.current.click()} // Open file dialog when the button is clicked
                        >
                          Choose Image
                        </button>
                        <p id="selectedFileName">Selected file: None</p>
                      </div>
                    </div>

                    <div className="mt-4 pt-2">
                      <button
                        className="btn btn-primary btn-lg"
                        type="submit"
                        onClick={submithandler}
                      >
                        submit
                      </button>
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                      <Link to="/login">Go to Login Page</Link>
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
