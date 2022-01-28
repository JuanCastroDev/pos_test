// Modules
import db from '../database';

// Interfaces
import { IConnection } from '../types/database';

class Connection {

  static save = async ( id_employee: number ) => {
    try {
      const result = await db.query('INSERT INTO `connection` (`id_employee`) VALUES (?)', [ id_employee ]);
      console.log(result);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

}

export default Connection;