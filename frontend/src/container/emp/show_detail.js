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
  <h4>{item.name} </h4>  
  <h4>{item.designation}</h4> 
  <h4>{item.email}</h4> 
  <h4>{item.phone}</h4> 
  <h4>{item.attendance}</h4> 
  <h4>{item.address}</h4> 
  <h4>{item.cnic}</h4> 
  <h4>{item.date_of_birth}</h4> 
  <h4>{item.department}</h4> 
  <h4>{item.gender}</h4> 
   </div>  
    ))}
  </Jumbotron>
    </div>
  );
}

export default withRouter(Show);