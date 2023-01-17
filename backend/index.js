import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import EmployeeDAO from "./dao/employeesDAO.js";
import LogisticsDAO from "./dao/logisticsDAO.js";
import TasksDAO from "./dao/tasksDAO.js";
import BonusesDAO from "./dao/bonusesDAO.js";
import MachinesDAO from "./dao/machineinfoDAO.js";
import PurityDAO from "./dao/purityDAO.js";
import AttendanceDAO from "./dao/attendanceDAO.js";

dotenv.config();

const MongoClient = mongodb.MongoClient;

const port = process.env.PORT || 8000;

MongoClient.connect(process.env.MONGO_DB_URI, {
  maxPoolSize: 50,
  wtimeoutMS: 2500,
  useNewUrlParser: true,
})
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  })
  .then(async (client) => {
    await EmployeeDAO.injectDB(client);
    await LogisticsDAO.injectDB(client);
    await TasksDAO.injectDB(client);
    await BonusesDAO.injectDB(client);
    await MachinesDAO.injectDB(client);
    await PurityDAO.injectDB(client);
    await AttendanceDAO.injectDB(client);
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  });
