import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Spinner from 'react-bootstrap/Spinner';
import { withRouter } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
function EmpList(props) {
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "https://hub.dummyapis.com/employee?noofRecords=10&idStarts=1001";

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(apiUrl);
      setData(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const showDetail = (id) => {
    props.history.push({
      pathname: '/show_detail/' + id
    });
  }

  return (
    <div>
      {showLoading && <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner> }
  <Table striped bordered hover>
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First Name</th>
      <th scope="col">Show Details</th>
    </tr>
  </thead>
  <tbody>
  {data.map((item, idx) => (
    <tr>
      <th scope="row" key={idx}>{idx}</th>
      <td >{item.firstName}</td>
      <td>
      <Button onClick={() => { showDetail(item.id) }} variant="outline-success">
            Details
          </Button>
          </td>
    </tr>
    ))}
  </tbody>
</Table>
    </div>
  );
}

export default withRouter(EmpList);