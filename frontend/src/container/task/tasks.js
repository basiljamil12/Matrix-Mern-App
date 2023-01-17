import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import { withRouter } from "react-router-dom";
import { Button } from "primereact/button";
import constants from "../../utilities/constants";
import { parseISO } from "date-fns";
import { Dialog } from "primereact/dialog";
import { Panel } from "primereact/panel";
import "../../css/style.css";
import { ScrollTop } from "primereact/scrolltop";
const constant = constants.getConstant();
function TaskList(props) {
  const [panelCollapsed, setpanelCollapsed] = useState([]);
  const [data, setData] = useState([]);
  const [selectedId, setSelectedId] = useState({});
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
      const result = await axios(constant.taskList);
      setData(result.data.taskList);
      setShowLoading(false);
    };

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

  const AddTask = () => {
    props.history.push({
      pathname: "/add_task/",
    });
  };
  const deleteData = () => {
    let id = selectedId;
    axios
      .delete(constant.taskList + `?id=${id}`)
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

  // const EditEmployee = (item) => {
  //   item['date_of_birth'] = parseISO(item.date_of_birth);
  //   let Employee_Edit = {

  //     emp: Object.assign({}, item),

  //   }
  // }

  const selectedItem = (id) => {
    setSelectedId(id);
    setShowMessage(true);
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
  const dialogFooter = (
    <div className="flex justify-content-center">
      <Button
        label="Yes"
        className="p-button-danger"
        autoFocus
        onClick={() => deleteData()}
      />
      <Button
        label="No"
        className="p-button-warning"
        autoFocus
        onClick={() => setShowMessage(false)}
      />
    </div>
  );
  return (
    <div className="form-demo">
      <Dialog
        visible={showMessage}
        onHide={() => setShowMessage(false)}
        position="top"
        footer={dialogFooter}
        showHeader={false}
        breakpoints={{ "960px": "80vw" }}
        style={{ width: "30vw" }}
      >
        <div className="flex justify-content-center flex-column pt-6 px-3">
          <h5>Are you sure you want to Delete?</h5>
          <p style={{ lineHeight: 1.5, textIndent: "1rem" }}></p>
        </div>
      </Dialog>
      <h2>
        <b>Tasks List</b>
      </h2>

      <div>
        <br></br>
        <p>
          <Button
            style={{ fontSize: "18px", height: "3rem" }}
            onClick={() => {
              AddTask();
            }}
          >
            + Add Task
          </Button>
        </p>
      </div>
      {showLoading && (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}
      {data.map((item, i) => (
        <Panel header={item.name} toggleable style={{ fontSize: "20px" }}>
          <div>
            <p
              style={
                item.status === "pending"
                  ? { color: "orange", fontSize: "20px" }
                  : { color: "green", fontSize: "20px" }
              }
            >
              <strong>{item.status}</strong>
            </p>
            <p style={{ fontSize: "17px" }}>
              <b>Assigned to: </b>
              {item.taskdetails[0].name}
            </p>
            <p style={{ fontSize: "17px" }}>
              <b>Designation:</b> {item.taskdetails[0].designation}
            </p>
            <p style={{ fontSize: "17px" }}>
              <b>Department:</b> {item.taskdetails[0].department}
            </p>
            <div style={{ textAlign: "center" }}>
              <Button
                style={{ marginLeft: "2rem", height: "2rem" }}
                onClick={() => {
                  showDetail(item);
                }}
                className="p-button-success"
              >
                View
              </Button>
              {item.status == "pending" ? (
                <Button
                  style={{ marginLeft: "2rem", height: "2rem" }}
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

              <Button
                style={{ marginLeft: "2rem", height: "2rem" }}
                className="p-button-danger"
                onClick={() => {
                  selectedItem(item._id);
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        </Panel>
      ))}
      <ScrollTop threshold={200} />
    </div>
  );
}

export default withRouter(TaskList);
