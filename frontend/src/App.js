import { React, useState, useEffect } from 'react';
import { Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css"
import { Routes } from './routes/index.js';
import Dashboard from "./container/Dashboard";
import ItSidebar from './components/it-dept/it-sidebar';
import EmpSidebar from './container/emp/emp_sidebar';

import './css/style.css';

import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";

let design;

function App(props) {

  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const realdata = JSON.parse(localStorage.getItem('data'));
    if (realdata){
      setData(realdata);
    }
  }, []);


  const onEmployee = () => {
    window.location = "#/empList";
  };

  const onLogOut = () => {
    localStorage.removeItem("data")
    window.location = "/";
  };

  const onLogistics = () => {
    window.location = "#/logistics";
  };

  window.onbeforeunload = function () {
    localStorage.removeItem("data");
  };

  return (

    <div className="wrapper d-flex align-items-stretch">

      <nav    id="sidebar">
        <div  className="p-4 pt-5 bg-dark">
          <h3 style={{ textAlign: 'center', color: "white" }}>EMPLOYEE</h3>
   
          <hr style={ {backgroundColor: "white"} }/>
          <ul  className="nav nav-pills flex-column mb-auto">
        
            <button type="button" className="btn btn-dark w-100" onClick={() => { onEmployee() }}>Employee</button><br></br>
            <button type="button" className="btn btn-dark" >Tasks</button><br></br>
            <button type="button" className="btn btn-dark" onClick={() => { onLogistics() }}>Logistics</button><br></br>
            <button type="button" className="btn btn-dark">Machine Information</button><br></br>
            <button type="button" className="btn btn-dark">Refinery/Purity Status</button><br></br>
            <hr style={ {backgroundColor: "white"} }/>
            <button type="button" className="btn btn-dark">Attendance</button><br></br>
            <button type="button" className="btn btn-dark">Salary</button><br></br>
            <button type="button" className="btn btn-dark">Bonuses</button><br></br>

          </ul>
         
          <hr style={ {backgroundColor: "white"} }/>
          <h3 style={{textAlign: 'center', color: "white"}}>Admin</h3><br />
          <button type="button" className="btn btn-outline-danger btn-block" onClick={() => { onLogOut() }} >Sign out</button>
          
          
          <div className="footer">

          </div>

        </div>
      </nav>
      {
        data.map((item, i) => (
          design = item.designation,
      <div className='d-flex'>

      {
        (design === "admin") ? <ItSidebar /> : <EmpSidebar />
      }
      </div>
      
    
          
      ))}

      <div id="content" className="p-4 p-md-5">
        <Route path="/App" exact component={Dashboard} />
        <Routes />
      </div>

    </div>
  );
}

export default App;