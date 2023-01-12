import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let logistics

export default class LogisticsDAO {
    static async injectDB(conn) {
        if (logistics) {
            return
        }
        try {
            logistics = await conn.db(process.env.MONGO_NS).collection("Logistics")

        }catch (e) {
            console.error(
                `Unable to establish a collection handle in employeesDAO: ${e}`,
            )
        }
    }

    static async getLogistics({
        filters = null,
    } = {}) {
        let query
        if(filters){
            if ("name" in filters) {
                query = {$text: { $search: filters["name"]}}
            } else if ("amount" in filters) {
                query = { "amount": {$eq: filters["amount"]}}
            } else if ("delivery_date" in filters) {
                query = { "delivery_date": {$eq: filters["delivery_date"]}}
            } else if ("status" in filters) {
                query = { "status": {$eq: filters["status"]}}
            }
        }
        let cursor

        try {
            cursor = await logistics
                .find(query)
        } catch(e) {
            console.error(`Unable to issue find command, ${e}`)
            return { logisticsList: [], totalNumLogistcs: 0 }
        }

        try {
            const logisticsList = await cursor.toArray()
            const totalNumLogistcs = await logistics.countDocuments(query)
            return { logisticsList, totalNumLogistcs }
        } catch (e) {
            console.error(
                `Unable to convert cursor to array or problem counting documents, ${e}`
            )
            return { logisticsList: [], totalNumLogistcs: 0 }
        }
    }
}