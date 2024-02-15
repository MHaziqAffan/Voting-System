import React, { useEffect, useState } from "react";
import AdminNav from "./AdminNav";
import axios from "axios";

export default function Adminrequest() {
  const [allusers, setallusers] = useState([]);
  const [action, setaction] = useState(false);
  useEffect(() => {
    getallusers();
  }, [action]);
  async function getallusers() {
    try {
      const response = await axios.get(
        "http://localhost:8080/canidate/getallcanidates"
      );
      if (response.status == 200) {
        setallusers(response.data);
      } else {
        alert("cannot get user details");
      }
    } catch (error) {}
  }
  const token=localStorage.getItem("token")
const headers={
  authorization:token,
  CustomHeader:"custom-value"

}
  async function approve(id, conid) {
    try {
      const response = await axios.patch(
        `http://localhost:8080/canidate/approve/${id}/${conid}`,
        {
          status: "a",
        },
        {headers}
        
      );

      if (response.status === 200) {
      }
    } catch (error) {
      alert("internal server error");
    }
    if (action) {
      setaction(false);
    } else {
      setaction(true);
    }
  }

  async function reject(id, conid) {
    try {
      const response = await axios.delete(
        `http://localhost:8080/canidate/reject/${id}/${conid}`
      );

      if (response.status === 200) {
      }
    } catch (error) {
      alert("internal server error");
    }
    if (action) {
      setaction(false);
    } else {
      setaction(true);
    }
  }
  return (
    <>
      <div className="d-flex">
        <div>
          <AdminNav />
        </div>
        <div className="container text-center p-5">
          <div
            className="container mt-5 h-100"
            style={{ backgroundColor: "ButtonHighlight" }}
          >
            <h2>Canidate Requests</h2>
            {allusers.map((user) => (
              <div className="container bg-light m-2 p-2">
                {user.user.name} wants to stand in {user.constituency.name} on
                behalf of {user.party.name}
                <button
                  className="btn btn-success m-3"
                  id={user.cnic}
                  onClick={() => approve(user.cnic, user.constituencyid)}
                >
                  {" "}
                  ACCEPT
                </button>
                <button
                  className="btn btn-danger m-3"
                  id={user.cnic}
                  onClick={() => reject(user.cnic, user.constituencyid)}
                >
                  {" "}
                  REJECT
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
