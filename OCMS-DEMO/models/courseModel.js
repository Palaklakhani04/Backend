import { sequelize } from "../config/dbConnection.js";
import DataTypes from "sequelize"

const Course = sequelize.define('courses', 
    {
        title: {
            type:DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        instructorId: {
            type: DataTypes.INTEGER,
            allowNull:false,
        },
        categorieId:{
            type: DataTypes.INTEGER,
            allowNull:false,
        }
    },
    {   
        freezeTableName:true,
    }
)

export default Course
