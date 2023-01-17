import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;
const date = new Date();

let bonuses;

export default class TasksDAO {
  static async injectDB(conn) {
    if (bonuses) {
      return;
    }
    try {
      bonuses = await conn.db(process.env.MONGO_NS).collection("Bonuses");
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in tasksDAO: ${e}`
      );
    }
  }

  static async getBonusesByID({ filters = null } = {}) {
    let match;
    let query;
    if (filters) {
      if ("id" in filters) {
        match = { $match: { emp_id: ObjectId(filters["id"]) } };
      }
    }
    query = {
      $lookup: {
        from: "Employees",
        localField: "emp_id",
        foreignField: "_id",
        as: "bonusdetails",
      },
    };

    let cursor;

    try {
      cursor = await bonuses.aggregate([query, match]).toArray();
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { bonusList: [], totalNumBonus: 0 };
    }

    try {
      const bonusList = cursor;
      // const totalNumTask = await bonuses.countDocuments([query]);
      const totalNumBonus = 0;
      return { bonusList, totalNumBonus };
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`
      );
      return { bonusList: [], totalNumBonus: 0 };
    }
  }

  static async getBonuses({ filters = null } = {}) {
    let query;
    query = {
      $lookup: {
        from: "Employees",
        localField: "emp_id",
        foreignField: "_id",
        as: "bonusdetails",
      },
    };

    let cursor;

    try {
      cursor = await bonuses.aggregate([query]).toArray();
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { bonusList: [], totalNumBonus: 0 };
    }

    try {
      const bonusList = cursor;
      // const totalNumTask = await bonuses.countDocuments([query]);
      const totalNumBonus = 0;
      return { bonusList, totalNumBonus };
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`
      );
      return { bonusList: [], totalNumBonus: 0 };
    }
  }

  // --------------

  static async addBonuses(name, amount, emp_id) {
    try {
      const bonusesDoc = {
        name: name,
        amount: amount,
        emp_id: ObjectId(emp_id),
      };
      return await bonuses.insertOne(bonusesDoc);
    } catch (e) {
      console.error(`Unable to add bonus: ${e}`);
      return { Error: e };
    }
  }

  static async deleteBonuses(id) {
    try {
      const deleteResponse = await bonuses.deleteOne({
        _id: ObjectId(id),
      });
      return deleteResponse;
    } catch (e) {
      console.error(`Unable to delete bonus: ${e}`);
      return { Error: e };
    }
  }
}
