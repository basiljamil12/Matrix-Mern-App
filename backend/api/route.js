import express from "express"
import EmployeeCtrl from "./employee.controller.js"
import LogisticsCtrl from "./logistics.controller.js"
import TasksCtrl from "./tasks.controller.js"
import BonusesCtrl from "./bonuses.controller.js"

const router = express.Router()

//login route
router.route("/login").get(EmployeeCtrl.apiGetEmployeeID)

//employee routes
router
    .route("/itdept/employee")
    .get(EmployeeCtrl.apiGetEmployees)
    .post(EmployeeCtrl.apiPostEmployees)
    .put(EmployeeCtrl.apiPutEmployees)
    .delete(EmployeeCtrl.apiDeleteEmployees)

router
    .route("/itdept/employee/details")
    .get(EmployeeCtrl.apiGetEmployeeByID)

//logistics route 
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




//router.route("/logistics/details").get(LogisticsCtrl.apiGetLogisticsByID)

export default router