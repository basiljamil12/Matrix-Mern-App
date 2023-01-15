import AttendanceDAO from "../dao/attendanceDAO.js";

export default class AttendanceController {
    static async apiGetAttendanceByID(req, res, next) {
        let filters = {}
        if (req.query.id) {
            filters.id = req.query.id
        } 

        const { attendancesList, totalNumAttendances } = await AttendanceDAO.getAttendanceByID ({filters,})

        let response = {
            taskList: attendancesList,
            filters: filters,
            total_results: totalNumAttendances
        }
        res.json(response)
    }

    static async apiPostAttendance(req, res, next) {
        try {
            const emp_id = req.body.emp_id

            const attendanceResponse = await AttendanceDAO.addAttendance(
                emp_id,
            )
            res.json({ Status: "Success"})
        } catch (e) {
            res.status(500).json({Error: e.message})
        }
    }

}