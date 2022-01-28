export default {
  port: process.env.PORT || 4000,
  jwt_secret: process.env.JWT_SECRET || 'this#is#a#secret',
  database: {
    hostname: process.env.DB_HOSTNAME || 'localhost',
    username: process.env.DB_USERNAME || 'root',
    database: process.env.DB_DATABASE || 'parq_pos',
    password: process.env.DB_PASSWORD || '',
    port: 3306
  }
}
