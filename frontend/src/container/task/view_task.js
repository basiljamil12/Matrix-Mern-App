import React from "react";
import { withRouter, useLocation } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { ScrollTop } from "primereact/scrolltop";
import Jumbotron from "react-bootstrap/Jumbotron";

function Show(props) {
  const location = useLocation();
  const data = location.task.taskview;

  return (
    <div>
      <h2>
        <b>Task View Details</b>
      </h2>
      <Jumbotron>
        <form className="grid p-fluid">
          <div className="field col-6">
            <span className="p-float-label">
              <InputText value={data.name} readOnly autoFocus />
              <label htmlFor="name">
                <b>Task Name</b>
              </label>
            </span>
          </div>
          <br></br>
          <div className="field col-6">
            <span className="p-float-label">
              <InputText value={data.description} readOnly autoFocus />
              <label htmlFor="name">
                <b>Task Description</b>
              </label>
            </span>
          </div>
          <br></br>
          <div className="field col-6">
            <span className="p-float-label">
              <InputText value={data.status} readOnly autoFocus />
              <label htmlFor="name">
                <b>Task Status</b>
              </label>
            </span>
          </div>
          <br></br>
          <div className="field col-6">
            <span className="p-float-label">
              <InputText
                value={data.assign_date
                  .replace(/T.*/, "")
                  .split("-")
                  .reverse()
                  .join("-")}
                readOnly
                autoFocus
              />
              <label htmlFor="name">
                <b>Task Assigned Date</b>
              </label>
            </span>
          </div>
          <br></br>
          <div className="field col-6">
            <span className="p-float-label">
              <InputText
                value={data.deadline
                  .replace(/T.*/, "")
                  .split("-")
                  .reverse()
                  .join("-")}
                readOnly
                autoFocus
              />
              <label htmlFor="name">
                <b>Task Deadline</b>
              </label>
            </span>
          </div>
          <br></br>
          <div className="field col-6">
            <span className="p-float-label">
              <InputText value={data.taskdetails[0].name} readOnly autoFocus />
              <label htmlFor="name">
                <b>Task Assigned to</b>
              </label>
            </span>
          </div>
          <br></br>
          <div className="field col-6">
            <span className="p-float-label">
              <InputText
                value={data.taskdetails[0].department}
                readOnly
                autoFocus
              />
              <label htmlFor="name">
                <b>Assigned Employee's Department</b>
              </label>
            </span>
          </div>
          <br></br>
          <div className="field col-6">
            <span className="p-float-label">
              <InputText
                value={data.taskdetails[0].designation}
                readOnly
                autoFocus
              />
              <label htmlFor="name">
                <b>Assigned Employee's Designation</b>
              </label>
            </span>
          </div>
          <br></br>
        </form>
      </Jumbotron>
      <ScrollTop threshold={200} />
    </div>
  );
}

export default withRouter(Show);
