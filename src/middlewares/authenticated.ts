// Modules
import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

// Helpers
import { validatorDay, validatorHours } from '../helpers/employee_turn';

// Querys
import Employee from '../database/employee';

// Keys
import keys from '../keys';
const { jwt_secret } = keys;

export const isAuthenticated: RequestHandler = async (req, res, next) => {
  const token = req.header('x-access-token');
  if (!token) {
    return res.status(401).json({ logged: false, msg: 'No token in request' });
  }
  try {
    const { id }: any = jwt.verify(token, jwt_secret);
    const employee = await Employee.findById(id); 
    // Exist validation
    if (!employee) {
      return res.status(401).json({ logged: false, msg: 'User not exist' });
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
    req.user = employee;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ msg: 'Invalid Token' });
  } 
}
