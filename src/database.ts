// Modules
import { createPool } from 'mysql2/promise';

// Keys
import keys from './keys';
const { hostname, username, database, password, port } = keys.database;

const connection = createPool({
  host: hostname,
  user: username,
  database: database,
  password: password,
  port: port,
  connectionLimit: 10
});

export default connection;