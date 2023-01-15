import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import { withRouter } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { Button } from 'primereact/button';
import constants from '../../utilities/constants';
import { parseISO } from "date-fns"
import { Dialog } from 'primereact/dialog';
import '../../css/style.css';

const constant = constants.getConstant();
const realdata = JSON.parse(localStorage.getItem("data"))
let forID;

function AttendanceList(props) {

  const [data, setData] = useState([]);
  const [deleteId, setDeleteId] = useState({});
  const [showLoading, setShowLoading] = useState(true);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(constant.attendList + `?id=${forID}`);
      setData(result.data.attendanceList);
      setShowLoading(false);
      console.log(result)
    };

    
    realdata.map((item) => (forID = item._id))

    fetchData();
  }, []);

  const showDetail = (id) => {
    props.history.push({
      pathname: '/attendanceDetails/',
      id: id

    });
  }
  const MarkAttendance = () => {
    props.history.push({
      pathname: '/markAttendance/',
    });
  }

  
  return (

    <div className="form-demo">
      <h2>Attendance List</h2>
      <div>
        <br></br><p>
          <Button onClick={() => { MarkAttendance() }}>Mark Attendance</Button>
        </p>
      </div>
      {showLoading && <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>}
      
      <Table striped bordered hover>
        <thead>
          <tr>
            <th scope="col" style={{ fontSize:'20px'}}>#</th>
            <th scope="col" style={{ fontSize:'20px'}}>Name</th>
            <th scope="col" style={{ fontSize:'20px'}}>Designation</th>
            <th scope="col" style={{ fontSize:'20px'}}>Department</th>
            <th scope="col" style={{ fontSize:'20px'}}>Attendance</th>
            <th scope="col" style={{ fontSize:'20px'}}>Details</th>
          </tr>
        </thead>
        <tbody>
          {realdata.map((item, i) => (
            <tr key={i}>
              <th scope="row" >{i + 1}</th>
              <td style={{ fontSize:'20px'}}>{item.name}</td>
              <td style={{ fontSize:'20px'}}>{item.designation}</td>
              <td style={{ fontSize:'20px'}}>{item.department}</td>
              <td style={{ fontSize:'20px'}}>
              {data.map((itex, i) => (itex.attendancedetails[0].attendance))}
              </td>
              <td><Button onClick={() => { showDetail(item._id) }} className="p-button-success">
                  View
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default withRouter(AttendanceList);