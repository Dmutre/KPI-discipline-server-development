import * as process from 'process';

export default () => ({
  port: parseInt(process.env.PORT, 10),
  host: process.env.HOST,
  dbUrl: process.env.DATABASE_URL,
});
