import React from 'react';
import { Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css"
import { Routes } from './routes/index.js';
import Dashboard from "./container/Dashboard";
import EmpSidebar from './container/emp/emp_sidebar';
import ItSidebar from './components/it-dept/it-sidebar';
import './css/style.css';

import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css"; 
function App(props) {

  const onEmployee = () => {
    window.location = "#/empList";
  };

  const onLogOut = () => {
    window.location = "/";
  };
  return (

    <div className="wrapper d-flex align-items-stretch">

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
          <h3 style={{textAlign: 'center'}}>Admin</h3><br />
          <button type="button" className="btn btn-outline-danger" onClick={() => { onLogOut() }} >Sign out</button>
          
          
          <div className="footer">

          </div>

        </div>
      </nav>
      
      <div id="content" className="p-4 p-md-5">
        <Route path="/App" exact component={Dashboard} />
        <Routes />
      </div>

    </div>
  );
}

export default App;