import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let tasks

export default class TasksDAO{
     static async injectDB(conn) {
        if (tasks) {
            return
        }
        try {
            tasks = await conn.db(process.env.MONGO_NS).collection("Tasks")

        }catch (e) {
            console.error(
                `Unable to establish a collection handle in employeesDAO: ${e}`,
            )
        }
    }

}