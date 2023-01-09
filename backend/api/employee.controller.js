import EmployeeDAO from "../dao/employeesDAO.js"

export default class EmployeeController {
    static async apiGetEmployees(req, res, next) {
        const employeesPerpage = req.query.employeesPerpage ? parseInt(req.query.employeesPerpage, 10) : 20
        const page = req.query.page ? parseInt(req.query.page, 10) : 0

        let filters = {}
        if (req.query.designation) {
            filters.designation = req.query.designation
        } else if (req.query.name) {
            filters.name = req.query.name
        }

        const { employeesList, totalNumEmployee } = await EmployeeDAO.getEmployees ({
            filters,
            page,
            employeesPerpage,
        })

        let response = {
            employees: employeesList,
            filters: filters,
            total_results: totalNumEmployee,
        }
        res.json(response)
    }
}