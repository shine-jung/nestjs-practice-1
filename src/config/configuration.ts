export default () => ({
  ENVIRONMENT: process.env.NODE_ENV || 'local',
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: process.env.DB_PORT || 5432,
  DB_NAME: process.env.DB_NAME || 'postgres',
  DB_USERNAME: process.env.DB_USERNAME || 'admin',
  DB_PASSWORD: process.env.DB_PASSWORD || '1234',
});
