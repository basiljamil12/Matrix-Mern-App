import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


function ItSidebar() {
  return (
    <div className="App">
      <div style={{height: '100vh', width: '20vw'}} className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark">
        <h3 style={{textAlign: 'center'}}>IT Department</h3>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">

          <div class="d-grid gap-2">
          <button type="button" class="btn btn-dark">Dashboard</button>

          <button type="button" class="btn btn-dark">Employee Data</button>
          </div>
        </ul>
        <hr />
        <strong style={{textAlign: 'center'}}>Admin</strong><br />
        <button type="button" className="btn btn-outline-danger">Sign out</button>
      </div>
    </div>
  );
}

export default ItSidebar;