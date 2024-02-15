import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserNav from "./UserNav";
import axios from "axios";
export default function UserHome() {
  const { cnic } = useParams();
  const [username, setuser] = useState("");
  const [usercnic, setusercnic] = useState("");
  useEffect(() => {
    getuser();
  }, [username]);
  async function getuser() {
    try {
      const response = await axios.get(
        "http://localhost:8080/user/findone?id=" + (cnic ? cnic : "")
      );
      setuser(response.data.name);
      setusercnic(response.data.cnic);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <>
      <div className="d-flex">
        <div>
          <UserNav username={username} usercnic={usercnic} />
        </div>
        <div
          className="container text-center p-5"
          style={{ backgroundColor: "ButtonHighlight" }}
        >
          <h1 className="text-black mt-5">Welcome to E-vote User Pannel</h1>
          <div className="text-start">
            <h2>Candidate Form:</h2>
            <p>
              Click on the "Candidate Form" option in the navbar. If you're
              interested in becoming a candidate and contributing to the
              election process, this is the option for you.
              <br />
              The Candidate Form allows you to provide necessary information and
              details to participate as a candidate in the upcoming election.
              <br />
              Fill in the required fields, upload relevant documents, and submit
              your candidacy application. <br />
              Your application will be reviewed by the administrator, and you'll
              be notified once it's approved
              <br />
              Feel free to reach out to us if you have any questions or need
              assistance with the application process.
              <br />
            </p>
            <h2>Election Status:</h2>
            <p>
              To get updates and information about the ongoing election, click
              on the "Election Status" option in the navbar.
              <br />
              The Election Status page provides you with real-time information
              about the current state of the election process.
              <br />
              You can view details such as the polling schedule, the list of
              candidates, and the overall progress of the election.
              <br />
              Stay informed about the latest developments and outcomes of the
              election by visiting the Election Status page regularly.
              <br />
              If you have any queries or require additional information, feel
              free to contact our support team.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
