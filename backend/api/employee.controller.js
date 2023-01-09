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
    
    static async apiPostEmployees(req, res, next) {
        try {
            const name = req.body.name
            const designation = req.body.designation
            const email = req.body.email
            const phone = req.body.phone
            const attendance = req.body.attendance
            const salary = req.body.salary

            const employeeResponse = await EmployeeDAO.addEmployee(
                name,
                designation,
                email,
                phone,
                attendance,
                salary,
            )
            res.json({ Status: "Success"})
        } catch (e) {
            res.status(500).json({Error: e.message})
        }
    }

    static async apiPutEmployees(req, res, next) {
        try {
            const name = req.body.name
            const designation = req.body.designation
            const email = req.body.email
            const phone = req.body.phone
            const attendance = req.body.attendance
            const salary = req.body.salary
            
            const employeeResponse = await EmployeeDAO.updateEmployee(
                req.body.id,
                name,
                designation,
                email,
                phone,
                attendance,
                salary,
            )

            var { error } = employeeResponse
            if (error) {
                res.status(400).json({error})
            }

            if (employeeResponse.modifiedCount === 0){
                throw new Error(
                    "Unable to update employee",
                )
            }

            res.json({ Status: "Success" })
        } catch (e) {
            res.status(500).json({ Error: e.message })
        }

        
    }

    static async apiDeleteEmployees(req, res, next) {
        try {
            const id = req.query.id
            console.log(id)
            const employeeResponse = await EmployeeDAO.deleteEmployee(
                id,
            )
            res.json({ Status: "success" })
        } catch (e) {
            res.status(500).json({ Error: e.message })
        }
    }
}