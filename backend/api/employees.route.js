import express from "express"
import EmployeeCtrl from "./employee.controller.js"

const router = express.Router()

router
    .route("/")
    .get(EmployeeCtrl.apiGetEmployees)
    .post(EmployeeCtrl.apiPostEmployees)
    .put(EmployeeCtrl.apiPutEmployees)
    .delete(EmployeeCtrl.apiDeleteEmployees)

export default router