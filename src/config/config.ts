import * as process from 'process';

export default () => ({
  port: parseInt(process.env.PORT, 10),
  host: process.env.HOST,
  dbHost: process.env.DB_HOST,
  dbPort: parseInt(process.env.DB_PORT, 10),
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  jwtSecret: process.env.JWT_SECRET,
  accessTtl: process.env.ACCESS_TTL,
});
