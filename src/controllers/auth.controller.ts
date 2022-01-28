// Modules
import { RequestHandler } from 'express';
import bcryptjs from 'bcryptjs';

// Helpers
import { getToken } from '../helpers/tokens';
import { validatorDay, validatorHours } from '../helpers/employee_turn';

// Querys
import Employee from '../database/employee';
import Connection from '../database/connection';

export const authPost: RequestHandler = async (req, res) => {
  const { email, password } = req.body;
  try {
    const employee = await Employee.findByEmail(email);
    console.log(employee);
    // Email validation
    if (!employee) {
      return res.status(400).json({ logged: false, msg: 'Email and/or password is incorrect' });
    }
    // Delete employee validation
    if (employee.deleted_at) {
      return res.status(400).json({ logged: false, msg: 'User is unactivated' });
    }
    // Validator day
    if (!validatorDay(employee.days)) {
      return res.status(400).json({ logged: false, msg: 'Turn not available, days' });
    }
    // Validator hours
    if (!validatorHours(employee.start_turn, employee.end_turn)) {
      return res.status(400).json({ logged: false, msg: 'Turn not available, hours' });
    }
    // Compare password
    const validPassword = employee.password ? bcryptjs.compareSync(password, employee.password) : false;
    if (!validPassword) {
      return res.status(400).json({ logged: false, msg: 'Email and/or password is incorrect - password' });
    }
    delete employee.password;
    // Generate JWT
    const [ token ]: any = await Promise.all([ getToken(employee), Connection.save(employee.id) ]);
    res.status(200).json({ logged: true, employee, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'internal server error' });
  }
}
