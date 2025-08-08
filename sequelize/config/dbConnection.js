import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('my_db', 'myuser', 'root', {
    host: 'localhost',
    dialect: 'mysql' 
});
export const dbConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}