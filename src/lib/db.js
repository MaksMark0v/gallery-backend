import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export let isDbConnectionInited = false;

const sequelize = new Sequelize({
    logging: console.log,

    dialect: process.env.DB_DIALIECT,
    port: +process.env.DB_PORT,
    host: process.env.DB_HOSTNAME,
    username: process.env.DB_USERNAME,
    password: `${process.env.DB_PASSWORD}`,
    database: process.env.DB_DATABASE,
    define: {
      timestamps: false
    },
  timezone: '+00:00'
});

export async function initDatatbaseConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        isDbConnectionInited = true;
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

export default sequelize;
