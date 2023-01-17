import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let logistics;

export default class LogisticsDAO {
  static async injectDB(conn) {
    if (logistics) {
      return;
    }
    try {
      logistics = await conn.db(process.env.MONGO_NS).collection("Logistics");
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in employeesDAO: ${e}`
      );
    }
  }

  static async getLogistics({ filters = null } = {}) {
    let query;
    if (filters) {
      if ("name" in filters) {
        query = { $text: { $search: filters["name"] } };
      } else if ("amount" in filters) {
        query = { amount: { $eq: Number(filters["amount"]) } };
      } else if ("delivery_date" in filters) {
        query = { delivery_date: { $eq: filters["delivery_date"] } };
      } else if ("delivery_status" in filters) {
        query = { delivery_status: { $eq: filters["delivery_status"] } };
      }
    }
    let cursor;

    try {
      cursor = await logistics.find(query).sort({ delivery_status: -1 });
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { logisticsList: [], totalNumLogistcs: 0 };
    }

    try {
      const logisticsList = await cursor.toArray();
      const totalNumLogistcs = await logistics.countDocuments(query);
      return { logisticsList, totalNumLogistcs };
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`
      );
      return { logisticsList: [], totalNumLogistcs: 0 };
    }
  }

  static async addLogistics(
    name,
    amount,
    delivery_date,
    delivery_status,
    location
  ) {
    try {
      const logisticsDoc = {
        name: name,
        amount: Number(amount),
        delivery_date: delivery_date,
        delivery_status: delivery_status,
        location: location,
      };
      return await logistics.insertOne(logisticsDoc);
    } catch (e) {
      console.error(`Unable to add logistics: ${e}`);
      return { Error: e };
    }
  }

  static async updateStatusLogistics(id, delivery_status) {
    try {
      const updateResponse = await logistics.updateOne(
        { _id: ObjectId(id) },
        {
          $set: {
            delivery_status: delivery_status,
          },
        }
      );
      return updateResponse;
    } catch (e) {
      console.error(`Unable to update logistics: ${e}`);
      return { Error: e };
    }
  }

  static async deleteLogistics(id) {
    try {
      const deleteResponse = await logistics.deleteOne({
        _id: ObjectId(id),
      });
      return deleteResponse;
    } catch (e) {
      console.error(`Unable to delete logistics: ${e}`);
      return { Error: e };
    }
  }

  static async getDetailsByID(id) {
    let cursor;
    try {
      cursor = await logistics.find({ _id: ObjectId(id) });
      const logisticsDetails = await cursor.toArray();
      return { logisticsDetails };
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { logisticsDetails: [] };
    }
  }
}
