import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let employees;

export default class EmployeeDAO {
  static async injectDB(conn) {
    if (employees) {
      return;
    }
    try {
      employees = await conn.db(process.env.MONGO_NS).collection("Employees");
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in employeesDAO: ${e}`
      );
    }
  }

  static async getEmployees({ filters = null } = {}) {
    let query;
    if (filters) {
      if ("name" in filters) {
        query = { $text: { $search: filters["name"] } };
      } else if ("designation" in filters) {
        query = { designation: { $eq: filters["designation"] } };
      }
    }

    let cursor;

    try {
      cursor = await employees.find(query);
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { employeesList: [], totalNumEmployee: 0 };
    }

    try {
      const employeesList = await cursor.toArray();
      const totalNumEmployee = await employees.countDocuments(query);

      return { employeesList, totalNumEmployee };
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`
      );
      return { employeesList: [], totalNumEmployee: 0 };
    }
  }

  static async getEmployeeID(email, password) {
    let cursor;
    //const projection = { _id: 1 }
    try {
      cursor = await employees.find({ email: email, password: password });
      //.project(projection)

      const details = await cursor.toArray();
      return { details };
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { details: [] };
    }
  }

  static async addEmployee(
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
  ) {
    try {
      const employeeDoc = {
        name: name,
        designation: designation,
        email: email,
        phone: phone,
        salary: Number(salary),
        password: password,
        department: department,
        cnic: cnic,
        address: address,
        date_of_birth: date_of_birth,
        gender: gender,
      };
      return await employees.insertOne(employeeDoc);
    } catch (e) {
      console.error(`Unable to add employee: ${e}`);
      return { Error: e };
    }
  }

  static async updateEmployee(
    id,
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
  ) {
    try {
      const updateResponse = await employees.updateOne(
        { _id: ObjectId(id) },
        {
          $set: {
            name: name,
            designation: designation,
            email: email,
            password: password,
            phone: phone,
            salary: Number(salary),
            department: department,
            cnic: cnic,
            address: address,
            date_of_birth: date_of_birth,
            gender: gender,
          },
        }
      );
      return updateResponse;
    } catch (e) {
      console.error(`Unable to update employee: ${e}`);
      return { Error: e };
    }
  }

  static async deleteEmployee(id) {
    try {
      const deleteResponse = await employees.deleteOne({
        _id: ObjectId(id),
      });
      return deleteResponse;
    } catch (e) {
      console.error(`Unable to delete employee: ${e}`);
      return { Error: e };
    }
  }

  static async getDetailsByID(id) {
    let cursor;
    try {
      cursor = await employees.find({ _id: ObjectId(id) });
      const employeeDetails = await cursor.toArray();
      return { employeeDetails };
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { employeeDetails: [] };
    }
  }
}
