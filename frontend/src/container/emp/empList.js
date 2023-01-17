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
import { ScrollTop } from "primereact/scrolltop";
const constant = constants.getConstant();
function EmpList(props) {
  const [data, setData] = useState([]);
  const [deleteId, setDeleteId] = useState({});
  const [showLoading, setShowLoading] = useState(true);
  const [showMessage, setShowMessage] = useState(false);

  const fetchData = (e) => {
    const query = e.target.value;
    fetch(constant.empList + `?name=${query}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setData(data.employees);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(constant.empList);
      setData(result.data.employees);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const showDetail = (id) => {
    props.history.push({
      pathname: "/show_detail/",
      id: id,
    });
  };
  const AddEmployee = () => {
    props.history.push({
      pathname: "/add_emp/",
    });
  };

  const deleteData = () => {
    let id = deleteId;
    axios
      .delete(constant.empList + `?id=${id}`)
      .then((result) => {
        setShowMessage(false);
        axios
          .get(constant.empList)
          .then((result) => {
            setData(result.data.employees);
          })
          .catch((error) => setShowMessage(false));
      })
      .catch((error) => setShowMessage(false));
  };

  const EditEmployee = (item) => {
    item["date_of_birth"] = parseISO(item.date_of_birth);
    let Employee_Edit = {
      emp: Object.assign({}, item),
    };

    props.history.push({
      pathname: "/edit_emp/",
      data: Employee_Edit,
    });
  };
  const selectedItem = (id) => {
    setDeleteId(id);
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
          <p style={{ lineHeight: 1.5, textIndent: "1rem" }}>
            Your Employee is Updated successfully
          </p>
        </div>
      </Dialog>
      <h2>
        <b>Employee List</b>
      </h2>
      <div>
        <input
          style={{ width: "500px", height: "50px" }}
          placeholder="Search Employee"
          onChange={fetchData}
          label="Search User"
        />
      </div>
      <div>
        <br></br>
        <p>
          <Button
            style={{ fontSize: "18px", height: "3rem" }}
            onClick={() => {
              AddEmployee();
            }}
          >
            + Add Employee
          </Button>
        </p>
      </div>
      {showLoading && (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First Name</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr key={i}>
              <th scope="row">{i + 1}</th>
              <td>{item.name}</td>
              <td>
                <Button
                  style={{ marginLeft: "3px", height: "2rem" }}
                  onClick={() => {
                    showDetail(item._id);
                  }}
                  className="p-button-success"
                >
                  View
                </Button>
                <Button
                  style={{ marginLeft: "3px", height: "2rem" }}
                  className="p-button-warning"
                  onClick={() => {
                    EditEmployee(item);
                  }}
                >
                  Edit
                </Button>
                <Button
                  style={{ marginLeft: "3px", height: "2rem" }}
                  className="p-button-danger"
                  onClick={() => {
                    selectedItem(item._id);
                  }}
                >
                  Delete
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

export default withRouter(EmpList);
