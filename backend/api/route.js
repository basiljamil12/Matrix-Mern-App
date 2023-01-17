import express from "express"
import EmployeeCtrl from "./employee.controller.js"
import LogisticsCtrl from "./logistics.controller.js"
import TasksCtrl from "./tasks.controller.js"
import BonusesCtrl from "./bonuses.controller.js"
import MachinesCtrl from "./machineinfo.controller.js"
import PurityCtrl from "./purity.controller.js"
import AttendanceCtrl from "./attendance.controller.js"

const router = express.Router()

router
    .route("/login")
    .get(EmployeeCtrl.apiGetEmployeeID)
router
    .route("/itdept/employee")
    .get(EmployeeCtrl.apiGetEmployees)
    .post(EmployeeCtrl.apiPostEmployees)
    .put(EmployeeCtrl.apiPutEmployees)
    .delete(EmployeeCtrl.apiDeleteEmployees)

router
    .route("/itdept/employee/details")
    .get(EmployeeCtrl.apiGetEmployeeByID)
router
    .route("/logistics")
    .get(LogisticsCtrl.apiGetLogistics)
    .get(LogisticsCtrl.apiGetLogisticsByID)
    .post(LogisticsCtrl.apiPostLogistics)
    .put(LogisticsCtrl.apiPutStatus)
    .delete(LogisticsCtrl.apiDeleteLogistics)
router
    .route("/tasks")
    .get(TasksCtrl.apiGetTasks)
    .post(TasksCtrl.apiPostTasks)
    .delete(TasksCtrl.apiDeleteTasks)
    .put(TasksCtrl.apiMarkCompleted)
router
    .route("/mytasks")
    .get(TasksCtrl.apiGetTasksByID)
router 
    .route("/bonuses")
    .get(BonusesCtrl.apiGetBonuses)
    .post(BonusesCtrl.apiPostBonus)
    .delete(BonusesCtrl.apiDeleteBonus)
router
    .route("/mybonuses")
    .get(BonusesCtrl.apiGetBonusesByID)
router 
    .route("/machines")
    .get(MachinesCtrl.apiGetMachines)
router 
    .route("/machines/needs")
    .put(MachinesCtrl.apiNeedsMaintenance)
router 
    .route("/machines/under")
    .put(MachinesCtrl.apiUnderMaintenance)
router 
    .route("/machines/ok")
    .put(MachinesCtrl.apiWorking)
router
    .route("/purities")
    .get(PurityCtrl.apiGetPurities)
    .post(PurityCtrl.apiPostPurity)
    .put(PurityCtrl.apiPutPurity)
    .delete(PurityCtrl.apiDeletePurity)
router
    .route("/attendance")
    .get(AttendanceCtrl.apiGetAttendanceByID)
    .post(AttendanceCtrl.apiPostAttendance)

export default routerinit