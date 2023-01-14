import tasksDAO from "../dao/tasksDAO.js";

export default class TaskCtrl {
    static async apiGetTasks(req, res, next) {
        let filters = {}
        if (req.query.name) {
            filters.name = req.query.name
        } else if (req.query.status) {
            filters.status = req.query.status
        } 

        const { taskList, totalNumLogistcs } = await tasksDAO.getTasks ({filters,})

        let response = {
            taskList: taskList,
            filters: filters,
            total_results: totalNumLogistcs
        }
        res.json(response)
    }

}
