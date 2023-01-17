import React, { useEffect, useState } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./../../css/style.css";

let empname;
function ItSidebar() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const empdata = JSON.parse(localStorage.getItem("data"));
    if (empdata) {
      setData(empdata);
    } else {
      window.location = "/";
    }
  }, []);

  const onDashboard = () => {
    window.location = "#/dashboard";
  };
  const onEmployee = () => {
    window.location = "#/empList";
  };

  const onLogOut = () => {
    localStorage.removeItem("data");
    window.location = "#/";
  };
  const onBonus = () => {
    window.location = "#/bonuslist";
  };
  const onMachine = () => {
    window.location = "#/machineinfo";
  };
  const onitAttendance = () => {
    window.location = "#/itattendance";
  };

  return (
    <div className="App d-flex">
      <nav id="sidebar">
        <div className="p-4 pt-5">
          <h3 style={{ textAlign: "center", color: "white" }}>
            <strong>IT DEPARTMENT</strong>
          </h3>

          <h5 style={{ textAlign: "center", color: "white" }}>{empname}</h5>
          <hr style={{ backgroundColor: "white" }} />
          <ul className="nav nav-pills flex-column mb-auto">
            <button
              style={{ backgroundColor: "transparent", borderStyle: "none" }}
              type="button"
              className="btn btn-dark w-100"
              onClick={() => {
                onDashboard();
              }}
            >
              Dashboard
            </button>
            <br></br>
            <button
              style={{ backgroundColor: "transparent", borderStyle: "none" }}
              type="button"
              className="btn btn-dark w-100"
              onClick={() => {
                onEmployee();
              }}
            >
              Employee
            </button>
            <br></br>
            <button
              style={{ backgroundColor: "transparent", borderStyle: "none" }}
              type="button"
              className="btn btn-dark"
              onClick={() => {
                onMachine();
              }}
            >
              {" "}
              Machine Information
            </button>
            <br></br>
            <hr style={{ backgroundColor: "white" }} />
            <button
              style={{ backgroundColor: "transparent", borderStyle: "none" }}
              type="button"
              className="btn btn-dark"
              onClick={() => {
                onitAttendance();
              }}
            >
              Attendance
            </button>
            <br></br>
            <button
              style={{ backgroundColor: "transparent", borderStyle: "none" }}
              type="button"
              className="btn btn-dark"
              onClick={() => {
                onBonus();
              }}
            >
              Bonuses
            </button>
            <br></br>
          </ul>
          {data.map((item) => ((empname = item.name), (<span></span>)))}
          <hr style={{ backgroundColor: "white" }} />
          <button
            type="button"
            className="btn btn-outline-danger btn-block"
            onClick={() => {
              onLogOut();
            }}
          >
            Sign out
          </button>

          <div className="footer"></div>
        </div>
      </nav>
    </div>
  );
}

export default ItSidebar;
