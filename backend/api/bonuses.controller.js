import BonusesDAO from "../dao/bonusesDAO.js";

export default class BonusesController {
  static async apiGetBonusesByID(req, res, next) {
    let filters = {};
    if (req.query.id) {
      filters.id = req.query.id;
    }

    const { bonusList, totalNumBonuses } = await BonusesDAO.getBonusesByID({
      filters,
    });

    let response = {
      bonusList: bonusList,
      filters: filters,
      total_results: totalNumBonuses,
    };
    res.json(response);
  }

  static async apiGetBonuses(req, res, next) {
    const { bonusList, totalNumBonuses } = await BonusesDAO.getBonuses();

    let response = {
      bonusList: bonusList,
      total_results: totalNumBonuses,
    };
    res.json(response);
  }
  // ---------

  static async apiPostBonus(req, res, next) {
    try {
      const name = req.body.name.toLowerCase();
      const amount = Number(req.body.amount);
      const emp_id = req.body.emp_id;

      const bonusResponse = await BonusesDAO.addBonuses(name, amount, emp_id);
      res.json({ Status: "Success" });
    } catch (e) {
      res.status(500).json({ Error: e.message });
    }
  }

  static async apiDeleteBonus(req, res, next) {
    try {
      const id = req.query.id;
      const bonusResponse = await BonusesDAO.deleteBonuses(id);
      res.json({ Status: "success" });
    } catch (e) {
      res.status(500).json({ Error: e.message });
    }
  }
}
