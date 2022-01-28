// Modules
import db from '../database';

// Interfaces
import { IEmployee } from '../types/database';

class Employee {

  static findById = async ( id: string ) => {
    try {
      const [ result ]: any = await db.query('SELECT * FROM `employee` WHERE `id` = ?', [ id ]);
      const employee: IEmployee = result[0];
      return employee;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  
  static findByEmail = async ( email: string ) => {
    try {
      const [ result ]: any = await db.query('SELECT * FROM `employee` WHERE `email` = ?', [ email ]);
      const employee: IEmployee = result[0];
      return employee;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static findAll = async () => {
    try {
      const [ employees ] = await db.query('SELECT * FROM `employee`');
      return employees;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

}

export default Employee;