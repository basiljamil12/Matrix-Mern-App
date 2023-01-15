
import React, { useRef, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Dialog } from 'primereact/dialog';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import '../../css/style.css';
import { withRouter, useLocation } from 'react-router-dom';
import constants from '../../utilities/constants';
import { Toast } from 'primereact/toast';

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

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(constant.empList);
            setData(result.data.employees);
            setShowLoading(false);
        };

        

        fetchData();
    }, []);

    const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });

    const onSubmit = (data) => {

        if (validate(data)) {
            data['emp_id'] = selectedEmp._id;
            setFormData(data);
            console.log(data);
            axios.put(constant.refineryList + `?id=${data._id}`, data)
                .then((result) => {
                    setShowMessage(true)
                }).catch((error) => setShowMessage(false));
            reset();
        }

    };
     let validate = (data) => {
        let val = true;
        // if (data.deadline < data.assign_date) {
        //     val = false;
        //     exMessage('error', 'select valid date', 'validation exception');
        // }
        if (selectedEmp === null) {
            val = false;
            exMessage('error', 'select employee to assign task', 'validation exception');
        }

        return val;
    }
    const RefineList = () => {
        props.history.push({
            pathname: '/refineryList/',
        });
    }
    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };
    const exMessage = (severity, summary, detail) => {
        return myToast.current.show({ severity: severity, summary: summary, detail: detail });
    };



    const dialogFooter = <div className="flex justify-content-center">
        <Button label="OK" className="p-button-text" autoFocus onClick={() => RefineList()} /></div>;

    const header = (
        <div className="table-header">
          
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );
    return (

        <div className="form-demo">
            <Toast ref={myToast}></Toast>

            <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                <div className="flex justify-content-center flex-column pt-6 px-3">
                    <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }} ></i>
                    <h5>Submission Successful!</h5>
                    <p style={{ lineHeight: 1.5, }}><b>Purity has been successfully updated!</b></p>
                </div>
            </Dialog>

            <div className="justify-content-center">
               
            <h2 className="text-center"><b>Purity Details Submission</b></h2>
                <div className="card" style={{ paddingBottom: '2rem', paddingTop: '2rem' }}>
               
                    <form onSubmit={handleSubmit(onSubmit)} className="grid p-fluid">
                        <div className="field col-6">
                            <span className="p-float-label">
                                <Controller name="name" control={control} rules={{ required: 'Name is required.' }} render={({ field, fieldState }) => (
                                    <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="name" className={classNames({ 'p-error': errors.name })}>Purity Name*</label>
                            </span>
                            {getFormErrorMessage('name')}
                        </div><br></br>
                        <div className="field col-6">
                            <span className="p-float-label">
                                <Controller name="amount" control={control} rules={{ required: 'Amount is required.' }} render={({ field, fieldState }) => (
                                    <InputText id={field.amount} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="amount" className={classNames({ 'p-error': errors.amount })}>Purity amount*</label>
                            </span>
                            {getFormErrorMessage('amount')}
                        </div><br></br>
                        <div className="field col-6">
                            <span className="p-float-label">
                                <Controller name="beanSizeScore" control={control} rules={{ required: 'beanSizeScore is required.' }} render={({ field, fieldState }) => (
                                    <InputText id={field.beanSizeScore} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="beanSizeScore" className={classNames({ 'p-error': errors.beanSizeScore })}>Purity beanSizeScore*</label>
                            </span>
                            {getFormErrorMessage('beanSizeScore')}
                        </div><br></br>
                        <div className="field col-6">
                            <span className="p-float-label">
                                <Controller name="beanColorScore" control={control} rules={{ required: 'beanColorScore is required.' }} render={({ field, fieldState }) => (
                                    <InputText id={field.beanColorScore} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="beanColorScore" className={classNames({ 'p-error': errors.beanColorScore })}>Purity beanColorScore*</label>
                            </span>
                            {getFormErrorMessage('beanColorScore')}
                        </div><br></br>
                        <div className="field col-6">
                            <span className="p-float-label">
                                <Controller name="beanConsistencyScore" control={control} rules={{ required: 'beanConsistencyScore is required.' }} render={({ field, fieldState }) => (
                                    <InputText id={field.beanConsistencyScore} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="beanConsistencyScore" className={classNames({ 'p-error': errors.beanConsistencyScore })}>Purity beanConsistencyScore*</label>
                            </span>
                            {getFormErrorMessage('beanConsistencyScore')}
                        </div><br></br>
                        <div className="field col-6">
                            <span className="p-float-label">
                                <Controller name="beanFreshnessScore" control={control} rules={{ required: 'beanFreshnessScore is required.' }} render={({ field, fieldState }) => (
                                    <InputText id={field.beanFreshnessScore} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="beanFreshnessScore" className={classNames({ 'p-error': errors.beanFreshnessScore })}>Purity beanFreshnessScore*</label>
                            </span>
                            {getFormErrorMessage('beanFreshnessScore')}
                        </div><br></br>
                        <div className="field col-6">
                            <span className="p-float-label">
                                <Controller name="beanStiffIndexScore" control={control} rules={{ required: 'beanStiffIndexScore is required.' }} render={({ field, fieldState }) => (
                                    <InputText id={field.beanStiffIndexScore} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="beanStiffIndexScore" className={classNames({ 'p-error': errors.beanStiffIndexScore })}>Purity beanStiffIndexScore*</label>
                            </span>
                            {getFormErrorMessage('beanStiffIndexScore')}
                        </div><br></br>
                        <div className="field col-6">
                            <span className="p-float-label">
                                <Controller name="beanRipeIndexScore" control={control} rules={{ required: 'beanRipeIndexScore is required.' }} render={({ field, fieldState }) => (
                                    <InputText id={field.beanRipeIndexScore} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="beanRipeIndexScore" className={classNames({ 'p-error': errors.beanRipeIndexScore })}>Purity beanRipeIndexScore*</label>
                            </span>
                            {getFormErrorMessage('beanRipeIndexScore')}
                        </div><br></br>
                        <div className="field col-6">
                        <span className="p-float-label">
                                <Controller name="totalScore" control={control} rules={{ required: 'totalScore is required.' }} render={({ field, fieldState }) => (
                                    <InputText id={field.totalScore} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="totalScore" className={classNames({ 'p-error': errors.totalScore })}>Purity totalScore*</label>
                            </span>
                            {getFormErrorMessage('totalScore')}
                        </div><br></br>
                        <div className="field col-6">
                        <span className="p-float-label">
                                <Controller name="status" control={control} rules={{ required: 'status is required.' }} render={({ field, fieldState }) => (
                                    <InputText id={field.status} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="status" className={classNames({ 'p-error': errors.status })}>Purity status*</label>
                            </span>
                            {getFormErrorMessage('status')}
                        </div><br></br>
                        <div className="field col-12">
                            <span className="p-float-label">
                                <Controller name="deadline" control={control} rules={{ required: 'Date is required.' }} render={({ field, fieldState }) => (
                                    <Calendar id={field.updated_on} value={field.value} onChange={(e) => field.onChange(e.value)} className={classNames({ 'p-invalid': fieldState.invalid })} dateFormat="dd/mm/yy" mask="99/99/9999" showIcon />
                                )} />
                                <label htmlFor="updated_on" className={classNames({ 'p-error': errors.updated_on })}>Updated On Date</label>
                            </span>
                            {getFormErrorMessage('updated_on')}
                        </div><br></br>

                        <div className='col-12'>
                            <h5 className="text-center"><b>Select an employee to assign Purities</b></h5>
                            <DataTable ref={dt} value={data} selectionMode="single" selection={selectedEmp} onSelectionChange={e => setSelectedEmp(e.value)} dataKey="_id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                    globalFilter={globalFilter} header={header} responsiveLayout="scroll">
                                <Column field="name" header="Name"></Column>
                                <Column field="designation" header="Designation"></Column>
                                <Column field="department" header="Department"></Column>

                            </DataTable></div>
                        <div className='col-12'>
                            <Button type="submit" label="Submit" className="mt-2" />
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
}

export default withRouter(EditPurities);