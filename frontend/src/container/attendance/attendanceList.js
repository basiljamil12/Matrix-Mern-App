import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import { withRouter } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { Button } from "primereact/button";
import constants from "../../utilities/constants";
import { parseISO } from "date-fns";
import { Dialog } from "primereact/dialog";
import "../../css/style.css";

const constant = constants.getConstant();

let forID;

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

  const MarkAttendance = () => {
    props.history.push({
      pathname: "/markAttendance/",
    });
  };

  return (
    <div className="form-demo">
      <h2>Attendance List</h2>
      {realdata.map((item) =>
        item.designation === "supervisor" ? (
          <div>
            <br></br>
            <p>
              <Button
                onClick={() => {
                  MarkAttendance();
                }}
              >
                Mark Attendance
              </Button>
            </p>
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
              Name
            </th>
            <th scope="col" style={{ fontSize: "20px" }}>
              Designation
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
              <td style={{ fontSize: "20px" }}>
                {item.attendancedetails[0].name}
              </td>
              <td style={{ fontSize: "20px" }}>
                {item.attendancedetails[0].designation}
              </td>
              <td style={{ fontSize: "20px" }}>
                {item.date.replace(/T.*/, "").split("-").reverse().join("-")}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default withRouter(AttendanceList);
