import { sequelize } from "../config/dbConnection.js";
import DataTypes from "sequelize"

const Categorie = sequelize.define('categories', 
    {
        name: {
            type: DataTypes.STRING,
            allowNull:false,
        }
    },
    {   
        freezeTableName:true,
    }
)

export default Categorie
