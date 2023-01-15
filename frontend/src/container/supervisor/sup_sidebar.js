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
  const onLogOut = () => {
    localStorage.removeItem('data');
    window.location = "#/";
  }
  const onTask = () => {
    window.location = "#/tasks";
  };
  const onBonus = () => {
    window.location = "#/bonuslist";
  };
  const onMachine = () => {
    window.location = "#/machineinfo";
  };
  return (

    <div className="d-flex">
      <nav id="sidebar">
        <div className="p-4 pt-5 bg-dark">
          
          <h3 style={{ textAlign: 'center', color: "white" }}><strong>SUPERVISOR</strong></h3>
          
          <h5 style={{ textAlign: 'center', color: "white" }}>{empname}</h5><br />
          
          <hr style={{ backgroundColor: "white" }} />
          <ul className="nav nav-pills flex-column mb-auto">
            <button type="button" className="btn btn-dark w-100" onClick={() => { onDashboard() }}>Dashboard</button><br></br>
            <button type="button" className="btn btn-dark" onClick={() => { onTask() }}>Tasks</button><br></br>
            <button type="button" className="btn btn-dark" onClick={() => { onLogistics() }}>Logistics</button><br></br>
            <button type="button" className="btn btn-dark" onClick={() => { onMachine() }}>Machine Information</button><br></br>
            <button type="button" className="btn btn-dark w-100">Graphs</button><br></br>
            {
              
            }
            <button type="button" className="btn btn-dark">Refinery/Purity Status</button><br></br>
            <hr style={{ backgroundColor: "white" }} />
            <button type="button" className="btn btn-dark">Attendance</button><br></br>
            <button type="button" className="btn btn-dark">Salary</button><br></br>
            <button type="button" className="btn btn-dark" onClick={() => { onBonus() }}>Bonuses</button><br></br>
            
          </ul>
          <hr style={{ backgroundColor: "white" }} />
            <button type="button" className="btn btn-outline-danger btn-block" onClick={() => { onLogOut() }} >Sign out</button><br/>
          {
            data.map((item) => (
              empname = item.name,
              <span></span>
            ))}

          


          <div className="footer">

          </div>

        </div>
      </nav>
    </div>
  );
}

export default SupSidebar;