import sequelize from "./sequelize.js";
import { User, StoreOwner, Rating ,Admin} from '../models/associations.js';

const connectToDb = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully!');
    sequelize.sync({ alter: true });
    console.log(' Models synced successfully.');
  } catch (error) {
    console.error(' Unable to connect :', error.message);
    process.exit(1); 
  }
};

export default connectToDb;

