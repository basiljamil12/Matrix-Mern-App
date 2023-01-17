import MachinesDAO from "../dao/machineinfoDAO.js";

export default class MachinesController {
  static async apiGetMachines(req, res, next) {
    const { machineList, totalNumMachines } = await MachinesDAO.getMachines();

    let response = {
      machinesList: machineList,
      total_results: totalNumMachines,
    };
    res.json(response);
  }

  static async apiNeedsMaintenance(req, res, next) {
    try {
      const needsmaintenanceResponse = await MachinesDAO.markNeedsMaintenance(
        req.query.id
      );

      var { error } = needsmaintenanceResponse;
      if (error) {
        res.status(400).json({ error });
      }

      if (needsmaintenanceResponse.modifiedCount === 0) {
        throw new Error("Unable to update task");
      }

      res.json({ Status: "Success" });
    } catch (e) {
      res.status(500).json({ Error: e.message });
    }
  }

  static async apiWorking(req, res, next) {
    try {
      const workingResponse = await MachinesDAO.markWorking(
        req.query.id,
        req.query.emp_id
      );

      var { error } = workingResponse;
      if (error) {
        res.status(400).json({ error });
      }

      if (workingResponse.modifiedCount === 0) {
        throw new Error("Unable to update task");
      }

      res.json({ Status: "Success" });
    } catch (e) {
      res.status(500).json({ Error: e.message });
    }
  }

  static async apiUnderMaintenance(req, res, next) {
    try {
      const undermaintenanceResponse = await MachinesDAO.markUnderMaintenance(
        req.query.id
      );

      var { error } = undermaintenanceResponse;
      if (error) {
        res.status(400).json({ error });
      }

      if (undermaintenanceResponse.modifiedCount === 0) {
        throw new Error("Unable to update task");
      }

      res.json({ Status: "Success" });
    } catch (e) {
      res.status(500).json({ Error: e.message });
    }
  }
}
