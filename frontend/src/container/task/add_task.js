import React, { useRef, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Dialog } from "primereact/dialog";
import { classNames } from "primereact/utils";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import axios from "axios";
import "../../css/style.css";
import { withRouter } from "react-router-dom";
import constants from "../../utilities/constants";
import { Toast } from "primereact/toast";
import { ScrollTop } from "primereact/scrolltop";
const constant = constants.getConstant();
export const AddLogs = (props) => {
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
  const defaultValues = {
    name: "",
    description: "",
    // status: constant.Pen_status,
    assign_date: "",
    deadline: "",
    emp_id: "",
  };
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(constant.empList + `?designation=employee`);
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
    if (validate(data)) {
      data["emp_id"] = selectedEmp._id;
      setFormData(data);
      console.log(data);
      axios
        .post(constant.taskList, data)
        .then((result) => {
          setShowMessage(true);
        })
        .catch((error) => setShowMessage(false));
      reset();
    }
  };
  let validate = (data) => {
    let val = true;
    if (data.deadline < data.assign_date) {
      val = false;
      exMessage("error", "select valid date", "validation exception");
    }
    if (selectedEmp === null) {
      val = false;
      exMessage(
        "error",
        "select employee to assign task",
        "validation exception"
      );
    }

    return val;
  };
  const TaskList = () => {
    props.history.push({
      pathname: "/tasks/",
    });
  };
  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };
  const exMessage = (severity, summary, detail) => {
    return myToast.current.show({
      severity: severity,
      summary: summary,
      detail: detail,
    });
  };

  const dialogFooter = (
    <div className="flex justify-content-center">
      <Button
        label="OK"
        className="p-button-text"
        autoFocus
        onClick={() => TaskList()}
      />
    </div>
  );

  const header = (
    <div className="table-header">
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
        />
      </span>
    </div>
  );
  return (
    <div className="form-demo">
      <Toast ref={myToast}></Toast>

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
            <b>Task is successfully added!</b>
          </p>
        </div>
      </Dialog>

      <div className="justify-content-center">
        <h2 className="text-center">
          <b>Task Details Submission</b>
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
                  Task Name*
                </label>
              </span>
              {getFormErrorMessage("name")}
            </div>
            <br></br>
            <div className="field col-6">
              <span className="p-float-label">
                <Controller
                  name="description"
                  control={control}
                  rules={{ required: "Description is required." }}
                  render={({ field, fieldState }) => (
                    <InputText
                      id={field.description}
                      {...field}
                      autoFocus
                      className={classNames({
                        "p-invalid": fieldState.invalid,
                      })}
                    />
                  )}
                />
                <label
                  htmlFor="description"
                  className={classNames({ "p-error": errors.description })}
                >
                  Task description*
                </label>
              </span>
              {getFormErrorMessage("description")}
            </div>
            <br></br>

            <div className="field col-6">
              <span className="p-float-label">
                <Controller
                  name="assign_date"
                  control={control}
                  rules={{ required: "Date is required." }}
                  render={({ field, fieldState }) => (
                    <Calendar
                      id={field.assign_date}
                      value={field.value}
                      onChange={(e) => field.onChange(e.value)}
                      className={classNames({
                        "p-invalid": fieldState.invalid,
                      })}
                      dateFormat="dd/mm/yy"
                      mask="99/99/9999"
                      showIcon
                    />
                  )}
                />
                <label
                  htmlFor="assign_date"
                  className={classNames({ "p-error": errors.assign_date })}
                >
                  Assigning Date
                </label>
              </span>
              {getFormErrorMessage("assign_date")}
            </div>
            <br></br>
            <div className="field col-6">
              <span className="p-float-label">
                <Controller
                  name="deadline"
                  control={control}
                  rules={{ required: "Date is required." }}
                  render={({ field, fieldState }) => (
                    <Calendar
                      id={field.deadline}
                      value={field.value}
                      onChange={(e) => field.onChange(e.value)}
                      className={classNames({
                        "p-invalid": fieldState.invalid,
                      })}
                      dateFormat="dd/mm/yy"
                      mask="99/99/9999"
                      showIcon
                    />
                  )}
                />
                <label
                  htmlFor="deadline"
                  className={classNames({ "p-error": errors.deadline })}
                >
                  Deadline Date
                </label>
              </span>
              {getFormErrorMessage("deadline")}
            </div>
            <br></br>

            <div className="col-12">
              <h5 className="text-center">
                <b>Select employee to assign task</b>
              </h5>

              <DataTable
                ref={dt}
                value={data}
                selectionMode="single"
                selection={selectedEmp}
                onSelectionChange={(e) => setSelectedEmp(e.value)}
                dataKey="_id"
                paginator
                rows={10}
                rowsPerPageOptions={[5, 10, 25]}
                paginatorTemplate=" PrevPageLink PageLinks NextPageLink CurrentPageReport"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                globalFilter={globalFilter}
                header={header}
                responsiveLayout="scroll"
              >
                <Column field="name" header="Name"></Column>
                <Column field="designation" header="Designation"></Column>
                <Column field="department" header="Department"></Column>
              </DataTable>
            </div>
            <div className="col-12">
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
