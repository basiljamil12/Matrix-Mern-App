import React, { useEffect, useState } from 'react';
import { Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import './../../css/style.css';

let empname;

function SupSidebar(props) {

  const [data, setData] = useState([]);

  useEffect(() => {
    const empdata = JSON.parse(localStorage.getItem('data'));
    if (empdata) {
      setData(empdata);
    }
  }, []);

  const onDashboard = () => {
    window.location = "#/dashboard";
  };

  const onLogistics = () => {
    window.location = "#/logistics";
  }
  
  const onEmployee = () => {
    window.location = "#/empList";
  }

  const onLogOut = () => {
    localStorage.removeItem('data');
    window.location = "#/";
  }
  
  return (

    <div className="d-flex">
      <nav id="sidebar">
        <div className="p-4 pt-5 bg-dark">
          <h3 style={{ textAlign: 'center', color: "white" }}>SUPERVISOR</h3>

          <hr style={{ backgroundColor: "white" }} />
          <ul className="nav nav-pills flex-column mb-auto">
            <button type="button" className="btn btn-dark w-100" onClick={() => { onDashboard() }}>Dashboard</button><br></br>
            <button type="button" className="btn btn-dark" onClick={() => { onEmployee() }}>Employee</button><br></br>
            <button type="button" className="btn btn-dark" >Tasks</button><br></br>
            <button type="button" className="btn btn-dark" onClick={() => { onLogistics() }}>Logistics</button><br></br>
            <button type="button" className="btn btn-dark">Machine Information</button><br></br>
            <button type="button" className="btn btn-dark w-100">Graphs</button><br></br>
            {
              
            }
            <button type="button" className="btn btn-dark">Refinery/Purity Status</button><br></br>
            <hr style={{ backgroundColor: "white" }} />
            <button type="button" className="btn btn-dark">Attendance</button><br></br>
            <button type="button" className="btn btn-dark">Salary</button><br></br>
            <button type="button" className="btn btn-dark">Bonuses</button><br></br>

          </ul>
          {
            data.map((item) => (
              empname = item.name,
              <span></span>
            ))}
          <hr style={{ backgroundColor: "white" }} />
          <h3 style={{ textAlign: 'center', color: "white" }}>{empname}</h3><br />
          <button type="button" className="btn btn-outline-danger btn-block" onClick={() => { onLogOut() }} >Sign out</button>


          <div className="footer">

          </div>

        </div>
      </nav>
    </div>
  );
}

export default SupSidebar;