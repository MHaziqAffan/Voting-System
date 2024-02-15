import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import UserNav from "./UserNav";

export default function UserResult() {
  const { electionid } = useParams();
  const navigate=useNavigate()
  const [results, setresults] = useState([]);
  const [winner, setwinner] = useState([]);
  useEffect(() => {
    generateresults();
    calculatewinner();
  }, []);
  const generateresults = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/vote/electionresult/${electionid}`
      );
      if (response.status == 200) {
        setresults(response.data);
      } else {
        alert("no result");
      }
    } catch (error) {
      alert("internal server error");
    }
  };
  const calculatewinner = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/vote/winner/${electionid}`
      );
      if (response.status == 200) {
        setwinner(response.data);
      } else {
        alert("admin had not finalized the result yet");
        navigate(-1)
      }
    } catch (error) {
      alert("internal server error");
    }
  };
  return (
    <>
      <div className="d-flex">
        <UserNav />
        <div
          className="container text-center p-5"
          style={{ backgroundColor: "ButtonHighlight" }}
        >
          <div className="container m-2 p-2 h-50 bg-light">
            <h1 className="text-primary"> Vote Count</h1>
            {results.map((canidate) => (
              <div className="container bg-light m-2 p-2">
                {canidate.canidateName} got {canidate.count} Votes
              </div>
            ))}
          </div>
          <div className="container m-2 p-2 h-50 bg-light">
            <h1 className="text-primary"> WINNER</h1>
            {winner.map((canidate) => (
              <div className="container bg-light m-2 p-2">
                {canidate.canidateName}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
