import PurityDAO from "../dao/purityDAO.js";

export default class PurityController {
  static async apiGetPurities(req, res, next) {
    const { purityList, totalNumPurities } = await PurityDAO.getPurities();

    let response = {
      purityList: purityList,
      total_results: totalNumPurities,
    };
    res.json(response);
  }

  static async apiPostPurity(req, res, next) {
    try {
      const name = req.body.name.toLowerCase();
      const amount = req.body.amount;
      const beanSizeScore = req.body.beanSizeScore;
      const beanColorScore = req.body.beanColorScore;
      const beanConsistencyScore = req.body.beanConsistencyScore;
      const beanFreshnessScore = req.body.beanFreshnessScore;
      const beanStiffIndexScore = req.body.beanStiffIndexScore;
      const beanRipeIndexScore = req.body.beanRipeIndexScore;
      const emp_id = req.body.emp_id;

      const purityResponse = await PurityDAO.addPurity(
        name,
        amount,
        beanSizeScore,
        beanColorScore,
        beanConsistencyScore,
        beanFreshnessScore,
        beanStiffIndexScore,
        beanRipeIndexScore,
        emp_id
      );
      res.json({ Status: "Success" });
    } catch (e) {
      res.status(500).json({ Error: e.message });
    }
  }

  static async apiPutPurity(req, res, next) {
    try {
      const name = req.body.name.toLowerCase();
      const amount = req.body.amount;
      const beanSizeScore = req.body.beanSizeScore;
      const beanColorScore = req.body.beanColorScore;
      const beanConsistencyScore = req.body.beanConsistencyScore;
      const beanFreshnessScore = req.body.beanFreshnessScore;
      const beanStiffIndexScore = req.body.beanStiffIndexScore;
      const beanRipeIndexScore = req.body.beanRipeIndexScore;
      const emp_id = req.body.emp_id;

      const puritiesResponse = await PurityDAO.updatePurity(
        req.query.id,
        name,
        amount,
        beanSizeScore,
        beanColorScore,
        beanConsistencyScore,
        beanFreshnessScore,
        beanStiffIndexScore,
        beanRipeIndexScore,
        emp_id
      );

      var { error } = puritiesResponse;
      if (error) {
        res.status(400).json({ error });
      }

      if (puritiesResponse.modifiedCount === 0) {
        throw new Error("Unable to update purity");
      }
      res.json({ Status: "Success" });
    } catch (e) {
      res.status(500).json({ Error: e.message });
    }
  }

  static async apiDeletePurity(req, res, next) {
    try {
      const id = req.query.id;
      const purityResponse = await PurityDAO.deletePurity(id);
      res.json({ Status: "success" });
    } catch (e) {
      res.status(500).json({ Error: e.message });
    }
  }
}
