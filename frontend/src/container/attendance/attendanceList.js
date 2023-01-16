import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import { withRouter } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { Button } from "primereact/button";
import constants from "../../utilities/constants";
import "../../css/style.css";
import { Knob } from 'primereact/knob';
const date = new Date()
const constant = constants.getConstant();

let forID;
let count=0;
let forName;

function AttendanceList(props) {
  const [data, setData] = useState([]);
  const [deleteId, setDeleteId] = useState({});
  const [showLoading, setShowLoading] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const realdata = JSON.parse(localStorage.getItem("data"));
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(constant.attendList + `?id=${forID}`);
      setData(result.data.attendanceList);
      setShowLoading(false);
    };
    console.log(realdata);
    realdata.map((item) => (forID = item._id));

    fetchData();
  }, []);

<<<<<<< HEAD
 

=======
>>>>>>> 50038381 (BASIL'S FINAL COMMIT PACKS)
  return (
    console.log(realdata.length),
    <div className="form-demo">
    
        <div><h2><b>Attendance Percentage (%)</b></h2>
          <Knob size={150} value={Number(Math.round(((data.length / Number((date.toISOString()).substring(8,10)))* 100)))} readOnly /></div>
 
      <h2><b>Attendance Details</b></h2>
      {data.map((item) =>
  
        item.designation === "supervisor" ? (
          
          <div>
            <br></br>

          </div>
        ) : (
          <span></span>
        )
      )}

      {showLoading && (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th scope="col" style={{ fontSize: "20px" }}>
              #
            </th>


            <th scope="col" style={{ fontSize: "20px" }}>
              Date
            </th>
            <th scope="col" style={{ fontSize: "20px" }}>
              Details
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            
            <tr key={i}>   
          
              <th scope="row">{i + 1}</th>

              <td style={{ fontSize: "17px" }}>
                {item.date.replace(/T.*/, "").split("-").reverse().join("-")}
              </td>
              <td style={{ fontSize: "17px" }}>
                {item.date.match(/\d\d:\d\d/) 
               }
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default withRouter(AttendanceList);
