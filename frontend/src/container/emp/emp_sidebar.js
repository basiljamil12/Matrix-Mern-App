import React from 'react';
import { Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import './../../css/style.css';


function EmpSidebar(props) {

  const onEmployee = () => {
    window.location = "#/empList";
  };

  return (

    <div className="d-flex">
      <nav id="sidebar">
        <div className="p-4 pt-5">
          <h3 style={{ textAlign: 'center' }}>Employee</h3>
   
          <hr />
          <ul className="nav nav-pills flex-column mb-auto">
        
            <button type="button" className="btn btn-dark" onClick={() => { onEmployee() }}>Employee</button><br></br>
            <button type="button" className="btn btn-dark" >Tasks</button><br></br>
            <button type="button" className="btn btn-dark">Order Status</button><br></br>
            <button type="button" className="btn btn-dark">Machine Information</button><br></br>
            <button type="button" className="btn btn-dark">Refinery/Purity Status</button><br></br>
            <hr />
            <button type="button" className="btn btn-dark">Attendance</button><br></br>
            <button type="button" className="btn btn-dark">Salary</button><br></br>
            <button type="button" className="btn btn-dark">Bonuses</button><br></br>
           
          </ul>

          <hr />

          <strong style={{textAlign: 'center'}}>Admin</strong><br />
          <button type="button" className="btn btn-outline-danger">Sign out</button>
          <div className="footer">
          </div>
        </div>
      </nav>
    </div>
  );
}

export default EmpSidebar;