
import { DataTypes } from "sequelize";
import { sequelize } from "../config/dbConnection.js";

const Employee = sequelize.define(
  'Employee',
  {
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    name: {
        type:DataTypes.STRING,
        allowNull:false
    },
  },
  {
        freezeTableName:true
  }
);

export default Employee;