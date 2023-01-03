import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css"

import ItDashboard from "./components/it-dept/it-dashboard";
import ItCRUD from "./components/it-dept/it-crud-emp";
import Login from "./components/login";
import ItSidebar from "./components/it-dept/it-sidebar";
import EmployeeSidebar from "./components/employee/emp-sidebar";

function App() {
  return (   
    <div className="App">
      <EmployeeSidebar/>
    </div>
  );
}

export default App;