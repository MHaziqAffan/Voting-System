import React, { useRef } from "react";
import { useEffect, useState } from "react";
import UserNav from "./UserNav";
import PopupToAddParty from "./PopupToAddParty";
import axios from "axios";
import { useSharedProps } from "./UserConext";
export default function Canidateform() {
  const [check, setcheck] = useState(false);
  const constituencyid = useRef();
  const partyid = useRef();
  const { sharedProps } = useSharedProps();
  const [parties, setparties] = useState([]);
  const [constituencies, setconstituencies] = useState([]);
  const [show, setShow] = useState(false);
  const [messageshow, setmessageshow] = useState(false);
  useEffect(() => {
    getparties();
    getconstituencies();
  }, [show]);
  function handler() {
    setcheck(true);
  }
  const token = localStorage.getItem("token");
  const headers = {
    authorization: token,
    CustomHeader: "custom-value",
  };
  async function getparties() {
    try {
      const response = await axios.get(
        "http://localhost:8080/party/getallparty"
      );
      if (response.status == 200) {
        setparties(response.data);
      } else {
        alert("cannot get party details");
      }
    } catch (error) {}
  }
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
  const handleClose = () => {
    setcheck(false);
    setShow(false);
    setmessageshow(true);
  };
  const handleShow = (e) => {
    e.preventDefault();
    setShow(true);
  };
  const handleClosepopup = () => {
    setcheck(false);
    setmessageshow(false);
    // setmessage("New Party Added Successfully");
  };
  function generateUniqueId() {
    const timestamp = new Date().getTime().toString(36);
    const random = Math.random().toString(36).substring(2, 5); // Adjust length as needed

    return `${timestamp}-${random}`;
  }
  const sendrequest = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/canidate/addcanidate",
        {
          id: generateUniqueId(),
          cnic: sharedProps.usercnic,
          constituencyid: constituencyid.current.value,
          partyid: partyid.current.value,
          status: "p",
        },
        { headers }
      );

      if (response.status == 200) {
        alert("Your request had been send. Wait for its approval");
      } else if (response.status == 201) {
        alert(`${response.data.message}`);
      } else {
        alert("internal server error");
      }
    } catch (error) {
      
        alert("you are not authorized")
      
    }
  };

  return (
    <>
      <div className="d-flex">
        <div>
          <UserNav />
        </div>
        <div
          className="container text-center"
          style={{ backgroundColor: "ButtonHighlight" }}
        >
          <div className="row p-5">
            <p>
              <br />
              <br /> Congratulations on taking the courageous step towards
              candidacy. Your decision to become a candidate is an important
              commitment to our community and nation. As you embark on this
              journey, remember to be fair to yourself, the people you
              represent, and our country. Embrace diversity, practice active
              listening, and approach your role with honesty and integrity. Your
              dedication to excellence and the principles of fairness will
              undoubtedly contribute to positive change. Your efforts have the
              potential to inspire others and shape a brighter future. We
              believe in your ability to make a meaningful impact and wish you
              the best on your path of service. With support and encouragement,
              <br />
            </p>
            <button className="btn btn-secondary" onClick={handler}>
              {" "}
              I promise I will do my best for my country
            </button>
          </div>
          {check ? (
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
                            Canidate Form
                          </h3>
                          <form className="align-items-end">
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
                            <div className="row mt-5">
                              <div className="col-12">
                                <select
                                  className="select form-control-lg"
                                  ref={partyid}
                                >
                                  <option value="1" disabled>
                                    Choose Your Party
                                  </option>
                                  {parties.map((party) => (
                                    <option value={party.id}>
                                      {party.name}
                                    </option>
                                  ))}
                                </select>
                                <label className="form-label select-label">
                                  Choose Your Party
                                </label>
                                <button
                                  className="btn btn-success ms-4"
                                  onClick={handleShow}
                                >
                                  {" "}
                                  Add New Party
                                </button>
                              </div>
                            </div>
                            <div className="mt-4 pt-2">
                              <input
                                className="btn btn-primary btn-lg"
                                type="submit"
                                value="Send Request"
                                onClick={sendrequest}
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
          ) : (
            <></>
          )}
        </div>
      </div>
      <PopupToAddParty
        show={show}
        handleClose={handleClose}
        setshow={setShow}
      />
      {/* <Popupmessage
        show={messageshow}
        handleClose={handleClosepopup}
        message={message}
        setmessageshow={setmessage}
      /> */}
    </>
  );
}
