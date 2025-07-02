import dotenv from 'dotenv';
dotenv.config();


// Set up Sequelize 
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: 'mysql',
    logging: true,
  }
);


const connectToDb = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully!');
  } catch (error) {
    console.error(' Unable to connect :', error.message);
    process.exit(1); // Exit the process if DB fails
  }
};

export default connectToDb;

