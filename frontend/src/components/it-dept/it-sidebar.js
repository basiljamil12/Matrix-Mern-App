import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './../../css/style.css';
import Dashboard from "../../container/Dashboard";

const onEmployee = () => {
  window.location = "#/empList";
};

const forDashboard = () => {
  window.location = "#/App";
}

const onLogistics = () => {
  window.location = "#/logistics";
}

function ItSidebar() {
  return (
    <div className="App d-flex">

      <nav id="sidebar">
        <div className="p-4 pt-5">
          <h3 style={{ textAlign: 'center' }}>IT Department</h3>

          <hr />
          <ul className="nav nav-pills flex-column mb-auto">

            <button type="button" className="btn btn-dark" onClick={() => {forDashboard()}} >Dashboard</button><br></br>
            <button type="button" className="btn btn-dark" onClick={() => { onEmployee() }} >Employee Data</button><br></br>
            <button type="button" className="btn btn-dark" onClick={() => { onLogistics() }} >Logistics</button><br></br>

          </ul>

          <hr />

          <strong style={{ textAlign: 'center' }}>Admin</strong><br />
          <button type="button" className="btn btn-outline-danger">Sign out</button>
          <div className="footer">

          </div>
        </div>
      </nav>
    </div>
  );
}

export default ItSidebar;