import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import { InputText } from 'primereact/inputtext';

import { withRouter ,useLocation} from 'react-router-dom';
import constants from '../../utilities/constants';


import Jumbotron from 'react-bootstrap/Jumbotron';
const constant = constants.getConstant();

let forName;
let forDesignation;
let  forEmail;
let forPhone;
let forSalary;
let forAddress;
let forCNIC;
let forDOB;
let forDept;
let forGender;

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
      <h2><b>Employee View</b></h2>
      {
        data.map((item) => (
          forName = item.name,
          forDesignation = item.designation,
          forEmail = item.email,
          forPhone = item.phone,
          forSalary = item.salary,
          forAddress = item.address,
          forCNIC = item.cnic,
          forDOB = item.date_of_birth,
          forDept = item.department,
          forGender = item.gender,
          <span></span>
          ))
      }
      <Jumbotron>  
      <form className="grid p-fluid">
          <div className="field col-6">
            <span className="p-float-label">
              <InputText value={forName} readOnly autoFocus />
              <label htmlFor="name">Employee Name</label>
            </span>
          </div>
          <br></br>
          <div className="field col-6">
            <span className="p-float-label">
              <InputText value={forDesignation} readOnly autoFocus />
              <label htmlFor="name">Employee Designation</label>
            </span>
          </div>
          <br></br>
          <div className="field col-6">
            <span className="p-float-label">
              <InputText value={forEmail} readOnly autoFocus />
              <label htmlFor="name">Employee Email</label>
            </span>
          </div>
          <br></br>
          <div className="field col-6">
            <span className="p-float-label">
              <InputText value={forPhone} readOnly autoFocus />
              <label htmlFor="name">Employee Phone</label>
            </span>
          </div>
          <br></br>
          <div className="field col-6">
            <span className="p-float-label">
              <InputText value={forSalary} readOnly autoFocus />
              <label htmlFor="name">Employee Salary*</label>
            </span>
          </div>
          <br></br>
          <div className="field col-6">
            <span className="p-float-label">
              <InputText value={forAddress} readOnly autoFocus />
              <label htmlFor="name">Employee Address</label>
            </span>
          </div>
          <br></br>
          <div className="field col-6">
            <span className="p-float-label">
              <InputText value={forCNIC} readOnly autoFocus />
              <label htmlFor="name">Employee CNIC</label>
            </span>
          </div>
          <br></br>
          <div className="field col-6">
            <span className="p-float-label">
              <InputText value={forDOB.replace(/T.*/, "")
                  .split("-")
                  .reverse()
                  .join("-")} readOnly autoFocus />
              <label htmlFor="name">Employee Date of Birth</label>
            </span>
          </div>
          <br></br>
          <div className="field col-6">
            <span className="p-float-label">
              <InputText value={forDept} readOnly autoFocus />
              <label htmlFor="name">Employee Department</label>
            </span>
          </div>
          <br></br>
          <div className="field col-6">
            <span className="p-float-label">
              <InputText value={forGender} readOnly autoFocus />
              <label htmlFor="name">Employee Gender</label>
            </span>
          </div>
          <br></br>
        </form> 
  </Jumbotron>
    </div>
  );
}

export default withRouter(Show);