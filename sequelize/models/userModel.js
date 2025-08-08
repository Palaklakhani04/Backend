
import { DataTypes } from "sequelize";
import { sequelize } from "../config/dbConnection.js";

const User = sequelize.define(
  'User',
  {
    name: DataTypes.TEXT,
    favoriteColor: {
        type: DataTypes.TEXT,
        defaultValue: 'green',
    },
    age: DataTypes.INTEGER,
    cash: DataTypes.INTEGER,
  },{
        // freezeTableName:true
        tableName : 'usersData'
  }
);

export default User;