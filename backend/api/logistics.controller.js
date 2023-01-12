import LogisticsDAO from "../dao/logisticsDAO.js";

export default class LogisticsController {
    static async apiGetLogistics(req, res, next) {
        let filters = {}
        if (req.query.name) {
            filters.name = req.query.name
        } else if (req.query.dellivery_date) {
            filters.dellivery_date = req.query.dellivery_date
        } else if (req.query.amount) {
            filters.amount = req.query.amount
        } else if (req.query.delivery_status) {
            filters.delivery_status = req.query.delivery_status
        } 

        const { logisticsList, totalNumLogistcs } = await LogisticsDAO.getLogistics ({filters,})

        let response = {
            logistics: logisticsList,
            filters: filters,
            total_results: totalNumLogistcs
        }
        res.json(response)
    }
}
