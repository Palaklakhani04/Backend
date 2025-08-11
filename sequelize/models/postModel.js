
import { DataTypes } from "sequelize";
import { sequelize } from "../config/dbConnection.js";

const Post = sequelize.define('Post',
  {
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    content: {
        type:DataTypes.STRING,
        allowNull:false
    },
  },
  {
        freezeTableName:true
  }
);

export default Post;