import React, { useRef, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputNumber } from "primereact/inputnumber";
import { classNames } from "primereact/utils";
import axios from "axios";
import "../../css/style.css";
import { withRouter, useLocation } from "react-router-dom";
import constants from "../../utilities/constants";
import { ScrollTop } from "primereact/scrolltop";

const constant = constants.getConstant();

export const EditPurities = (props) => {
  // const [countries, setCountries] = useState([]);
  const [showMessage, setShowMessage] = useState(false);

  const [setShowData, setFormData] = useState({});
  const [showLoading, setShowLoading] = useState(true);
  const [selectedEmp, setSelectedEmp] = useState(null);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [data, setData] = useState(null);
  const myToast = useRef(null);
  const dt = useRef(null);
  // const countryservice = new CountryService();
  const location = useLocation();
  let defaultValues = location.data.purities;
  let forID;
  const loggedEmpData = JSON.parse(localStorage.getItem("data"));
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(constant.empList);
      setData(result.data.employees);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues });

  const onSubmit = (data) => {
    loggedEmpData.map((item) => (forID = item._id));
    data["emp_id"] = forID;
    setFormData(data);
    console.log(data);
    axios
      .put(constant.refineryList + `?id=${data._id}`, data)
      .then((result) => {
        setShowMessage(true);
      })
      .catch((error) => setShowMessage(false));
    reset();
  };

  const RefineList = () => {
    props.history.push({
      pathname: "/refineryList/",
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
        onClick={() => RefineList()}
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
            <b>Purity has been successfully updated!</b>
          </p>
        </div>
      </Dialog>

      <div className="justify-content-center">
        <h2 className="text-center">
          <b>Batch Purity Details</b>
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
                  Purity Name*
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
                      max={100}
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
                  Purity amount*
                </label>
              </span>
              {getFormErrorMessage("amount")}
            </div>
            <br></br>
            <div className="field col-6">
              <span className="p-float-label">
                <Controller
                  name="beanSizeScore"
                  control={control}
                  rules={{ required: "beanSizeScore is required." }}
                  render={({ field, fieldState }) => (
                    <InputNumber
                      id={field.name}
                      value={field.value}
                      onValueChange={(e) => field.onChange(e)}
                      min={0}
                      max={100}
                      mode="decimal"
                      autoFocus
                      className={classNames({
                        "p-invalid": fieldState.invalid,
                      })}
                    />
                  )}
                />
                <label
                  htmlFor="beanSizeScore"
                  className={classNames({ "p-error": errors.beanSizeScore })}
                >
                  Purity beanSizeScore*
                </label>
              </span>
              {getFormErrorMessage("beanSizeScore")}
            </div>
            <br></br>
            <div className="field col-6">
              <span className="p-float-label">
                <Controller
                  name="beanColorScore"
                  control={control}
                  rules={{ required: "beanColorScore is required." }}
                  render={({ field, fieldState }) => (
                    <InputNumber
                      id={field.name}
                      value={field.value}
                      onValueChange={(e) => field.onChange(e)}
                      min={0}
                      max={100}
                      mode="decimal"
                      autoFocus
                      className={classNames({
                        "p-invalid": fieldState.invalid,
                      })}
                    />
                  )}
                />
                <label
                  htmlFor="beanColorScore"
                  className={classNames({ "p-error": errors.beanColorScore })}
                >
                  Purity beanColorScore*
                </label>
              </span>
              {getFormErrorMessage("beanColorScore")}
            </div>
            <br></br>
            <div className="field col-6">
              <span className="p-float-label">
                <Controller
                  name="beanConsistencyScore"
                  control={control}
                  rules={{ required: "beanConsistencyScore is required." }}
                  render={({ field, fieldState }) => (
                    <InputNumber
                      id={field.name}
                      value={field.value}
                      onValueChange={(e) => field.onChange(e)}
                      min={0}
                      max={100}
                      mode="decimal"
                      autoFocus
                      className={classNames({
                        "p-invalid": fieldState.invalid,
                      })}
                    />
                  )}
                />
                <label
                  htmlFor="beanConsistencyScore"
                  className={classNames({
                    "p-error": errors.beanConsistencyScore,
                  })}
                >
                  Purity bean Consistency Score*
                </label>
              </span>
              {getFormErrorMessage("beanConsistencyScore")}
            </div>
            <br></br>
            <div className="field col-6">
              <span className="p-float-label">
                <Controller
                  name="beanFreshnessScore"
                  control={control}
                  rules={{ required: "beanFreshnessScore is required." }}
                  render={({ field, fieldState }) => (
                    <InputNumber
                      id={field.name}
                      value={field.value}
                      onValueChange={(e) => field.onChange(e)}
                      min={0}
                      max={100}
                      mode="decimal"
                      autoFocus
                      className={classNames({
                        "p-invalid": fieldState.invalid,
                      })}
                    />
                  )}
                />
                <label
                  htmlFor="beanFreshnessScore"
                  className={classNames({
                    "p-error": errors.beanFreshnessScore,
                  })}
                >
                  Purity bean Freshness Score*
                </label>
              </span>
              {getFormErrorMessage("beanFreshnessScore")}
            </div>
            <br></br>
            <div className="field col-6">
              <span className="p-float-label">
                <Controller
                  name="beanStiffIndexScore"
                  control={control}
                  rules={{ required: "beanStiffIndexScore is required." }}
                  render={({ field, fieldState }) => (
                    <InputNumber
                      id={field.name}
                      value={field.value}
                      onValueChange={(e) => field.onChange(e)}
                      min={0}
                      max={100}
                      mode="decimal"
                      autoFocus
                      className={classNames({
                        "p-invalid": fieldState.invalid,
                      })}
                    />
                  )}
                />
                <label
                  htmlFor="beanStiffIndexScore"
                  className={classNames({
                    "p-error": errors.beanStiffIndexScore,
                  })}
                >
                  Purity bean Stiff Index Score*
                </label>
              </span>
              {getFormErrorMessage("beanStiffIndexScore")}
            </div>
            <br></br>
            <div className="field col-6">
              <span className="p-float-label">
                <Controller
                  name="beanRipeIndexScore"
                  control={control}
                  rules={{ required: "beanRipeIndexScore is required." }}
                  render={({ field, fieldState }) => (
                    <InputNumber
                      id={field.name}
                      value={field.value}
                      onValueChange={(e) => field.onChange(e)}
                      min={0}
                      max={100}
                      mode="decimal"
                      autoFocus
                      className={classNames({
                        "p-invalid": fieldState.invalid,
                      })}
                    />
                  )}
                />
                <label
                  htmlFor="beanRipeIndexScore"
                  className={classNames({
                    "p-error": errors.beanRipeIndexScore,
                  })}
                >
                  Purity bean Ripe Index Score*
                </label>
              </span>
              {getFormErrorMessage("beanRipeIndexScore")}
            </div>
            <br></br>
            <div className="field col-6">
              <span className="p-float-label">
                <Controller
                  name="totalScore"
                  control={control}
                  rules={{ required: "totalScore is required." }}
                  render={({ field, fieldState }) => (
                    <InputNumber
                      id={field.name}
                      value={field.value}
                      onValueChange={(e) => field.onChange(e)}
                      min={0}
                      max={100}
                      mode="decimal"
                      autoFocus
                      className={classNames({
                        "p-invalid": fieldState.invalid,
                      })}
                    />
                  )}
                />
                <label
                  htmlFor="totalScore"
                  className={classNames({ "p-error": errors.totalScore })}
                >
                  Purity total Score*
                </label>
              </span>
              {getFormErrorMessage("totalScore")}
            </div>
            <br></br>
            <div className="field col-6">
              <span className="p-float-label">
                <Controller
                  name="status"
                  control={control}
                  rules={{ required: "status is required." }}
                  render={({ field, fieldState }) => (
                    <InputText
                      readOnly="true"
                      id={field.status}
                      {...field}
                      autoFocus
                      className={classNames({
                        "p-invalid": fieldState.invalid,
                      })}
                    />
                  )}
                />
                <label
                  htmlFor="status"
                  className={classNames({ "p-error": errors.status })}
                >
                  Purity status*
                </label>
              </span>
              {getFormErrorMessage("status")}
            </div>
            <br></br>

            <div className="col-12">
              <Button type="submit" label="Submit" className="mt-2" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withRouter(EditPurities);
