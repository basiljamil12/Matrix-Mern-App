import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import { withRouter } from "react-router-dom";
import { Button } from "primereact/button";
import constants from "../../utilities/constants";
import { Dialog } from "primereact/dialog";
import { Panel } from "primereact/panel";
import "../../css/style.css";
import { ScrollTop } from "primereact/scrolltop";
const constant = constants.getConstant();

let forID;

function LoggedTaskList(props) {
  const [panelCollapsed, setpanelCollapsed] = useState([]);
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (forID != undefined) {
        const result = await axios(constant.loggedTasks + `?id=${forID}`);
        setData(result.data.taskList);
      }
      setShowLoading(false);
    };
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
      <h2>
        <b>Task List</b>
      </h2>

      <div>
        <br></br>
      </div>
      {showLoading && (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}
      {data.map((item, i) => (
        <Panel style={{ fontSize: "22px" }} header={item.name} toggleable>
          <div>
            <p
              style={
                item.status === "pending"
                  ? { color: "orange", fontSize: "18px" }
                  : { color: "green", fontSize: "18px" }
              }
            >
              <strong>{item.status}</strong>
            </p>
            <p style={{ fontSize: "18px" }}>
              <strong>Assigned To: </strong>
              {item.taskdetails[0].name}
            </p>
            <p style={{ fontSize: "18px" }}>
              <strong>Designation: </strong>
              {item.taskdetails[0].designation}
            </p>
            <p style={{ fontSize: "18px" }}>
              <strong>Department: </strong>
              {item.taskdetails[0].department}
            </p>
            <div style={{ textAlign: "center" }}>
              <Button
                style={{ height: "2rem", marginRight: "2rem" }}
                onClick={() => {
                  showDetail(item);
                }}
                className="p-button-success"
              >
                View
              </Button>
              {item.status == "pending" ? (
                <Button
                  style={{ height: "2rem", marginRight: "2rem" }}
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
          </div>
        </Panel>
      ))}
      <ScrollTop threshold={200} />
    </div>
  );
}

export default withRouter(LoggedTaskList);
