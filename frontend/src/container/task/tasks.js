import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import { withRouter } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { Button } from 'primereact/button';
import constants from '../../utilities/constants';
import { parseISO } from "date-fns"
import { Dialog } from 'primereact/dialog';
import '../../css/style.css';
const constant = constants.getConstant();
function TaskList(props) {
  const [data, setData] = useState([]);
  const [deleteId, setDeleteId] = useState({});
  const [showLoading, setShowLoading] = useState(true);
  const [showMessage, setShowMessage] = useState(false);

  const fetchData = e => {
    const query = e.target.value
    fetch(constant.taskList + `?name=${query}`)
      .then(response => {
        return response.json()
      })
      .then(data => {
        setData(data.taskList)
      })
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(constant.taskList);
      setData(result.data.taskList);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const showDetail = (id) => {
    props.history.push({
      pathname: '/view_task/',
      id: id
    });
  }
  const AddTask = () => {
    props.history.push({
      pathname: '/add_task/',
    });
  }
  const deleteData = () => {

    let id = deleteId;
    axios.delete(constant.taskList + `?id=${id}`)
      .then((result) => {
        setShowMessage(false);
        axios.get(constant.taskList)
          .then((result) => {
            setData(result.data.taskList);

          }).catch((error) => setShowMessage(false));

      }).catch((error) => setShowMessage(false));

  }


  // const EditEmployee = (item) => {
  //   item['date_of_birth'] = parseISO(item.date_of_birth);
  //   let Employee_Edit = {

  //     emp: Object.assign({}, item),

  //   }
  // }

  const selectedItem = (id) => {
    setDeleteId(id);
    setShowMessage(true)
  }
  const dialogFooter = <div className="flex justify-content-center">
  <Button label="Yes" className="p-button-danger" autoFocus onClick={() => deleteData()} />
  <Button label="No" className="p-button-warning" autoFocus onClick={() => setShowMessage(false)} />
</div>;
  return (

    <div className="form-demo">
     <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
        <div className="flex justify-content-center flex-column pt-6 px-3">

          <h5>Are you sure you want to Delete?</h5>
          <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
            Your Employee is Updated successfully
          </p>
        </div>
      </Dialog>
      <h2>Task List</h2>
      <div>
        <input onChange={fetchData} label="Search User" />
      </div>
      <div>
        <br></br><p>
          <Button onClick={() => { AddTask() }}>Add Task</Button>
        </p>
      </div>
      {showLoading && <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Task Name</th>
            <th scope="col">Employee Name</th>
            <th scope="col">Employee Designation</th>
            <th scope="col">Employee Department</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr key={i}>
              <th scope="row" >{i + 1}</th>
              <td >{item.name}</td>
              <td >{item.taskdetails[0].name}</td>
              <td >{item.taskdetails[0].designation}</td>
              <td >{item.taskdetails[0].department}</td>
              <td>
                <Button onClick={() => { showDetail(item._id) }} className="p-button-success">View</Button>
                <Button className="p-button-warning">Completed</Button>
                <Button className="p-button-danger" onClick={() => { selectedItem(item._id) }}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default withRouter(TaskList);