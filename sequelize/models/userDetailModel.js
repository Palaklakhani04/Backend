
import { DataTypes } from "sequelize";
import { sequelize } from "../config/dbConnection.js";

const UserDetail = sequelize.define('UserDetail', {
    firstName: {
      type:DataTypes.STRING,
      get() {
        const rowVal = this.getDataValue('firstName');
        return rowVal ? rowVal.toUpperCase() : null;
      }
    },
    lastName: {
      type:DataTypes.STRING,
      set(value) {
        this.setDataValue('lastName', value + " from india");
      }
    },
    fullName: {
      type:DataTypes.VIRTUAL,
      get() {
        return `${this.firstName} ${this.lastName}`
      },
      set(val){
        throw new Error('do not try to set fullname value')
      }
    },
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