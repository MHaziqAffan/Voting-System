import axios from "axios";
import React, { useRef, useState } from "react";
import { Button, Modal } from "react-bootstrap";

export default function PopupToAddParty(props) {
  const imageInputRef = useRef();
  const partyname = useRef();
  function generateUniqueId() {
    const timestamp = new Date().getTime().toString(36);
    const random = Math.random().toString(36).substring(2, 5); // Adjust length as needed

    return `${timestamp}-${random}`;
  }
  const token = localStorage.getItem("token");
  const submithandler = async (e) => {
    e.preventDefault();
    try {
      if (partyname.current.value === "") {
        alert("Please don't leave the essential fields empty");
      } else {
        const formData = new FormData();
        formData.append("id", generateUniqueId());
        formData.append("name", partyname.current.value);
        formData.append("symbol", imageInputRef.current.files[0]); // Add the selected image file

        const response = await axios.post(
          "http://localhost:8080/party/addparty",
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
          alert("party added successfully");
          props.setshow(false);
        } else {
          alert("error");
        }
      }
    } catch (error) {
      alert("you are not authorized")
    }
  };
  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add a new Political Party</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="form-group">
          <label> Party Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your Part Name"
            ref={partyname}
          />
        </div>

        <div className="form-group mt-5">
          <label>Party Symbol</label>
          <div>
            <input
              className="btn btn-primary btn-lg"
              type="file"
              accept="image/*"
              ref={imageInputRef}
              style={{ display: "none" }}
              onChange={(e) => {
                const fileNameElement =
                  document.getElementById("selectedFileName");
                fileNameElement.textContent = e.target.files[0].name;
              }} // Handle file selection
            />
            <button
              className="btn btn-primary btn-lg mt-3"
              type="button"
              onClick={() => imageInputRef.current.click()} // Open file dialog when the button is clicked
            >
              Choose Image
            </button>
            <p id="selectedFileName">Selected file: None</p>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-danger" onClick={submithandler}>
          ADD
        </button>
      </Modal.Footer>
    </Modal>
  );
}
