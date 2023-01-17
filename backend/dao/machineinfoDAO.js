import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;
const date = new Date();

let machines;

export default class MachinesDAO {
  static async injectDB(conn) {
    if (machines) {
      return;
    }
    try {
      machines = await conn.db(process.env.MONGO_NS).collection("MachineInfo");
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in tasksDAO: ${e}`
      );
    }
  }

  static async getMachines({ filters = null } = {}) {
    let query;
    query = {
      $lookup: {
        from: "Employees",
        localField: "emp_id",
        foreignField: "_id",
        as: "machinedetails",
      },
    };
    let cursor;
    try {
      cursor = await machines.aggregate([query]).toArray();
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { machineList: [], totalNumMachines: 0 };
    }

    try {
      const machineList = cursor;
      // const totalNumTask = await tasks.countDocuments([query]);
      const totalNumMachines = 0;
      return { machineList, totalNumMachines };
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`
      );
      return { machineList: [], totalNumMachines: 0 };
    }
  }

  static async markNeedsMaintenance(id) {
    try {
      const markResponse = await machines.updateOne(
        { _id: ObjectId(id) },
        {
          $set: {
            status: "needs maintenance",
          },
        }
      );
      return markResponse;
    } catch (e) {
      console.error(`Unable to update tasks: ${e}`);
      return { Error: e };
    }
  }

  static async markWorking(id, emp_id) {
    try {
      const markResponse = await machines.updateOne(
        { _id: ObjectId(id) },
        {
          $set: {
            status: "operational",
            emp_id: ObjectId(emp_id),
            maintenance_on: date.toISOString(),
          },
        }
      );
      return markResponse;
    } catch (e) {
      console.error(`Unable to update tasks: ${e}`);
      return { Error: e };
    }
  }

  static async markUnderMaintenance(id) {
    try {
      const markResponse = await machines.updateOne(
        { _id: ObjectId(id) },
        {
          $set: {
            status: "under maintenance",
          },
        }
      );
      return markResponse;
    } catch (e) {
      console.error(`Unable to update tasks: ${e}`);
      return { Error: e };
    }
  }
}
