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
import { ProgressBar } from "primereact/progressbar";
import { ScrollTop } from "primereact/scrolltop";

const constant = constants.getConstant();

function RefineList(props) {
  const [panelCollapsed, setpanelCollapsed] = useState([]);
  const [data, setData] = useState([]);
  const [empData, setempData] = useState([]);
  const [selectedId, setSelectedId] = useState({});
  const [showLoading, setShowLoading] = useState(true);
  const [showMessage, setShowMessage] = useState(false);

  const loggedEmpData = JSON.parse(localStorage.getItem("data"));

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(constant.refineryList);
      setData(result.data.purityList);
      setShowLoading(false);
    };

    const fetchEmpData = async () => {
      const result = await axios(constant.empList);
      setempData(result.data.employees);
      setShowLoading(false);
    };

    fetchData();
    fetchEmpData();
  }, []);

  const showDetail = (item) => {
    let Refine_View = {
      RefineView: item,
    };

    props.history.push({
      pathname: "/view_task/",
      rView: Refine_View,
    });
  };

  const AddTask = () => {
    props.history.push({
      pathname: "/addPurities/",
    });
  };
  const deleteData = () => {
    let id = selectedId;
    axios
      .delete(constant.refineryList + `?id=${id}`)
      .then((result) => {
        setShowMessage(false);
        axios
          .get(constant.refineryList)
          .then((result) => {
            setData(result.data.purityList);
          })
          .catch((error) => setShowMessage(false));
      })
      .catch((error) => setShowMessage(false));
  };

  const EditPurities = (item) => {
    item["updated_on"] = parseISO(item.updated_on);
    let Purities_Edit = {
      purities: Object.assign({}, item),
    };
    props.history.push({
      pathname: "/editPurities/",
      data: Purities_Edit,
    });
  };

  const selectedItem = (id) => {
    setSelectedId(id);
    setShowMessage(true);
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
        <b>Refinery & Purity List</b>
      </h2>
      {loggedEmpData.map((item) =>
        item.designation === "supervisor" ? (
          <div>
            <br></br>
            <p>
              <Button
                style={{ fontSize: "18px" }}
                onClick={() => {
                  AddTask();
                }}
              >
                Add Purity
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
      {data.map((item, i) => (
        <div>
          <Panel header={item.name} toggleable style={{ fontSize: "20px" }}>
            <p>
              <b>Amount: </b>
              {item.amount}
            </p>
            <p
              style={
                item.status === "cleared"
                  ? { color: "green", fontSize: "20px" }
                  : { color: "red", fontSize: "20px" }
              }
            >
              <b>{item.status}</b>
            </p>
            <div style={{ float: "left", width: "45%" }}>
              <p>
                Bean Size Score:{" "}
                <ProgressBar
                  mode="determinate"
                  value={Number(item.beanSizeScore)}
                  color={
                    Number(item.beanSizeScore) < 50
                      ? "#de3428"
                      : Number(item.beanSizeScore) > 85
                      ? "green"
                      : "#e3a03b"
                  }
                />
              </p>
              <p>
                Bean Color Score:{" "}
                <ProgressBar
                  mode="determinate"
                  value={Number(item.beanColorScore)}
                  color={
                    Number(item.beanColorScore) < 50
                      ? "#de3428"
                      : Number(item.beanColorScore) > 85
                      ? "green"
                      : "#e3a03b"
                  }
                />
              </p>
              <p>
                Bean Consistency Score:{" "}
                <ProgressBar
                  mode="determinate"
                  value={Number(item.beanConsistencyScore)}
                  color={
                    Number(item.beanConsistencyScore) < 50
                      ? "#de3428"
                      : Number(item.beanConsistencyScore) > 85
                      ? "green"
                      : "#e3a03b"
                  }
                />
              </p>
            </div>
            <div style={{ float: "left", width: "45%", marginLeft: "3rem" }}>
              <p>
                Bean Freshness Score:{" "}
                <ProgressBar
                  mode="determinate"
                  value={Number(item.beanFreshnessScore)}
                  color={
                    Number(item.beanFreshnessScore) < 50
                      ? "#de3428"
                      : Number(item.beanFreshnessScore) > 85
                      ? "green"
                      : "#e3a03b"
                  }
                />
              </p>
              <p>
                Bean Stiff Index Score:{" "}
                <ProgressBar
                  mode="determinate"
                  value={Number(item.beanStiffIndexScore)}
                  color={
                    Number(item.beanStiffIndexScore) < 50
                      ? "#de3428"
                      : Number(item.beanStiffIndexScore) > 85
                      ? "green"
                      : "#e3a03b"
                  }
                />
              </p>
              <p>
                Bean Ripe Index Score:{" "}
                <ProgressBar
                  mode="determinate"
                  value={Number(item.beanRipeIndexScore)}
                  color={
                    Number(item.beanRipeIndexScore) < 50
                      ? "#de3428"
                      : Number(item.beanRipeIndexScore) > 85
                      ? "green"
                      : "#e3a03b"
                  }
                />
              </p>
            </div>

            <p>
              <b>Total Score: </b>
              <ProgressBar
                mode="determinate"
                value={Number(item.totalScore)}
                color={
                  Number(item.totalScore) < 50
                    ? "#de3428"
                    : Number(item.totalScore) > 85
                    ? "green"
                    : "#e3a03b"
                }
              />
            </p>
            <hr></hr>
            <p>
              <b>Last Updated By: </b>
              {empData.map((itemID) =>
                itemID._id === item.emp_id ? itemID.name : <span></span>
              )}
            </p>
            <p>
              <b>Last Updated On: </b>
              {item.updated_on
                .replace(/T.*/, "")
                .split("-")
                .reverse()
                .join("-")}
            </p>

            {/* <Button onClick={() => { showDetail(item) }} className="p-button-success">View</Button> */}
            <div style={{ textAlign: "center" }}>
              <Button
                style={{
                  marginLeft: "2rem",
                  height: "3rem",
                  width: "10rem",
                  justifyContent: "center",
                }}
                className="p-button-warning"
                onClick={() => {
                  EditPurities(item);
                }}
              >
                Edit
              </Button>
              <Button
                style={{
                  marginLeft: "2rem",
                  height: "3rem",
                  width: "10rem",
                  justifyContent: "center",
                }}
                className="p-button-danger"
                onClick={() => {
                  selectedItem(item._id);
                }}
              >
                Delete
              </Button>
            </div>
          </Panel>
          <br></br>
        </div>
      ))}
      <ScrollTop threshold={200} />
    </div>
  );
}

export default withRouter(RefineList);
