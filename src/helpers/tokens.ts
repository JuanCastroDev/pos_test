// Modules
import jwt from 'jsonwebtoken';

// Keys
import keys from '../keys';
const { jwt_secret } = keys

// Interfaces
import { IEmployee } from '../types/database';

export const getToken = async ({ id, email, first_name, last_name }: IEmployee) => {
  return new Promise( (resolve, reject) => {
    const payload = { id, email, first_name, last_name };
    jwt.sign( payload, jwt_secret, {
      expiresIn: '8h'
    }, (err, token) => {
      if (err) {
        console.log(err);
        reject('ERROR, token');
      } else {
        resolve(token);
      }
    });
  });
}
