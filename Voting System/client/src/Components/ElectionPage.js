import React, { useEffect, useState } from "react";
import { useSharedProps } from "./UserConext.js";
import UserNav from "./UserNav";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
export default function ElectionPage() {
  const navigate = useNavigate();
  const [canidates, setcandiates] = useState([]);
  const [constituencyid, setconstituencyid] = useState([]);
  const { sharedProps } = useSharedProps();
  const [vote, setvote] = useState(true);
  const { electionid } = useParams();
  const [userid, setuserid] = useState(sharedProps.usercnic);
  useEffect(() => {
    fetchconstituencyid();
    setuserid(sharedProps.usercnic);
  }, []);

  useEffect(() => {
    if (constituencyid.constituencyid) {
      fetchcanidates();
    }
  }, [constituencyid]);
  async function fetchcanidates() {
    {
      try {
        const response = await axios.get(
          `http://localhost:8080/canidate/fetchcanidates/${userid}/${constituencyid.constituencyid}`
        );
        if (response.status == 200) setcandiates(response.data);
        else {
          alert("error");
        }
      } catch (error) {
        alert("internal server error");
      }
    }
  }
  async function fetchconstituencyid() {
    try {
      const response = await axios.get(
        `http://localhost:8080/user/fetchconstituencyid/${sharedProps.usercnic}`
      );
      if (response.status == 200) setconstituencyid(response.data);
      else {
        alert("error");
      }
    } catch (error) {
      alert("internal server error");
    }
  }
  const token = localStorage.getItem("token");
  const headers = {
    authorization: token,
    CustomHeader: "custom-value",
  };
  async function voteclick(e) {
    e.preventDefault();
    setvote(false);
    try {
      const response = await axios.post(
        "http://localhost:8080/vote/votedone",
        {
          votercnic: userid,
          canidateid: e.target.id,
          electionid: electionid,
        },
        { headers }
      );
      if (response.status == 200) {
        alert("your vote had been casted successfully");
        navigate(-1);
      } else {
        alert("error");
      }
    } catch (error) {
      alert("you are not authorized");
      navigate('/')
    }
  }

  return (
    <>
      <div className="d-flex">
        <div>
          <UserNav />
        </div>
        <div
          className="container radius"
          style={{ backgroundColor: "ButtonHighlight" }}
        >
          <div className="container bg-dark p-5">
            {canidates.map((canidate) => (
              <div className="container bg-light m-2 p-2">
                {canidate.user.name} is standing in {canidate.constituency.name}
                on behalf on {canidate.party.name}
                {vote ? (
                  <button
                    id={canidate.cnic}
                    className="btn btn-success ms-5"
                    onClick={voteclick}
                  >
                    VOTE
                  </button>
                ) : (
                  <button className="btn btn-danger ms-5" disabled>
                    VOTE
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
