import React from "react";
import AdminNav from "./AdminNav";

export default function AdminHome() {
  return (
    <>
      <div className="d-flex">
        <div>
          <AdminNav />
        </div>
        <div className="container adminback"></div>
      </div>
    </>
  );
}
