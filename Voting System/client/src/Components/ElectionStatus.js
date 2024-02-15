import React, { useEffect, useState } from "react";
import UserNav from "./UserNav";
import { useSharedProps } from "./UserConext.js";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function ElectionStatus() {
  const [elections, setelections] = useState([]);
  const [castvote, setcastvote] = useState(true);
  const navigate = useNavigate();
  const { sharedProps } = useSharedProps();
  useEffect(() => {
    isanyelection();
    isvotecasted();
  },[]);
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
    navigate(`/userhome/${sharedProps.usercnic}/election/${e.target.id}`);
  };
  const isvotecasted = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/vote/isvotecasted/${sharedProps.usercnic}`
      );
      if (response.status == 200) {
        setcastvote(false);
      } else {
        setcastvote(true);
      }
    } catch (error) {
      alert("internal server error");
    }
  };
  const resultpage = (e) => {
    e.preventDefault();
    navigate(`/userhome/${sharedProps.usercnic}/results/${e.target.id}`);
  };
  return (
    <>
      <div className="d-flex">
        <div>
          <UserNav />
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
                    {new Date(election.startDate) <= new Date() &&
                    new Date(election.endDate) >= new Date() ? (
                      castvote ? (
                        <button
                          className="btn btn-primary ms-5"
                          id={election.id}
                          onClick={nextpage}
                        >
                          PARTICIPATE
                        </button>
                      ) : (
                        <div className="container m-3 p-3 bg-light rounded justify-content-center align-items-center">
                          <div className="bg-danger d-flex justify-content-center align-items-center">
                            <p className="text-white text-center">
                              You have already casted vote in this election
                            </p>
                          </div>
                        </div>
                      )
                    ) : // Check if the election is expired
                    new Date(election.endDate) < new Date() ? (
                      <button
                        className="btn btn-primary ms-5"
                        id={election.id}
                        onClick={resultpage}
                      >
                        Get Result
                      </button>
                    ) : (
                      <div className="container bg-light"></div>
                    )}
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
