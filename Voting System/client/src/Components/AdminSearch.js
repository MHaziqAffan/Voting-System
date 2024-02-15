import React, { useEffect, useState } from "react";
import { useSharedProps } from "./UserConext.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminNav from "./AdminNav";

export default function AdminSearch() {
  const [elections, setelections] = useState([]);
  const navigate = useNavigate();
  const { sharedProps } = useSharedProps();
  useEffect(() => {
    isanyelection();
  }, []);
  async function isanyelection() {
    try {
      const response = await axios.get(
        "http://localhost:8080/election/getallelections"
      );
      if (response.status == 200) {
        setelections(response.data);
      } else {
      }
    } catch (error) {}
  }

  const nextpage = (e) => {
    e.preventDefault();
    navigate(`/showresult/${e.target.id}`);
  };
  return (
    <>
      <div className="d-flex">
        <div>
          <AdminNav />
        </div>
        <div
          className="container"
          style={{ backgroundColor: "ButtonHighlight" }}
        >
          <div className="container rounded mt-5 mb-5 p-5 bg-black h-50vh">
            {elections.map((election) => (
              <div
                className="container bg-light rounded justify-content-center align-items-center"
                key={election.id}
              >
                <div>
                  <p className="text-success">
                    start Date:{" "}
                    {new Date(election.startDate).toLocaleDateString()}
                    <br />
                    start Time:{" "}
                    {new Date(election.startDate).toLocaleTimeString()}
                  </p>
                  <p className="text-danger">
                    end Date: {new Date(election.endDate).toLocaleDateString()}
                    <br />
                    end Time: {new Date(election.endDate).toLocaleTimeString()}
                  </p>
                  <p className="text-danger">
                    current Date: {new Date().toLocaleDateString()}
                    <br />
                    current Time: {new Date().toLocaleTimeString()}
                  </p>
                  <p className="text-primary me-5">
                    duration: {election.duration} hours
                    {new Date(election.endDate) < new Date() ? (
                      <button
                        className="btn btn-primary ms-5"
                        id={election.id}
                        onClick={nextpage}
                      >
                        Results
                      </button>
                    ) : null}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
