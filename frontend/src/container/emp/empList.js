import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import { withRouter } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import constants from '../../utilities/constants';
import { parseISO } from "date-fns"
const constant = constants.getConstant();
function EmpList(props) {
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);


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
  const AddEmployee = () => {
    props.history.push({
      pathname: '/add_emp/',
    });
  }
 

  const EditEmployee = (item) => {
    item['date_of_birth'] = parseISO(item.date_of_birth);
    let Employee_Edit = {

      emp: Object.assign({}, item),

    }

    props.history.push({
      pathname: '/edit_emp/',
      data: Employee_Edit
    });
  }

  return (

    <div>
      <h2>Employee List</h2>
      <div>
        <input onChange={fetchData} label="Search User" />
      </div>
      <div>
        <br></br><p>
          <button type="button" className="btn btn-success" onClick={() => { AddEmployee() }}>Add Employee</button>
        </p>
      </div>
      {showLoading && <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First Name</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr key={i}>
              <th scope="row" >{i + 1}</th>
              <td >{item.name}</td>
              <td>
                <Button onClick={() => { showDetail(item._id) }} variant="outline-success">
                  View
                </Button>
                <button type="button" className="btn btn-success" onClick={() => { EditEmployee(item) }}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default withRouter(EmpList);