import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Dialog } from "primereact/dialog";
import { classNames } from "primereact/utils";
import { Divider } from "primereact/divider";
import { InputNumber } from "primereact/inputnumber";
import { Password } from "primereact/password";
import axios from "axios";
import "../../css/style.css";
import { withRouter, useLocation } from "react-router-dom";
import constants from "../../utilities/constants";
import { ScrollTop } from "primereact/scrolltop";

const constant = constants.getConstant();
export const EditEmp = (props) => {
  const location = useLocation();

  const [showMessage, setShowMessage] = useState(false);

  let defaultValues = location.data.emp;
  const genders = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ];
  useEffect(() => {
    // countryservice.getCountries().then(data => setCountries(data));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({ defaultValues });
  const passwordHeader = <h6>Pick a password</h6>;
  const passwordFooter = (
    <React.Fragment>
      <Divider />
      <p className="mt-2">Suggestions</p>
      <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: "1.5" }}>
        <li>At least one lowercase</li>
        <li>At least one uppercase</li>
        <li>At least one numeric</li>
        <li>Minimum 8 characters</li>
      </ul>
    </React.Fragment>
  );

  const onSubmit = (data) => {
    axios
      .put(constant.empAdd + `?id=${data._id}`, data)
      .then((result) => {
        setShowMessage(true);
      })
      .catch((error) => setShowMessage(false));
  };
  const EmployeeList = () => {
    props.history.push({
      pathname: "/empList/",
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
        onClick={() => EmployeeList()}
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
          <h5>Registration Successful!</h5>
          <p style={{ lineHeight: 1.5, textIndent: "1rem" }}>
            Your Employee is Updated successfully
          </p>
        </div>
      </Dialog>

      <div className="justify-content-center">
        <h2 className="text-center">Update Employee Information</h2>
        <div
          className="card"
          style={{ paddingBottom: "2rem", paddingTop: "2rem" }}
        >
          <form onSubmit={handleSubmit(onSubmit)} className="grid p-fluid">
            <div className="field col-4">
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
                  Full Name*
                </label>
              </span>
              {getFormErrorMessage("name")}
            </div>
            <br></br>
            <div className="field col-4">
              <span className="p-float-label">
                <Controller
                  name="designation"
                  control={control}
                  rules={{ required: "Designation is required." }}
                  render={({ field, fieldState }) => (
                    <InputText
                      id={field.designation}
                      {...field}
                      autoFocus
                      className={classNames({
                        "p-invalid": fieldState.invalid,
                      })}
                    />
                  )}
                />
                <label
                  htmlFor="designation"
                  className={classNames({ "p-error": errors.designation })}
                >
                  Designation*
                </label>
              </span>
              {getFormErrorMessage("designation")}
            </div>
            <br></br>
            <div className="field col-4">
              <span className="p-float-label p-input-icon-right">
                <i className="pi pi-envelope" />
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: "Email is required.",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "Invalid email address. E.g. example@email.com",
                    },
                  }}
                  render={({ field, fieldState }) => (
                    <InputText
                      id={field.name}
                      {...field}
                      className={classNames({
                        "p-invalid": fieldState.invalid,
                      })}
                    />
                  )}
                />
                <label
                  htmlFor="email"
                  className={classNames({ "p-error": !!errors.email })}
                >
                  Email*
                </label>
              </span>
              {getFormErrorMessage("email")}
            </div>
            <br></br>
            <div className="field col-4">
              <span className="p-float-label">
                <Controller
                  name="password"
                  control={control}
                  rules={{ required: "Password is required." }}
                  render={({ field, fieldState }) => (
                    <Password
                      id={field.name}
                      {...field}
                      toggleMask
                      className={classNames({
                        "p-invalid": fieldState.invalid,
                      })}
                      header={passwordHeader}
                      footer={passwordFooter}
                    />
                  )}
                />
                <label
                  htmlFor="password"
                  className={classNames({ "p-error": errors.password })}
                >
                  Password*
                </label>
              </span>
              {getFormErrorMessage("password")}
            </div>
            <br></br>
            <div className="field col-4">
              <span className="p-float-label">
                <Controller
                  name="phone"
                  control={control}
                  rules={{ required: "Phone is required." }}
                  render={({ field, fieldState }) => (
                    <InputNumber
                      id={field.name}
                      value={field.value}
                      onValueChange={(e) => field.onChange(e)}
                      min={0}
                      mode="decimal"
                      autoFocus
                      className={classNames({
                        "p-invalid": fieldState.invalid,
                      })}
                    />
                  )}
                />
                <label
                  htmlFor="phone"
                  className={classNames({ "p-error": errors.phone })}
                >
                  Phone*
                </label>
              </span>
              {getFormErrorMessage("phone")}
            </div>
            <br></br>
            <div className="field col-4">
              <span className="p-float-label">
                <Controller
                  name="salary"
                  control={control}
                  rules={{ required: "Salary is required." }}
                  render={({ field, fieldState }) => (
                    <InputNumber
                      id={field.name}
                      value={field.value}
                      onValueChange={(e) => field.onChange(e)}
                      min={0}
                      mode="decimal"
                      autoFocus
                      className={classNames({
                        "p-invalid": fieldState.invalid,
                      })}
                    />
                  )}
                />
                <label
                  htmlFor="salary"
                  className={classNames({ "p-error": errors.salary })}
                >
                  Salary*
                </label>
              </span>
              {getFormErrorMessage("salary")}
            </div>
            <br></br>
            <div className="field col-4">
              <span className="p-float-label">
                <Controller
                  name="address"
                  control={control}
                  rules={{ required: "address is required." }}
                  render={({ field, fieldState }) => (
                    <InputText
                      id={field.address}
                      {...field}
                      autoFocus
                      className={classNames({
                        "p-invalid": fieldState.invalid,
                      })}
                    />
                  )}
                />
                <label
                  htmlFor="address"
                  className={classNames({ "p-error": errors.address })}
                >
                  Address*
                </label>
              </span>
              {getFormErrorMessage("address")}
            </div>
            <br></br>
            <div className="field col-4">
              <span className="p-float-label">
                <Controller
                  name="cnic"
                  control={control}
                  rules={{ required: "Cnic is required." }}
                  render={({ field, fieldState }) => (
                    <InputNumber
                      id={field.name}
                      value={field.value}
                      onValueChange={(e) => field.onChange(e)}
                      min={0}
                      mode="decimal"
                      autoFocus
                      className={classNames({
                        "p-invalid": fieldState.invalid,
                      })}
                    />
                  )}
                />
                <label
                  htmlFor="cnic"
                  className={classNames({ "p-error": errors.cnic })}
                >
                  Cnic*
                </label>
              </span>
              {getFormErrorMessage("cnic")}
            </div>
            <br></br>
            <div className="field col-4">
              <span className="p-float-label">
                <Controller
                  name="department"
                  control={control}
                  rules={{ required: "Department is required." }}
                  render={({ field, fieldState }) => (
                    <InputText
                      id={field.department}
                      {...field}
                      autoFocus
                      className={classNames({
                        "p-invalid": fieldState.invalid,
                      })}
                    />
                  )}
                />
                <label
                  htmlFor="department"
                  className={classNames({ "p-error": errors.department })}
                >
                  Department*
                </label>
              </span>
              {getFormErrorMessage("department")}
            </div>
            <br></br>
            <div className="field col-4">
              <span className="p-float-label">
                <Controller
                  name="gender"
                  control={control}
                  rules={{ required: "gender is required." }}
                  render={({ field }) => (
                    <Dropdown
                      id={field.name}
                      value={field.value}
                      options={genders}
                      onChange={(e) => field.onChange(e.value)}
                      placeholder="Select a gender"
                    />
                  )}
                />
                <label
                  htmlFor="gender"
                  className={classNames({ "p-error": errors.gender })}
                >
                  gender*
                </label>
              </span>
              {getFormErrorMessage("gender")}
            </div>
            <br></br>

            <div className="field col-4">
              <span className="p-float-label">
                <Controller
                  name="date_of_birth"
                  control={control}
                  render={({ field }) => (
                    <Calendar
                      id={field.name}
                      value={field.value}
                      onChange={(e) => field.onChange(e.value)}
                      dateFormat="dd-mm-yy"
                      mask="99-99-99"
                      showIcon
                    />
                  )}
                />
                <label htmlFor="date_of_birth">date of birth</label>
              </span>
            </div>
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

export default withRouter(EditEmp);
