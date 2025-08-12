import { Sequelize } from "sequelize";
import dotenv from "dotenv"

dotenv.config()

export const sequelize = new Sequelize(process.env.DB_NAME, process.env.USER_NAME, process.env.PSW , {
    host: process.env.DB_HOST,
    dialect : process.env.DB_DIALECT_NAME 
})

export default async function dbConnection() {
    await sequelize.authenticate()
     try {
        console.log('Connection has been established successfully.');
     } catch (error) {
        console.error('Unable to connect to the database:', error);
     }
}