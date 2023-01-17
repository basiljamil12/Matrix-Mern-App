import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Dialog } from "primereact/dialog";
import axios from "axios";
import "../../css/style.css";
import { withRouter, useLocation } from "react-router-dom";
import constants from "../../utilities/constants";
import { ScrollTop } from "primereact/scrolltop";
const constant = constants.getConstant();

export const EditLogistics = (props) => {
  const location = useLocation();
  const [showMessage, setShowMessage] = useState(false);

  let defaultValues = location.data.logs;

  const delivery_status = [
    { label: "Pending", value: "pending" },
    { label: "Delivered", value: "delivered" },
  ];

  const onSubmit = (data) => {
    axios
      .put(constant.logList + `?id=${data._id}`, data)
      .then((result) => {
        setShowMessage(true);
      })
      .catch((error) => setShowMessage(false));
  };
  const LogisticsList = () => {
    props.history.push({
      pathname: "/logistics/",
    });
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({ defaultValues });

  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };

  const dialogFooter = (
    <div className="flex justify-content-center">
      <Button
        label="OK"
        className="p-button-text"
        autoFocus
        onClick={() => LogisticsList()}
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
          <i
            className="pi pi-check-circle"
            style={{ fontSize: "5rem", color: "var(--green-500)" }}
          ></i>
          <h5>Updated Status</h5>
        </div>
      </Dialog>

      <div className="justify-content-center">
        <div
          className="card"
          style={{
            paddingBottom: "1rem",
            paddingTop: "0.5rem",
            paddingLeft: "1.5rem",
          }}
        >
          <h4 style={{ paddingBottom: "1rem", paddingTop: "1.5rem" }}>
            <b>Update Delivery Status</b>
          </h4>
          <form onSubmit={handleSubmit(onSubmit)} className="grid p-fluid">
            <div className="field col-6">
              <span className="p-float-label">
                <Controller
                  name="delivery_status"
                  control={control}
                  render={({ field }) => (
                    <Dropdown
                      id={field._id}
                      value={field.value}
                      options={delivery_status}
                      onChange={(e) => field.onChange(e.value)}
                      placeholder="Select a Delivery Status"
                    />
                  )}
                />
              </span>
              {getFormErrorMessage("delivery_status")}
            </div>
            <div className="col-2">
              <Button type="submit" label="Submit" />
            </div>
          </form>
        </div>
      </div>
      <ScrollTop threshold={200} />
    </div>
  );
};

export default withRouter(EditLogistics);
