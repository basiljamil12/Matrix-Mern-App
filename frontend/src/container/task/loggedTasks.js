import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import { withRouter } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { Button } from "primereact/button";
import constants from "../../utilities/constants";
import { parseISO } from "date-fns";
import { Dialog } from "primereact/dialog";
import { Panel } from "primereact/panel";
import "../../css/style.css";
const constant = constants.getConstant();

let forID;

function LoggedTaskList(props) {
  const [panelCollapsed, setpanelCollapsed] = useState([]);
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const [showMessage, setShowMessage] = useState(false);

  const fetchData = (e) => {
    const query = e.target.value;
    fetch(constant.taskList + `?name=${query}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setData(data.taskList);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      if (forID != undefined) {
        const result = await axios(constant.loggedTasks + `?id=${forID}`);
        setData(result.data.taskList);
      }
      setShowLoading(false);
    }
    const loggedData = JSON.parse(localStorage.getItem("data"));
    loggedData.map((item) => (forID = item._id));

    fetchData();
  }, []);

  const showDetail = (item) => {
    let Task_View = {
      taskview: item,
    };

    props.history.push({
      pathname: "/view_task/",
      task: Task_View,
    });
  };
 
  const onComplete = (id) => {
    axios
      .put(constant.taskList + `?id=${id}`)
      .then((result) => {
        setShowMessage(false);
        axios
          .get(constant.taskList)
          .then((result) => {
            setData(result.data.taskList);
          })
          .catch((error) => setShowMessage(false));
      })
      .catch((error) => setShowMessage(false));
  };
  return (
    <div className="form-demo">
      <Dialog
        visible={showMessage}
        onHide={() => setShowMessage(false)}
        position="top"
        showHeader={false}
        breakpoints={{ "960px": "80vw" }}
        style={{ width: "30vw" }}
      >
        <div className="flex justify-content-center flex-column pt-6 px-3">
          <h5>Are you sure you want to Delete?</h5>
          <p style={{ lineHeight: 1.5, textIndent: "1rem" }}>
            Your Task is Updated successfully
          </p>
        </div>
      </Dialog>
      <h2>Task List</h2>
      <div>
        <input onChange={fetchData} label="Search User" />
      </div>
      <div>
        <br></br>
      </div>
      {showLoading && (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}
      {data.map((item, i) => (
        <Panel header={item.name} toggleable>
          <div>
            <p
              style={
                item.status === "pending"
                  ? { color: "orange" }
                  : { color: "green" }
              }
            >
              <strong>{item.status}</strong>
            </p>
            <p>{item.taskdetails[0].name}</p>
            <p>{item.taskdetails[0].designation}</p>
            <p>{item.taskdetails[0].department}</p>
            <Button
              onClick={() => {
                showDetail(item);
              }}
              className="p-button-success"
            >
              View
            </Button>
            {item.status == "pending" ? (
              <Button
                className="p-button-warning"
                onClick={() => {
                  onComplete(item._id);
                }}
              >
                Mark as Completed
              </Button>
            ) : (
              <span></span>
            )}
          </div>
        </Panel>
      ))}
    </div>
  );
}

export default withRouter(LoggedTaskList);
