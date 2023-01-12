import React from 'react';
import { Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css"
import { Routes } from './routes/index.js';
import Dashboard from "./container/Dashboard";
import EmpSidebar from './container/emp/emp_sidebar';
import ItSidebar from './components/it-dept/it-sidebar';
import './css/style.css';

function App(props) {

  return (

    <div className="wrapper d-flex align-items-stretch">
      <ItSidebar />
      <div id="content" className="p-4 p-md-5">
        <Route path="/App" exact component={Dashboard} />
        <Routes />
      </div>

    </div>
  );
}

export default App;