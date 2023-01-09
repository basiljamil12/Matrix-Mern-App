let employees

export default class EmployeeDAO {
    static async injectDB(conn) {
        if (employees) {
            return
        }
        try {
            employees = await conn.db(process.env.MONGO_NS).collection("Employees")
        } catch (e) {
            console.error(
                `Unable to establish a collection handle in employeesDAO: ${e}`,
            )
        }
    }

    static async getEmployees({
        filters = null,
    } = {}) {
        let query
        if (filters) {
            if ("name" in filters) {
                query = {$text:{ $search: filters["name"]}}
            } else if ("designation" in filters) {
                query = { "designation": { $eq: filters["designation"] } }
            }
        }

        let cursor

        try {
            cursor = await employees
              .find(query)
          } catch (e) {
            console.error(`Unable to issue find command, ${e}`)
            return { employeesList: [], totalNumEmployee: 0 }
          }
        
        try{
            const employeesList = await cursor.toArray()
            const totalNumEmployee = await employees.countDocuments(query)

            return { employeesList, totalNumEmployee }
        } catch (e) {
            console.error(
                `Unable to convert cursor to array or problem counting documents, ${e}`
            )
            return { employeesList: [], totalNumEmployee: 0 }
        }
    }
}