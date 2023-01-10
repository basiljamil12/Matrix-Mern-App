import React from 'react';
import { Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css"
import { Routes } from './routes/index.js';
import Dashboard from "./container/Dashboard";

import './css/style.css';

function App(props) {

  const onEmployee = () => {
    window.location = "#/empList";
  };

  return (

    <div class="wrapper d-flex align-items-stretch">

      <nav id="sidebar">
        <div class="p-4 pt-5">
          <h3 style={{ textAlign: 'center' }}>Employee</h3>
          <hr />
          <ul class="nav nav-pills flex-column mb-auto">
        
            <button type="button" class="btn btn-dark" onClick={() => { onEmployee() }}>Employee</button><br></br>
            <button type="button" class="btn btn-dark" >Tasks</button><br></br>
            <button type="button" class="btn btn-dark">Order Status</button><br></br>
            <button type="button" class="btn btn-dark">Machine Information</button><br></br>
            <button type="button" class="btn btn-dark">Refinery/Purity Status</button><br></br>
            <hr />
            <button type="button" class="btn btn-dark">Attendance</button><br></br>
            <button type="button" class="btn btn-dark">Salary</button><br></br>
            <button type="button" class="btn btn-dark">Bonuses</button><br></br>
           
          </ul>
         
          <hr />
          <strong style={{textAlign: 'center'}}>Admin</strong><br />
          <button type="button" className="btn btn-outline-danger">Sign out</button>
          
          
          <div class="footer">

          </div>

        </div>
      </nav>
      <div id="content" class="p-4 p-md-5">
        <Route path="/App" exact component={Dashboard} />
        <Routes />
      </div>

    </div>
  );
}

export default App;