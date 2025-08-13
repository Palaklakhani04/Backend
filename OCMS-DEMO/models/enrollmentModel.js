import { sequelize } from "../config/dbConnection.js";
import DataTypes from "sequelize"

const Enrollment = sequelize.define('enrollment', 
    {
        studentId: {
            type: DataTypes.INTEGER,
            allowNull:false
        },
        courseId:{
            type: DataTypes.INTEGER,
            allowNull:false
        }
    },
    {   
        freezeTableName:true,
        timestamps: true, 
        createdAt: 'enrolledAt',
        updatedAt: false
    }
)

export default Enrollment
