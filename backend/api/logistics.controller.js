import LogisticsDAO from "../dao/logisticsDAO.js";

export default class LogisticsController {
  static async apiGetLogistics(req, res, next) {
    let filters = {};
    if (req.query.name) {
      filters.name = req.query.name.toLowerCase();
    } else if (req.query.dellivery_date) {
      filters.dellivery_date = req.query.dellivery_date;
    } else if (req.query.amount) {
      filters.amount = req.query.amount;
    } else if (req.query.delivery_status) {
      filters.delivery_status = req.query.delivery_status.toLowerCase();
    }

    const { logisticsList, totalNumLogistcs } = await LogisticsDAO.getLogistics(
      { filters }
    );

    let response = {
      logistics: logisticsList,
      filters: filters,
      total_results: totalNumLogistcs,
    };
    res.json(response);
  }

  static async apiPostLogistics(req, res, next) {
    try {
      const name = req.body.name.toLowerCase();
      const amount = req.body.amount;
      const delivery_date = req.body.delivery_date;
      const delivery_status = req.body.delivery_status.toLowerCase();
      const location = req.body.location;

      const logisticsResponse = await LogisticsDAO.addLogistics(
        name,
        amount,
        delivery_date,
        delivery_status,
        location
      );
      res.json({ Status: "Success" });
    } catch (e) {
      res.status(500).json({ Error: e.message });
    }
  }

  static async apiPutStatus(req, res, next) {
    try {
      const delivery_status = req.body.delivery_status.toLowerCase();

      const logisticsResponse = await LogisticsDAO.updateStatusLogistics(
        req.query.id,
        delivery_status
      );

      var { error } = logisticsResponse;
      if (error) {
        res.status(400).json({ error });
      }

      if (logisticsResponse.modifiedCount === 0) {
        throw new Error("Unable to update employee");
      }
      res.json({ Status: "Success" });
    } catch (e) {
      res.status(500).json({ Error: e.message });
    }
  }

  static async apiDeleteLogistics(req, res, next) {
    try {
      const id = req.query.id;
      const logisticsResponse = await LogisticsDAO.deleteLogistics(id);
      res.json({ Status: "success" });
    } catch (e) {
      res.status(500).json({ Error: e.message });
    }
  }

  static async apiGetLogisticsByID(req, res, next) {
    const id = req.query.id;
    console.log(id);
    const { logisticsDetails } = await LogisticsDAO.getDetailsByID(id);
    res.json(logisticsDetails);
  }
}
