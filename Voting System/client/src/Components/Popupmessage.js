import React from "react";
import { Button, Modal } from "react-bootstrap";

export default function Popupmessage({ show, handleClose, message }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Message</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <button className="btn btn-danger" onClick={handleClose}>
          close
        </button>
      </Modal.Footer>
    </Modal>
  );
}
