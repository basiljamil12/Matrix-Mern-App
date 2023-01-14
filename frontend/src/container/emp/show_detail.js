import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';

import { withRouter ,useLocation} from 'react-router-dom';
import constants from '../../utilities/constants';


import Jumbotron from 'react-bootstrap/Jumbotron';
const constant = constants.getConstant();
function Show(props) {
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  
  const location = useLocation();
 
  const options = {
    method: 'GET',
    url: constant.empView,
    params: {  id : location.id },
    headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': 'your-rapidapi-key',
        'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com',
    },
      
};
  useEffect(() => {
   
    const fetchData = async () => {
      const result = await axios.request(options);
      setData(result.data);
      setShowLoading(false);
    };

    fetchData();
    
  }, []);

  return (
    <div>
      {showLoading && <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner> }
      <h2>Employee View</h2>
      <Jumbotron>   
  {data.map((item,i) => (
 <div key={i}>
  <h4><b>Name</b><br/>{item.name} </h4>  
  <h4><b>Designation</b><br/>{item.designation}</h4> 
  <h4><b>Email</b><br/>{item.email}</h4> 
  <h4><b>Phone</b><br/>{item.phone}</h4> 
  <h4><b>Salary</b><br/>{item.salary}</h4> 
  <h4><b>Address</b><br/>{item.address}</h4> 
  <h4><b>Cnic</b><br/>{item.cnic}</h4> 
  <h4><b>Date of birth</b><br/>{item.date_of_birth.replace(/T.*/,'').split('-').reverse().join('-')}</h4> 
  <h4><b>Department</b><br/>{item.department}</h4> 
  <h4><b>Gender</b><br/>{item.gender}</h4> 
   </div>  
    ))}
  </Jumbotron>
    </div>
  );
}

export default withRouter(Show);