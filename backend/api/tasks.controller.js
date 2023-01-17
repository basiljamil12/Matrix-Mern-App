import TasksDAO from "../dao/tasksDAO.js";

export default class TasksController {
  static async apiGetTasksByID(req, res, next) {
    let filters = {};
    if (req.query.id) {
      filters.id = req.query.id;
    }

    const { taskList, totalNumLogistcs } = await TasksDAO.getTasksByID({
      filters,
    });

    let response = {
      taskList: taskList,
      filters: filters,
      total_results: totalNumLogistcs,
    };
    res.json(response);
  }

  static async apiGetTasks(req, res, next) {
    const { taskList, totalNumLogistcs } = await TasksDAO.getTasks();

    let response = {
      taskList: taskList,
      total_results: totalNumLogistcs,
    };
    res.json(response);
  }
  // ---------

  static async apiPostTasks(req, res, next) {
    try {
      const name = req.body.name.toLowerCase();
      const description = req.body.description.toLowerCase();
      const assign_date = req.body.assign_date;
      const deadline = req.body.deadline;
      const completed_on = "Nil";
      const emp_id = req.body.emp_id;
      const status = "pending";

      const tasksResponse = await TasksDAO.addTasks(
        name,
        description,
        status,
        assign_date,
        deadline,
        completed_on,
        emp_id
      );
      res.json({ Status: "Success" });
    } catch (e) {
      res.status(500).json({ Error: e.message });
    }
  }

  static async apiDeleteTasks(req, res, next) {
    try {
      const id = req.query.id;
      const tasksResponse = await TasksDAO.deleteTasks(id);
      res.json({ Status: "success" });
    } catch (e) {
      res.status(500).json({ Error: e.message });
    }
  }

  static async apiMarkCompleted(req, res, next) {
    try {
      const completedResponse = await TasksDAO.markCompleted(req.query.id);

      var { error } = completedResponse;
      if (error) {
        res.status(400).json({ error });
      }

      if (completedResponse.modifiedCount === 0) {
        throw new Error("Unable to update task");
      }

      res.json({ Status: "Success" });
    } catch (e) {
      res.status(500).json({ Error: e.message });
    }
  }
}
