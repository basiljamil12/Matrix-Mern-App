import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;
const date = new Date();

let purities;

export default class PurityDAO {
  static async injectDB(conn) {
    if (purities) {
      return;
    }
    try {
      purities = await conn.db(process.env.MONGO_NS).collection("Purities");
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in tasksDAO: ${e}`
      );
    }
  }

  static async getPurities({ filters = null } = {}) {
    let query;
    query = {
      $lookup: {
        from: "Employees",
        localField: "emp_id",
        foreignField: "_id",
        as: "puritydetails",
      },
    };
    let cursor;
    try {
      cursor = await purities.aggregate([query]).toArray();
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { purityList: [], totalNumPurities: 0 };
    }

    try {
      const purityList = cursor;
      // const totalNumTask = await tasks.countDocuments([query]);
      const totalNumPurities = 0;
      return { purityList, totalNumPurities };
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`
      );
      return { purityList: [], totalNumPurities: 0 };
    }
  }

  static async addPurity(
    name,
    amount,
    beanSizeScore,
    beanColorScore,
    beanConsistencyScore,
    beanFreshnessScore,
    beanStiffIndexScore,
    beanRipeIndexScore,
    emp_id
  ) {
    try {
      const totalPurity =
        (Number(beanSizeScore) +
          Number(beanColorScore) +
          Number(beanConsistencyScore) +
          Number(beanFreshnessScore) +
          Number(beanStiffIndexScore) +
          Number(beanRipeIndexScore)) /
        6;
      let actionStatus;
      totalPurity > 85
        ? (actionStatus = "cleared")
        : (actionStatus = "needs refinement");
      const purityDoc = {
        name: name,
        amount: amount,
        beanSizeScore: beanSizeScore,
        beanColorScore: beanColorScore,
        beanConsistencyScore: beanConsistencyScore,
        beanFreshnessScore: beanFreshnessScore,
        beanStiffIndexScore: beanStiffIndexScore,
        beanRipeIndexScore: beanRipeIndexScore,
        totalScore: totalPurity,
        status: actionStatus,
        emp_id: ObjectId(emp_id),
        updated_on: date.toISOString(),
      };
      return await purities.insertOne(purityDoc);
    } catch (e) {
      console.error(`Unable to add logistics: ${e}`);
      return { Error: e };
    }
  }

  static async updatePurity(
    id,
    name,
    amount,
    beanSizeScore,
    beanColorScore,
    beanConsistencyScore,
    beanFreshnessScore,
    beanStiffIndexScore,
    beanRipeIndexScore,
    emp_id
  ) {
    const totalPurity =
      Math.round(
        ((Number(beanSizeScore) +
          Number(beanColorScore) +
          Number(beanConsistencyScore) +
          Number(beanFreshnessScore) +
          Number(beanStiffIndexScore) +
          Number(beanRipeIndexScore)) /
          6 +
          Number.EPSILON) *
          100
      ) / 100;
    let actionStatus;
    totalPurity > 85
      ? (actionStatus = "cleared")
      : (actionStatus = "needs refinement");
    try {
      const updateResponse = await purities.updateOne(
        { _id: ObjectId(id) },
        {
          $set: {
            name: name,
            amount: amount,
            beanSizeScore: beanSizeScore,
            beanColorScore: beanColorScore,
            beanConsistencyScore: beanConsistencyScore,
            beanFreshnessScore: beanFreshnessScore,
            beanStiffIndexScore: beanStiffIndexScore,
            beanRipeIndexScore: beanRipeIndexScore,
            totalScore: totalPurity,
            status: actionStatus,
            emp_id: ObjectId(emp_id),
            updated_on: date.toISOString(),
          },
        }
      );
      return updateResponse;
    } catch (e) {
      console.error(`Unable to update logistics: ${e}`);
      return { Error: e };
    }
  }

  static async deletePurity(id) {
    try {
      const deleteResponse = await purities.deleteOne({
        _id: ObjectId(id),
      });
      return deleteResponse;
    } catch (e) {
      console.error(`Unable to delete logistics: ${e}`);
      return { Error: e };
    }
  }

  static async getPurityDetailsByID(id) {
    let cursor;
    try {
      cursor = await purities.find({ _id: ObjectId(id) });
      const purityDetails = await cursor.toArray();
      return { purityDetails };
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { purityDetails: [] };
    }
  }
}
