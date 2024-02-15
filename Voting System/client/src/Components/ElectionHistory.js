import React from "react";
import AdminNav from "./AdminNav";

export default function ElectionHistory() {
  return (
    <>
      <div className="d-flex">
        <div>
          <AdminNav />
        </div>
        <div
          className="container text-center p-5"
          style={{ backgroundColor: "ButtonHighlight" }}
        >
          <div className="row">
            <div className="col-12">
              <label className="form-label">Search by Election ID</label>
              <select className="select form-control-lg ms-4">
                <option value="1" disabled>
                  Choose Election ID
                </option>
                <option value="2">1</option>
                <option value="3">2</option>
                <option value="4">3</option>
              </select>
              <label className="form-label select-label"></label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
