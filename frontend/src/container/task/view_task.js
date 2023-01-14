import React from 'react';
import { withRouter ,useLocation} from 'react-router-dom';

import Jumbotron from 'react-bootstrap/Jumbotron';


function Show(props) {
 
  
  const location = useLocation();
  const data=location.task.taskview;

  return (
    <div>
     
      <h2>Task View</h2>
      <Jumbotron>   


   <h4><b>Name: </b>{data.name} </h4>  
  <h4><b>Task Description: </b>{data.description}</h4> 
  <h4><b>Task status: </b>{data.status}</h4> 
  <h4><b>Task Assign Date: </b>{data.assign_date}</h4> 
  <h4><b>Task Deadline Date: </b>{data.deadline}</h4> 
  <h4><b>Assigned Employee name: </b>{data.taskdetails[0].name}</h4> 
  <h4><b>Emplyoee Department: </b>{data.taskdetails[0].department}</h4> 
  <h4><b>Employee Designation: </b>{data.taskdetails[0].designation}</h4> 
  
  
  </Jumbotron>
  </div> 
  );
  };

export default withRouter(Show);