import React from "react";
import Nav from "./Nav";

export default function Home() {
  return (
    <>
      <div>
        <Nav />
      </div>
      <div className="container-fluid mt-5">
        <div className="text">
          <img className="mb-3" src="vote.jpg" alt="" />
          <div className="rounded border border-primary p-3">
            <h3>WELCOME TO E VOTING</h3>
            <h2>Lets Make Elections Easy and Fair</h2>
          </div>
        </div>
      </div>
    </>
  );
}
