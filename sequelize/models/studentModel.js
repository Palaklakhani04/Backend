
import { DataTypes } from "sequelize";
import { sequelize } from "../config/dbConnection.js";

const Student = sequelize.define('Student',
  {
    name: {
        type:DataTypes.STRING,
        allowNull:false
    },
  },
  {
        freezeTableName:true
  }
);

export default Student;