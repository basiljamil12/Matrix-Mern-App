
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
import SupSidebar from './container/supervisor/sup_sidebar';

let design;

function App(props) {

  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {

    const realdata = JSON.parse(localStorage.getItem('data'));
    if (realdata){
      setData(realdata);
    }else{
      window.location = "/";
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
  const onTask = () => {
    window.location = "#/tasks";
  };
  const onBonus = () => {
    window.location = "#/bonuslist";
  };


  window.onbeforeunload = function () {
    localStorage.removeItem("data");
  };

  return (

    <div  className="wrapper d-flex align-items-stretch">

      
      {
        data.map((item, i) => (
          design = item.designation,
      <div className='d-flex'>

      {
        (design === "admin") ? <ItSidebar /> : ((design === "supervisor") ? <SupSidebar/> : <EmpSidebar />)
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
