import React, { useRef } from "react";
import AdminNav from "./AdminNav";
import axios from "axios";

export default function NewElection() {
  const constituencyname = useRef();
  const date = useRef();
  const duration = useRef();
  const time = useRef();
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const token = localStorage.getItem("token");
  const headers = {
    authorization: token,
    CustomHeader: "custom-value",
  };
  async function addconstituency(e) {
    e.preventDefault();
    try {
      if (constituencyname.current.value === "") {
        alert("empty fields");
      } else {
        const response = await axios.post(
          "http://localhost:8080/constituency/addconstituency",
          { name: constituencyname.current.value },
          { headers }
        );
        if (response.status == 200) {
          alert("new constituency add successfully");
        } else {
          alert("error");
        }
      }
    } catch (error) {
      alert("you are not authorized");
    }
  }
  async function createelection(e) {
    e.preventDefault();
    const startDate = new Date(date.current.value + "T" + time.current.value);
    const durationHours = parseInt(duration.current.value);
    const endDate = new Date(
      startDate.getTime() + durationHours * 60 * 60 * 1000
    );
    try {
      const response = await axios.post(
        "http://localhost:8080/election/createelection",
        {
          startDate: startDate,
          endDate: endDate,
          duration: duration.current.value,
        },
        { headers }
      );
      if (response.status == 200) {
        alert("election had been added successfully");
      } else {
        alert("there is alread an election starting within this date");
      }
    } catch (error) {
      alert("you are not authorized");
    }
  }
  function getNextDay() {
    const currentDate = new Date();
    const nextDay = new Date(currentDate);
    nextDay.setDate(currentDate.getDate() + 1);
  
    // Format the date to YYYY-MM-DD format
    const year = nextDay.getFullYear();
    const month = String(nextDay.getMonth() + 1).padStart(2, "0");
    const day = String(nextDay.getDate()).padStart(2, "0");
  
    return `${year}-${month}-${day}`;
  }
  return (
    <>
      <div className="d-flex">
        <div>
          <AdminNav />
        </div>
        <div className="container">
          <div
            className="container text-center"
            style={{ backgroundColor: "ButtonHighlight" }}
          >
            <div className="row">
              <section style={{ backgroundColor: "ButtonHighlight" }}>
                <div className="container py-5">
                  <div className="row justify-content-center align-items-center h-100">
                    <div className="col-12 col-lg-9 col-xl-7">
                      <div
                        className="card shadow-2-strong card-registration"
                        style={{ borderRadius: "15px" }}
                      >
                        <div className="card-body p-4 p-md-5">
                          <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">
                            Create a New Election
                          </h3>
                          <form className="align-items-end">
                            <div className="row">
                              <div className="col-md-6 mb-4">
                                <div className="form-outline">
                                  <label className="form-label">
                                    Election Date
                                  </label>
                                  <input
                                    type="date"
                                    className="form-control form-control-lg"
                                    ref={date}
                                    min={getNextDay()}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-6 mb-4">
                                <div className="form-outline">
                                  <label className="form-label">Duration</label>
                                  <input
                                    type="number"
                                    className="form-control form-control-lg"
                                    placeholder="in hours"
                                    ref={duration}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-6 mb-4">
                                <div className="form-outline">
                                  <label className="form-label">
                                    start time
                                  </label>
                                  <input
                                    type="time"
                                    className="form-control form-control-lg"
                                    ref={time}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="mt-4 pt-2">
                              <input
                                className="btn btn-primary btn-lg"
                                type="submit"
                                value="Send Request"
                                onClick={createelection}
                              />
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
          <div
            className="container text-center"
            style={{ backgroundColor: "ButtonHighlight" }}
          >
            <div className="row">
              <section style={{ backgroundColor: "ButtonHighlight" }}>
                <div className="container py-5">
                  <div className="row justify-content-center align-items-center h-100">
                    <div className="col-12 col-lg-9 col-xl-7">
                      <div
                        className="card shadow-2-strong card-registration"
                        style={{ borderRadius: "15px" }}
                      >
                        <div className="card-body p-4 p-md-5">
                          <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">
                            ADD CONSTITUENCY
                          </h3>
                          <form className="align-items-end">
                            <div className="row">
                              <div className="col-md-6 mb-4">
                                <div className="form-outline">
                                  <label className="form-label">
                                    Constituency Name
                                  </label>
                                  <input
                                    type="text"
                                    ref={constituencyname}
                                    className="form-control form-control-lg"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="mt-4 pt-2">
                              <input
                                className="btn btn-primary btn-lg"
                                type="submit"
                                value="ADD"
                                onClick={addconstituency}
                              />
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
