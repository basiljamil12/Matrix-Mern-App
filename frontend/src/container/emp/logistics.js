import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import { withRouter } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import constants from '../../utilities/constants';
import { parseISO } from "date-fns"
const constant = constants.getConstant();


function LogList(props) {

  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(constant.logList);
      setData(result.data.logistics);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  return (

    <div>
      <h2>Logistics Data List</h2>
      <div>
        <br></br><p>
          <button type="button" className="btn btn-success">Add Logistics</button>
        </p>
      </div>
      {showLoading && <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Vendor Name</th>
            <th scope="col">Amount</th>
            <th scope="col">Delivery Date</th>
            <th scope="col">Delivery Status</th>
            <th scope="col">Location</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
              <tr style={ item.delivery_status == "pending" ? {backgroundColor: "#FFCCCB"} : {backgroundColor: "#90EE90"}} key={i}> 
                <th scope="row" >{i + 1}</th>
                <td>{item.name}</td>
                <td>{item.amount}</td>
                <td>{item.delivery_date}</td>
                <td >{item.delivery_status}</td>

                <td>
                  <a target='_blank' href={item.location}>
                    <button type="button" className="btn" >&#128506;&#65039;</button>
                  </a>
                </td>
              </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default withRouter(LogList);