import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import { withRouter } from "react-router-dom";
import { Button } from "primereact/button";
import constants from "../../utilities/constants";
import { Card } from "primereact/card";
import { ScrollTop } from "primereact/scrolltop";
import "../../css/style.css";
import Image1 from "../assets/1.png";
import Image2 from "../assets/2.png";
import Image3 from "../assets/3.png";
import Image4 from "../assets/4.png";
import Image5 from "../assets/5.png";

const constant = constants.getConstant();

let forID;

function MachineInfo(props) {
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(constant.machineList);
      setData(result.data.machinesList);
      setShowLoading(false);
    };
    const empData = JSON.parse(localStorage.getItem("data"));
    empData.map((item) => (forID = item._id));

    fetchData();
  }, []);

  const machineImg = (name) => {
    let img;
    if (name == "grinder") {
      img = Image1;
    } else if (name == "sorter") {
      img = Image2;
    } else if (name == "refiner") {
      img = Image3;
    } else if (name == "humidifier") {
      img = Image4;
    } else if (name == "incubator") {
      img = Image5;
    }
    return img;
  };

  const onNeed = (id) => {
    axios
      .put(constant.machineNeed + `?id=${id}`)
      .then((result) => {
        setShowMessage(false);
        axios
          .get(constant.machineList)
          .then((result) => {
            setData(result.data.machinesList);
          })
          .catch((error) => setShowMessage(false));
      })
      .catch((error) => setShowMessage(false));
  };
  const onUnder = (id) => {
    axios
      .put(constant.machineUnder + `?id=${id}`)
      .then((result) => {
        setShowMessage(false);
        axios
          .get(constant.machineList)
          .then((result) => {
            setData(result.data.machinesList);
          })
          .catch((error) => setShowMessage(false));
      })
      .catch((error) => setShowMessage(false));
  };

  const onOper = (id) => {
    axios
      .put(constant.machineOper + `?id=${id}&emp_id=${forID}`)
      .then((result) => {
        setShowMessage(false);
        axios
          .get(constant.machineList)
          .then((result) => {
            setData(result.data.machinesList);
          })
          .catch((error) => setShowMessage(false));
      })
      .catch((error) => setShowMessage(false));
  };
  return (
    <div className="form-demo">
      <h2>
        <b>Machine List</b>
      </h2>
      <br></br>
      {showLoading && (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}

      {data.map((item, i) => (
        // <tr key={i}>
        //   <th scope="row" >{i + 1}</th>
        //   <td style={{ fontSize:'20px'}}>{item.name}</td>
        //   <td>
        //   {(item.status == "operational" || item.status == "under maintenance") ? <Button style={{ marginLeft:'1rem'}} className="p-button-warning" onClick={() => { onNeed(item._id) }}>Needs Maintenance</Button> : <span></span>}
        //   {(item.status == "operational" || item.status == "needs maintenance") ? <Button style={{ marginLeft:'1rem'}} className="p-button-warning" onClick={() => { onUnder(item._id) }}>Under Maintenance</Button> : <span></span>}
        //   {(item.status == "needs maintenance" || item.status == "under maintenance") ? <Button style={{ marginLeft:'1rem'}} className="p-button-warning" onClick={() => { onOper(item._id) }}>Operational</Button> : <span></span>}
        //   </td>
        // </tr>

        <Card
          header={<img alt="Card" src={machineImg(item.name)} />}
          style={{
            width: "45%",
            float: "left",
            marginLeft: "2px",
            marginRight: "25px",
            marginBottom: "20px",
          }}
          title={item.name}
        >
          <hr style={{ marginTop: "0px" }}></hr>
          <p style={{ fontSize: "18px" }}>
            <b>Status</b>
          </p>
          <p
            style={
              item.status == "operational"
                ? { color: "green" }
                : item.status == "needs maintenance"
                ? { color: "orange" }
                : { color: "red" }
            }
          >
            <strong>{item.status}</strong>
          </p>
          <p style={{ fontSize: "18px" }}>
            <b>Last Maintenance By</b>
          </p>
          {/* <p>{item.machinedetails[0].name}</p> */}
          <p style={{ fontSize: "18px" }}>
            <b>Last Maintenance On</b>
          </p>
          <p>
            {item.maintenance_on
              .replace(/T.*/, "")
              .split("-")
              .reverse()
              .join("-")}
          </p>
          {item.status == "operational" ? (
            <Button
              style={{ marginLeft: "4rem" }}
              className="p-button-warning"
              onClick={() => {
                onNeed(item._id);
              }}
            >
              Mark for Maintenance
            </Button>
          ) : item.status == "needs maintenance" ? (
            <Button
              style={{ marginLeft: "3rem" }}
              className="p-button-danger"
              onClick={() => {
                onUnder(item._id);
              }}
            >
              Mark as Under Maintenance
            </Button>
          ) : (
            <Button
              style={{ marginLeft: "4rem" }}
              className="p-button-success"
              onClick={() => {
                onOper(item._id);
              }}
            >
              Mark as Operational
            </Button>
          )}
        </Card>
      ))}
      <ScrollTop threshold={200} />
    </div>
  );
}

export default withRouter(MachineInfo);
