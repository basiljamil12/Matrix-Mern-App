import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import { withRouter } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { Button } from "primereact/button";
import { ScrollTop } from "primereact/scrolltop";
import constants from "../../utilities/constants";

const constant = constants.getConstant();

function LogList(props) {
  const empData = JSON.parse(localStorage.getItem("data"));

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

  const AddLogistics = () => {
    props.history.push({
      pathname: "/add_logs/",
    });
  };

  const EditLogs = (item) => {
    let Logs_Edit = {
      logs: Object.assign({}, item),
    };

    props.history.push({
      pathname: "/edit_logs/",
      data: Logs_Edit,
    });
  };

  return (
    <div>
      <h2>
        <b>Logistics Data List</b>
      </h2>
      {empData.map((item) =>
        item.designation === "supervisor" ? (
          <div>
            <br></br>
            <p>
              <Button
                style={{ fontSize: "18px", height: "3rem" }}
                onClick={() => {
                  AddLogistics();
                }}
              >
                + Add Logistics
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
            <th scope="col">#</th>
            <th scope="col">Vendor Name</th>
            <th scope="col">Amount</th>
            <th scope="col">Delivery Date</th>
            <th scope="col">Location</th>
            <th scope="col">Delivery Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr
              style={
                item.delivery_status === "pending"
                  ? { backgroundColor: "#FFCCCB" }
                  : { backgroundColor: "#90EE90" }
              }
              key={i}
            >
              <th scope="row">{i + 1}</th>
              <td>{item.name}</td>
              <td>{item.amount}</td>
              <td>
                {item.delivery_date
                  .replace(/T.*/, "")
                  .split("-")
                  .reverse()
                  .join("-")}
              </td>
              <td style={{ maxWidth: "50px" }}>
                <a
                  style={{ color: "blue" }}
                  target="_blank"
                  rel="noreferrer"
                  href={item.location}
                >
                  <u>go to maps</u>
                </a>
              </td>
              <td
                style={
                  item.delivery_status === "pending"
                    ? { color: "red" }
                    : { color: "green" }
                }
              >
                {item.delivery_status}
                <Button
                  style={{ float: "right", height: "2rem" }}
                  className="p-button-warning"
                  onClick={() => {
                    EditLogs(item);
                  }}
                >
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ScrollTop threshold={200} />
    </div>
  );
}

export default withRouter(LogList);
