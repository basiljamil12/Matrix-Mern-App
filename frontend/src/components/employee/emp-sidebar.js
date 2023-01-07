import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


function EmployeeSidebar() {
  return (
    <div className="App">
      <div style={{height: '100vh', width: '20vw'}} className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark">
        <h3 style={{textAlign: 'center'}}>Employee</h3>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">

          <div class="d-grid gap-2">
          <button type="button" class="btn btn-dark">Dashboard</button>
          <button type="button" class="btn btn-dark">Tasks</button>
          <button type="button" class="btn btn-dark">Order Status</button>
          <button type="button" class="btn btn-dark">Machine Information</button>
          <button type="button" class="btn btn-dark">Refinery/Purity Status</button>
          <hr />
          <button type="button" class="btn btn-dark">Attendance</button>
          <button type="button" class="btn btn-dark">Salary</button>
          <button type="button" class="btn btn-dark">Bonuses</button>
          </div>
        </ul>
        <hr />
        <strong style={{textAlign: 'center'}}>Admin</strong><br />
        <button type="button" className="btn btn-outline-danger">Sign out</button>
      </div>
    </div>
  );
}

export default EmployeeSidebar;