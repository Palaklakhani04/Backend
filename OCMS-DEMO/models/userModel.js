import { sequelize } from "../config/dbConnection.js";
import DataTypes from "sequelize"

const User = sequelize.define('users', 
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate:{
                isEmail: {
                    msg: "Please enter a valid email address."
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull:false,
            validate: {
                len: {
                    args: [6, 30], 
                    msg: 'Password must be between 6 and 30 characters long.'
                }
            }
        },
        userType : {
            type: DataTypes.ENUM('student', 'instructor'),
            defaultValue: 'student',
            allowNull:false,
        }
    },
    {
        freezeTableName:true
    }
)

export default User
