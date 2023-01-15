import React from 'react';
import { withRouter ,useLocation} from 'react-router-dom';
import { InputText } from 'primereact/inputtext';

import Jumbotron from 'react-bootstrap/Jumbotron';


function Show(props) {
 
  
  const location = useLocation();
  const data=location.task.taskview;

  return (
    <div>
     
      <h2><b>Task View</b></h2>
      <Jumbotron>

      <form className="grid p-fluid">
          <div className="field col-6">
            <span className="p-float-label">
              <InputText value={data.name} readOnly autoFocus />
              <label htmlFor="name">Task Name</label>
            </span>
          </div>
          <br></br>
          <div className="field col-6">
            <span className="p-float-label">
              <InputText value={data.description} readOnly autoFocus />
              <label htmlFor="name">Task Description</label>
            </span>
          </div>
          <br></br>
          <div className="field col-6">
            <span className="p-float-label">
              <InputText value={data.status} readOnly autoFocus />
              <label htmlFor="name">Task Status</label>
            </span>
          </div>
          <br></br>
          <div className="field col-6">
            <span className="p-float-label">
              <InputText value={data.assign_date.replace(/T.*/,'').split('-').reverse().join('-')} readOnly autoFocus />
              <label htmlFor="name">Task Assigned Date</label>
            </span>
          </div>
          <br></br>
          <div className="field col-6">
            <span className="p-float-label">
              <InputText value={data.deadline.replace(/T.*/,'').split('-').reverse().join('-')} readOnly autoFocus />
              <label htmlFor="name">Task Deadline</label>
            </span>
          </div>
          <br></br>
          <div className="field col-6">
            <span className="p-float-label">
              <InputText value={data.taskdetails[0].name} readOnly autoFocus />
              <label htmlFor="name">Task Assigned to</label>
            </span>
          </div>
          <br></br>
          <div className="field col-6">
            <span className="p-float-label">
              <InputText value={data.taskdetails[0].department} readOnly autoFocus />
              <label htmlFor="name">Assigned Employee's Department</label>
            </span>
          </div>
          <br></br>
          <div className="field col-6">
            <span className="p-float-label">
              <InputText value={data.taskdetails[0].designation} readOnly autoFocus />
              <label htmlFor="name">Assigned Employee's Designation</label>
            </span>
          </div>
          <br></br>
          </form>
  
  </Jumbotron>
  </div> 
  );
  };

export default withRouter(Show);