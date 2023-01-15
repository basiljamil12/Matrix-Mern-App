import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import { withRouter } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { Button } from 'primereact/button';
import constants from '../../utilities/constants';
import { parseISO } from "date-fns"
import { Dialog } from 'primereact/dialog';
import { Card } from 'primereact/card';
import '../../css/style.css';
const constant = constants.getConstant();

let forID;

function MachineInfo(props) {
  const [data, setData] = useState([]);
  const [deleteId, setDeleteId] = useState({});
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

  const showDetail = (id) => {
    props.history.push({
      pathname: '/show_detail/',
      id: id

    });
  }
  const AddEmployee = () => {
    props.history.push({
      pathname: '/add_emp/',
    });
  }

  const deleteData = () => {

    let id = deleteId;
    axios.delete(constant.empList + `?id=${id}`)
      .then((result) => {
        setShowMessage(false);
        axios.get(constant.empList)
          .then((result) => {
            setData(result.data.employees);

          }).catch((error) => setShowMessage(false));

      }).catch((error) => setShowMessage(false));

  }


  const EditEmployee = (item) => {
    item['date_of_birth'] = parseISO(item.date_of_birth);
    let Employee_Edit = {

      emp: Object.assign({}, item),

    }

    props.history.push({
      pathname: '/edit_emp/',
      data: Employee_Edit
    });
  }
  const selectedItem = (id) => {
    setDeleteId(id);
    setShowMessage(true)
  }

  const onNeed = (id) => {
   
    axios.put(constant.machineNeed + `?id=${id}`)
      .then((result) => {
        setShowMessage(false);
        axios.get(constant.machineList)
          .then((result) => {
            setData(result.data.machinesList);

          }).catch((error) => setShowMessage(false));

      }).catch((error) => setShowMessage(false));
  }
  const onUnder = (id) => {
   
    axios.put(constant.machineUnder + `?id=${id}`)
      .then((result) => {
        setShowMessage(false);
        axios.get(constant.machineList)
          .then((result) => {
            setData(result.data.machinesList);

          }).catch((error) => setShowMessage(false));

      }).catch((error) => setShowMessage(false));
  }

  const onOper = (id) => {
   
    axios.put(constant.machineOper + `?id=${id}&emp_id=${forID}` )
      .then((result) => {
        setShowMessage(false);
        axios.get(constant.machineList)
          .then((result) => {
            setData(result.data.machinesList);

          }).catch((error) => setShowMessage(false));

      }).catch((error) => setShowMessage(false));
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
      <h2>Machine List</h2>
      <br></br>
      {showLoading && <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>}
      
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
            <Card style={{width: "45%", float: "left", marginLeft: "2px", marginRight: "25px", marginBottom: "20px"}} title={item.name}>
              <p><b>Status</b></p>
              <p>{item.status}</p>
              <p><b>Last Maintenance By</b></p>
              <p>{item.machinedetails[0].name}</p>
              <p><b>Last Maintenance On</b></p>
              <p>{item.maintenance_on.replace(/T.*/,'').split('-').reverse().join('-')}</p>
              {
                ((item.status == "operational") 
                ? <Button style={{ marginLeft:'4rem'}} className="p-button-warning" onClick={() => { onNeed(item._id) }}>Mark for Maintenance</Button> 
                : (item.status == "needs maintenance") 
                ? <Button style={{ marginLeft:'3rem'}} className="p-button-danger" onClick={() => { onUnder(item._id) }}>Mark as Under Maintenance</Button>
                : <Button style={{ marginLeft:'4rem'}} className="p-button-success" onClick={() => { onOper(item._id) }}>Mark as Operational</Button>)
              }
            </Card>
          ))}

    </div>
  );
}

export default withRouter(MachineInfo);