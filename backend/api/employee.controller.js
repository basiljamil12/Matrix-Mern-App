import EmployeeDAO from "../dao/employeesDAO.js";

export default class EmployeeController {
  static async apiGetEmployees(req, res, next) {
    let filters = {};
    if (req.query.designation) {
      filters.designation = req.query.designation.toLowerCase();
    } else if (req.query.name) {
      filters.name = req.query.name.toLowerCase();
    }

    const { employeesList, totalNumEmployee } = await EmployeeDAO.getEmployees({
      filters,
    });

    let response = {
      employees: employeesList,
      filters: filters,
      total_results: totalNumEmployee,
    };
    res.json(response);
  }

  static async apiGetEmployeeID(req, res, next) {
    const email = req.query.email;
    const password = req.query.password;
    const { details } = await EmployeeDAO.getEmployeeID(email, password);
    let response = { details };
    res.json(response);
  }

  static async apiGetEmployeeByID(req, res, next) {
    const id = req.query.id;
    console.log(id);
    const { employeeDetails } = await EmployeeDAO.getDetailsByID(id);
    res.json(employeeDetails);
  }

  static async apiPostEmployees(req, res, next) {
    try {
      const name = req.body.name.toLowerCase();
      const designation = req.body.designation.toLowerCase();
      const email = req.body.email;
      const phone = req.body.phone;
      const salary = req.body.salary;
      const password = req.body.password;
      const department = req.body.department.toLowerCase();
      const cnic = req.body.cnic;
      const address = req.body.address.toLowerCase();
      const date_of_birth = req.body.date_of_birth;
      const gender = req.body.gender.toLowerCase();

      const employeeResponse = await EmployeeDAO.addEmployee(
        name,
        designation,
        email,
        phone,
        salary,
        password,
        department,
        cnic,
        address,
        date_of_birth,
        gender
      );
      res.json({ Status: "Success" });
    } catch (e) {
      res.status(500).json({ Error: e.message });
    }
  }

  static async apiPutEmployees(req, res, next) {
    try {
      const name = req.body.name.toLowerCase();
      const designation = req.body.designation.toLowerCase();
      const email = req.body.email;
      const phone = req.body.phone;
      const salary = req.body.salary;
      const department = req.body.department.toLowerCase();
      const cnic = req.body.cnic;
      const address = req.body.address.toLowerCase();
      const date_of_birth = req.body.date_of_birth;
      const gender = req.body.gender.toLowerCase();
      const password = req.body.password;
      const employeeResponse = await EmployeeDAO.updateEmployee(
        req.query.id,
        name,
        designation,
        email,
        password,
        phone,
        salary,
        department,
        cnic,
        address,
        date_of_birth,
        gender
      );

      var { error } = employeeResponse;
      if (error) {
        res.status(400).json({ error });
      }

      if (employeeResponse.modifiedCount === 0) {
        throw new Error("Unable to update employee");
      }

      res.json({ Status: "Success" });
    } catch (e) {
      res.status(500).json({ Error: e.message });
    }
  }

  static async apiDeleteEmployees(req, res, next) {
    try {
      const id = req.query.id;
      const employeeResponse = await EmployeeDAO.deleteEmployee(id);
      res.json({ Status: "success" });
    } catch (e) {
      res.status(500).json({ Error: e.message });
    }
  }
}
