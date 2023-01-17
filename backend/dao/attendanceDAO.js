import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;
const date = new Date();

let attendances;

export default class AttendanceDAO {
  static async injectDB(conn) {
    if (attendances) {
      return;
    }
    try {
      attendances = await conn
        .db(process.env.MONGO_NS)
        .collection("Attendances");
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in employeesDAO: ${e}`
      );
    }
  }

  static async getAttendanceByID({ filters = null } = {}) {
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
        as: "attendancedetails",
      },
    };

    let cursor;

    try {
      cursor = await attendances.aggregate([query, match]).toArray();
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { attendancesList: [], totalNumAttendances: 0, percentage: 0 };
    }

    try {
      const attendancesList = cursor;
      // const totalNumTask = await tasks.countDocuments([query]);
      const totalNumAttendances = attendancesList.length;
      const percentage = Math.round(
        (totalNumAttendances / Number(date.toISOString().substring(8, 10))) *
          100
      );
      return { attendancesList, totalNumAttendances, percentage };
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`
      );
      return { attendancesList: [], totalNumAttendances: 0, percentage: 0 };
    }
  }

  static async addAttendance(emp_id) {
    try {
      const attendancesDoc = {
        emp_id: ObjectId(emp_id),
        date: date.toISOString(),
      };
      return await attendances.insertOne(attendancesDoc);
    } catch (e) {
      console.error(`Unable to add task: ${e}`);
      return { Error: e };
    }
  }
}
