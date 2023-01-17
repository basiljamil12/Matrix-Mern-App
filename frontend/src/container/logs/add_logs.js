import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Dialog } from "primereact/dialog";
import { classNames } from "primereact/utils";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import axios from "axios";
import "../../css/style.css";
import { withRouter } from "react-router-dom";
import constants from "../../utilities/constants";
import { ScrollTop } from "primereact/scrolltop";
const constant = constants.getConstant();
export const AddLogs = (props) => {
  // const [countries, setCountries] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [setShowData, setFormData] = useState({});
  // const countryservice = new CountryService();
  const defaultValues = {
    name: "",
    amount: "",
    delivery_date: "",
    delivery_status: "",
    location: "",
  };

  const delivery_status = [
    { label: "Pending", value: "pending" },
    { label: "Delivered", value: "delivered" },
  ];

  useEffect(() => {
    // countryservice.getCountries().then(data => setCountries(data));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues });

  const onSubmit = (data) => {
    setFormData(data);

    axios
      .post(constant.logList, data)
      .then((result) => {
        setShowMessage(true);
      })
      .catch((error) => setShowMessage(false));
    reset();
  };

  const LogisticsList = () => {
    props.history.push({
      pathname: "/logistics/",
    });
  };
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
          <h5>Submission Successful!</h5>
          <p style={{ lineHeight: 1.5 }}>
            <b> Logistics Details is successfully added!</b>
          </p>
        </div>
      </Dialog>

      <div className="justify-content-center">
        <h2 className="text-center">
          <b>Logistics Details Submission</b>
        </h2>
        <div
          className="card"
          style={{ paddingBottom: "2rem", paddingTop: "2rem" }}
        >
          <form onSubmit={handleSubmit(onSubmit)} className="grid p-fluid">
            <div className="field col-6">
              <span className="p-float-label">
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: "Name is required." }}
                  render={({ field, fieldState }) => (
                    <InputText
                      id={field.name}
                      {...field}
                      autoFocus
                      className={classNames({
                        "p-invalid": fieldState.invalid,
                      })}
                    />
                  )}
                />
                <label
                  htmlFor="name"
                  className={classNames({ "p-error": errors.name })}
                >
                  Vendor Name*
                </label>
              </span>
              {getFormErrorMessage("name")}
            </div>
            <br></br>
            <div className="field col-6">
              <span className="p-float-label">
                <Controller
                  name="amount"
                  control={control}
                  rules={{ required: "Amount is required." }}
                  render={({ field, fieldState }) => (
                    <InputNumber
                      id={field.name}
                      value={field.value}
                      onValueChange={(e) => field.onChange(e)}
                      min={0}
                      max={10000}
                      mode="decimal"
                      autoFocus
                      className={classNames({
                        "p-invalid": fieldState.invalid,
                      })}
                    />
                  )}
                />
                <label
                  htmlFor="amount"
                  className={classNames({ "p-error": errors.amount })}
                >
                  Amount*
                </label>
              </span>
              {getFormErrorMessage("amount")}
            </div>
            <br></br>
            <div className="field col-6">
              <span className="p-float-label">
                <Controller
                  name="delivery_date"
                  control={control}
                  render={({ field }) => (
                    <Calendar
                      id={field.delivery_date}
                      value={field.value}
                      onChange={(e) => field.onChange(e.value)}
                      dateFormat="dd/mm/yy"
                      mask="99/99/9999"
                      showIcon
                    />
                  )}
                />
                <label htmlFor="delivery_date">Delivery Date</label>
              </span>
            </div>
            <br></br>
            <div className="field col-6">
              <span className="p-float-label">
                <Controller
                  name="delivery_status"
                  control={control}
                  rules={{ required: "Delivery Status is required." }}
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
                <label
                  htmlFor="delivery_status"
                  className={classNames({ "p-error": errors.delivery_status })}
                >
                  Delivery Status*
                </label>
              </span>
              {getFormErrorMessage("delivery_status")}
            </div>
            <br></br>
            <div className="field col-10">
              <span className="p-float-label">
                <Controller
                  name="location"
                  control={control}
                  rules={{ required: "Location is required." }}
                  render={({ field, fieldState }) => (
                    <InputText
                      id={field.location}
                      {...field}
                      autoFocus
                      className={classNames({
                        "p-invalid": fieldState.invalid,
                      })}
                    />
                  )}
                />
                <label
                  htmlFor="location"
                  className={classNames({ "p-error": errors.location })}
                >
                  Location*
                </label>
              </span>
              {getFormErrorMessage("location")}
            </div>
            <a
              target={"_blank"}
              href="https://www.google.com/maps"
              style={{ fontSize: "20px", paddingTop: "1rem", color: "blue" }}
            >
              <u>Go to map</u>
            </a>{" "}
            <br></br>
            <div className="field col-12">
              <Button type="submit" label="Submit" className="mt-2" />
            </div>
          </form>
        </div>
      </div>
      <ScrollTop threshold={200} />
    </div>
  );
};

export default withRouter(AddLogs);
