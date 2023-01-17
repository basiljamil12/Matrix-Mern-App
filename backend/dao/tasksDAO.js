import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;
const date = new Date();

let tasks;

export default class TasksDAO {
  static async injectDB(conn) {
    if (tasks) {
      return;
    }
    try {
      tasks = await conn.db(process.env.MONGO_NS).collection("Tasks");
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in tasksDAO: ${e}`
      );
    }
  }
  static async getTasks({ filters = null } = {}) {
    let query;
    query = {
      $lookup: {
        from: "Employees",
        localField: "emp_id",
        foreignField: "_id",
        as: "taskdetails",
      },
    };
    let cursor;
    try {
      cursor = await tasks.aggregate([query]).sort({ status: -1 }).toArray();
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { taskList: [], totalNumTask: 0 };
    }

    try {
      const taskList = cursor;
      // const totalNumTask = await tasks.countDocuments([query]);
      const totalNumTask = 0;
      return { taskList, totalNumTask };
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`
      );
      return { taskList: [], totalNumTask: 0 };
    }
  }

  static async getTasksByID({ filters = null } = {}) {
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
        as: "taskdetails",
      },
    };

    let cursor;

    try {
      cursor = await tasks
        .aggregate([query, match])
        .sort({ status: -1 })
        .toArray();
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { taskList: [], totalNumTask: 0 };
    }

    try {
      const taskList = cursor;
      // const totalNumTask = await tasks.countDocuments([query]);
      const totalNumTask = 0;
      return { taskList, totalNumTask };
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`
      );
      return { taskList: [], totalNumTask: 0 };
    }
  }

  static async addTasks(
    name,
    description,
    status,
    assign_date,
    deadline,
    completed_on,
    emp_id
  ) {
    try {
      const tasksDoc = {
        name: name,
        description: description,
        status: status,
        assign_date: assign_date,
        deadline: deadline,
        completed_on: completed_on,
        emp_id: ObjectId(emp_id),
      };
      return await tasks.insertOne(tasksDoc);
    } catch (e) {
      console.error(`Unable to add task: ${e}`);
      return { Error: e };
    }
  }

  static async deleteTasks(id) {
    try {
      const deleteResponse = await tasks.deleteOne({
        _id: ObjectId(id),
      });
      return deleteResponse;
    } catch (e) {
      console.error(`Unable to delete tasks: ${e}`);
      return { Error: e };
    }
  }

  static async markCompleted(id) {
    try {
      const markResponse = await tasks.updateOne(
        { _id: ObjectId(id) },
        {
          $set: {
            status: "completed",
            completed_on: date.toISOString(),
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
