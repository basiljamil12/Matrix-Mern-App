import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import { withRouter } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { Button } from 'primereact/button';
import constants from '../../utilities/constants';

import '../../css/style.css';
import { Dialog } from 'primereact/dialog';
const constant = constants.getConstant();
function ITAtt(props) {
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
      pathname: '/viewattendance/',
      id: id

    });
  }
  
  const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessage(false)} /></div>;
  const onMark = (id) => {

    axios.post(constant.attendList + `?emp_id=${id}`)
      .then((result) => {
        setShowMessage(true);
        
          }).catch((error) => setShowMessage(false));
  }
 
  return (

    <div className="form-demo">
       <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                <div className="flex justify-content-center flex-column pt-6 px-3">
                    <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
                    <h5>Attendance Marked</h5>
                </div>
            </Dialog>
      <h2><b>Employee List</b></h2>
      <div>
        <input style={{ width:'500px',height:'50px'}} placeholder='Search Employee' onChange={fetchData} label="Search User" />
      </div>
      <div>
        <br></br>
      </div>
      {showLoading && <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th scope="col" style={{ fontSize:'20px'}}>#</th>
            <th scope="col" style={{ fontSize:'20px'}}>First Name</th>
            <th scope="col" style={{ fontSize:'20px'}}>Designation</th>
            <th scope="col" style={{ fontSize:'20px'}}>Department</th>
            <th scope="col" style={{ fontSize:'20px'}}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr key={i}>
              <th scope="row" >{i + 1}</th>
              <td style={{ fontSize:'20px'}}>{item.name}</td>
              <td style={{ fontSize:'20px'}}>{item.designation}</td>
              <td style={{ fontSize:'20px'}}>{item.department}</td>
              <td>
                <Button onClick={() => { showDetail(item._id) }} className="p-button-success">
                  View
                </Button>
                <Button style={{ marginLeft:'1rem'}} className="p-button-warning" onClick={() => { onMark(item._id)}}>Mark Attendance</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default withRouter(ITAtt);