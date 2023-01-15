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
function AttendanceList(props) {
  const [data, setData] = useState([]);
  const [deleteId, setDeleteId] = useState({});
  const [showLoading, setShowLoading] = useState(true);
  const [showMessage, setShowMessage] = useState(false);

  const fetchData = e => {
    const query = e.target.value
    fetch(constant.empList + `?name=${query}`)
      .then(response => {
        return response.json()
      })
      .then(data => {
        setData(data.employees)
      })
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(constant.empList);
      setData(result.data.employees);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const showDetail = (id) => {
    props.history.push({
      pathname: '/show_detail/',
      id: id

    });
  }
  const viewAttendance = () => {
    props.history.push({
      pathname: '/viewAttendance/',
    });
  }

  const deleteData = () => {

    let id = deleteId;
    axios.delete(constant.empList + `?id=${id}`)
      .then((result) => {
        setShowMessage(false);
        axios.get(constant.empList)
          .then((result) => {
            setData(result.data.employees);

          }).catch((error) => setShowMessage(false));

      }).catch((error) => setShowMessage(false));

  }


  

  
  return (

    <div className="form-demo">
      
      <h2><b>Attendance List</b></h2>
      <div>
        <input style={{ width:'500px',height:'50px'}}  placeholder='Search Employee' onChange={fetchData} label="Search User" />
      </div>
      <div>
        <br></br><p>
        
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
            <th scope="col" style={{ fontSize:'20px'}}>Attendance</th>
            <th scope="col" style={{ fontSize:'20px'}}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr key={i}>
              <th scope="row" >{i + 1}</th>
              <td style={{ fontSize:'20px'}}>{item.name}</td>
              <td></td>
              <td>
                <Button onClick={() => { viewAttendance() }} className="p-button-success">
                  View
                </Button>
                <Button style={{ marginLeft:'1rem'}} onClick={() => { viewAttendance() }}>Mark Attendance</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default withRouter(AttendanceList);