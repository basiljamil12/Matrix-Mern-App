import express from "express"
import EmployeeCtrl from "./employee.controller.js"

const router = express.Router()

router
    .route("/itdept/employee")
    .get(EmployeeCtrl.apiGetEmployees)
    .post(EmployeeCtrl.apiPostEmployees)
    .put(EmployeeCtrl.apiPutEmployees)
    .delete(EmployeeCtrl.apiDeleteEmployees)

router.route("/itdept/employee/details").get(EmployeeCtrl.apiGetEmployeeByID)

router.route("/login").get(EmployeeCtrl.apiGetEmployeeID)

export default router