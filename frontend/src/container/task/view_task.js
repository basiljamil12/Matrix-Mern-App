import React from 'react';
import { withRouter ,useLocation} from 'react-router-dom';

import Jumbotron from 'react-bootstrap/Jumbotron';


function Show(props) {
 
  
  const location = useLocation();
  const data=location.task.taskview;

  return (
    <div>
     
      <h2><b>Task View</b></h2>
      <Jumbotron>   
  <h4><b>Name: </b><br></br>{data.name} </h4>  
  <h4><b>Task Description: </b><br></br>{data.description}</h4> 
  <h4><b>Task status: </b><br></br>{data.status}</h4> 
  <h4><b>Task Assign Date: </b><br></br>{data.assign_date.replace(/T.*/,'').split('-').reverse().join('-')}</h4> 
  <h4><b>Task Deadline Date: </b><br></br>{data.deadline.replace(/T.*/,'').split('-').reverse().join('-')}</h4> 
  <h4><b>Assigned Employee name: </b><br></br>{data.taskdetails[0].name}</h4> 
  <h4><b>Emplyoee Department: </b><br></br>{data.taskdetails[0].department}</h4> 
  <h4><b>Employee Designation: </b><br></br>{data.taskdetails[0].designation}</h4> 
  
  
  </Jumbotron>
  </div> 
  );
  };

export default withRouter(Show);