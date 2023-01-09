import mongodb from "mongodb"
import { useResolvedPath } from "react-router-dom"
const ObjectId = mongodb.ObjectId

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

    static async addEmployee(name, designation, email, phone, attendance, salary) {
        try {
            const employeeDoc = {
                name: name,
                designation: designation,
                email: email,
                phone: phone,
                attendance: attendance,
                salary: salary,
            }
            return await employees.insertOne(employeeDoc)
        } catch (e) {
            console.error(`Unable to add employee: ${e}`)
            return { Error: e }
        }
    } 

    static async updateEmployee(id, name, designation, email, phone, attendance, salary) {
        try {
            const updateResponse = await employees.updateOne(
                { _id: ObjectId(id) },
                { $set: { 
                    name: name,
                    designation: designation,
                    email: email,
                    phone: phone,
                    attendance: attendance,
                    salary: salary
                }},
            )
            return updateResponse
        } catch (e) {
            console.error(`Unable to update employee: ${e}`)
            return { Error: e }
        }
    }

    static async deleteEmployee(id){
        try {
            const deleteResponse = await employees.deleteOne({
                _id: ObjectId(id)
            })
            return deleteResponse
        } catch (e) {
            console.error(`Unable to delete employee: ${e}`)
            return { Error: e }
        }
    }
}