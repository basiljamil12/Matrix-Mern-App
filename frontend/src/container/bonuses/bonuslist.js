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
function Bonuslist(props) {
  const [data, setData] = useState([]);
  const [deleteId, setDeleteId] = useState({});
  const [showLoading, setShowLoading] = useState(true);
  const [showMessage, setShowMessage] = useState(false);

  const fetchData = e => {
    const query = e.target.value
    fetch(constant.bonusList + `?name=${query}`)
      .then(response => {
        return response.json()
      })
      .then(data => {
        setData(data.bonusList)
      })
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(constant.bonusList);
      setData(result.data.bonusList);
      setShowLoading(false);
    };

    fetchData();
  }, []);


  const AddBonus = () => {
    props.history.push({
      pathname: '/addbonus/',
    });
  }

  const deleteData = () => {

    let id = deleteId;
    axios.delete(constant.bonusList + `?id=${id}`)
      .then((result) => {
        setShowMessage(false);
        axios.get(constant.bonusList)
          .then((result) => {
            setData(result.data.bonusList);

          }).catch((error) => setShowMessage(false));

      }).catch((error) => setShowMessage(false));

  }



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
      
          </p>
        </div>
      </Dialog>
      <h2><b>Bonus List</b></h2>
      <div>
        <br></br><p>
          <Button style={{ fontSize:'18px'}} onClick={() => { AddBonus() }}>Add Bonus</Button>
        </p>
      </div>
      {showLoading && <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Bonus Title</th>
            <th scope="col">Employee</th>
            <th scope="col">Bonus Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr key={i}>
              <th scope="row" >{i + 1}</th>
              <td style={{ fontSize:'20px'}}>{item.name}</td>
              <td style={{ fontSize:'20px'}}>{item.bonusdetails[0].name}</td>
              <td style={{ fontSize:'20px'}}>{item.amount}
              <Button style={{float: 'right',fontSize:'16px'}} className="p-button-danger" onClick={() => { selectedItem(item._id) }}>Delete</Button></td>
              <td>
               
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default withRouter(Bonuslist);