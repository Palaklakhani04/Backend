
import { DataTypes } from "sequelize";
import { sequelize } from "../config/dbConnection.js";

const Course = sequelize.define('Course',
  {
    title: {
        type:DataTypes.STRING,
        allowNull:false
    },
  },
  {
        freezeTableName:true
  }
);

export default Course;