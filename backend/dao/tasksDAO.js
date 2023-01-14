import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let tasks

export default class TasksDAO {
    static async injectDB(conn) {
        if (tasks) {
            return
        }
        try {
            tasks = await conn.db(process.env.MONGO_NS).collection("Tasks")

        } catch (e) {
            console.error(
                `Unable to establish a collection handle in employeesDAO: ${e}`,
            )
        }
    }
    static async getTasks({
        filters = null,
    } = {}) {
        let query
        // if(filters){
        //     if ("name" in filters) {
        //         query = {$match: { "name": filters["name"]}}
        //     }
        //     else if ("status" in filters) {
        //         query = { "status": {$eq: Number(filters["status"])}}

        // }}
        query =
        {
            $lookup:
            {
                from: 'Employees',
                localField: 'emp_id',
                foreignField: '_id',
                as: 'taskdetails'
            }
        }
        let cursor
        try {
            cursor = await tasks.aggregate([query]).toArray();
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`)
            return { taskList: [], totalNumTask: 0 }
        }

        try {
            const taskList = cursor;
            // const totalNumTask = await tasks.countDocuments([query]);
            const totalNumTask = 0;
            return { taskList, totalNumTask }
        } catch (e) {
            console.error(
                `Unable to convert cursor to array or problem counting documents, ${e}`
            )
            return { taskList: [], totalNumTask: 0 }
        }
    }


}