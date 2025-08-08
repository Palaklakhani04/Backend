
import { DataTypes } from "sequelize";
import { sequelize } from "../config/dbConnection.js";

const UserDetail = sequelize.define('UserDetail', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    age: DataTypes.INTEGER,
    mobileNumber: DataTypes.STRING,
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
  },{
        freezeTableName:true
       
  }
);

export default UserDetail;